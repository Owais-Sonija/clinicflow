// server/src/routes/index.ts

import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patientRoutes';
import statsRoutes from './statsRoutes';
import doctorRoutes from './doctorRoutes';
import appointmentRoutes from './appointmentRoutes';
import profileRoutes from './profileRoutes';
import publicRoutes from './publicRoutes';

// Initialize main router
const router = Router();

// Public routes (no authentication required)
router.use('/public', publicRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Protected routes (authentication required)
router.use('/patients', patientRoutes);
router.use('/stats', statsRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/profile', profileRoutes);

export default router;