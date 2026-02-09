// client/src/components/layout/DashboardLayout.tsx

import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

// The dashboard layout component
function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout;