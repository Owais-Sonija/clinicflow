// client/src/pages/DashboardPage.tsx

import { useEffect } from 'react'
import { Users, UserCog, Calendar, Activity } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchDashboardStats } from '../features/dashboard/dashboardSlice'
import Header from '../components/layout/Header'
import StatCard from '../components/ui/StatCard'
import Card from '../components/ui/Card'

function DashboardPage() {
    const dispatch = useAppDispatch()
    const { stats, recentPatients, recentAppointments, isLoading } = useAppSelector(
        (state) => state.dashboard
    )

    useEffect(() => {
        dispatch(fetchDashboardStats())
    }, [dispatch])

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    }

    if (isLoading) {
        return (
            <div>
                <Header title="Dashboard" />
                <div className="p-6 flex items-center justify-center">
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Dashboard" />

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Patients"
                        value={stats?.totalPatients || 0}
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Total Doctors"
                        value={stats?.totalDoctors || 0}
                        icon={UserCog}
                        color="green"
                    />
                    <StatCard
                        title="Today's Appointments"
                        value={stats?.todayAppointments || 0}
                        icon={Calendar}
                        color="yellow"
                    />
                    <StatCard
                        title="Admitted Patients"
                        value={stats?.admittedPatients || 0}
                        icon={Activity}
                        color="red"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Patients */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Recent Patients
                        </h2>

                        {recentPatients.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No patients yet</p>
                        ) : (
                            <div className="space-y-3">
                                {recentPatients.map((patient) => (
                                    <div
                                        key={patient._id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {patient.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {patient.condition}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {patient.age} years
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Recent Appointments */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Recent Appointments
                        </h2>

                        {recentAppointments.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No appointments yet</p>
                        ) : (
                            <div className="space-y-3">
                                {recentAppointments.map((apt) => (
                                    <div
                                        key={apt._id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {apt.patient?.name || 'Unknown Patient'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {apt.doctor?.name || 'Unknown Doctor'} • {apt.timeSlot}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[apt.status]}`}>
                                            {apt.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage