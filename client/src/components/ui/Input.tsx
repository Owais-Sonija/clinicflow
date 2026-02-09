// client/src/components/ui/Input.tsx

import { forwardRef, type InputHTMLAttributes } from "react";

// Reusable input component with different variants
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string; // Optional label for the input
    error?: string; // Error message
}


// forwardRef allows parent to access the input element directly
// This is needed for react-hook-form to work properly
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className={`mb-4`}>
                {/* label */}
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                {/* input field */}
                <input
                    ref={ref}
                    className={`
                        w-full
                        px-3
                        py-2
                        border
                        rounded-lg
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-transparent
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
                        ${className}
                    `}
                    {...props}
                />
                {/* error message */}
                {error && (
                    <p className="text-red-500 text-sm mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

// Set display name for better debugging
Input.displayName = 'Input';

// Export the Input component
export default Input;