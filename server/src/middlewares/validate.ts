// server/src/middlewares/validate.ts

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError';

// Middleware to check validation results

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); // Collects all validation errors from request

    
    // If there are validation errors, create an ApiError and pass to next
    if (!errors.isEmpty()) {
        // Extract error messages
        const errorMessages = errors.array().map(err => err.msg);

        //  [{ msg: "Name required" }, { msg: "Email invalid" }]
        //  becomes: ["Name required", "Email invalid"]

        // Throw ApiError with 400 status and error messages
        throw new ApiError(400, 'Validation Error', errorMessages);
    }

    // If no errors, proceed to next middleware/controller
    next();
}

export default validate;

// The validate middleware will be used after the validation chains in routes
// to ensure that any validation errors are properly handled and reported.  
