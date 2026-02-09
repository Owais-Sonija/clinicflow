// client/src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import type { AuthResponse, LoginCredentials, RegisterData, User } from '../../types';


// Define the initial state using that type
interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}   

// Initial state
const initialState: AuthState = {
    // Try to get user and token from localStorage
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
};

// Async thunk for user login
// Register user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterData, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/register', userData)
               return response.data.data; // Return user data and token
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return response.data.data; // Return user data and token
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Logout user thunk
export const logoutUser = createAsyncThunk(
    'auth/logout',
    // No arguments needed for logout beacause we are just clearing data
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return;
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

// Get current user thunk
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    // No arguments needed because we are fetching the current user
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<AuthResponse>('/auth/me');
            return response.data.data.user; // Return user data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetching user failed');
        }
    }
);

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
        // For example, to clear errors
        clearError(state) {
            state.error = null;
        },
        restAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }

    },

    extraReducers: (builder) => {
        // Handle register user
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        // Handle register user fulfilled
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));// Store user in localStorage
            localStorage.setItem('token', action.payload.token); // Store token in localStorage
        })
        // Handle register user rejected
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        // Handle login user
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        // Handle login user fulfilled
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));// Store user in localStorage
            localStorage.setItem('token', action.payload.token); // Store token in localStorage
        })
        // Handle login user rejected
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        // Handle logout user
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        })
        // Handle get current user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        })
        // Handle get current user fulfilled
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        } )
        // Handle get current user rejected
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        })
    },
});

// Export actions
export const { clearError, restAuth } = authSlice.actions;
// Export reducer
export default authSlice.reducer;
