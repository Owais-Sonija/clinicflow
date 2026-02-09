// server/src/routes/auth.routes.ts

import { Router } from 'express';
import { registerValidator, loginValidator } from '../validators/auth.validator';
import validate from '../middlewares/validate';
import { protect } from '../middlewares/auth.middleware';
import { register, login, logout, getCurrentUser } from '../controllers/auth.controller';
import { authLimiter } from '../middlewares/rateLimiter';

// Initialize router
const router = Router();

// Public routes
router.post('/register', registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);

// Export the router
export default router;