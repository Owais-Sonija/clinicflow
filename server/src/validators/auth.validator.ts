// server/src/validators/auth.validator.ts

import { body, ValidationChain } from 'express-validator';

// Validation rules for user registration
export const registerValidator: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .trim(),

        body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .trim()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

        body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
        
    body('role')
        .optional()
        .isIn(['patient', 'doctor', 'admin'])
        .withMessage('Role must be either patient, doctor, or admin'),
];


// Validation rules for user login
export const loginValidator: ValidationChain[] = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),

        body('password')
        .notEmpty()
        .withMessage('Password is required'),
];
        