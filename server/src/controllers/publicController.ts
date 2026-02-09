// server/src/controllers/publicController.ts

import { Request, Response } from 'express';
import Doctor from '../models/Doctor';
import Appointment from '../models/Appointment';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

// @desc    Get all active doctors (public)
// @route   GET /api/public/doctors
// @access  Public
export const getPublicDoctors = asyncHandler(async (req: Request, res: Response) => {
    const { search, specialization, page = 1, limit = 12 } = req.query;

    // Build query - only active doctors
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

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Fetch doctors with selected fields only
    const doctors = await Doctor.find(query)
        .select('name email phone specialization qualification experience consultationFee bio avatar isActive availability')
        .sort({ experience: -1 })
        .skip(skip)
        .limit(Number(limit));

    // Get total count
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
    const { id } = req.params;

    // Find active doctor by ID
    const doctor = await Doctor.findOne({ 
        _id: id, 
        isActive: true 
    }).select('-user');

    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    res.status(200).json(
        new ApiResponse(200, { doctor }, 'Doctor fetched successfully')
    );
});

// @desc    Get available time slots (public)
// @route   GET /api/public/slots
// @access  Public
export const getPublicTimeSlots = asyncHandler(async (req: Request, res: Response) => {
    const { doctorId, date } = req.query;

    // Validate required params
    if (!doctorId || !date) {
        throw new ApiError(400, 'Doctor ID and date are required');
    }

    // Verify doctor exists and is active
    const doctor = await Doctor.findOne({ _id: doctorId, isActive: true });
    if (!doctor) {
        throw new ApiError(404, 'Doctor not found or not available');
    }

    // All possible time slots
    const allSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
        '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM',
        '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
    ];

    // Get date range for query
    const startDate = new Date(date as string);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    // Find booked appointments for the date
    const bookedAppointments = await Appointment.find({
        doctor: doctorId,
        date: { $gte: startDate, $lt: endDate },
        status: { $nin: ['cancelled'] }
    }).select('timeSlot');

    // Extract booked slots
    const bookedSlots = bookedAppointments.map(apt => apt.timeSlot);
    
    // Filter available slots
    const available = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.status(200).json(
        new ApiResponse(
            200, 
            { 
                available, 
                booked: bookedSlots,
                totalSlots: allSlots.length,
                availableCount: available.length
            }, 
            'Time slots fetched successfully'
        )
    );
});

// @desc    Get all specializations (public)
// @route   GET /api/public/specializations
// @access  Public
export const getSpecializations = asyncHandler(async (req: Request, res: Response) => {
    // Get distinct specializations from active doctors only
    const specializations = await Doctor.distinct('specialization', { isActive: true });
    
    // Sort alphabetically
    specializations.sort();

    res.status(200).json(
        new ApiResponse(
            200, 
            { 
                specializations,
                count: specializations.length 
            }, 
            'Specializations fetched successfully'
        )
    );
});

// @desc    Get clinic statistics (public)
// @route   GET /api/public/stats
// @access  Public
export const getPublicStats = asyncHandler(async (req: Request, res: Response) => {
    // Get counts for public display
    const totalDoctors = await Doctor.countDocuments({ isActive: true });
    const specializations = await Doctor.distinct('specialization', { isActive: true });
    
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                totalDoctors,
                totalSpecializations: specializations.length,
                yearsOfExperience: 15, // Static for now
                happyPatients: '10,000+', // Static for now
            },
            'Public stats fetched successfully'
        )
    );
});