// client/src/components/layout/Sidebar.tsx

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import { useToast } from '../../context/ToastContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';
import { BarChart3 } from 'lucide-react';



// ============ ICONS ============
import {
    LayoutDashboard,
    Users,
    UserCog,
    Calendar,
    FileText,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Home
} from 'lucide-react';

// ============ NAVIGATION CONFIG ============
const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Patients', path: '/patients', icon: Users },
    { label: 'Doctors', path: '/doctors', icon: UserCog },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Settings', path: '/settings', icon: Settings },
];

// ============ SIDEBAR COMPONENT ============
function Sidebar() {
    // Hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { success } = useToast();
    
    // State
    const user = useAppSelector((state) => state.auth.user);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // ============ HANDLERS ============
    const handleLogout = async () => {
        await dispatch(logoutUser());
        success('Logged Out', 'You have been successfully logged out.');
        navigate('/login');
    };

    // ============ RENDER ============
    return (
        <aside
            className={cn(
                'h-screen sticky top-0 flex flex-col',
                'bg-sidebar-background border-r border-sidebar-border',
                'transition-all duration-300 ease-in-out',
                isCollapsed ? 'w-20' : 'w-64'
            )}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-between px-4 border-b border-sidebar-border">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-sidebar-foreground">Clinic</span>
                            <span className="text-lg font-bold text-blue-600">Flow</span>
                        </div>
                    </div>
                )}
                
                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        'p-2 rounded-lg transition-colors',
                        'hover:bg-sidebar-accent text-sidebar-foreground',
                        isCollapsed && 'mx-auto'
                    )}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* User Info Section */}
            <div className={cn(
                'p-4 border-b border-sidebar-border',
                isCollapsed && 'flex justify-center'
            )}>
                <div className={cn(
                    'flex items-center gap-3',
                    isCollapsed && 'flex-col'
                )}>
                    <Avatar name={user?.name || 'User'} size="md" />
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sidebar-foreground truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-sidebar-foreground/60 capitalize">
                                {user?.role}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 p-3 overflow-y-auto no-scrollbar">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                                        'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                                        'hover:bg-sidebar-accent',
                                        isActive && [
                                            'bg-blue-600 text-white',
                                            'hover:bg-blue-700 hover:text-white',
                                            'shadow-lg shadow-blue-600/25'
                                        ],
                                        isCollapsed && 'justify-center px-2'
                                    )
                                }
                                title={isCollapsed ? item.label : undefined}
                            >
                                <item.icon size={20} />
                                {!isCollapsed && (
                                    <span className="font-medium">{item.label}</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer Section */}
            <div className="p-3 border-t border-sidebar-border space-y-2">
                {/* Back to Website */}
                <NavLink
                    to="/"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-all',
                        'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                        isCollapsed && 'justify-center px-2'
                    )}
                    title={isCollapsed ? 'Back to Website' : undefined}
                >
                    <Home size={20} />
                    {!isCollapsed && <span className="font-medium">Back to Website</span>}
                </NavLink>

                {/* Theme Toggle */}
                <div className={cn(
                    'flex items-center gap-3 px-3 py-2',
                    isCollapsed && 'justify-center'
                )}>
                    <ThemeToggle />
                    {!isCollapsed && (
                        <span className="text-sm text-sidebar-foreground/70">Theme</span>
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-all',
                        'text-sidebar-foreground/70',
                        'hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50',
                        isCollapsed && 'justify-center px-2'
                    )}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;