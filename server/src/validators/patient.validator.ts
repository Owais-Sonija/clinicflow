// server/src/validators/patient.validator.ts
// Validation rules for patient-related requests
// Uses express-validator for input sanitization

import { body, ValidationChain } from 'express-validator';

/**
 * Validation rules for creating a new patient
 */
export const createPatientValidator: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Patient name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .trim(),

    body('age')
        .notEmpty()
        .withMessage('Age is required')
        .isInt({ min: 0, max: 150 })
        .withMessage('Age must be between 0 and 150'),

    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be male, female, or other'),

    body('condition')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Condition cannot exceed 200 characters'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage('Phone number must be between 10 and 15 digits'),

    body('address')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Address cannot exceed 200 characters'),

    body('isAdmitted')
        .optional()
        .isBoolean()
        .withMessage('isAdmitted must be a boolean'),

    body('assignedDoctor')
        .optional()
        .isMongoId()
        .withMessage('Invalid doctor ID'),
];

/**
 * Validation rules for updating a patient
 */
export const updatePatientValidator: ValidationChain[] = [
    body('name')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .trim(),

    body('age')
        .optional()
        .isInt({ min: 0, max: 150 })
        .withMessage('Age must be between 0 and 150'),

    body('gender')
        .optional()
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be male, female, or other'),

    body('condition')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Condition cannot exceed 200 characters'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim(),

    body('isAdmitted')
        .optional()
        .isBoolean()
        .withMessage('isAdmitted must be a boolean'),

    body('assignedDoctor')
        .optional()
        .isMongoId()
        .withMessage('Invalid doctor ID'),
];