// server/src/types/index.ts
// Backend type definitions for ClinicFlow server
// Extends Express Request with authenticated user

import { Request } from 'express';
import { IUser } from '../models/User';

// ============ EXTENDED REQUEST TYPES ============

/**
 * AuthRequest - Express Request with authenticated user
 * Used in protected routes after auth middleware runs
 */
export interface AuthRequest extends Request {
    user?: IUser; // Populated by auth middleware
}

// ============ JWT PAYLOAD ============

export interface JwtPayload {
    userId: string;
    role: 'admin' | 'doctor' | 'patient';
    iat?: number;
    exp?: number;
}

// ============ QUERY PARAMS ============

export interface PaginationQuery {
    page?: string;
    limit?: string;
}

export interface PatientQuery extends PaginationQuery {
    search?: string;
    isAdmitted?: string;
}

export interface DoctorQuery extends PaginationQuery {
    specialization?: string;
    isActive?: string;
}

export interface AppointmentQuery extends PaginationQuery {
    status?: string;
    date?: string;
    doctorId?: string;
    patientId?: string;
}

// ============ EMAIL DATA TYPES ============

export interface AppointmentEmailData {
    patientName: string;
    patientEmail: string;
    doctorName: string;
    specialization: string;
    date: Date;
    timeSlot: string;
    reason: string;
}

export interface WelcomeEmailData {
    name: string;
    email: string;
}

// ============ PDF REPORT TYPES ============

export interface PatientReportData {
    patients: {
        name: string;
        age: number;
        condition: string;
        isAdmitted: boolean;
        createdAt: Date;
    }[];
    generatedAt: Date;
    generatedBy: string;
}

export interface AppointmentReportData {
    appointments: {
        patientName: string;
        doctorName: string;
        date: Date;
        timeSlot: string;
        status: string;
        reason: string;
    }[];
    dateFrom: Date;
    dateTo: Date;
    generatedAt: Date;
    generatedBy: string;
}

// ============ UPLOAD TYPES ============

export interface UploadResult {
    public_id: string;
    secure_url: string;
    format: string;
    bytes: number;
}

// ============ FILTER TYPES ============

export interface DateRangeFilter {
    startDate?: Date;
    endDate?: Date;
}

export interface StatsFilter extends DateRangeFilter {
    role?: string;
}