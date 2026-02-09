// client/src/pages/public/ContactPage.tsx

import { useNavigate } from 'react-router-dom'
import { 
    Mail, 
    MapPin, 
} from 'lucide-react'
import Button from '../../components/ui/Button'

function ContactPage() {
    const navigate = useNavigate();

    return (
        <div>            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            For any inquiries, please contact us at
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20">                
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"                                        
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Enter your message"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">                                
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => navigate('/contact')}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20 bg-gray-50">                
                <div className="container mx-auto px-4">                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-10 shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-bold">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Email
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                info@clinicflow.com
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-10 shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-bold">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Address
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                123 Medical Center Drive, Healthcare City, HC 12345
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}    

export default ContactPage