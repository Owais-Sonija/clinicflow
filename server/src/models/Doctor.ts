// server/src/models/Doctor.ts

import mongoose, {Schema, Document} from 'mongoose';

// Doctor Interface
export interface IDoctor extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultationFee: number;
    availability: {
        day: string;
        startTime: string;
        endTime: string;
    }[]
    isActive: boolean;
    bio?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Doctor Schema
const DoctorSchema = new Schema<IDoctor>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name must not be more than 50 characters'],
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address',
        ],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required'],
        trim: true,
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required'],
        trim: true,
    },
    experience: {
        type: Number,
        required: [true, 'Experience is required'],
        min: [0, 'Experience cannot be negative'],
    },
    consultationFee: {
        type: Number,
        required: [true, 'Consultation Fee is required'],
        min: [0, 'Consultation Fee cannot be negative'],
    },
    availability: [
     {
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        startTime: String,
        endTime: String,
     }   
    ],
    isActive: {
        type: Boolean,
      default: true,
    },
    bio: {
        type: String,
      maxlength: [500, 'Bio must not be more than 500 characters'],
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Export Doctor Model
export default mongoose.model<IDoctor>('Doctor', DoctorSchema);