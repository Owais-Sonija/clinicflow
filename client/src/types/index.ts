// client/src/types/index.ts

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

// ============ PUBLIC TYPES ============
export interface PublicDoctor {
    _id: string
    name: string
    email: string
    phone: string
    specialization: string
    qualification: string
    experience: number
    consultationFee: number
    bio?: string
    avatar?: string
    isActive: boolean
    availability?: {
        day: string
        startTime: string
        endTime: string
    }[]
}

export interface PublicDoctorsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        doctors: PublicDoctor[]
        pagination: {
            current: number
            total: number
            count: number
        }
    }
}

export interface PublicDoctorResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        doctor: PublicDoctor
    }
}

export interface TimeSlotsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        available: string[]
        booked: string[]
        totalSlots: number
        availableCount: number
    }
}

export interface SpecializationsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        specializations: string[]
        count: number
    }
}

export interface PublicStats {
    totalDoctors: number
    totalSpecializations: number
    yearsOfExperience: number
    happyPatients: string
}

export interface PublicStatsResponse {
    statusCode: number
    success: boolean
    message: string
    data: PublicStats
}

// ============ REPORT TYPES ============
export interface ReportType {
    id: string
    title: string
    description: string
    icon: string
    color: string
}

export interface RecentReport {
    _id: string
    name: string
    type: string
    generatedAt: string
    size: string
    url?: string
}

export interface ReportFilters {
    dateFrom: string
    dateTo: string
    format: 'pdf' | 'excel' | 'csv'
}

// ============ FILE UPLOAD TYPES ============
export interface UploadedFile {
    _id: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    url: string
    uploadedBy: string
    patientId?: string
    appointmentId?: string
    category: 'medical-record' | 'prescription' | 'lab-report' | 'imaging' | 'other'
    createdAt: string
}

export interface FileUploadResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        file: UploadedFile
    }
}

// ============ NOTIFICATION TYPES ============
export interface Notification {
    _id: string
    userId: string
    type: 'appointment' | 'reminder' | 'system' | 'message'
    title: string
    message: string
    isRead: boolean
    data?: Record<string, any>
    createdAt: string
}

export interface NotificationsResponse {
    statusCode: number
    success: boolean
    message: string
    data: {
        notifications: Notification[]
        unreadCount: number
    }
}

// ============ ANALYTICS TYPES ============
export interface AnalyticsData {
    patientsByMonth: { month: string; count: number }[]
    appointmentsByStatus: { status: string; count: number }[]
    revenueByMonth: { month: string; amount: number }[]
    patientsByCondition: { condition: string; count: number }[]
    doctorPerformance: { 
        doctorId: string
        name: string
        appointments: number
        revenue: number 
    }[]
}

export interface AnalyticsResponse {
    statusCode: number
    success: boolean
    message: string
    data: AnalyticsData
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

// ============ EMAIL TYPES ============
export interface EmailData {
    to: string
    subject: string
    template: 'appointment-confirmation' | 'appointment-reminder' | 'appointment-cancelled' | 'welcome'
    data: Record<string, any>
}