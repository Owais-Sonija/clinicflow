// client/src/components/ui/Card.tsx

import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

// ============ TYPES ============
interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient' | 'outline';
    hover?: boolean;
    onClick?: () => void;
}

interface CardSubComponentProps {
    children: ReactNode;
    className?: string;
}

// ============ VARIANT STYLES ============
const variants = {
    default: 'bg-card border border-border shadow-sm',
    glass: 'glass-card',
    gradient: 'bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10',
    outline: 'bg-transparent border-2 border-border',
};

// ============ CARD COMPONENT ============
function Card({ 
    children, 
    className, 
    variant = 'default', 
    hover = false, 
    onClick 
}: CardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'rounded-2xl transition-all duration-300',
                variants[variant],
                hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
                onClick && 'cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
}

// ============ CARD SUB-COMPONENTS ============

function CardHeader({ children, className }: CardSubComponentProps) {
    return (
        <div className={cn('px-6 py-4 border-b border-border', className)}>
            {children}
        </div>
    );
}

function CardContent({ children, className }: CardSubComponentProps) {
    return (
        <div className={cn('p-6', className)}>
            {children}
        </div>
    );
}

function CardFooter({ children, className }: CardSubComponentProps) {
    return (
        <div className={cn('px-6 py-4 border-t border-border bg-muted/30', className)}>
            {children}
        </div>
    );
}

function CardTitle({ children, className }: CardSubComponentProps) {
    return (
        <h3 className={cn('text-lg font-semibold text-foreground', className)}>
            {children}
        </h3>
    );
}

function CardDescription({ children, className }: CardSubComponentProps) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)}>
            {children}
        </p>
    );
}

// ============ EXPORTS ============
export default Card;
export { CardHeader, CardContent, CardFooter, CardTitle, CardDescription };