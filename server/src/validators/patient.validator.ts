// 📁 server/src/validators/patient.validator.ts

import { body } from 'express-validator';

export const createPatientValidator = [
    body('name').trim().notEmpty().isLength({ min: 2, max: 50 }),
    body('age').isInt({ min: 0, max: 150 }),
    body('email').optional().isEmail(),
    body('phone').optional().isMobilePhone('any')
];