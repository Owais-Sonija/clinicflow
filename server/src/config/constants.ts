// server/src/config/constants.ts

// Configuration constants for the application
export const DB_NAME = 'clinicflow';

export const USER_ROLES = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
} as const;

export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

export const COOKIE_OPTIONS = {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS in production
    sameSite: 'strict' as const, // Mitigates CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};