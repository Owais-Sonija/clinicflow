// server/src/services/auth.service.ts

import jwt from 'jsonwebtoken';
import {IUser} from '../models/User.js';

// Service to generate JWT token for authenticated users
export const generateToken = (user: IUser): string => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    )
}

// Service to verify JWT token 
export const verifyToken = (token: string): {userId:string, role:string} => {
    // return the decoded token payload if valid
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId:string, 
        role:string
    };
}