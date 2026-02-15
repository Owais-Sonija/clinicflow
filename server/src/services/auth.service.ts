// server/src/services/auth.service.ts
// JWT token generation and verification service
// Handles authentication token logic

import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { JwtPayload } from '../types';

/**
 * Generate JWT token for authenticated user
 * @param user - User document from database
 * @returns Signed JWT token string
 */
export const generateToken = (user: IUser): string => {
    const payload: JwtPayload = {
        userId: user._id.toString(),
        role: user.role,
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        }
    );
};

/**
 * Verify and decode JWT token
 * @param token - JWT token string
 * @returns Decoded token payload
 * @throws Error if token is invalid
 */
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
};