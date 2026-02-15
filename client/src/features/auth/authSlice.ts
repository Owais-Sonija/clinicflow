// client/src/features/auth/authSlice.ts
// Redux slice for authentication state management
// Uses httpOnly cookies for tokens (not stored in state/localStorage)

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
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

// ======================
// INITIAL STATE
// ======================

const initialState: AuthState = {
    // Try to restore user from localStorage (not token - that's in httpOnly cookie)
    user: localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')!) 
        : null,
    isLoading: false,
    // Check if user exists to determine auth status
    isAuthenticated: !!localStorage.getItem('user'),
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
            // Cookie is set automatically by backend
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
            // Cookie is set automatically by backend
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
            // Cookie is cleared automatically by backend
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
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            // Clear user from localStorage
            localStorage.removeItem('user');
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
            state.isAuthenticated = true;
            state.error = null;
            // Store user in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(action.payload.user));
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
            state.isAuthenticated = true;
            state.error = null;
            // Store user in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(action.payload.user));
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
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('user');
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
            // Update user in localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            // Token invalid - clear auth state
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        });
    },
});

// ======================
// EXPORTS
// ======================

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;