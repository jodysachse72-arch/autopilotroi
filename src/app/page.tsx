/**
 * Home Page — Server Component
 *
 * When Plasmic has a published page at "/":
 *   → renders the Plasmic-managed homepage (SSR, fast, SEO-friendly)
 *
 * When Plasmic has no page at "/":
 *   → renders the existing static homepage (zero-regression fallback)
 *
 * Barry edits the homepage at studio.plasmic.app → Pages → Home (/)
 */

import { PLASMIC_SERVER } from '@/plasmic-init-server'
import { StaticHomePage } from '@/components/pages/StaticHomePage'
import { PlasmicClientWrapper } from '@/components/builder/PlasmicClientWrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

export default async function HomePage() {
  // Attempt to fetch Plasmic page data for "/" on the server
  try {
    const plasmicData = await PLASMIC_SERVER.maybeFetchComponentData('/')

    if (plasmicData && plasmicData.entryCompMetas?.length > 0) {
      const pageMeta = plasmicData.entryCompMetas[0]
      return (
        <PlasmicClientWrapper
          componentName={pageMeta.displayName}
          prefetchedData={plasmicData}
        />
      )
    }
  } catch {
    // Plasmic fetch failed — fall through to static fallback
  }

  // Fallback: render the existing static homepage
  return <StaticHomePage />
}
