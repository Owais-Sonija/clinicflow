// server/src/routes/statsRoutes.ts
// Statistics and analytics routes

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import asyncHandler from '../utils/asyncHandler';
import { AuthRequest } from '../types';
import { Response } from 'express';
import ApiResponse from '../utils/ApiResponse';
import Patient from '../models/Patient';

const router = Router();

// Protect all routes
router.use(protect);

// Get dashboard stats
router.get('/dashboard', asyncHandler(async (req: AuthRequest, res: Response) => {
    const totalPatients = await Patient.countDocuments();
    const admittedPatients = await Patient.countDocuments({ isAdmitted: true });
    
    res.json(new ApiResponse(200, {
        totalPatients,
        admittedPatients,
        dischargedPatients: totalPatients - admittedPatients,
    }, 'Stats fetched successfully'));
}));

export default router;