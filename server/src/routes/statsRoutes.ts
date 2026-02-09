// server/src/models/statsRoutes.ts

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { getDashboardStats, getPatientStats } from '../controllers/statsController';

// Initialize router
const router = Router();

// Protected routes
router.use(protect);

router.get('/dashboard',  getDashboardStats);
router.get('/patients', getPatientStats);

export default router;