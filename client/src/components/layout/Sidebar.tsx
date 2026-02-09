// client/src/components/layout/Sidebar.tsx

import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";


// import icons from lucide
import {  LayoutDashboard, 
    Users, 
    UserCog, 
    Calendar, 
    FileText, 
    Settings,
    LogOut } from "lucide-react";

// Navigation items
const navItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Patients",
        path: "/patients",
        icon: Users,
    },
    {
        label: "Doctors",
        path: "/doctors",
        icon: UserCog,
    },
    {
        label: "Appointments",
        path: "/appointments",
        icon: Calendar,
    },
    {
        label: "Reports",
        path: "/reports",
        icon: FileText,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: Settings,
    },
];
  
// Function Sidebar
function Sidebar() {
    // dispatch
    const dispatch = useAppDispatch();

    // state
    const user = useAppSelector((state) => state.auth.user);

    // Handle logout
    const handleLogout = () => {
        dispatch(logoutUser());
    };

return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold text-blue-400">
                    ClinicFlow
                </h1>
            </div>
            
            {/* User Info */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                    </div>
                </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            
            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )    
}

    
export default Sidebar;
