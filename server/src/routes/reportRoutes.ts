// server/src/routes/reportRoutes.ts
// Report generation routes (placeholder)

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.use(protect);

// TODO: Implement report routes
router.get('/patients', (req, res) => {
    res.json({ message: 'Patient report - Coming soon' });
});

export default router;