// server/src/routes/doctorRoutes.ts

import { Router } from "express";
import { protect, authorize } from "../middlewares/auth.middleware";
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor, getAvailableDoctors } from "../controllers/doctorController";

const router = Router();

// Protect route
router.use(protect);

// Protected routes
router.get("/", getAllDoctors);
router.get("/available", getAvailableDoctors);
router.get("/:id", getDoctorById);
router.post("/", authorize("admin"), createDoctor);
router.put("/:id", authorize("admin"), updateDoctor);
router.delete("/:id", authorize("admin"), deleteDoctor);


export default router;