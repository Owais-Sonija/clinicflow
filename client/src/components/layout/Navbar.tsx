// client/src/components/layout/Navbar.tsx

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Clock,  } from 'lucide-react'
import { useAppSelector } from '../../app/hooks'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Doctors', path: '/our-doctors' },
    { name: 'Contact', path: '/contact' },
]

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-blue-600 text-white py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>Emergency: +1 (555) 123-4567</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <Link 
                                to="/dashboard" 
                                className="hover:text-blue-200 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="hover:text-blue-200 transition-colors"
                                >
                                    Login
                                </Link>
                                <span>|</span>
                                <Link 
                                    to="/register" 
                                    className="hover:text-blue-200 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-gray-800">Clinic</span>
                                <span className="text-xl font-bold text-blue-600">Flow</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors hover:text-blue-600 ${
                                            isActive ? 'text-blue-600' : 'text-gray-700'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Link
                                to="/book-appointment"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                Book Appointment
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="lg:hidden py-4 border-t">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `px-4 py-3 rounded-lg font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/book-appointment"
                                    onClick={() => setIsOpen(false)}
                                    className="mx-4 mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                                >
                                    Book Appointment
                                </Link>
                                
                                {/* Mobile Auth Links */}
                                <div className="flex gap-4 px-4 mt-4 pt-4 border-t">
                                    {isAuthenticated ? (
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="text-blue-600 font-medium"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsOpen(false)}
                                                className="text-gray-600 font-medium"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={() => setIsOpen(false)}
                                                className="text-blue-600 font-medium"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar