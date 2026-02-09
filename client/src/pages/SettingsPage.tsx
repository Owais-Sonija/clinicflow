// client/src/pages/SettingsPage.tsx

import { useState } from 'react'
import { User, Lock, Bell, Shield } from 'lucide-react'
import { useAppSelector } from '../app/hooks'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Alert from '../components/ui/Alert'

function SettingsPage() {
    const { user } = useAppSelector((state) => state.auth)
    const [activeTab, setActiveTab] = useState('profile')
    const [isSaving, setIsSaving] = useState(false)
    const [success, setSuccess] = useState('')

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(''), 3000)
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setSuccess('Password changed successfully!')
        setTimeout(() => setSuccess(''), 3000)
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ]

    return (
        <div>
            <Header title="Settings" />

            <div className="p-6">
                {success && <Alert type="success" message={success} />}

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-4">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon size={20} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Profile Information
                                </h2>
                                <form onSubmit={handleProfileSubmit} className="space-y-6">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <Button type="button" variant="secondary">
                                                Change Photo
                                            </Button>
                                            <p className="text-sm text-gray-500 mt-2">
                                                JPG, PNG or GIF. Max 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Input
                                            label="Full Name"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>

                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                    />

                                    <div className="flex justify-end">
                                        <Button type="submit" isLoading={isSaving}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        )}

                        {activeTab === 'password' && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Change Password
                                </h2>
                                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                        required
                                    />
                                    <Input
                                        label="New Password"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                        required
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        required
                                    />

                                    <Button type="submit" isLoading={isSaving}>
                                        Update Password
                                    </Button>
                                </form>
                            </Card>
                        )}

                        {activeTab === 'notifications' && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Notification Preferences
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Email notifications', desc: 'Receive email about your appointments' },
                                        { label: 'SMS notifications', desc: 'Get text messages for reminders' },
                                        { label: 'Appointment reminders', desc: 'Remind me 24 hours before appointment' },
                                        { label: 'Marketing emails', desc: 'Receive news and updates' },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.label}</p>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {activeTab === 'security' && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Security Settings
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <h3 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Add an extra layer of security to your account
                                        </p>
                                        <Button variant="secondary">
                                            Enable 2FA
                                        </Button>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <h3 className="font-medium text-gray-800 mb-2">Active Sessions</h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Manage your active sessions across devices
                                        </p>
                                        <Button variant="secondary">
                                            View Sessions
                                        </Button>
                                    </div>

                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                        <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
                                        <p className="text-sm text-red-600 mb-4">
                                            Permanently delete your account and all data
                                        </p>
                                        <Button variant="danger">
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage