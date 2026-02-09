// client/src/pages/AnalyticsPage.tsx

import { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import Header from '../components/layout/Header';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { StatCardSkeleton } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';
import api from '../lib/axios';
import { cn } from '../lib/utils';

// ============ TYPES ============
interface AnalyticsData {
    patientsByMonth: { month: string; count: number }[];
    appointmentsByStatus: { status: string; count: number }[];
    patientsByCondition: { condition: string; count: number }[];
    doctorPerformance: { doctorId: string; name: string; appointments: number; revenue: number }[];
}

// ============ COLORS ============
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const STATUS_COLORS: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444',
};

// ============ ANALYTICS PAGE COMPONENT ============
function AnalyticsPage() {
    // State
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { error: showError } = useToast();

    // Load analytics data
    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/reports/analytics');
            setData(response.data.data);
        } catch (err: any) {
            showError('Error', 'Failed to load analytics data');
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate totals
    const totalPatients = data?.patientsByMonth.reduce((sum, item) => sum + item.count, 0) || 0;
    const totalAppointments = data?.appointmentsByStatus.reduce((sum, item) => sum + item.count, 0) || 0;
    const completedAppointments = data?.appointmentsByStatus.find(s => s.status === 'complete')?.count || 0;
    const totalRevenue = data?.doctorPerformance.reduce((sum, doc) => sum + doc.revenue, 0) || 0;

    // ============ RENDER ============
    return (
        <div className="min-h-screen bg-background">
            <Header title="Analytics" subtitle="Insights and statistics" />

            <div className="p-6 space-y-6">
                {/* Refresh Button */}
                <div className="flex justify-end">
                    <Button 
                        variant="outline" 
                        onClick={loadAnalytics}
                        disabled={isLoading}
                    >
                        <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                        Refresh
                    </Button>
                </div>

                {/* Stats Cards */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Patients</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{totalPatients}</p>
                                    <p className="text-xs text-green-600 mt-1">Last 6 months</p>
                                </div>
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Appointments</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">{totalAppointments}</p>
                                    <p className="text-xs text-green-600 mt-1">{completedAppointments} completed</p>
                                </div>
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">
                                        {totalAppointments > 0 
                                            ? Math.round((completedAppointments / totalAppointments) * 100) 
                                            : 0}%
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                                </div>
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                                    <p className="text-3xl font-bold text-foreground mt-1">
                                        ${totalRevenue.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">From consultations</p>
                                </div>
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Charts Row 1 */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Patients by Month */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-foreground">
                                Patient Registration Trend
                            </h3>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data?.patientsByMonth || []}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis 
                                            dataKey="month" 
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="count" 
                                            stroke="#3b82f6" 
                                            strokeWidth={2}
                                            dot={{ fill: '#3b82f6' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Appointments by Status */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-foreground">
                                Appointments by Status
                            </h3>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={data?.appointmentsByStatus || []}
                                            dataKey="count"
                                            nameKey="status"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={({ status, percent }) => 
                                                `${status} (${(percent * 100).toFixed(0)}%)`
                                            }
                                        >
                                            {data?.appointmentsByStatus.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]} 
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Patients by Condition */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-foreground">
                                Patients by Condition
                            </h3>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data?.patientsByCondition || []} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                        <YAxis 
                                            type="category" 
                                            dataKey="condition" 
                                            stroke="hsl(var(--muted-foreground))" 
                                            fontSize={12}
                                            width={100}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Doctor Performance */}
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-foreground">
                                Top Performing Doctors
                            </h3>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data?.doctorPerformance.slice(0, 5).map((doctor, index) => (
                                        <div key={doctor.doctorId} className="flex items-center gap-4">
                                            <div className={cn(
                                                'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
                                                index === 0 ? 'bg-amber-500' :
                                                index === 1 ? 'bg-gray-400' :
                                                index === 2 ? 'bg-amber-700' : 'bg-blue-500'
                                            )}>
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-foreground">Dr. {doctor.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {doctor.appointments} appointments
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-green-600">
                                                    ${doctor.revenue.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;