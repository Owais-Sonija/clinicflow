// client/src/pages/DoctorsPage.tsx

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Mail } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchDoctors, deleteDoctor } from '../features/doctors/doctorSlice'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'

function DoctorsPage() {
    const dispatch = useAppDispatch()
    const { doctors, isLoading, error } = useAppSelector((state) => state.doctors)

    const [searchTerm, setSearchTerm] = useState('')
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => {
        dispatch(fetchDoctors({}))
    }, [dispatch])

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        await dispatch(deleteDoctor(id))
        setDeleteId(null)
    }

    return (
        <div>
            <Header title="Doctors" />

            <div className="p-6">
                {error && <Alert type="error" message={error} />}

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Link to="/doctors/add">
                        <Button className='flex'>
                            <Plus size={20} className="mr-2" />
                            Add Doctor
                        </Button>
                    </Link>
                </div>

                {/* Doctors Grid */}
                {isLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading doctors...</div>
                ) : filteredDoctors.length === 0 ? (
                    <Card className="p-8 text-center text-gray-500">
                        No doctors found
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <Card key={doctor._id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium text-lg">
                                            {doctor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                Dr. {doctor.name}
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                {doctor.specialization}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        doctor.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {doctor.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Qualification:</span> {doctor.qualification}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Experience:</span> {doctor.experience} years
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Fee:</span> ${doctor.consultationFee}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Mail size={14} />
                                        {doctor.email}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Link to={`/doctors/edit/${doctor._id}`}>
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                            <Edit size={18} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setDeleteId(doctor._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Delete Doctor
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setDeleteId(null)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorsPage