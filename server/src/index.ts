// server/src/index.ts
// Entry point for the ClinicFlow backend server
// Sets up Express app with security, middleware, and routes

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import connectDB from './config/db';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';

// Load environment variables
dotenv.config();

// Initialize Express application
const app: Express = express();

// ======================
// SECURITY MIDDLEWARE
// ======================

// Helmet: Sets various HTTP headers for security
app.use(helmet());

// Rate Limiting: Prevents brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
});
app.use('/api', limiter);

// CORS: Allow frontend to communicate with backend
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
}));

// ======================
// GENERAL MIDDLEWARE
// ======================

// Morgan: HTTP request logger (use 'combined' in production)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Cookie parser for reading cookies
app.use(cookieParser());

// ======================
// ROUTES
// ======================

// Health check endpoint for monitoring
app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'ClinicFlow Server is running smoothly!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// API routes
app.use('/api', routes);

// ======================
// ERROR HANDLING
// ======================

// Global error handler (must be last middleware)
app.use(errorHandler);

// ======================
// SERVER STARTUP
// ======================

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        });
    })
    .catch((error) => {
        console.error('❌ Failed to connect to database:', error);
        process.exit(1);
    });

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

export default app;