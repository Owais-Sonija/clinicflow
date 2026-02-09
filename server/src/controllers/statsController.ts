// server/src/controllers/statsController.ts

import { Response } from "express";
import Patient from "../models/Patient";
import User from "../models/User";
import Appointment from "../models/Appointment";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types";

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Private

export const getDashboardStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // Get today's date range
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const tomorrow = new Date(today); // Create a new date object with today's date
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to tomorrow's date

    // Get counts
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const admittedPatients = await Patient.countDocuments({ isAdmitted: true });

    // Get today's appointment count
    const todaysAppointments = await Appointment.countDocuments({
      date: { $gte: today, $lt: tomorrow }, // Date range
    });

    // Get recent patients
    const recentPatients = await Patient.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5) // Limit to 5 results
      .select("name age condition createdAt"); // Select only name, age, condition, and createdAt

    // Get recent appointments with populated data
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5) // Limit to 5 results
      .populate("patient", "name") // Populate patient data
      .populate("doctor", "name"); // Populate doctor data

    // Get monthly stats (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get monthly patients
    const monthlyPatients = await Patient.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Get Response
    res.status(200).json(
      new ApiResponse(
        200,
        {
          stats: {
            totalPatients,
            totalDoctors,
            admittedPatients,
            todaysAppointments,
          },
          recentPatients,
          recentAppointments,
          monthlyPatients,
        },
        "Dashboard statistics fetched successfully",
      ),
    );
  },
);

// @desc    Get patient statistics
// @route   GET /api/stats/patients
// @access  Private

// Get patient statistics controller
export const getPatientStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // Patients by condition
    const byCondition = await Patient.aggregate([
      { $group: { _id: "$condition", count: { $sum: 1 } } }, // Group by condition
      { $sort: { count: 1 } },
    ]);

    // Patients by admission status
    const byAdmission = await Patient.aggregate([
      { $group: { _id: "$isAdmitted", count: { $sum: 1 } } }, // Group by admission status
      { $sort: { count: 1 } }, // Sort by count
    ]);

    // Age Distribution
    const ageDistribution = await Patient.aggregate([
      {
        $bucket: {
          groupBy: "$age", // Group by age
          boundaries: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Define boundaries
          default: "100+", // Default bucket for any ages not in the boundaries
          output: {
            count: { $sum: 1 }, // Sum the count of patients in each bucket
          },
        },
      },
    ]);

    // Return the response
    res.status(200).json(
      new ApiResponse(
        200,
        {
          byCondition,
          byAdmission,
          ageDistribution,
        },
        "Patient statistics fetched successfully",
      ),
    );
  },
);
