// server/src/controllers/auth.controller.ts

import { Response} from 'express';
import User from '../models/User';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { generateToken } from '../services/auth.service';
import {AuthRequest} from '../types/index';
import { COOKIE_OPTIONS } from '../config/constants';


// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

// Register controller
export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, email, password, role } = req.body;
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'User with this email already exists');
    }

    // Create new user
    const user = new User({
        name,
        email,
        password,
        role: role || 'patient' // Default role is 'patient'
    });
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Set token in HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // Send success response (excluding password)
    res.status(201).json(new ApiResponse(201, {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        },
        token
    }, 'User registered successfully'));
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

// Login controller
export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;
    
    // Find user by email and include password for comparison
    const user = await User.findOne({ email }).select('+password'); // include password (which is excluded by default)

    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set token in HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // Send success response (excluding password)
    res.status(200).json(new ApiResponse(200, {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        },
        token
    }, 'User logged in successfully'));
});


// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private

// Logout controller
export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Clear the token cookie
    res.clearCookie('token', {
        ...COOKIE_OPTIONS,
        maxAge: 0, // Expire the cookie immediately
    });

    // Send success response
    res.status(200).json(new ApiResponse(200, null, 'User logged out successfully'));
}
);

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private

// Get current user controller
export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    // req.user is populated by auth middleware
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Send success response (excluding password)
    res.status(200).json(new ApiResponse(200, {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt,
        }
    }, 'Current user fetched successfully'));
});


    
