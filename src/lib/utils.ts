import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names. The standard helper used by shadcn-style components.
 *
 * Why: when you compose components, you sometimes need to pass extra
 * Tailwind classes from the parent. This function merges them intelligently
 * so a child default of `text-sm` is overridden by a parent `text-base`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
