import { Response } from 'express'
import Patient from '../models/Patient'
import ApiError from '../utils/ApiError'
import ApiResponse from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import { AuthRequest } from '../types'


/**
 * @route   GET /api/patients
 * @desc    Get all patients with optional filters
 * @query   ?search=john&isAdmitted=true&page=1&limit=10
 * @access  Private (All authenticated users)
 * @returns {Patient[]} List of patients with pagination
 */

export const getAllPatients = asyncHandler(async (req: AuthRequest, res: Response) => {
    const patients = await Patient.find().sort({ createdAt: -1 })
    res.json(new ApiResponse(200, { patients }, 'Patients fetched successfully'))
})

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
export const getPatientById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
        throw new ApiError(404, 'Patient not found')
    }

    res.json(new ApiResponse(200, { patient }, 'Patient fetched successfully'))
})

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
export const createPatient = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Safe destructuring
    const body = req.body || {}
    const { name, age, condition, email, phone } = body

    // Validation
    if (!name) {
        throw new ApiError(400, 'Name is required')
    }
    
    if (!age) {
        throw new ApiError(400, 'Age is required')
    }

    // Create patient
    const patient = await Patient.create({
        name,
        age,
        condition: condition || 'General',
        email,
        phone
    })

    res.status(201).json(new ApiResponse(201, { patient }, 'Patient created successfully'))
})

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
export const updatePatient = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, 'No data provided for update')
    }

    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )

    if (!patient) {
        throw new ApiError(404, 'Patient not found')
    }

    res.json(new ApiResponse(200, { patient }, 'Patient updated successfully'))
})

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
export const deletePatient = asyncHandler(async (req: AuthRequest, res: Response) => {
    const patient = await Patient.findByIdAndDelete(req.params.id)

    if (!patient) {
        throw new ApiError(404, 'Patient not found')
    }

    res.json(new ApiResponse(200, null, 'Patient deleted successfully'))
})