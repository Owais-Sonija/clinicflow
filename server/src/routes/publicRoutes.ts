// server/src/routes/publicRoutes.ts

import { Router } from 'express';
import { getPublicDoctors, getPublicDoctorById } from '../controllers/publicController';

const router = Router();

// Public routes (no auth required)
router.get('/doctors', getPublicDoctors);
router.get('/doctors/:id', getPublicDoctorById);

export default router;