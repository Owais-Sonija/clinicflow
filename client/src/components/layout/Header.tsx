// client/src/components/layout/Header.tsx

// Current: Static search input
// Will fix later when we add global search
// For now, add this comment:

{/* TODO: Implement global search */}

import { Bell, Search } from "lucide-react";
import { useAppSelector } from "../../app/hooks";

// Interface for the header component
interface HeaderProps {
  // The header component
  title: string;
}

// The header component
function Header({title}: HeaderProps) {
  // user state
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
