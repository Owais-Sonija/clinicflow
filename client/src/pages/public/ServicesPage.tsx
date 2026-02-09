// client/src/pages/public/ServicesPage.tsx

import { Link } from 'react-router-dom'
import { 
    Stethoscope,
    Heart,
    Brain,
    Bone,
    Baby,
    Eye,
    Activity,
    Pill,
    Syringe,
    Microscope,
    Scan,
    Ambulance,
    ArrowRight,
    CheckCircle
} from 'lucide-react'

function ServicesPage() {
    const services = [
        {
            icon: Stethoscope,
            title: 'General Medicine',
            description: 'Comprehensive primary care services for patients of all ages, including preventive care, health screenings, and treatment of common illnesses.',
            features: ['Annual Health Checkups', 'Chronic Disease Management', 'Preventive Care', 'Health Screenings'],
            color: 'blue'
        },
        {
            icon: Heart,
            title: 'Cardiology',
            description: 'Advanced heart care with state-of-the-art diagnostic and treatment options for all cardiovascular conditions.',
            features: ['ECG & Echo', 'Stress Testing', 'Heart Disease Treatment', 'Cardiac Rehabilitation'],
            color: 'red'
        },
        {
            icon: Brain,
            title: 'Neurology',
            description: 'Expert care for disorders of the brain, spine, and nervous system using the latest diagnostic technology.',
            features: ['EEG Testing', 'Stroke Treatment', 'Migraine Management', 'Epilepsy Care'],
            color: 'purple'
        },
        {
            icon: Bone,
            title: 'Orthopedics',
            description: 'Complete bone and joint care from diagnosis through treatment and rehabilitation.',
            features: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Physical Therapy'],
            color: 'orange'
        },
        {
            icon: Baby,
            title: 'Pediatrics',
            description: 'Gentle, comprehensive healthcare for infants, children, and adolescents in a child-friendly environment.',
            features: ['Well-Child Visits', 'Vaccinations', 'Growth Monitoring', 'Pediatric Care'],
            color: 'pink'
        },
        {
            icon: Eye,
            title: 'Ophthalmology',
            description: 'Advanced eye care services from routine exams to complex surgical procedures.',
            features: ['Vision Testing', 'Cataract Surgery', 'Glaucoma Treatment', 'LASIK'],
            color: 'teal'
        },
        {
            icon: Activity,
            title: 'Pulmonology',
            description: 'Specialized care for respiratory conditions and lung diseases with advanced diagnostic capabilities.',
            features: ['Lung Function Tests', 'Asthma Management', 'COPD Treatment', 'Sleep Studies'],
            color: 'cyan'
        },
        {
            icon: Pill,
            title: 'Dermatology',
            description: 'Comprehensive skin care including medical, surgical, and cosmetic dermatology services.',
            features: ['Skin Examinations', 'Acne Treatment', 'Skin Cancer Screening', 'Cosmetic Procedures'],
            color: 'yellow'
        },
        {
            icon: Syringe,
            title: 'Vaccination Center',
            description: 'Complete vaccination services for all ages, including routine immunizations and travel vaccines.',
            features: ['Child Immunizations', 'Adult Vaccines', 'Travel Vaccines', 'Flu Shots'],
            color: 'green'
        },
        {
            icon: Microscope,
            title: 'Laboratory Services',
            description: 'State-of-the-art diagnostic laboratory offering a full range of clinical testing services.',
            features: ['Blood Tests', 'Urine Analysis', 'Pathology', 'Quick Results'],
            color: 'indigo'
        },
        {
            icon: Scan,
            title: 'Radiology',
            description: 'Advanced imaging services using the latest technology for accurate diagnoses.',
            features: ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound'],
            color: 'slate'
        },
        {
            icon: Ambulance,
            title: 'Emergency Care',
            description: '24/7 emergency medical services with rapid response and expert critical care.',
            features: ['24/7 Availability', 'Trauma Care', 'Critical Care', 'Ambulance Service'],
            color: 'red'
        },
    ]

    const colors: Record<string, { bg: string, text: string, light: string }> = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-100' },
        red: { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-100' },
        purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-100' },
        orange: { bg: 'bg-orange-600', text: 'text-orange-600', light: 'bg-orange-100' },
        pink: { bg: 'bg-pink-600', text: 'text-pink-600', light: 'bg-pink-100' },
        teal: { bg: 'bg-teal-600', text: 'text-teal-600', light: 'bg-teal-100' },
        cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', light: 'bg-cyan-100' },
        yellow: { bg: 'bg-yellow-600', text: 'text-yellow-600', light: 'bg-yellow-100' },
        green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-100' },
        indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-100' },
        slate: { bg: 'bg-slate-600', text: 'text-slate-600', light: 'bg-slate-100' },
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Our Medical Services
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            We offer a comprehensive range of medical services to meet all your 
                            healthcare needs under one roof with state-of-the-art facilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const colorScheme = colors[service.color] || colors.blue
                            return (
                                <div 
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                                >
                                    <div className={`w-16 h-16 ${colorScheme.light} ${colorScheme.text} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <service.icon size={32} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className={colorScheme.text} size={16} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link 
                                        to="/book-appointment"
                                        className={`inline-flex items-center gap-2 ${colorScheme.text} font-medium hover:gap-3 transition-all`}
                                    >
                                        Book Appointment <ArrowRight size={16} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Contact us to learn more about our services or to schedule a consultation 
                        with one of our specialists.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/book-appointment"
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-blue-600"
                        >
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServicesPage