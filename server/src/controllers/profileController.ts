// server/src/controllers/profileController.ts

import { Response } from "express";
import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "../types";

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    // Get user by id
    const user = await User.findById(req.user?._id).select('-password'); // Select only name and email

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        { user },
        "User profile fetched successfully",
      ),
    );
  },
);

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private

export const updateProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(req.user?._id, {name, phone, avatar}, {
      new: true,
      runValidators: true,
    }).select('-password'); // Select only name and email

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        { user },
        "User profile updated successfully",
      ),
    );
  },
);

// @desc    Change password
// @route   PUT /api/profile/password
// @access  Private

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    // Check if current password or new password is not provided
    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Current password and new password are required");
    }

    // Check if current password length is less than 6 characters
    if (currentPassword.length < 6) {
      throw new ApiError(400, "Current password must be at least 6 characters");
    }

        // Get user by id
    const user = await User.findById(req.user?._id).select('+password'); // Select password for comparison
     
    // Check if user exists
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if current password is correct for the user
    const isMatch = await user.comparePassword(currentPassword);
    // If the passwords do not match, throw an error
    if (!isMatch) {
      throw new ApiError(400, "Current password is incorrect");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password changed successfully",
      ),
    );
  },
);

