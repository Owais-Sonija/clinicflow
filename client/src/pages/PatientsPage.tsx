// client/src/pages/PatientsPage.tsx

import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Users } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchPatients, deletePatient, clearError } from '../features/patients/patientSlice'
import { useToast } from '../context/ToastContext'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { TableRowSkeleton } from '../components/ui/Skeleton'
import { cn } from '../lib/utils'

function PatientsPage() {
    const dispatch = useAppDispatch()
    const { patients, isLoading, error } = useAppSelector((state) => state.patients)
    const { success, error: showError } = useToast()

    const [searchTerm, setSearchTerm] = useState('')
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        dispatch(fetchPatients())
    }, [dispatch])

    // Show error toast when error occurs
    useEffect(() => {
        if (error) {
            showError('Error', error)
            dispatch(clearError())
        }
    }, [error, showError, dispatch])

    const filteredPatients = patients.filter((patient) => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        try {
            setIsDeleting(true)
            await dispatch(deletePatient(id)).unwrap()
            success('Patient Deleted', 'The patient has been removed successfully.')
            setDeleteId(null)
        } catch (err: any) {
            showError('Delete Failed', err.message || 'Failed to delete patient')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header title="Patients" />
            
            <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Patients</p>
                                <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Admitted</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {patients.filter(p => p.isAdmitted).length}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-xl">
                                <Users className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Outpatient</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {patients.filter(p => !p.isAdmitted).length}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={cn(
                                'w-full h-10 pl-10 pr-4 rounded-xl',
                                'bg-background border border-input',
                                'text-foreground placeholder:text-muted-foreground',
                                'focus:outline-none focus:ring-2 focus:ring-ring'
                            )}
                        />
                    </div>
                    
                    <Link to="/patients/add">
                        <Button leftIcon={<Plus size={18} />}>
                            Add Patient
                        </Button>
                    </Link>
                </div>
                
                {/* Patients Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Patient
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Age
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Condition
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Contact
                                    </th>
                                    <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <TableRowSkeleton key={i} columns={6} />
                                    ))
                                ) : filteredPatients.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-muted-foreground">
                                            No patients found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPatients.map((patient) => (
                                        <tr 
                                            key={patient._id} 
                                            className="border-b border-border hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={patient.name} size="sm" />
                                                    <span className="font-medium text-foreground">
                                                        {patient.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-muted-foreground">
                                                {patient.age} years
                                            </td>
                                            <td className="py-4 px-4 text-muted-foreground">
                                                {patient.condition}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={cn(
                                                    'px-2.5 py-1 text-xs font-medium rounded-full',
                                                    patient.isAdmitted 
                                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                                        : 'bg-muted text-muted-foreground'
                                                )}>
                                                    {patient.isAdmitted ? 'Admitted' : 'Outpatient'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-muted-foreground">
                                                {patient.phone || patient.email || 'N/A'}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex justify-end gap-1">
                                                    <Link to={`/patients/edit/${patient._id}`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Edit size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => setDeleteId(patient._id)}
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            
            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <Card className="w-full max-w-md mx-4 p-6 animate-slide-in-from-bottom">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Delete Patient
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Are you sure you want to delete this patient? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button 
                                variant="outline" 
                                onClick={() => setDeleteId(null)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={() => handleDelete(deleteId)}
                                isLoading={isDeleting}
                            >
                                Delete
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default PatientsPage