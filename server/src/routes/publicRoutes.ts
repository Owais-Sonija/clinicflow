// server/src/routes/publicRoutes.ts

import { Router } from 'express';
import { 
    getPublicDoctors, 
    getPublicDoctorById, 
    getPublicTimeSlots,
    getSpecializations,
    getPublicStats
} from '../controllers/publicController';

// Initialize router
const router = Router();

// Doctor routes (public)
router.get('/doctors', getPublicDoctors);
router.get('/doctors/:id', getPublicDoctorById);

// Time slots route (public)
router.get('/slots', getPublicTimeSlots);

// Specializations route (public)
router.get('/specializations', getSpecializations);

// Public stats route
router.get('/stats', getPublicStats);

export default router;