// ─────────────────────────────────────────────
// Shared layout content — nav, footer, banner
// ─────────────────────────────────────────────
import type { NavItem } from './types'

export const announcementBanner = {
  emoji: '🏅',
  text: 'Aurum Foundation now live — Gold RWA Trading & Visa Crypto Card',
  ctaLabel: 'Learn more',
  ctaHref: '#',
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Get Started', href: '/start' },
  { label: 'University', href: '/university' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
]

export const brand = {
  name: 'AutoPilot ROI',
  tagline: 'Aurum Onboarding',
  logoHref: '/',
}

export const footer = {
  copyright: '© 2026 Team AutoPilot ROI · Powered by Aurum Foundation',
  links: navItems,
}
