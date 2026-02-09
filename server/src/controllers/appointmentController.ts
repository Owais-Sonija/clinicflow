// server/src/controllers/appointmentController.ts

import { Response } from "express";
import Appointment from "../models/Appointment";
import Doctor from "../models/Doctor";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types";

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private

export const getAllAppointments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      status,
      date,
      doctorId,
      patientId,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (doctorId) {
      query.doctor = doctorId;
    }

    if (patientId) {
      query.patient = patientId;
    }

    if (date) {
      const startDate = new Date(date as string);
      startDate.setHours(0, 0, 0, 0); // Set time to midnight
      const endDate = new Date(date as string);
      endDate.setDate(endDate.getDate() + 1); // Add 1 day to end date
      query.date = { $gte: startDate, $lt: endDate }; // Date range
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const appointments = await Appointment.find(query)
      .populate("doctor", "name specialization")
      .populate("patient", "name age phone")
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip) // Skip the first n results
      .limit(Number(limit)); // Limit to n results

    // Get total count
    const total = await Appointment.countDocuments(query);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          appointments,
          pagination: {
            current: Number(page),
            total: Math.ceil(total / Number(limit)),
            count: total,
          },
        },
        "Appointments fetched successfully",
      ),
    );
  },
);

// @desc    Get a single appointment
// @route   GET /api/appointments/:id
// @access  Private

export const getAppointmentById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    // Get appointment by id
    const appointment = await Appointment.findById(id)
      .populate("doctor", "name specialization phone email")
      .populate("patient", "name age phone email condition");

    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointment },
          "Appointment fetched successfully",
        ),
      );
  },
);

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private

export const createAppointment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { patient, doctor, date, timeSlot, reason, notes } = req.body;

    // Check if doctor exists
    const existingAppointment = await Appointment.findOne({
      doctor,
      date: new Date(date as string),
      timeSlot,
      status: { $ne: "completed" }, // Exclude completed appointments
    });

   
    // Verify doctor exists and is active
    const doctorExists = await Doctor.findById(doctor);

 // If doctor is already booked for the given date and time slot, throw an error
    if (existingAppointment) {
      throw new ApiError(
        400,
        `Doctor is already booked for ${date} at ${timeSlot}`,
      );
    }


    // Check if doctor is active
    if (!doctorExists || !doctorExists.isActive) {
      throw new ApiError(400, "Doctor is not available");
    }

    // Create new appointment
    const appointment = await Appointment.create({
      patient,
      doctor,
      date: new Date(date),
      timeSlot,
      reason,
      notes,
    });

    // Populate for response
    await appointment.populate("doctor", "name specialization"); // Populate doctor data
    await appointment.populate("patient", "name"); // Populate patient data

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { appointment },
          "Appointment created successfully",
        ),
      );
  },
);

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private

export const updateAppointment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )
      .populate("doctor", "name specialization")
      .populate("patient", "name");

    // Check if appointment does not exist
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointment },
          "Appointment updated successfully",
        ),
      );
  },
);

// @desc    Cancel an appointment
// @route   PATCH /api/appointments/:id/cancel
// @access  Private

export const cancelAppointment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const appointment = await Appointment.findById(req.params.id);

    // Check if appointment does not exist
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    // Check if appointment is already completed
    if (appointment.status === "complete") {
      throw new ApiError(400, "Cannot cancel a completed appointment");
    }

    // Update appointment status to cancelled
    appointment.status = "cancelled";
    await appointment.save(); // Save the updated appointment

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointment },
          "Appointment cancelled successfully",
        ),
      );
  },
);

// @desc    Complete an appointment (add prescription)
// @route   PATCH /api/appointments/:id/complete
// @access  Private

export const completeAppointment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { prescription, notes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    // Check if appointment does not exist
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    // Check if appointment is already cancelled
    if (appointment.status === "cancelled") {
      throw new ApiError(400, "Cannot complete a cancelled appointment");
    }

    // Update appointment status to completed
    appointment.status = "complete";
    appointment.prescription = prescription; // Add prescription
    appointment.notes = notes; // Add notes
    await appointment.save(); // Save the updated appointment

    await appointment.populate("doctor", "name specialization");
    await appointment.populate("patient", "name");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointment },
          "Appointment completed successfully",
        ),
      );
  },
);

// Get available time slots for a doctor on a specific date
export const getAvailableTimeSlots = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { date, doctorId } = req.query;

    // Check if date or doctorId is not provided
    if (!date || !doctorId) {
      throw new ApiError(400, "Date and doctorId are required");
    }

    // All possible time slots for the day
    const allSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
    ];

    // Get booked slots
    const startDate = new Date(date as string);
    startDate.setHours(0, 0, 0, 0); // Set time to midnight
    const endDate = new Date(startDate); // Create a new date object with today's date
    endDate.setDate(endDate.getDate() + 1); // Add 1 day to end date

    // Booked Appointments
    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startDate, $lt: endDate }, // Date range
      status: { $ne: "cancelled" }, // Exclude cancelled appointments
    }).select("timeSlot"); // Select only timeSlot

    const bookedSlots = bookedAppointments.map(
      (appointment) => appointment.timeSlot,
    ); // Map bookedAppointments to bookedSlots
    const available = allSlots.filter((slot) => !bookedSlots.includes(slot)); // Filter out booked slots

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { available },
          "Available time slots fetched successfully",
        ),
      );
  },
);
