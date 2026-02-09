// client/src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hooks'

// Pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import PatientFormPage from './pages/PatientFormPage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorFormPage from './pages/DoctorFormPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AppointmentFormPage from './pages/AppointmentFormPage'

// Layout
import DashboardLayout from './components/layout/DashboardLayout'

// Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

// Public Route
function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />

            {/* Protected Routes with Layout */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* Patients */}
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/add" element={<PatientFormPage />} />
                <Route path="/patients/edit/:id" element={<PatientFormPage />} />
                
                {/* Doctors */}
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/add" element={<DoctorFormPage />} />
                <Route path="/doctors/edit/:id" element={<DoctorFormPage />} />
                
                {/* Appointments */}
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/appointments/add" element={<AppointmentFormPage />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}

export default App