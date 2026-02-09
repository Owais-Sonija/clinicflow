// client/src/components/ui/Button.tsx

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  children: ReactNode
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md',
    children, 
    isLoading = false, 
    leftIcon,
    rightIcon,
    disabled, 
    className = '', 
    ...props 
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-[0.98]'
    )

    const variants = {
      primary: cn(
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
      ),
      secondary: cn(
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'focus:ring-secondary'
      ),
      outline: cn(
        'border-2 border-primary text-primary bg-transparent',
        'hover:bg-primary hover:text-primary-foreground focus:ring-primary'
      ),
      ghost: cn(
        'bg-transparent hover:bg-accent hover:text-accent-foreground',
        'focus:ring-accent'
      ),
      danger: cn(
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'focus:ring-destructive shadow-lg shadow-destructive/25'
      ),
      success: cn(
        'bg-green-600 text-white hover:bg-green-700',
        'focus:ring-green-500 shadow-lg shadow-green-600/25'
      ),
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm rounded-lg',
      md: 'h-10 px-4 text-sm rounded-xl',
      lg: 'h-12 px-6 text-base rounded-xl',
      icon: 'h-10 w-10 rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button