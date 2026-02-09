// client/src/features/dashboard/dashboardSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'
import { type DashboardStats, type Patient, type Appointment, type DashboardResponse } from '../../types'

interface DashboardState {
    stats: DashboardStats | null
    recentPatients: Patient[]
    recentAppointments: Appointment[]
    isLoading: boolean
    error: string | null
}

const initialState: DashboardState = {
    stats: null,
    recentPatients: [],
    recentAppointments: [],
    isLoading: false,
    error: null
}

// Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<DashboardResponse>('/stats/dashboard')
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats')
        }
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDashboardStats.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
            state.isLoading = false
            state.stats = action.payload.stats
            state.recentPatients = action.payload.recentPatients || []
            state.recentAppointments = action.payload.recentAppointments || []
        })
        builder.addCase(fetchDashboardStats.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    }
})

export const { clearError } = dashboardSlice.actions
export default dashboardSlice.reducer