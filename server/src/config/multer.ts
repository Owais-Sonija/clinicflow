// server/src/config/multer.ts

import multer from 'multer';
import path from 'path';
import ApiError from '../utils/ApiError';

// ============ MULTER CONFIGURATION ============

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allowed file types
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, 'Invalid file type. Allowed: JPG, PNG, GIF, PDF, DOC, DOCX') as any);
    }
};

// Storage configuration
const storage = multer.memoryStorage();

// Export multer instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});