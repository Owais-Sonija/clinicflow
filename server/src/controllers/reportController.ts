// server/src/controllers/reportController.ts

import { Response } from 'express';
import Patient from '../models/Patient';
import Appointment from '../models/Appointment';
import Doctor from '../models/Doctor';
import { generatePatientReport, generateAppointmentReport } from '../services/pdfService';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { AuthRequest } from '../types';

// ============ GENERATE PATIENT REPORT ============
export const generatePatientPDF = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { dateFrom, dateTo } = req.query;

    const query: any = {};

    if (dateFrom && dateTo) {
        query.createdAt = {
            $gte: new Date(dateFrom as string),
            $lte: new Date(dateTo as string),
        };
    }

    const patients = await Patient.find(query)
        .select('name age condition isAdmitted createdAt')
        .sort({ createdAt: -1 });

    generatePatientReport(
        {
            patients,
            generatedAt: new Date(),
            generatedBy: req.user?.name || 'System',
        },
        res
    );
});

// ============ GENERATE APPOINTMENT REPORT ============
export const generateAppointmentPDF = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { dateFrom, dateTo } = req.query;

    if (!dateFrom || !dateTo) {
        throw new ApiError(400, 'Date range is required');
    }

    const appointments = await Appointment.find({
        date: {
            $gte: new Date(dateFrom as string),
            $lte: new Date(dateTo as string),
        },
    })
        .populate('patient', 'name')
        .populate('doctor', 'name')
        .sort({ date: -1 });

    const formattedAppointments = appointments.map((apt) => ({
        patientName: (apt.patient as any)?.name || 'Unknown',
        doctorName: (apt.doctor as any)?.name || 'Unknown',
        date: apt.date,
        timeSlot: apt.timeSlot,
        status: apt.status,
        reason: apt.reason,
    }));

    generateAppointmentReport(
        {
            appointments: formattedAppointments,
            dateFrom: new Date(dateFrom as string),
            dateTo: new Date(dateTo as string),
            generatedAt: new Date(),
            generatedBy: req.user?.name || 'System',
        },
        res
    );
});

// ============ GET ANALYTICS DATA ============
export const getAnalytics = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Patients by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const patientsByMonth = await Patient.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Appointments by status
    const appointmentsByStatus = await Appointment.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
            },
        },
    ]);

    // Patients by condition
    const patientsByCondition = await Patient.aggregate([
        {
            $group: {
                _id: '$condition',
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
    ]);

    // Doctor performance
    const doctorPerformance = await Appointment.aggregate([
        { $match: { status: 'complete' } },
        {
            $group: {
                _id: '$doctor',
                appointments: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'doctors',
                localField: '_id',
                foreignField: '_id',
                as: 'doctorInfo',
            },
        },
        { $unwind: '$doctorInfo' },
        {
            $project: {
                doctorId: '$_id',
                name: '$doctorInfo.name',
                appointments: 1,
                revenue: { $multiply: ['$appointments', '$doctorInfo.consultationFee'] },
            },
        },
        { $sort: { appointments: -1 } },
        { $limit: 10 },
    ]);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                patientsByMonth: patientsByMonth.map((item) => ({
                    month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
                    count: item.count,
                })),
                appointmentsByStatus: appointmentsByStatus.map((item) => ({
                    status: item._id,
                    count: item.count,
                })),
                patientsByCondition: patientsByCondition.map((item) => ({
                    condition: item._id,
                    count: item.count,
                })),
                doctorPerformance,
            },
            'Analytics data fetched successfully'
        )
    );
});