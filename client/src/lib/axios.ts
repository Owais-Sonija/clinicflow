// client/src/lib/axios.ts

import axios from 'axios';

// Api URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//  Create an Axios instance with default configurations
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // token present, add it to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Return the modified config
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle responses globally 
api.interceptors.response.use(
    (response) => { 
        return response;
    },
    (error) => {
        // Handle errors globally
        if(error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            // Clear user data if stored
            localStorage.removeItem('user');
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;