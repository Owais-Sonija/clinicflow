// client/src/pages/AppointmentsPage.tsx

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Calendar, Clock, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchAppointments, cancelAppointment } from '../features/appointments/appointmentSlice'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'
import { format } from 'date-fns'

function AppointmentsPage() {
    const dispatch = useAppDispatch()
    const { appointments, isLoading, error } = useAppSelector((state) => state.appointments)

    const [statusFilter, setStatusFilter] = useState('')
    const [cancelId, setCancelId] = useState<string | null>(null)

    useEffect(() => {
        dispatch(fetchAppointments({ status: statusFilter || undefined }))
    }, [dispatch, statusFilter])

    const handleCancel = async (id: string) => {
        await dispatch(cancelAppointment(id))
        setCancelId(null)
    }

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    }

    return (
        <div>
            <Header title="Appointments" />

            <div className="p-6">
                {error && <Alert type="error" message={error} />}

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <Link to="/appointments/add">
                        <Button className='flex'>
                            <Plus size={20} className="mr-2" />
                            New Appointment
                        </Button>
                    </Link>
                </div>

                {/* Appointments List */}
                {isLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading appointments...</div>
                ) : appointments.length === 0 ? (
                    <Card className="p-8 text-center text-gray-500">
                        No appointments found
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <Card key={appointment._id} className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                            {appointment.patient?.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {appointment.patient?.name || 'Unknown Patient'}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Dr. {appointment.doctor?.name || 'Unknown'} • {appointment.doctor?.specialization}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                <span className="font-medium">Reason:</span> {appointment.reason}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {appointment.date ? format(new Date(appointment.date), 'MMM dd, yyyy') : 'N/A'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {appointment.timeSlot}
                                            </span>
                                        </div>

                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[appointment.status]}`}>
                                            {appointment.status}
                                        </span>

                                        {appointment.status === 'pending' && (
                                            <button
                                                onClick={() => setCancelId(appointment._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Modal */}
            {cancelId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Cancel Appointment
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel this appointment?
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setCancelId(null)}>
                                No, Keep it
                            </Button>
                            <Button variant="danger" onClick={() => handleCancel(cancelId)}>
                                Yes, Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppointmentsPage