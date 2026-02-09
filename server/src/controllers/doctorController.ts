// server/src/controllers/doctorController.ts

import { Response } from "express";
import Doctor from "../models/Doctor";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "../types";

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private

export const getAllDoctors = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { search, specialization, page = 1, limit = 10 } = req.query;

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ];
    }
    if (specialization) {
      query.specialization = specialization;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const doctors = await Doctor.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip) // Skip the first n results
      .limit(Number(limit)); // Limit to n results

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
        "Doctors fetched successfully",
      ),
    );
  },
);

// @desc    Get a single doctor
// @route   GET /api/doctors/:id
// @access  Private

export const getDoctorById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    // Get doctor by id
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, { doctor }, "Doctor fetched successfully"));
  },
);

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Private (Admin Only)

export const createDoctor = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      name,
      email,
      phone,
      specialization,
      qualification,
      experience,
      consultationFee,
      availability,
      isActive,
      bio,
      avatar,
    } = req.body;

    // Check if doctor email already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      throw new ApiError(400, "Doctor with this email already exists");
    }

    // Create new doctor
    const doctor = await Doctor.create({
      name,
      email,
      phone,
      specialization,
      qualification,
      experience,
      consultationFee,
      availability,
      isActive,
      bio,
      avatar,
    });

    res
      .status(201)
      .json(new ApiResponse(201, { doctor }, "Doctor created successfully"));
  },
);

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private (Admin Only)

export const updateDoctor = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const doctor = await Doctor.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, { doctor }, "Doctor updated successfully"));
  },
);

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private (Admin Only)

export const deleteDoctor = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Doctor deleted successfully"));
  },
);

// @desc    Get available doctors for a date
// @route   GET /api/doctors/available
// @access  Private

export const getAvailableDoctors = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { date } = req.query;

    if (!date) {
      throw new ApiError(400, "Date is required");
    }

    // day of the week
    const dayOfWeek = new Date(date as string).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Get doctors available for the day
    const doctors = await Doctor.find({
      isActive: true,
      "availability.day": dayOfWeek,     // ADD: Check if requested time falls within availability window

    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { doctors },
          "Available doctors fetched successfully",
        ),
      );
  },
);

