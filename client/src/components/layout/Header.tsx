// client/src/components/layout/Header.tsx

import { Bell, Search } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

// ============ TYPES ============
interface HeaderProps {
    title: string;
    subtitle?: string;
}

// ============ HEADER COMPONENT ============
function Header({ title, subtitle }: HeaderProps) {
    // Redux state
    const { user } = useAppSelector((state) => state.auth);

    // ============ RENDER ============
    return (
        <header className="sticky top-0 z-40 glass border-b border-border">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left Section - Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative hidden md:block">
                            <Search 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                                size={18} 
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={cn(
                                    'w-64 h-10 pl-10 pr-4 rounded-xl',
                                    'bg-muted/50 border-0',
                                    'text-foreground placeholder:text-muted-foreground',
                                    'focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background',
                                    'transition-all duration-200'
                                )}
                            />
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <button 
                            className={cn(
                                'relative p-2.5 rounded-xl transition-colors',
                                'hover:bg-muted'
                            )}
                            title="Notifications"
                        >
                            <Bell size={20} className="text-muted-foreground" />
                            <span className={cn(
                                'absolute top-2 right-2 w-2 h-2',
                                'bg-red-500 rounded-full',
                                'ring-2 ring-background'
                            )} />
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-3 border-l border-border">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-foreground">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                    {user?.role}
                                </p>
                            </div>
                            <Avatar name={user?.name || 'User'} size="md" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;