// server/src/routes/publicRoutes.ts
// Public routes (no authentication required)

import { Router } from 'express';

const router = Router();

// Public health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Public API is working',
    });
});

export default router;