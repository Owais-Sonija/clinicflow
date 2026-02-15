// client/src/lib/axios.ts
// Axios instance configured for ClinicFlow API
// Uses httpOnly cookies for secure authentication

import axios from 'axios';

// ======================
// CONFIGURATION
// ======================

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // ✅ CRITICAL: Send httpOnly cookies with every request
    headers: {
        'Content-Type': 'application/json',
    },
});

// ======================
// REQUEST INTERCEPTOR
// ======================

// Add any additional headers before request is sent
api.interceptors.request.use(
    (config) => {
        // ✅ No manual token handling - cookies are sent automatically
        // You can add custom headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ======================
// RESPONSE INTERCEPTOR
// ======================

// Handle responses and errors globally
api.interceptors.response.use(
    (response) => {
        // Successful response - return as is
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Clear any client-side state (not tokens, those are httpOnly)
            localStorage.removeItem('user');
            
            // Redirect to login page
            window.location.href = '/login';
        }

        // Handle other errors
        return Promise.reject(error);
    }
);

export default api;