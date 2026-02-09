// client/src/pages/AppointmentFormPage.tsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createAppointment, fetchAvailableSlots, clearError, clearAvailableSlots } from '../features/appointments/appointmentSlice'
import { fetchPatients } from '../features/patients/patientSlice'
import { fetchDoctors } from '../features/doctors/doctorSlice'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'

function AppointmentFormPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { availableSlots, isLoading, error } = useAppSelector((state) => state.appointments)
    const { patients } = useAppSelector((state) => state.patients)
    const { doctors } = useAppSelector((state) => state.doctors)

    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        date: '',
        timeSlot: '',
        reason: '',
        notes: ''
    })

    useEffect(() => {
        dispatch(fetchPatients())
        dispatch(fetchDoctors({}))

        return () => {
            dispatch(clearError())
            dispatch(clearAvailableSlots())
        }
    }, [dispatch])

    useEffect(() => {
        if (formData.doctor && formData.date) {
            dispatch(fetchAvailableSlots({ 
                doctorId: formData.doctor, 
                date: formData.date 
            }))
        }
    }, [formData.doctor, formData.date, dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await dispatch(createAppointment({
            patient: formData.patient,
            doctor: formData.doctor,
            date: formData.date,
            timeSlot: formData.timeSlot,
            reason: formData.reason,
            notes: formData.notes || undefined
        }))

        if (!result.type.includes('rejected')) {
            navigate('/appointments')
        }
    }

    // Get today's date for min date
    const today = new Date().toISOString().split('T')[0]

    return (
        <div>
            <Header title="New Appointment" />

            <div className="p-6">
                <button
                    onClick={() => navigate('/appointments')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Appointments
                </button>

                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => dispatch(clearError())}
                    />
                )}

                <Card className="max-w-2xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Book New Appointment
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Patient Select */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Patient
                                </label>
                                <select
                                    name="patient"
                                    value={formData.patient}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select patient</option>
                                    {patients.map((patient) => (
                                        <option key={patient._id} value={patient._id}>
                                            {patient.name} ({patient.age} years)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Doctor Select */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Doctor
                                </label>
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            Dr. {doctor.name} - {doctor.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Time Slot */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time Slot
                                </label>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.doctor || !formData.date}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                >
                                    <option value="">
                                        {!formData.doctor || !formData.date 
                                            ? 'Select doctor and date first' 
                                            : 'Select time slot'
                                        }
                                    </option>
                                    {availableSlots.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason for Visit
                            </label>
                            <input
                                type="text"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="e.g., Regular checkup, Follow-up, Consultation"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Notes */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any additional information"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/appointments')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Book Appointment
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AppointmentFormPage