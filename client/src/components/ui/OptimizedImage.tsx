// client/src/components/ui/OptimizedImage.tsx

import { useState } from 'react'
import { cn } from '../../lib/utils'
import { Skeleton } from './Skeleton'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback,
  aspectRatio = 'auto'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError && fallback) {
    return (
      <div className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800', aspectRatios[aspectRatio], className)}>
        <img
          src={fallback}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400',
        aspectRatios[aspectRatio],
        className
      )}>
        <span className="text-4xl">📷</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', aspectRatios[aspectRatio], className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  )
}