// server/src/routes/index.ts - UPDATE

import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patientRoutes';
import statsRoutes from './statsRoutes';
import doctorRoutes from './doctorRoutes';
import appointmentRoutes from './appointmentRoutes';
import profileRoutes from './profileRoutes';
import publicRoutes from './publicRoutes';  // ADD THIS

const router = Router();

// Public routes (no auth required)
router.use('/public', publicRoutes);  // ADD THIS

// Protected routes
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/stats', statsRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/profile', profileRoutes);

export default router;