// server/src/models/Patient.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define Patient Interface
export interface IPatient extends Document {
    name: string
    age: number
    condition: string
    email?: string
    phone?: string
    isAdmitted: boolean
    createdAt: string
    updatedAt: string
}

// Define Patient Schema
const patientSchema = new Schema<IPatient>({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    condition: {
        type: String,
        required: true,
        default: 'General',
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        sparse: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
        type: String,
        trim: true,
    },
    isAdmitted: {
        type: Boolean,
        default: false,
    },
   
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});


// Compile model from schema
const Patient = mongoose.model<IPatient>('Patient', patientSchema);

// Export Patient model
export default Patient;


