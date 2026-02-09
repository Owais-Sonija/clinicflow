// client/src/features/doctors/doctorSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'
import { type Doctor, type CreateDoctorData, type DoctorsResponse, type DoctorResponse } from '../../types'

interface DoctorState {
    doctors: Doctor[]
    selectedDoctor: Doctor | null
    isLoading: boolean
    error: string | null
    pagination: {
        current: number
        total: number
        count: number
    }
}

const initialState: DoctorState = {
    doctors: [],
    selectedDoctor: null,
    isLoading: false,
    error: null,
    pagination: {
        current: 1,
        total: 1,
        count: 0
    }
}

// Fetch all doctors
export const fetchDoctors = createAsyncThunk(
    'doctors/fetchAll',
    async (params: { search?: string; specialization?: string; page?: number } = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams()
            if (params.search) queryParams.append('search', params.search)
            if (params.specialization) queryParams.append('specialization', params.specialization)
            if (params.page) queryParams.append('page', params.page.toString())
            
            const response = await api.get<DoctorsResponse>(`/doctors?${queryParams}`)
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors')
        }
    }
)

// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
    'doctors/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get<DoctorResponse>(`/doctors/${id}`)
            return response.data.data.doctor
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor')
        }
    }
)

// Create doctor
export const createDoctor = createAsyncThunk(
    'doctors/create',
    async (data: CreateDoctorData, { rejectWithValue }) => {
        try {
            const response = await api.post<DoctorResponse>('/doctors', data)
            return response.data.data.doctor
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create doctor')
        }
    }
)

// Update doctor
export const updateDoctor = createAsyncThunk(
    'doctors/update',
    async ({ id, data }: { id: string; data: Partial<Doctor> }, { rejectWithValue }) => {
        try {
            const response = await api.put<DoctorResponse>(`/doctors/${id}`, data)
            return response.data.data.doctor
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update doctor')
        }
    }
)

// Delete doctor
export const deleteDoctor = createAsyncThunk(
    'doctors/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/doctors/${id}`)
            return id
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor')
        }
    }
)

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSelectedDoctor: (state) => {
            state.selectedDoctor = null
        }
    },
    extraReducers: (builder) => {
        // Fetch all
        builder.addCase(fetchDoctors.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.isLoading = false
            state.doctors = action.payload.doctors
            state.pagination = action.payload.pagination
        })
        builder.addCase(fetchDoctors.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })

        // Fetch by ID
        builder.addCase(fetchDoctorById.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchDoctorById.fulfilled, (state, action) => {
            state.isLoading = false
            state.selectedDoctor = action.payload
        })
        builder.addCase(fetchDoctorById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })

        // Create
        builder.addCase(createDoctor.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(createDoctor.fulfilled, (state, action) => {
            state.isLoading = false
            state.doctors.unshift(action.payload)
        })
        builder.addCase(createDoctor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })

        // Update
        builder.addCase(updateDoctor.fulfilled, (state, action) => {
            state.isLoading = false
            const index = state.doctors.findIndex(d => d._id === action.payload._id)
            if (index !== -1) {
                state.doctors[index] = action.payload
            }
            state.selectedDoctor = action.payload
        })

        // Delete
        builder.addCase(deleteDoctor.fulfilled, (state, action) => {
            state.isLoading = false
            state.doctors = state.doctors.filter(d => d._id !== action.payload)
        })
    }
})

export const { clearError, clearSelectedDoctor } = doctorSlice.actions
export default doctorSlice.reducer