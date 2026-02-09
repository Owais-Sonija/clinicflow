// client/src/lib/publicApi.ts

import axios from 'axios';
import type { 
    PublicDoctor, 
    PublicDoctorsResponse, 
    PublicDoctorResponse,
    TimeSlotsResponse,
    SpecializationsResponse,
    PublicStatsResponse
} from '../types';

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance for public endpoints (no auth required)
const publicApi = axios.create({
    baseURL: `${API_URL}/public`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============ DOCTOR FUNCTIONS ============

// Fetch all public doctors
export const fetchPublicDoctors = async (params?: {
    search?: string;
    specialization?: string;
    page?: number;
    limit?: number;
}): Promise<{ doctors: PublicDoctor[]; pagination: { current: number; total: number; count: number } }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await publicApi.get<PublicDoctorsResponse>(`/doctors?${queryParams}`);
    return response.data.data;
};

// Fetch single doctor by ID
export const fetchPublicDoctorById = async (id: string): Promise<PublicDoctor> => {
    const response = await publicApi.get<PublicDoctorResponse>(`/doctors/${id}`);
    return response.data.data.doctor;
};

// ============ TIME SLOTS FUNCTIONS ============

// Fetch available time slots
export const fetchPublicSlots = async (
    doctorId: string, 
    date: string
): Promise<string[]> => {
    const response = await publicApi.get<TimeSlotsResponse>(
        `/slots?doctorId=${doctorId}&date=${date}`
    );
    return response.data.data.available || [];
};

// ============ SPECIALIZATION FUNCTIONS ============

// Fetch all specializations
export const fetchSpecializations = async (): Promise<string[]> => {
    const response = await publicApi.get<SpecializationsResponse>('/specializations');
    return response.data.data.specializations || [];
};

// ============ STATS FUNCTIONS ============

// Fetch public stats
export const fetchPublicStats = async (): Promise<PublicStatsResponse['data']> => {
    const response = await publicApi.get<PublicStatsResponse>('/stats');
    return response.data.data;
};

// Export the axios instance for custom requests
export default publicApi;