// server/src/routes/reportRoutes.ts

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { generatePatientPDF, generateAppointmentPDF, getAnalytics } from '../controllers/reportController';

const router = Router();

// Protect all routes
router.use(protect);

// Report routes
router.get('/patients/pdf', generatePatientPDF);
router.get('/appointments/pdf', generateAppointmentPDF);
router.get('/analytics', getAnalytics);

export default router;