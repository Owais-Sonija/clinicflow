// client/src/components/ui/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";

// Reusable button component with different variants

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'; // Different button styles
    children: ReactNode; // Button label or content
    isLoading?: boolean; // Loading state
    fullWidth?: boolean; // Full width button
}

// Button function component
function Button({
    variant = 'primary',
    children,
    isLoading = false,
    fullWidth = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
     // Base styles (always applied)
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

      // Variant styles (changes based on variant prop)
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }
    
    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                // Loading spinner
                <span className="flex items-center justify-center">
                    <svg 
                        className="animate-spin h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    Loading...
                </span>
            )  : (
 <span className="flex items-center justify-center gap-2">
        {children}
    </span>
            )}
        </button>
    );
}

// Export Button component
export default Button;