// client/src/pages/public/BookAppointmentPage.tsx

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Calendar, Clock, User, Stethoscope, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchDoctors } from '../../features/doctors/doctorSlice'
import { fetchAvailableSlots } from '../../features/appointments/appointmentSlice'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

function BookAppointmentPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const { doctors } = useAppSelector((state) => state.doctors)
    const { availableSlots } = useAppSelector((state) => state.appointments)

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        // Patient Info (for non-logged in users)
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        // Appointment Info
        doctor: '',
        date: '',
        timeSlot: '',
        reason: '',
        notes: ''
    })

    useEffect(() => {
        dispatch(fetchDoctors({}))
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
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!isAuthenticated) {
            // Redirect to login with return URL
            navigate('/login?redirect=/book-appointment')
            return
        }

        // If authenticated, navigate to dashboard appointment form
        navigate('/appointments/add')
    }

    const today = new Date().toISOString().split('T')[0]
    const selectedDoctor = doctors.find(d => d._id === formData.doctor)

    const steps = [
        { number: 1, title: 'Choose Doctor' },
        { number: 2, title: 'Select Time' },
        { number: 3, title: 'Your Details' },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            Book an Appointment
                        </h1>
                        <p className="text-xl text-blue-100">
                            Schedule your visit in just a few simple steps
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-8 bg-gray-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-4">
                            {steps.map((s, index) => (
                                <div key={s.number} className="flex items-center">
                                    <div className={`flex items-center gap-2 ${step >= s.number ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                                            ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                                            ${step === s.number ? 'ring-4 ring-blue-200' : ''}
                                        `}>
                                            {step > s.number ? <CheckCircle size={20} /> : s.number}
                                        </div>
                                        <span className="font-medium hidden sm:block">{s.title}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 sm:w-24 h-1 mx-2 rounded ${step > s.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Choose Doctor */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                        Select a Doctor
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {doctors.filter(d => d.isActive).map((doctor) => (
                                            <label
                                                key={doctor._id}
                                                className={`relative flex gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all
                                                    ${formData.doctor === doctor._id 
                                                        ? 'border-blue-600 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-blue-300'
                                                    }
                                                `}
                                            >
                                                <input
                                                    type="radio"
                                                    name="doctor"
                                                    value={doctor._id}
                                                    checked={formData.doctor === doctor._id}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
                                                    {doctor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        Dr. {doctor.name}
                                                    </h3>
                                                    <p className="text-blue-600 text-sm">{doctor.specialization}</p>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {doctor.experience} years exp. • ${doctor.consultationFee}
                                                    </p>
                                                </div>
                                                {formData.doctor === doctor._id && (
                                                    <div className="absolute top-4 right-4 text-blue-600">
                                                        <CheckCircle size={24} />
                                                    </div>
                                                )}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-6">
                                        <Button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            disabled={!formData.doctor}
                                        >
                                            Continue <ArrowRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Select Date & Time */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                        Select Date & Time
                                    </h2>

                                    {selectedDoctor && (
                                        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                                                {selectedDoctor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">Dr. {selectedDoctor.name}</p>
                                                <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Select Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                min={today}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Reason for Visit
                                            </label>
                                            <select
                                                name="reason"
                                                value={formData.reason}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select reason</option>
                                                <option value="Consultation">General Consultation</option>
                                                <option value="Follow-up">Follow-up Visit</option>
                                                <option value="Check-up">Health Check-up</option>
                                                <option value="Emergency">Urgent Care</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {formData.date && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Available Time Slots
                                            </label>
                                            {availableSlots.length === 0 ? (
                                                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl">
                                                    No available slots for this date. Please select another date.
                                                </p>
                                            ) : (
                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                    {availableSlots.map((slot) => (
                                                        <label
                                                            key={slot}
                                                            className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm
                                                                ${formData.timeSlot === slot
                                                                    ? 'border-blue-600 bg-blue-600 text-white'
                                                                    : 'border-gray-200 hover:border-blue-300'
                                                                }
                                                            `}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="timeSlot"
                                                                value={slot}
                                                                checked={formData.timeSlot === slot}
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                            />
                                                            {slot}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex justify-between pt-6">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            disabled={!formData.date || !formData.timeSlot || !formData.reason}
                                        >
                                            Continue <ArrowRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Your Details */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                        Your Details
                                    </h2>

                                    {/* Appointment Summary */}
                                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                        <h3 className="font-semibold text-gray-800 mb-4">Appointment Summary</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <Stethoscope className="text-blue-600" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Doctor</p>
                                                    <p className="font-medium">Dr. {selectedDoctor?.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-blue-600" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Date</p>
                                                    <p className="font-medium">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock className="text-blue-600" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Time</p>
                                                    <p className="font-medium">{formData.timeSlot}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <User className="text-blue-600" size={20} />
                                                <div>
                                                    <p className="text-sm text-gray-500">Reason</p>
                                                    <p className="font-medium">{formData.reason}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {isAuthenticated ? (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="text-green-600" size={24} />
                                                <div>
                                                    <p className="font-medium text-green-800">You're logged in!</p>
                                                    <p className="text-sm text-green-600">Click confirm to complete your booking.</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                                                <p className="text-yellow-800">
                                                    Please <Link to="/login" className="text-blue-600 font-medium hover:underline">login</Link> or{' '}
                                                    <Link to="/register" className="text-blue-600 font-medium hover:underline">create an account</Link> to complete your booking.
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Full Name"
                                                    name="patientName"
                                                    value={formData.patientName}
                                                    onChange={handleChange}
                                                    placeholder="Your full name"
                                                    required
                                                />
                                                <Input
                                                    label="Email Address"
                                                    name="patientEmail"
                                                    type="email"
                                                    value={formData.patientEmail}
                                                    onChange={handleChange}
                                                    placeholder="your@email.com"
                                                    required
                                                />
                                            </div>
                                            <Input
                                                label="Phone Number"
                                                name="patientPhone"
                                                type="tel"
                                                value={formData.patientPhone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Any additional information you'd like to share..."
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-between pt-6">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setStep(2)}
                                        >
                                            Back
                                        </Button>
                                        <Button type="submit">
                                            {isAuthenticated ? 'Confirm Booking' : 'Login to Book'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600 mb-4">
                        Need help with booking? Call us at
                    </p>
                    <a 
                        href="tel:+15551234567"
                        className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700"
                    >
                        <Phone size={24} />
                        +1 (555) 123-4567
                    </a>
                </div>
            </section>
        </div>
    )
}

export default BookAppointmentPage