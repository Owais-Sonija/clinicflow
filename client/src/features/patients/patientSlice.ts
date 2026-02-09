// client/src/features/patients/patientSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import { type Patient, type CreatePatientData, type UpdatePatientData, type PatientsResponse, type PatientResponse } from "../../types";

// Define the initial state using TypeScript
interface PatientState {
    patients: Patient[];
    selectedPatient: Patient | null;
    isLoading: boolean;
    error: string | null;
}

// Initialize the initial state
const initialState: PatientState = {
    patients: [],
    selectedPatient: null,
    isLoading: false,
    error: null,
};

// Get all the patients
export const fetchPatients = createAsyncThunk(
    "patients/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<PatientsResponse>("/patients");
            return response.data.data.patients;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch patients");
        }
    }
);

// Get a single patient
export const fetchPatientById = createAsyncThunk(
    "patients/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get<PatientResponse>(`/patients/${id}`);
            return response.data.data.patient;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch patient");
        }
    }
);

// Create a new patient
export const createPatient = createAsyncThunk(
    "patients/create",
    async (data: CreatePatientData, { rejectWithValue }) => {
        try {
            const response = await api.post<PatientResponse>("/patients", data);
            return response.data.data.patient;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create patient");
        }
    }
);

// Update a patient
export const updatePatient = createAsyncThunk(
    "patients/update",
    async ({id, data}: { id: string, data: UpdatePatientData }, { rejectWithValue }) => {
        try {
            const response = await api.put<PatientResponse>(`/patients/${id}`, data);
            return response.data.data.patient;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update patient");
        }
    }
);

// Delete a patient
export const deletePatient = createAsyncThunk(
    "patients/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/patients/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete patient");
        }
    }
);

// Slice
const patientSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedPatient: (state) => {
            state.selectedPatient = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch all patients
        // Pending state
        builder.addCase(fetchPatients.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Success state
        builder.addCase(fetchPatients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.patients = action.payload;
        });

        // Error state
        builder.addCase(fetchPatients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Fetch a single patient
        // Pending state
        builder.addCase(fetchPatientById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Success state
        builder.addCase(fetchPatientById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedPatient = action.payload;
        });

        // Error state
        builder.addCase(fetchPatientById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Create a new patient
        // Pending state
        builder.addCase(createPatient.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Success state
        builder.addCase(createPatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.patients.push(action.payload);
        });

        // Error state
        builder.addCase(createPatient.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Update a patient
        // Pending state
        builder.addCase(updatePatient.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Success state
         builder.addCase(updatePatient.fulfilled, (state, action) => {
            state.isLoading = false
            const index = state.patients.findIndex(p => p._id === action.payload._id)
            if (index !== -1) {
                state.patients[index] = action.payload
            }
            state.selectedPatient = action.payload
        });

        // Error state
        builder.addCase(updatePatient.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Delete a patient
        // Pending state
        builder.addCase(deletePatient.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Success state
        builder.addCase(deletePatient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.patients = state.patients.filter(p => p._id !== action.payload);
        });

        // Error state
        builder.addCase(deletePatient.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    }
});

// Export actions
export const { clearError, clearSelectedPatient } = patientSlice.actions;

// Export reducer
export default patientSlice.reducer;