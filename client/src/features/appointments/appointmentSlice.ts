// client/src/features/appointments/appointmentSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import {
  type Appointment,
  type CreateAppointmentData,
  type AppointmentsResponse,
  type AppointmentResponse,
} from "../../types";

interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  availableSlots: string[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    current: number;
    total: number;
    count: number;
  };
}

const initialState: AppointmentState = {
  appointments: [],
  selectedAppointment: null,
  availableSlots: [],
  isLoading: false,
  error: null,
  pagination: {
    current: 1,
    total: 1,
    count: 0,
  },
};

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (
    params: {
      status?: string;
      date?: string;
      doctorId?: string;
      page?: number;
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append("status", params.status);
      if (params.date) queryParams.append("date", params.date);
      if (params.doctorId) queryParams.append("doctorId", params.doctorId);
      if (params.page) queryParams.append("page", params.page.toString());

      const response = await api.get<AppointmentsResponse>(
        `/appointments?${queryParams}`,
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

// Fetch appointment by ID
export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<AppointmentResponse>(
        `/appointments/${id}`,
      );
      return response.data.data.appointment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointment",
      );
    }
  },
);

// Create appointment
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (data: CreateAppointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post<AppointmentResponse>(
        "/appointments",
        data,
      );
      return response.data.data.appointment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create appointment",
      );
    }
  },
);

// Update appointment
export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async (
    { id, data }: { id: string; data: Partial<Appointment> },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put<AppointmentResponse>(
        `/appointments/${id}`,
        data,
      );
      return response.data.data.appointment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update appointment",
      );
    }
  },
);

// Cancel appointment
export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.patch<AppointmentResponse>(
        `/appointments/${id}/cancel`,
      );
      return response.data.data.appointment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel appointment",
      );
    }
  },
);

// Complete appointment
export const completeAppointment = createAsyncThunk(
  "appointments/complete",
  async (
    {
      id,
      prescription,
      notes,
    }: { id: string; prescription?: string; notes?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch<AppointmentResponse>(
        `/appointments/${id}/complete`,
        {
          prescription,
          notes,
        },
      );
      return response.data.data.appointment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to complete appointment",
      );
    }
  },
);

// Fetch available slots
export const fetchAvailableSlots = createAsyncThunk(
  "appointments/fetchSlots",
  async (
    { doctorId, date }: { doctorId: string; date: string },
    { rejectWithValue },
  ) => {
    try {
      // ✅ FIX (backend returns 'available', not 'availableSlots')
      const response = await api.get(
        `/appointments/slots?doctorId=${doctorId}&date=${date}`,
      );
      return response.data.data.available; // Changed property name
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch slots",
      );
    }
  },
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
    clearAvailableSlots: (state) => {
      state.availableSlots = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchAppointments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload.appointments;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchAppointments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch by ID
    builder.addCase(fetchAppointmentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedAppointment = action.payload;
    });

    // Create
    builder.addCase(createAppointment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments.unshift(action.payload);
    });
    builder.addCase(createAppointment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Cancel
    builder.addCase(cancelAppointment.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(
        (a) => a._id === action.payload._id,
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    });

    // Complete
    builder.addCase(completeAppointment.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(
        (a) => a._id === action.payload._id,
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    });

    // Fetch slots
    builder.addCase(fetchAvailableSlots.fulfilled, (state, action) => {
      state.availableSlots = action.payload;
    });
  },
});

export const { clearError, clearSelectedAppointment, clearAvailableSlots } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
