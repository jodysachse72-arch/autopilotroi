/**
 * Lightweight A/B testing utility.
 * Uses a cookie-based bucketing system for consistent user experiences.
 * Tracks variant exposure via Plausible custom events.
 *
 * Usage:
 *   const variant = useExperiment('cta_copy', ['Start Here', 'Take the Quiz', 'See Your Score'])
 *   // variant = one of the options, consistent per user
 */

import { trackEvent } from './analytics'

const COOKIE_PREFIX = 'ab_'

/**
 * Get or assign a variant for an experiment.
 * Uses cookie for persistence so the same user always sees the same variant.
 */
export function getVariant<T extends string>(experimentName: string, variants: T[]): T {
  if (typeof window === 'undefined') return variants[0]

  const cookieKey = `${COOKIE_PREFIX}${experimentName}`

  // Check existing assignment
  const existing = getCookie(cookieKey)
  if (existing && variants.includes(existing as T)) {
    return existing as T
  }

  // Assign randomly
  const selected = variants[Math.floor(Math.random() * variants.length)]
  setCookie(cookieKey, selected, 30) // 30-day persistence

  // Track exposure
  trackEvent('experiment_exposed', {
    experiment: experimentName,
    variant: selected,
  })

  return selected
}

/**
 * Track conversion for an experiment.
 */
export function trackConversion(experimentName: string) {
  const cookieKey = `${COOKIE_PREFIX}${experimentName}`
  const variant = getCookie(cookieKey)

  if (variant) {
    trackEvent('experiment_converted', {
      experiment: experimentName,
      variant,
    })
  }
}

// ── Cookie helpers ──
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 86400000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}
