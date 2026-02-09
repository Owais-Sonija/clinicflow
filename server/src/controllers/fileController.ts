// server/src/controllers/fileController.ts

import { Response } from 'express';
import File from '../models/File';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/uploadService';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { AuthRequest } from '../types';

// ============ UPLOAD FILE ============
export const uploadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const { patientId, appointmentId, category, description } = req.body;

    // Determine resource type
    const isImage = req.file.mimetype.startsWith('image/');
    const resourceType = isImage ? 'image' : 'raw';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
        req.file.buffer,
        category || 'other',
        resourceType as 'image' | 'raw'
    );

    // Save file record to database
    const file = await File.create({
        filename: result.public_id.split('/').pop(),
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: result.bytes,
        url: result.secure_url,
        publicId: result.public_id,
        uploadedBy: req.user?._id,
        patientId,
        appointmentId,
        category: category || 'other',
        description,
    });

    res.status(201).json(
        new ApiResponse(201, { file }, 'File uploaded successfully')
    );
});

// ============ GET FILES ============
export const getFiles = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { patientId, category, page = 1, limit = 20 } = req.query;

    const query: any = {};

    if (patientId) query.patientId = patientId;
    if (category) query.category = category;

    const skip = (Number(page) - 1) * Number(limit);

    const files = await File.find(query)
        .populate('uploadedBy', 'name')
        .populate('patientId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await File.countDocuments(query);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                files,
                pagination: {
                    current: Number(page),
                    total: Math.ceil(total / Number(limit)),
                    count: total,
                },
            },
            'Files fetched successfully'
        )
    );
});

// ============ GET FILE BY ID ============
export const getFileById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const file = await File.findById(req.params.id)
        .populate('uploadedBy', 'name')
        .populate('patientId', 'name');

    if (!file) {
        throw new ApiError(404, 'File not found');
    }

    res.status(200).json(
        new ApiResponse(200, { file }, 'File fetched successfully')
    );
});

// ============ DELETE FILE ============
export const deleteFile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const file = await File.findById(req.params.id);

    if (!file) {
        throw new ApiError(404, 'File not found');
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(file.publicId);

    // Delete from database
    await file.deleteOne();

    res.status(200).json(
        new ApiResponse(200, null, 'File deleted successfully')
    );
});