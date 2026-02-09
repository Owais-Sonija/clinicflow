// client/src/components/layout/Navbar.tsx

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Clock } from 'lucide-react'
import { useAppSelector } from '../../app/hooks'
import { ThemeToggle } from '../ui/ThemeToggle'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'

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
            <div className="bg-primary text-primary-foreground py-2 hidden md:block">
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
                                className="hover:text-primary-foreground/80 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="hover:text-primary-foreground/80 transition-colors"
                                >
                                    Login
                                </Link>
                                <span className="opacity-50">|</span>
                                <Link 
                                    to="/register" 
                                    className="hover:text-primary-foreground/80 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">C</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-foreground">Clinic</span>
                                <span className="text-xl font-bold text-primary">Flow</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        cn(
                                            'text-sm font-medium transition-colors hover:text-primary',
                                            isActive ? 'text-primary' : 'text-muted-foreground'
                                        )
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="hidden lg:flex items-center gap-4">
                            <ThemeToggle />
                            <Link to="/book-appointment">
                                <Button>
                                    Book Appointment
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <ThemeToggle />
                            <button
                                className="p-2 rounded-lg hover:bg-accent"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="lg:hidden py-4 border-t border-border animate-fade-in">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            cn(
                                                'px-4 py-3 rounded-xl font-medium transition-colors',
                                                isActive
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-muted-foreground hover:bg-accent'
                                            )
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/book-appointment"
                                    onClick={() => setIsOpen(false)}
                                    className="mx-4 mt-2"
                                >
                                    <Button className="w-full">
                                        Book Appointment
                                    </Button>
                                </Link>
                                
                                {/* Mobile Auth Links */}
                                <div className="flex gap-4 px-4 mt-4 pt-4 border-t border-border">
                                    {isAuthenticated ? (
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="text-primary font-medium"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsOpen(false)}
                                                className="text-muted-foreground font-medium"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={() => setIsOpen(false)}
                                                className="text-primary font-medium"
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