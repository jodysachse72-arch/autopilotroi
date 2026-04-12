/**
 * Funnel analytics — tracks custom events via Plausible.
 * Falls back silently when Plausible isn't loaded (dev/staging).
 * 
 * Usage:
 *   import { trackEvent } from '@/lib/analytics'
 *   trackEvent('signup_started')
 *   trackEvent('quiz_completed', { score: 85, tier: 'advanced' })
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void
  }
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(event, props ? { props } : undefined)
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
}

// ── Pre-defined funnel events ──
export const EVENTS = {
  // Signup funnel
  SIGNUP_PAGE_VIEW: 'signup_page_view',
  SIGNUP_SUBMITTED: 'signup_submitted',
  SIGNUP_RETURNING_USER: 'signup_returning_user',

  // Assessment
  QUIZ_STARTED: 'quiz_started',
  QUIZ_COMPLETED: 'quiz_completed',

  // Waiting room
  WAITING_ROOM_VIEW: 'waiting_room_view',
  VIDEO_WATCHED: 'video_watched',

  // Onboarding
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_STEP_COMPLETED: 'onboarding_step_completed',

  // Conversion
  CTA_CLICKED: 'cta_clicked',
  VIDEO_MODAL_OPENED: 'video_modal_opened',
} as const
