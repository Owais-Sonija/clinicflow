// client/src/pages/DoctorFormPage.tsx

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
    createDoctor,
    updateDoctor,
    fetchDoctorById,
    clearSelectedDoctor,
    clearError
} from '../features/doctors/doctorSlice'
import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'

function DoctorFormPage() {
    const { id } = useParams()
    const isEditing = Boolean(id)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { selectedDoctor, isLoading, error } = useAppSelector((state) => state.doctors)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        qualification: '',
        experience: '',
        consultationFee: '',
        bio: ''
    })

    useEffect(() => {
        if (isEditing && id) {
            dispatch(fetchDoctorById(id))
        }

        return () => {
            dispatch(clearSelectedDoctor())
            dispatch(clearError())
        }
    }, [dispatch, id, isEditing])

    useEffect(() => {
        if (isEditing && selectedDoctor) {
            setFormData({
                name: selectedDoctor.name,
                email: selectedDoctor.email,
                phone: selectedDoctor.phone,
                specialization: selectedDoctor.specialization,
                qualification: selectedDoctor.qualification,
                experience: String(selectedDoctor.experience),
                consultationFee: String(selectedDoctor.consultationFee),
                bio: selectedDoctor.bio || ''
            })
        }
    }, [selectedDoctor, isEditing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const doctorData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            specialization: formData.specialization,
            qualification: formData.qualification,
            experience: Number(formData.experience),
            consultationFee: Number(formData.consultationFee),
            bio: formData.bio || undefined
        }

        let result

        if (isEditing && id) {
            result = await dispatch(updateDoctor({ id, data: doctorData }))
        } else {
            result = await dispatch(createDoctor(doctorData))
        }

        if (!result.type.includes('rejected')) {
            navigate('/doctors')
        }
    }

    const specializations = [
        'Cardiology',
        'Dermatology',
        'Endocrinology',
        'Gastroenterology',
        'Neurology',
        'Oncology',
        'Orthopedics',
        'Pediatrics',
        'Psychiatry',
        'Pulmonology',
        'General Medicine',
        'Surgery'
    ]

    return (
        <div>
            <Header title={isEditing ? 'Edit Doctor' : 'Add Doctor'} />

            <div className="p-6">
                <button
                    onClick={() => navigate('/doctors')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Doctors
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
                        {isEditing ? 'Edit Doctor Details' : 'New Doctor Details'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                placeholder="Enter doctor name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Specialization
                                </label>
                                <select
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select specialization</option>
                                    {specializations.map((spec) => (
                                        <option key={spec} value={spec}>
                                            {spec}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Qualification"
                                name="qualification"
                                type="text"
                                placeholder="e.g., MBBS, MD"
                                value={formData.qualification}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Experience (years)"
                                name="experience"
                                type="number"
                                placeholder="Years of experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Consultation Fee ($)"
                                name="consultationFee"
                                type="number"
                                placeholder="Fee amount"
                                value={formData.consultationFee}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio (Optional)
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Brief description about the doctor"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/doctors')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                {isEditing ? 'Update Doctor' : 'Add Doctor'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default DoctorFormPage