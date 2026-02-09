// server/src/models/File.ts

import mongoose, { Schema, Document } from 'mongoose';

// ============ FILE INTERFACE ============
export interface IFile extends Document {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    publicId: string;
    uploadedBy: mongoose.Types.ObjectId;
    patientId?: mongoose.Types.ObjectId;
    appointmentId?: mongoose.Types.ObjectId;
    category: 'medical-record' | 'prescription' | 'lab-report' | 'imaging' | 'other';
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ============ FILE SCHEMA ============
const FileSchema = new Schema<IFile>(
    {
        filename: {
            type: String,
            required: [true, 'Filename is required'],
        },
        originalName: {
            type: String,
            required: [true, 'Original name is required'],
        },
        mimeType: {
            type: String,
            required: [true, 'MIME type is required'],
        },
        size: {
            type: Number,
            required: [true, 'File size is required'],
        },
        url: {
            type: String,
            required: [true, 'URL is required'],
        },
        publicId: {
            type: String,
            required: [true, 'Public ID is required'],
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Uploader is required'],
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
        },
        category: {
            type: String,
            enum: ['medical-record', 'prescription', 'lab-report', 'imaging', 'other'],
            default: 'other',
        },
        description: {
            type: String,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// ============ INDEXES ============
FileSchema.index({ patientId: 1 });
FileSchema.index({ uploadedBy: 1 });
FileSchema.index({ category: 1 });

export default mongoose.model<IFile>('File', FileSchema);