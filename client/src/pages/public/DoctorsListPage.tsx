// client/src/pages/public/DoctorsListPage.tsx

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, Award, ArrowRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchDoctors } from '../../features/doctors/doctorSlice'

function DoctorsListPage() {
    const dispatch = useAppDispatch()
    const { doctors, isLoading } = useAppSelector((state) => state.doctors)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSpecialization, setSelectedSpecialization] = useState('')

    useEffect(() => {
        dispatch(fetchDoctors({}))
    }, [dispatch])

    const specializations = [...new Set(doctors.map(d => d.specialization))].filter(Boolean)

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization
        return matchesSearch && matchesSpecialization && doctor.isActive
    })

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Our Expert Doctors
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Meet our team of experienced healthcare professionals dedicated 
                            to providing you with the best medical care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="py-8 bg-gray-50 sticky top-20 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors by name or specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                        >
                            <option value="">All Specializations</option>
                            {specializations.map((spec) => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Doctors Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                                </div>
                            ))}
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDoctors.map((doctor) => (
                                <div 
                                    key={doctor._id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Doctor Image */}
                                    <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-4xl font-bold">
                                            {doctor.name.charAt(0)}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-green-600 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Available
                                        </div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                                            Dr. {doctor.name}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-4">
                                            {doctor.specialization}
                                        </p>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Award size={16} className="text-yellow-500" />
                                                <span>{doctor.qualification}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock size={16} className="text-blue-500" />
                                                <span>{doctor.experience} years experience</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                <span>4.8 (120 reviews)</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div>
                                                <p className="text-sm text-gray-500">Consultation Fee</p>
                                                <p className="text-xl font-bold text-gray-800">
                                                    ${doctor.consultationFee}
                                                </p>
                                            </div>
                                            <Link
                                                to="/book-appointment"
                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Book an Appointment?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Choose from our expert doctors and book your appointment in just a few clicks.
                    </p>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Book Appointment Now
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default DoctorsListPage