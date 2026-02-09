// server/src/models/User.ts

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface extending mongoose Document

export interface IUser extends Document {

    //     Document = Mongoose document type (has _id, save(), etc.)

    name: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin'; // User roles

    isVerified: boolean; // Email verification status
    phone?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;

    // Method signature for comparing passwords
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
    {
        name: { 
            type: String,
             required: [true, "Name is required"], 
             trim: true,
             minlength: [2, "Name must be at least 2 characters long"],
                maxlength: [50, "Name cannot exceed 50 characters"] 
            
            },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, // Exclude password from query results by default
        },
        role: {
            type: String,
            enum: ['patient', 'doctor', 'admin'],
            default: 'patient',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: String,
            trim: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
        },
        avatar: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Please enter a valid image URL"],
        },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function () {
    // pre = before saving to database

    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;

    // Hash the password with a salt round of 10
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
}
);

//Method: Compare password for login
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    // Return true if passwords match

    // Compare the plain text password with the hashed password
    return await bcrypt.compare(candidatePassword, this.password);
}

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
