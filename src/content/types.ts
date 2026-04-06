// ─────────────────────────────────────────────
// Shared content types for AutoPilot ROI
// CMS-ready: mirrors future Supabase schema
// ─────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface StatItem {
  value: string
  label: string
}

export interface AdvantageCard {
  id: string
  icon: string
  title: string
  body: string
  badge?: string
}

export interface JourneyStep {
  number: string
  title: string
  body: string
}

export interface TeamBenefit {
  icon: string
  title: string
  body: string
}

export interface Testimonial {
  initials: string
  name: string
  location: string
  quote: string
}

export interface OnboardingStep {
  id: number
  symbol: string
  title: string
  subtitle: string
  status: 'complete' | 'current' | 'locked'
  why?: string
  warning?: string
  tip?: string
  link?: { label: string; href: string }
  instructions: { text: string; warning?: string; tip?: string }[]
  resources?: ResourceLink[]
  videoLabel?: string
  videoNote?: string
}

export interface ResourceLink {
  icon: string
  type: string
  duration?: string
  title: string
  source: string
  href: string
  badge?: string
  note?: string
}

export interface ResourceSection {
  id: string
  icon: string
  label: string
  title: string
  count: number
  description: string
  updatedDate?: string
  resources: ResourceLink[]
}

export interface SocialChannel {
  icon: string
  platform: string
  handle: string
  href: string
}

export interface BackOfficeLink {
  icon: string
  title: string
  href: string
}
