// client/src/lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============ CLASS NAME UTILITY ============

/**
 * Merge class names with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ============ DATE UTILITIES ============

/**
 * Format date with options
 */
export function formatDate(
    date: string | Date, 
    options?: Intl.DateTimeFormatOptions
): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Format date in short format
 */
export function formatDateShort(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/**
 * Format time
 */
export function formatTime(date: string | Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDateShort(date);
}

// ============ STRING UTILITIES ============

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
    if (!name) return '?';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Truncate text to specified length
 */
export function truncate(str: string, length: number): string {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ============ AVATAR UTILITIES ============

/**
 * Generate consistent avatar color based on name
 */
export function getAvatarColor(name: string): string {
    if (!name) return 'bg-gray-500';
    
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-cyan-500',
        'bg-rose-500',
        'bg-emerald-500',
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

// ============ NUMBER UTILITIES ============

/**
 * Format number as currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
}

// ============ GENERAL UTILITIES ============

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

/**
 * Generate random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
}

/**
 * Check if value is defined
 */
export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}