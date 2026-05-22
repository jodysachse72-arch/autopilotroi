/**
 * Homepage — Direct static render.
 *
 * Renders the approved beautiful frontend directly via StaticHomePage.
 * No CMS, no Puck, no Supabase dependency.
 *
 * SEO:
 *   All metadata is declared here in the server component.
 */

import type { Metadata } from 'next'
import StaticHomePage from './StaticHomePage'

// ── SEO Metadata ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'AutoPilotROI — AI-Powered Finance Onboarding',
  description:
    'AutoPilotROI guides you into the Aurum ecosystem — AI-powered crypto trading bot, Visa crypto card, exchange, and Web3 neobank. Start with $100 USDT.',
  openGraph: {
    title: 'AutoPilotROI — Your Money, Working 24/7',
    description:
      'Join thousands of members earning with the Aurum AI trading bot. Guided onboarding. No experience needed. Start with $100.',
    type: 'website',
    url: 'https://autopilotroi.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoPilotROI — AI-Powered Finance Onboarding',
    description:
      'AI crypto trading bot + Visa card + neobank. Start with $100. No experience needed.',
  },
}

// ── Page Component ────────────────────────────────────────────────

export default function HomePage() {
  return <StaticHomePage />
}
