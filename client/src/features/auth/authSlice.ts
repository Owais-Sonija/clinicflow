// client/src/features/auth/authSlice.ts
// Redux slice for authentication state management
// Handles login, register, logout, and current user

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
    User,
} from '../../types';

// ======================
// STATE INTERFACE
// ======================

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

// ======================
// INITIAL STATE
// ======================

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
};

// ======================
// ASYNC THUNKS
// ======================

// Register new user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterData, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>(
                '/auth/register',
                userData
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);

// Login existing user
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>(
                '/auth/login',
                credentials
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Logout failed'
            );
        }
    }
);

// Get current authenticated user
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<AuthResponse>('/auth/me');
            return response.data.data.user;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetching user failed'
            );
        }
    }
);

// ======================
// SLICE DEFINITION
// ======================

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Clear any error messages
        clearError(state) {
            state.error = null;
        },
        // Reset entire auth state (for manual logout/cleanup)
        resetAuth(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ======================
        // REGISTER
        // ======================
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // ======================
        // LOGIN
        // ======================
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // ======================
        // LOGOUT
        // ======================
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        });

        // ======================
        // GET CURRENT USER
        // ======================
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            // Token invalid - clear auth state
            state.isLoading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        });
    },
});

// ======================
// EXPORTS
// ======================

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;