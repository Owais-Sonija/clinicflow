// server/src/utils/ApiError.ts

// Custom Error class for API errors
export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: string[];

    // Constructor to initialize the ApiError
    constructor(statusCode: number, message: string, errors: string[] = [], stack: string = '') {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Example usage:
// throw new ApiError(404, 'Resource not found', ['The requested resource does not exist.']);

// Exporting the ApiError class for use in other modules
export default ApiError;
        