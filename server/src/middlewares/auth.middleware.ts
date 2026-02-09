// server/src/middlewares/auth.middleware.ts

import { Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "../types/index";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";

// Middleware to protect routes and ensure user is authenticated
export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    
    let token: string | undefined;

    /// Check for token in Authorization header or cookies
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // If no token found, throw unauthorized error
    if (!token) {
      throw new ApiError(401, "Not authorized, token missing");
    }

    try {
      // Verify token and extract payload
      const decoded = verifyToken(token);

      // Attach user info to request object
      const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

      if (!user) {
        throw new ApiError(401, "Not authorized, user not found");
      }

      // Attach user to request object
      req.user = user;

      next(); // Proceed to next middleware/controller
    } catch (error) {
      throw new ApiError(401, "Not authorized, token invalid");
    }
  },
);

// Middleware to restrict access based on user roles
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "Forbidden: You do not have permission to access this resource",
      );
    }
    next();
  };
};
