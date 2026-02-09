// server/src/controllers/publicController.ts

import { Request, Response } from 'express';
import Doctor from '../models/Doctor';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

// @desc    Get all active doctors (public)
// @route   GET /api/public/doctors
// @access  Public
export const getPublicDoctors = asyncHandler(async (req: Request, res: Response) => {
    const { search, specialization, page = 1, limit = 12 } = req.query;

    const query: any = { isActive: true };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { specialization: { $regex: search, $options: 'i' } },
        ];
    }

    if (specialization) {
        query.specialization = specialization;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const doctors = await Doctor.find(query)
        .select('name email phone specialization qualification experience consultationFee bio avatar isActive')
        .sort({ experience: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Doctor.countDocuments(query);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                doctors,
                pagination: {
                    current: Number(page),
                    total: Math.ceil(total / Number(limit)),
                    count: total,
                },
            },
            'Doctors fetched successfully'
        )
    );
});

// @desc    Get doctor by ID (public)
// @route   GET /api/public/doctors/:id
// @access  Public
export const getPublicDoctorById = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await Doctor.findOne({ 
        _id: req.params.id, 
        isActive: true 
    }).select('-user');

    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    res.status(200).json(
        new ApiResponse(200, { doctor }, 'Doctor fetched successfully')
    );
});