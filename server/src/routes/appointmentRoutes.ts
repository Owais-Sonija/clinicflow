// server/src/routes/appointmentRoutes.ts

import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, cancelAppointment, completeAppointment, getAvailableTimeSlots } from "../controllers/appointmentController";

const router = Router();

// Protect route
router.use(protect);

// Protected routes


// CORRECT order - specific routes first
router.get("/", getAllAppointments);
router.get("/slots/:date", getAvailableTimeSlots);  // GET /appointments/slots/2022-10-01

// Dynamic routes AFTER the specific routes
router.get("/:id", getAppointmentById)       // Then dynamicrouter.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.patch("/:id/cancel", cancelAppointment);
router.patch("/:id/complete", completeAppointment);



export default router;
