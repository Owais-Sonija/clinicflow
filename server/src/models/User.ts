// server/src/models/User.ts
// User model for authentication and user management
// Supports roles: patient, doctor, admin

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// ======================
// INTERFACE DEFINITION
// ======================

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
    isVerified: boolean;
    phone?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    // Method to compare passwords during login
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// ======================
// SCHEMA DEFINITION
// ======================

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Never return password in queries by default
        },
        role: {
            type: String,
            enum: {
                values: ['patient', 'doctor', 'admin'],
                message: 'Role must be patient, doctor, or admin',
            },
            default: 'patient',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// ======================
// INDEXES
// ======================

// Index for faster email lookups during login
UserSchema.index({ email: 1 });

// Index for filtering users by role
UserSchema.index({ role: 1 });

// ======================
// MIDDLEWARE (Pre-save hook)
// ======================

// Hash password before saving to database
// ✅ NO next() needed in Mongoose 6+ async middleware
UserSchema.pre('save', async function () {
    // Only hash if password was modified (or is new)
    if (!this.isModified('password')) {
        return; // Simply return, no next() needed
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// ======================
// METHODS
// ======================

// Compare entered password with hashed password in database
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ======================
// MODEL EXPORT
// ======================

const User = mongoose.model<IUser>('User', UserSchema);
export default User;