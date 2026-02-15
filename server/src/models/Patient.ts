// server/src/models/Patient.ts
// Patient model for clinic management
// Stores patient information and links to managing user

import mongoose, { Schema, Document, Types } from 'mongoose';

// ======================
// INTERFACE DEFINITION
// ======================

export interface IPatient extends Document {
    _id: Types.ObjectId;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    condition: string;
    email?: string;
    phone?: string;
    address?: string;
    isAdmitted: boolean;
    // Reference to the user who created this patient record
    createdBy: Types.ObjectId;
    // Reference to assigned doctor (if any)
    assignedDoctor?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// ======================
// SCHEMA DEFINITION
// ======================

const PatientSchema = new Schema<IPatient>(
    {
        name: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age cannot be negative'],
            max: [150, 'Age cannot exceed 150'],
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: 'Gender must be male, female, or other',
            },
            required: [true, 'Gender is required'],
        },
        condition: {
            type: String,
            required: [true, 'Condition is required'],
            trim: true,
            default: 'General Checkup',
        },
        email: {
            type: String,
            lowercase: true,
            sparse: true, // Allows multiple null values for unique field
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email',
            ],
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
            maxlength: [200, 'Address cannot exceed 200 characters'],
        },
        isAdmitted: {
            type: Boolean,
            default: false,
        },
        // Who created this patient record (for audit trail)
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Creator reference is required'],
        },
        // Assigned doctor reference
        assignedDoctor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// ======================
// INDEXES
// ======================

// Index for searching patients by name
PatientSchema.index({ name: 'text' });

// Index for filtering by admission status
PatientSchema.index({ isAdmitted: 1 });

// Index for finding patients by creator
PatientSchema.index({ createdBy: 1 });

// Index for finding patients by assigned doctor
PatientSchema.index({ assignedDoctor: 1 });

// ======================
// MODEL EXPORT
// ======================

const Patient = mongoose.model<IPatient>('Patient', PatientSchema);
export default Patient;