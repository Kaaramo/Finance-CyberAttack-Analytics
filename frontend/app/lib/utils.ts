/**
 * Utility Functions
 * Fonctions de formatage et helpers
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility pour combiner les classes Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formater les montants en millions de dollars
 */
export function formatCurrency(value: number): string {
  return `$${value.toFixed(1)}M`
}

/**
 * Formater les nombres avec séparateurs de milliers
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

/**
 * Formater le temps en heures
 */
export function formatTime(hours: number): string {
  return `${hours.toFixed(1)}h`
}

/**
 * Formater les pourcentages
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
