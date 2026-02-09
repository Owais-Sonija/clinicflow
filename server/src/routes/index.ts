// server/src/routes/index.ts

import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patientRoutes';
import statsRoutes from './statsRoutes';
import doctorRoutes from './doctorRoutes';
import appointmentRoutes from './appointmentRoutes';
import profileRoutes from './profileRoutes';

// Initialize main router
const router = Router();

// Mount auth routes at /auth
router.use('/auth', authRoutes);
router.use("/patients", patientRoutes);
router.use("/stats", statsRoutes);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/profile", profileRoutes);


// Export the main router
export default router;