// 📁 server/src/middlewares/rateLimiter.ts

import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 5, // 5 requests per window per IP
    message: 'Too many login attempts, try again later' // Custom message for rate limit exceeded
});