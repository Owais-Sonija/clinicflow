// server/src/routes/patientRoutes.ts

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController';
import { createPatientValidator } from '../validators/patient.validator';
import validate from '../middlewares/validate';

// Initialize router
const router = Router();

// Protected routes
router.use(protect);

router.post('', createPatientValidator, validate, createPatient);
router.get('', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;