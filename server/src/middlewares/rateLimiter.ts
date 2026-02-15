// server/src/middlewares/rateLimiter.ts
// Rate limiting middleware to prevent abuse
// Protects auth routes from brute force attacks

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for authentication routes
 * Prevents brute force login attempts
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes',
        errors: ['Rate limit exceeded'],
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
});

/**
 * General API rate limiter
 * Prevents API abuse
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        success: false,
        message: 'Too many requests, please try again later',
        errors: ['Rate limit exceeded'],
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Strict limiter for sensitive operations
 * Used for password reset, email verification, etc.
 */
export const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Only 3 attempts per hour
    message: {
        success: false,
        message: 'Too many attempts, please try again after an hour',
        errors: ['Rate limit exceeded'],
    },
});