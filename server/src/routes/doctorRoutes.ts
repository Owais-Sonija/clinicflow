// server/src/routes/doctorRoutes.ts
// Doctor management routes (placeholder)

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.use(protect);

// TODO: Implement doctor routes
router.get('/', (req, res) => {
    res.json({ message: 'Doctor routes - Coming soon' });
});

export default router;