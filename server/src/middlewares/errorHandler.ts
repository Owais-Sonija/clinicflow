// server/src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

// Middleware to handle errors in the application
export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        // If the error is an instance of ApiError, send a structured response
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // For other types of errors, send a generic 500 Internal Server Error response
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: ['An unexpected error occurred.'],
    });
}

export default errorHandler;