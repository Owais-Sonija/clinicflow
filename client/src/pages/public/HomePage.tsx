// client/src/pages/public/HomePage.tsx

import { Link } from 'react-router-dom'
import { 
    Calendar, 
    Clock, 
    Shield, 
    Heart,
    Users,
    Award,
    CheckCircle,
    ArrowRight,
    Star,
    Phone,
    Stethoscope,
    Activity,
    Brain,
    Bone,
    Baby,
    Eye
} from 'lucide-react'

// Hero Section Component
function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="container mx-auto px-4 py-20 lg:py-32 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                            <Shield size={16} />
                            <span>Trusted by 10,000+ Patients</span>
                        </div>
                        
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                            Your Health Is Our
                            <span className="block text-blue-200">Top Priority</span>
                        </h1>
                        
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
                            Experience world-class healthcare with our team of expert doctors. 
                            We provide comprehensive medical services with compassion and cutting-edge technology.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/book-appointment"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
                            >
                                <Calendar size={20} />
                                Book Appointment
                            </Link>
                            <a
                                href="tel:+15551234567"
                                className="inline-flex items-center justify-center gap-2 bg-blue-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500/40 transition-all border border-white/20"
                            >
                                <Phone size={20} />
                                Call Now
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">15+</p>
                                <p className="text-blue-200 text-sm">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">50+</p>
                                <p className="text-blue-200 text-sm">Expert Doctors</p>
                            </div>
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold">10k+</p>
                                <p className="text-blue-200 text-sm">Happy Patients</p>
                            </div>
                        </div>
                    </div>

                    {/* Image/Illustration */}
                    <div className="hidden lg:block relative">
                        <div className="relative">
                            <div className="w-full h-[500px] bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600"
                                    alt="Medical team"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Floating Card 1 */}
                            <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-2xl p-4 animate-bounce-slow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Easy Booking</p>
                                        <p className="text-sm text-gray-500">Book in 2 minutes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-2xl p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Users className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">24/7 Support</p>
                                        <p className="text-sm text-gray-500">Always here for you</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Services Section
function ServicesSection() {
    const services = [
        {
            icon: Stethoscope,
            title: 'General Medicine',
            description: 'Comprehensive primary care for all your health needs with experienced physicians.',
            color: 'blue'
        },
        {
            icon: Heart,
            title: 'Cardiology',
            description: 'Expert heart care with advanced diagnostics and treatment options.',
            color: 'red'
        },
        {
            icon: Brain,
            title: 'Neurology',
            description: 'Specialized care for brain, spine, and nervous system disorders.',
            color: 'purple'
        },
        {
            icon: Bone,
            title: 'Orthopedics',
            description: 'Complete bone and joint care from diagnosis to rehabilitation.',
            color: 'orange'
        },
        {
            icon: Baby,
            title: 'Pediatrics',
            description: 'Gentle, comprehensive healthcare for infants, children, and adolescents.',
            color: 'pink'
        },
        {
            icon: Eye,
            title: 'Ophthalmology',
            description: 'Advanced eye care services from routine exams to complex surgeries.',
            color: 'teal'
        },
    ]

    const colors: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
        red: 'bg-red-100 text-red-600 group-hover:bg-red-600',
        purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600',
        orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600',
        pink: 'bg-pink-100 text-pink-600 group-hover:bg-pink-600',
        teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600',
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        Our Services
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Comprehensive Healthcare Services
                    </h2>
                    <p className="text-gray-600">
                        We offer a wide range of medical services to meet all your healthcare needs 
                        under one roof with state-of-the-art facilities.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colors[service.color]} group-hover:text-white`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {service.description}
                            </p>
                            <Link 
                                to="/services"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
                            >
                                Learn More <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        View All Services
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

// Why Choose Us Section
function WhyChooseUs() {
    const features = [
        {
            icon: Award,
            title: 'Experienced Doctors',
            description: 'Our team consists of highly qualified and experienced medical professionals.'
        },
        {
            icon: Clock,
            title: '24/7 Emergency Care',
            description: 'Round-the-clock emergency services for critical medical situations.'
        },
        {
            icon: Shield,
            title: 'Quality Care',
            description: 'We maintain the highest standards of medical care and patient safety.'
        },
        {
            icon: Activity,
            title: 'Modern Technology',
            description: 'State-of-the-art medical equipment and advanced treatment methods.'
        },
    ]

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600"
                                alt="Modern medical facility"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-2xl hidden md:block">
                            <p className="text-5xl font-bold">15+</p>
                            <p className="text-blue-200">Years of Excellence</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-6">
                            We Are Committed to Your Health and Wellness
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            At ClinicFlow, we believe in providing personalized healthcare that puts 
                            you first. Our dedicated team works tirelessly to ensure you receive 
                            the best possible care in a comfortable environment.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                            >
                                Learn More About Us <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Patient',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            content: 'The care I received at ClinicFlow was exceptional. The doctors were attentive, and the staff made me feel comfortable throughout my treatment.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Patient',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            content: 'Booking appointments is so easy with their online system. The doctors are professional and the facilities are top-notch.',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            role: 'Patient',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            content: 'I have been coming here for years. The consistent quality of care and friendly staff keep me coming back.',
            rating: 5
        },
    ]

    return (
        <section className="py-20 bg-blue-600">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
                        Testimonials
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-blue-100">
                        Don't just take our word for it. Here's what our patients have to say 
                        about their experience at ClinicFlow.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-xl"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                                ))}
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <img 
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// CTA Section
function CTASection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Ready to Experience Better Healthcare?
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Book your appointment today and take the first step towards 
                                better health. Our team is ready to provide you with exceptional care.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/book-appointment"
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    <Calendar size={20} />
                                    Book Appointment
                                </Link>
                                <a
                                    href="tel:+15551234567"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                                >
                                    <Phone size={20} />
                                    +1 (555) 123-4567
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">24/7</p>
                                <p className="text-gray-300">Emergency Care</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">50+</p>
                                <p className="text-gray-300">Specialists</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">100%</p>
                                <p className="text-gray-300">Satisfaction</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">10k+</p>
                                <p className="text-gray-300">Patients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Main HomePage Component
function HomePage() {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <WhyChooseUs />
            <TestimonialsSection />
            <CTASection />
        </div>
    )
}

export default HomePage