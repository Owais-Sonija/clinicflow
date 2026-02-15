// client/src/App.tsx
// Main application component with routing configuration
// Handles public, auth, and protected dashboard routes

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { getCurrentUser } from './features/auth/authSlice';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import ServicesPage from './pages/public/ServicesPage';
import DoctorsListPage from './pages/public/DoctorsListPage';
import BookAppointmentPage from './pages/public/BookAppointmentPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientFormPage from './pages/PatientFormPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorFormPage from './pages/DoctorFormPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AppointmentFormPage from './pages/AppointmentFormPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';

// 404 Page
import NotFoundPage from './pages/public/NotFoundPage';

// Loading Spinner Component
function LoadingSpinner() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
}

// ======================
// PROTECTED ROUTE
// ======================
// Requires authentication to access
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    // Show loading while checking auth status
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

// ======================
// AUTH ROUTE
// ======================
// Redirects to dashboard if already logged in
function AuthRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    // Show loading while checking auth status
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

// ======================
// MAIN APP COMPONENT
// ======================
function App() {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    // Verify token and fetch user on app load
    useEffect(() => {
        if (token) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, token]);

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

                {/* Patients Management */}
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/add" element={<PatientFormPage />} />
                <Route path="/patients/edit/:id" element={<PatientFormPage />} />

                {/* Doctors Management */}
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/add" element={<DoctorFormPage />} />
                <Route path="/doctors/edit/:id" element={<DoctorFormPage />} />

                {/* Appointments Management */}
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/appointments/add" element={<AppointmentFormPage />} />

                {/* Settings & Analytics */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>

            {/* ========== 404 PAGE ========== */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;