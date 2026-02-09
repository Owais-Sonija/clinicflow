// client/src/types/index.ts (types for redux)

// ============ USER TYPES ============
export interface User {
    _id: string
    name: string
    email: string
    role: 'admin' | 'doctor' | 'patient'
    isVerified: boolean
    phone?: string
    avatar?: string
    createdAt: string
    updatedAt: string
}

// ============ AUTH TYPES ============
export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
    role?: 'admin' | 'doctor' | 'patient'
}

export interface AuthResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        token: string
        user: User
    }
}

// ============ PATIENT TYPES ============
export interface Patient {
    _id: string
    name: string
    age: number
    condition: string
    email?: string
    phone?: string
    isAdmitted: boolean
    createdAt: string
    updatedAt: string
}

export interface CreatePatientData {
    name: string
    age: number
    condition: string
    email?: string
    phone?: string
}

export interface UpdatePatientData {
    name?: string
    age?: number
    condition?: string
    email?: string
    phone?: string
    isAdmitted?: boolean
}

export interface PatientsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        patients: Patient[]
    }
}

export interface PatientResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        patient: Patient
    }
}

// ============ DOCTOR TYPES ============
export interface Doctor {
    _id: string
    name: string
    email: string
    phone: string
    specialization: string
    qualification: string
    experience: number
    consultationFee: number
    availability: {
        day: string
        startTime: string
        endTime: string
    }[]
    isActive: boolean
    bio?: string
    avatar?: string
    createdAt: string
    updatedAt: string
}

export interface CreateDoctorData {
    name: string
    email: string
    phone: string
    specialization: string
    qualification: string
    experience: number
    consultationFee: number
    availability?: {
        day: string
        startTime: string
        endTime: string
    }[]
    bio?: string
}

export interface DoctorsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        doctors: Doctor[]
        pagination: {
            current: number
            total: number
            count: number
        }
    }
}

export interface DoctorResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        doctor: Doctor
    }
}

// ============ APPOINTMENT TYPES ============
export interface Appointment {
    _id: string
    patient: {
        _id: string
        name: string
        age?: number
        phone?: string
    }
    doctor: {
        _id: string
        name: string
        specialization?: string
    }
    date: string
    timeSlot: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    reason: string
    notes?: string
    prescription?: string
    createdAt: string
    updatedAt: string
}

export interface CreateAppointmentData {
    patient: string
    doctor: string
    date: string
    timeSlot: string
    reason: string
    notes?: string
}

export interface AppointmentsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        appointments: Appointment[]
        pagination: {
            current: number
            total: number
            count: number
        }
    }
}

export interface AppointmentResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        appointment: Appointment
    }
}

// ============ STATS TYPES ============
export interface DashboardStats {
    totalPatients: number
    totalDoctors: number
    admittedPatients: number
    todayAppointments: number
}

export interface DashboardResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        stats: DashboardStats
        recentPatients: Patient[]
        recentAppointments: Appointment[]
    }
}

// ============ API RESPONSE TYPES ============
export interface ApiResponse<T> {
    statusCode: number
    success: boolean
    message: string
    data: T
}

export interface ApiError {
    success: boolean
    message: string
    errors: string[]
}

// End of client/src/types/index.ts