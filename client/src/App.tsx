// client/src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hooks'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'
import PublicLayout from './components/layout/PublicLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import ServicesPage from './pages/public/ServicesPage'
import DoctorsListPage from './pages/public/DoctorsListPage'
import BookAppointmentPage from './pages/public/BookAppointmentPage'
import AnalyticsPage from './pages/AnalyticsPage';

// Auth Pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Dashboard Pages
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import PatientFormPage from './pages/PatientFormPage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorFormPage from './pages/DoctorFormPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AppointmentFormPage from './pages/AppointmentFormPage'
import SettingsPage from './pages/SettingsPage'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

// Public Route Component (redirects if logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}

function App() {
    return (
        <Routes>
            {/* ========== PUBLIC WEBSITE ROUTES ========== */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/our-doctors" element={<DoctorsListPage />} />
                <Route path="/book-appointment" element={<BookAppointmentPage />} />
            </Route>

            {/* ========== AUTH ROUTES ========== */}
            <Route
                path="/login"
                element={
                    <AuthRoute>
                        <LoginPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <AuthRoute>
                        <RegisterPage />
                    </AuthRoute>
                }
            />

            {/* ========== DASHBOARD ROUTES (Protected) ========== */}
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
                
                {/* Settings */}
                <Route path="/settings" element={<SettingsPage />} />

                {/* Analytics */}
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>

            {/* ========== FALLBACK ========== */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App