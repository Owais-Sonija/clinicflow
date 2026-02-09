// client/src/components/layout/Footer.tsx

import { Link } from 'react-router-dom'
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight
} from 'lucide-react'

const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Our Doctors', path: '/our-doctors' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Contact Us', path: '/contact' },
]

const services = [
    { name: 'General Medicine', path: '/services' },
    { name: 'Cardiology', path: '/services' },
    { name: 'Pediatrics', path: '/services' },
    { name: 'Orthopedics', path: '/services' },
    { name: 'Dermatology', path: '/services' },
]

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white">Clinic</span>
                                <span className="text-xl font-bold text-blue-400">Flow</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Providing quality healthcare services with compassion and excellence. 
                            Your health is our priority.
                        </p>
                        <div className="flex gap-4">
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Facebook size={18} />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Twitter size={18} />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        <ArrowRight size={14} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link 
                                        to={service.path}
                                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        <ArrowRight size={14} />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                                <span>123 Medical Center Drive, Healthcare City, HC 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                                <span>info@clinicflow.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                                    <p>Sunday: Emergency Only</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} ClinicFlow. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-500 hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-blue-400 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer