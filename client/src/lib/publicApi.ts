// client/src/lib/publicApi.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Public API instance (no auth required)
const publicApi = axios.create({
    baseURL: `${API_URL}/public`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Public doctor types
export interface PublicDoctor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultationFee: number;
    bio?: string;
    avatar?: string;
    isActive: boolean;
}

// Fetch public doctors
export async function fetchPublicDoctors(params?: {
    search?: string;
    specialization?: string;
    page?: number;
    limit?: number;
}) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await publicApi.get(`/doctors?${queryParams}`);
    return response.data.data;
}

// Fetch single public doctor
export async function fetchPublicDoctor(id: string) {
    const response = await publicApi.get(`/doctors/${id}`);
    return response.data.data.doctor;
}

export default publicApi;