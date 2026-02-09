// server/src/index.ts


// Importing necessary modules
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';


// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app: Express = express();

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({limit: '16kb'})); // To parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // To parse URL-encoded bodies  
app.use(cookieParser()); // To parse cookies

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "ClinicFlow Server is running smoothly!",
        timestamp: new Date().toISOString(),
    });
});

// Routes will be added here
app.use('/api', routes);

// Error handling middleware (must be the last middleware)
app.use(errorHandler);

// Start the server and connect to the database
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit process with failure
});

export default app;
