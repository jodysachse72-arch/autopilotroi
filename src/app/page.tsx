/**
 * Home Page
 *
 * When Plasmic is configured: renders the Plasmic-managed homepage.
 * Barry edits it at studio.plasmic.app → Pages → Home (/)
 *
 * Until Plasmic is set up: renders the existing static homepage.
 */

import { StaticHomePage } from '@/components/pages/StaticHomePage'
import { PlasmicPageContent } from '@/components/builder/PlasmicPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

const isConfigured =
  !!process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID &&
  process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID !== 'PASTE_YOUR_PROJECT_ID'

export default function HomePage() {
  if (!isConfigured) {
    return <StaticHomePage />
  }

  return (
    <PlasmicPageContent
      path="/"
      fallback={<StaticHomePage />}
    />
  )
}
