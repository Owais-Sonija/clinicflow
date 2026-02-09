// client/src/components/ui/Card.tsx

import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
}

function Card({ children, className, variant = 'default', hover = false }: CardProps) {
  const variants = {
    default: 'bg-card border border-border',
    glass: 'glass-card',
    gradient: 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20',
  }

  return (
    <div
      className={cn(
        'rounded-2xl shadow-sm',
        variants[variant],
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

// Card Header
function CardHeader({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-border', className)}>
      {children}
    </div>
  )
}

// Card Content
function CardContent({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

// Card Footer
function CardFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-border', className)}>
      {children}
    </div>
  )
}

export default Card
export { CardHeader, CardContent, CardFooter }