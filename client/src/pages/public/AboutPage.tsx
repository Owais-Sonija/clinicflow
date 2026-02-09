// client/src/pages/public/AboutPage.tsx

import { Link } from 'react-router-dom'
import { 
    Award, 
    Users, 
    Heart, 
    Target,
    ArrowRight
} from 'lucide-react'

function AboutPage() {
    const stats = [
        { value: '15+', label: 'Years Experience' },
        { value: '50+', label: 'Expert Doctors' },
        { value: '10k+', label: 'Happy Patients' },
        { value: '25+', label: 'Specializations' },
    ]

    const values = [
        {
            icon: Heart,
            title: 'Compassionate Care',
            description: 'We treat every patient with empathy, respect, and understanding, ensuring a comfortable healthcare experience.'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from diagnosis to treatment and follow-up care.'
        },
        {
            icon: Users,
            title: 'Patient-Centered',
            description: 'Our patients are at the heart of everything we do. We listen, understand, and provide personalized care.'
        },
        {
            icon: Target,
            title: 'Innovation',
            description: 'We embrace the latest medical technologies and techniques to provide the best possible outcomes.'
        },
    ]

    const team = [
        {
            name: 'Dr. Robert Williams',
            role: 'Chief Medical Officer',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            specialization: 'Cardiology'
        },
        {
            name: 'Dr. Watson Lee',
            role: 'Head of Surgery',
            image: 'https://randomuser.me/api/portraits/men/71.jpg',
            specialization: 'General Surgery'
        },
        {
            name: 'Dr. Michael Chen',
            role: 'Head of Neurology',
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
            specialization: 'Neurology'
        },
        {
            name: 'Dr. Kim Davis',
            role: 'Head of Pediatrics',
            image: 'https://randomuser.me/api/portraits/men/53.jpg',
            specialization: 'Pediatrics'
        },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            About ClinicFlow
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            For over 15 years, we have been dedicated to providing exceptional 
                            healthcare services to our community with compassion and excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                Our Story
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-6">
                                A Legacy of Healing and Care
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2009, ClinicFlow began as a small family practice with 
                                    a vision to provide accessible, high-quality healthcare to everyone 
                                    in our community.
                                </p>
                                <p>
                                    Over the years, we have grown into a comprehensive medical center 
                                    with over 50 specialists across 25 departments, serving more than 
                                    10,000 patients annually.
                                </p>
                                <p>
                                    Our commitment to innovation, combined with our dedication to 
                                    personalized care, has made us a trusted name in healthcare. We 
                                    continue to invest in the latest medical technologies and training 
                                    to ensure our patients receive the best possible care.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600"
                                alt="Medical facility"
                                className="rounded-3xl shadow-xl w-full"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                                <p className="text-4xl font-bold">Since</p>
                                <p className="text-2xl">2009</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-10 shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide compassionate, patient-centered healthcare of the highest 
                                quality, accessible to all members of our community. We are committed 
                                to treating every individual with dignity and respect while delivering 
                                exceptional medical care.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-10 shadow-sm">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                <Award className="text-green-600" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be the leading healthcare provider in the region, recognized for 
                                our commitment to excellence, innovation, and patient outcomes. We 
                                envision a healthier community where quality healthcare is accessible 
                                to everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Our Values
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-gray-600">
                            Our core values guide everything we do and shape the way we care for our patients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="text-blue-600" size={36} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Our Leadership
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-4">
                            Meet Our Expert Team
                        </h2>
                        <p className="text-gray-600">
                            Our leadership team brings decades of combined experience in healthcare management and clinical excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                                <img 
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                                    <p className="text-gray-500 text-sm">{member.specialization}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/our-doctors"
                            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                        >
                            View All Doctors <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Experience Our Care?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied patients who trust ClinicFlow for their healthcare needs.
                    </p>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Book Your Appointment
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default AboutPage