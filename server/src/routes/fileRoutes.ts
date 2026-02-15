// server/src/routes/fileRoutes.ts
// File upload routes (placeholder)

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.use(protect);

// TODO: Implement file upload routes
router.post('/upload', (req, res) => {
    res.json({ message: 'File upload - Coming soon' });
});

export default router;