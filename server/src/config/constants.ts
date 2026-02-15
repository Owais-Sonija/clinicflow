// server/src/config/constants.ts
// Configuration constants for the application
// Centralized configuration for consistency

// ======================
// DATABASE
// ======================
export const DB_NAME = 'clinicflow';

// ======================
// USER ROLES
// ======================
export const USER_ROLES = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
} as const;

// ======================
// APPOINTMENT STATUS
// ======================
export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

// ======================
// COOKIE CONFIGURATION
// ======================
export const COOKIE_OPTIONS = {
    httpOnly: true, // ✅ Prevents client-side JS from accessing the cookie (XSS protection)
    secure: process.env.NODE_ENV === 'production', // ✅ HTTPS only in production
    sameSite: 'strict' as const, // ✅ CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

// ======================
// PAGINATION DEFAULTS
// ======================
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;

// ======================
// VALIDATION RULES
// ======================
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;