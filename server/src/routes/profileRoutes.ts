// server/src/routes/profileRoutes.ts

import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getProfile, updateProfile, changePassword } from "../controllers/profileController";

const router = Router();

// Protect route
router.use(protect);

// Protected routes
router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);

export default router;