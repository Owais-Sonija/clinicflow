// server/src/utils/ApiError.ts

// Custom Error class for API errors
class ApiResponse <T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T

    // Constructor to initialize the ApiResponse
    constructor(statusCode: number, data: T ,  message: string) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}

// Example usage:
// const response = new ApiResponse(200, true, 'Request successful', { id: 1, name: 'John Doe' });

// Exporting the ApiResponse class for use in other modules
export default ApiResponse;