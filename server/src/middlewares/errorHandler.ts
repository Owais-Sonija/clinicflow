// server/src/middlewares/errorHandler.ts
// Global error handling middleware
// Catches all errors and returns consistent JSON responses

import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Global error handler
 * Must be the last middleware in the app
 */
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check if error is our custom ApiError
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: [err.message],
        });
    }

    // Handle Mongoose duplicate key errors
    if (err.name === 'MongoServerError' && (err as any).code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'Duplicate Entry',
            errors: ['A record with this value already exists'],
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            errors: ['Authentication failed'],
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired',
            errors: ['Please login again'],
        });
    }

    // Log unexpected errors in development
    if (process.env.NODE_ENV === 'development') {
        console.error('❌ Unexpected Error:', err);
    }

    // Generic 500 error for everything else
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: ['An unexpected error occurred'],
    });
};

export default errorHandler;