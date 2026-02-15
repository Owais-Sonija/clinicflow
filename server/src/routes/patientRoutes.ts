// server/src/routes/patientRoutes.ts
// Patient management routes
// All routes require authentication

import { Router } from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientStats,
} from '../controllers/patientController';
import {
    createPatientValidator,
    updatePatientValidator,
} from '../validators/patient.validator';
import validate from '../middlewares/validate';

const router = Router();

// ============ PROTECT ALL ROUTES ============
router.use(protect);

// ============ PATIENT ROUTES ============

// Get all patients (with filters) + Create new patient
router
    .route('/')
    .get(getAllPatients)
    .post(createPatientValidator, validate, createPatient);

// Get patient statistics
router.get('/stats/overview', getPatientStats);

// Get, update, delete specific patient
router
    .route('/:id')
    .get(getPatientById)
    .put(updatePatientValidator, validate, updatePatient)
    .delete(authorize('admin', 'doctor'), deletePatient); // Only admin/doctor can delete

export default router;