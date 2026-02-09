// server/src/utils/ApiError.ts

import { Request, Response, NextFunction } from 'express';

// type definition for an asynchronous route handler
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// utility function to wrap asynchronous route handlers
const asyncHandler = (fn: AsyncHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;