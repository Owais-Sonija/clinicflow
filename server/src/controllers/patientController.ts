// server/src/controllers/patientController.ts
// Handles all patient-related operations
// Includes CRUD operations with user tracking

import { Response } from 'express';
import Patient from '../models/Patient';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { AuthRequest } from '../types';

/**
 * @route   GET /api/patients
 * @desc    Get all patients with optional filters
 * @query   ?search=john&isAdmitted=true&page=1&limit=10
 * @access  Private (All authenticated users)
 * @returns {Patient[]} List of patients with pagination
 */
export const getAllPatients = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        // Extract query parameters
        const {
            search = '',
            isAdmitted,
            page = 1,
            limit = 10,
        } = req.query;

        // Build filter object
        const filter: any = {};

        // Text search on name (if search query provided)
        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // Case-insensitive
        }

        // Filter by admission status
        if (isAdmitted !== undefined) {
            filter.isAdmitted = isAdmitted === 'true';
        }

        // Calculate pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Fetch patients with filters and pagination
        const patients = await Patient.find(filter)
            .populate('createdBy', 'name email role') // Include creator info
            .populate('assignedDoctor', 'name email') // Include assigned doctor
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination
        const total = await Patient.countDocuments(filter);

        // Return paginated response
        res.json(
            new ApiResponse(
                200,
                {
                    patients,
                    pagination: {
                        total,
                        page: pageNum,
                        limit: limitNum,
                        pages: Math.ceil(total / limitNum),
                    },
                },
                'Patients fetched successfully'
            )
        );
    }
);

/**
 * @route   GET /api/patients/:id
 * @desc    Get single patient by ID
 * @access  Private
 * @returns {Patient} Single patient object
 */
export const getPatientById = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const patient = await Patient.findById(req.params.id)
            .populate('createdBy', 'name email role')
            .populate('assignedDoctor', 'name email');

        if (!patient) {
            throw new ApiError(404, 'Patient not found');
        }

        res.json(
            new ApiResponse(200, { patient }, 'Patient fetched successfully')
        );
    }
);

/**
 * @route   POST /api/patients
 * @desc    Create new patient record
 * @access  Private
 * @returns {Patient} Created patient object
 */
export const createPatient = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        // Validate request body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, 'Request body is required');
        }

        const { name, age, gender, condition, email, phone, address, isAdmitted, assignedDoctor } =
            req.body;

        // Validation - required fields
        if (!name?.trim()) {
            throw new ApiError(400, 'Name is required');
        }

        if (!age || age < 0) {
            throw new ApiError(400, 'Valid age is required');
        }

        if (!gender) {
            throw new ApiError(400, 'Gender is required');
        }

        // Create patient with createdBy field
        const patient = await Patient.create({
            name: name.trim(),
            age,
            gender,
            condition: condition || 'General Checkup',
            email: email?.trim(),
            phone: phone?.trim(),
            address: address?.trim(),
            isAdmitted: isAdmitted || false,
            createdBy: req.user!._id, // ✅ Track who created this patient
            assignedDoctor: assignedDoctor || undefined,
        });

        // Populate references before returning
        await patient.populate('createdBy', 'name email role');
        if (assignedDoctor) {
            await patient.populate('assignedDoctor', 'name email');
        }

        res.status(201).json(
            new ApiResponse(201, { patient }, 'Patient created successfully')
        );
    }
);

/**
 * @route   PUT /api/patients/:id
 * @desc    Update existing patient
 * @access  Private
 * @returns {Patient} Updated patient object
 */
export const updatePatient = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, 'No data provided for update');
        }

        // Find and update patient
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true, // Run schema validations
            }
        )
            .populate('createdBy', 'name email role')
            .populate('assignedDoctor', 'name email');

        if (!patient) {
            throw new ApiError(404, 'Patient not found');
        }

        res.json(
            new ApiResponse(200, { patient }, 'Patient updated successfully')
        );
    }
);

/**
 * @route   DELETE /api/patients/:id
 * @desc    Delete patient record
 * @access  Private (Admin/Doctor only - add role check in route)
 * @returns {null} Success message
 */
export const deletePatient = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            throw new ApiError(404, 'Patient not found');
        }

        res.json(new ApiResponse(200, null, 'Patient deleted successfully'));
    }
);

/**
 * @route   GET /api/patients/stats/overview
 * @desc    Get patient statistics for dashboard
 * @access  Private
 * @returns {Object} Patient statistics
 */
export const getPatientStats = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const total = await Patient.countDocuments();
        const admitted = await Patient.countDocuments({ isAdmitted: true });
        const discharged = total - admitted;

        res.json(
            new ApiResponse(
                200,
                {
                    total,
                    admitted,
                    discharged,
                },
                'Statistics fetched successfully'
            )
        );
    }
);