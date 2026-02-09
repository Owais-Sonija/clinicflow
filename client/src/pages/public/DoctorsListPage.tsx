// client/src/pages/public/DoctorsListPage.tsx

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, Award, ArrowRight, Filter } from 'lucide-react'
import { fetchPublicDoctors, type PublicDoctor } from '../../lib/publicApi'
import { DoctorCardSkeleton } from '../../components/ui/Skeleton'
import { Avatar } from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { cn } from '../../lib/utils'

function DoctorsListPage() {
    const [doctors, setDoctors] = useState<PublicDoctor[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSpecialization, setSelectedSpecialization] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        loadDoctors()
    }, [])

    const loadDoctors = async () => {
        try {
            setIsLoading(true)
            setError('')
            const data = await fetchPublicDoctors({ limit: 50 })
            setDoctors(data.doctors)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load doctors')
        } finally {
            setIsLoading(false)
        }
    }

    const specializations = [...new Set(doctors.map(d => d.specialization))].filter(Boolean).sort()

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization
        return matchesSearch && matchesSpecialization
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                            <Award size={16} />
                            50+ Expert Specialists
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Meet Our Expert Doctors
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Our team of experienced healthcare professionals is dedicated 
                            to providing you with the best medical care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors by name or specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={cn(
                                    'w-full h-12 pl-12 pr-4 rounded-xl',
                                    'bg-background border border-input',
                                    'text-foreground placeholder:text-muted-foreground',
                                    'focus:outline-none focus:ring-2 focus:ring-ring'
                                )}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <select
                                    value={selectedSpecialization}
                                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                                    className={cn(
                                        'h-12 pl-12 pr-8 rounded-xl min-w-[200px] appearance-none',
                                        'bg-background border border-input',
                                        'text-foreground',
                                        'focus:outline-none focus:ring-2 focus:ring-ring'
                                    )}
                                >
                                    <option value="">All Specializations</option>
                                    {specializations.map((spec) => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-muted-foreground mt-4">
                        Showing {filteredDoctors.length} of {doctors.length} doctors
                    </p>
                </div>
            </section>

            {/* Doctors Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {error && (
                        <div className="text-center py-12">
                            <p className="text-destructive">{error}</p>
                            <Button onClick={loadDoctors} className="mt-4">
                                Try Again
                            </Button>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <DoctorCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDoctors.map((doctor) => (
                                <Card key={doctor._id} hover className="overflow-hidden group">
                                    {/* Doctor Header */}
                                    <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                                        <Avatar 
                                            name={doctor.name} 
                                            src={doctor.avatar}
                                            size="xl"
                                        />
                                        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            Available
                                        </div>
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                            Dr. {doctor.name}
                                        </h3>
                                        <p className="text-primary font-medium mb-4">
                                            {doctor.specialization}
                                        </p>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Award size={16} className="text-amber-500" />
                                                <span>{doctor.qualification}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock size={16} className="text-primary" />
                                                <span>{doctor.experience} years experience</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                                <span>4.8 (120 reviews)</span>
                                            </div>
                                        </div>

                                        {doctor.bio && (
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {doctor.bio}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-border">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Consultation</p>
                                                <p className="text-xl font-bold text-foreground">
                                                    ${doctor.consultationFee}
                                                </p>
                                            </div>
                                            <Link to="/book-appointment">
                                                <Button size="sm">
                                                    Book Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Book an Appointment?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Choose from our expert doctors and book your appointment in just a few clicks.
                    </p>
                    <Link to="/book-appointment">
                        <Button 
                            variant="secondary" 
                            size="lg"
                            rightIcon={<ArrowRight size={20} />}
                        >
                            Book Appointment Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default DoctorsListPage