/**
 * Homepage — CMS-first, ISR, static fallback.
 *
 * Rendering strategy:
 *   1. Server component fetches homepage Puck JSON from Supabase
 *      using the anon read client (RLS allows public reads).
 *   2. Passes data to HomepageClient:
 *      - CMS data valid  → PuckPageRenderer (Puck <Render>)
 *      - CMS data absent → StaticHomePage  (guaranteed JSX fallback)
 *
 * ISR: revalidate = 60 seconds.
 *   The homepage is cached at the CDN edge and re-generated every 60s.
 *   Barry publishes → live within 60 seconds — no manual deploys needed.
 *
 * NEVER:
 *   - Block render on CMS failure
 *   - White-screen if Supabase is down
 *   - Require a full redeploy to update homepage content
 *
 * SEO:
 *   All metadata is declared here in the server component.
 *   It is included in the static HTML shell regardless of which
 *   renderer (Puck or static) runs at hydration time.
 */

import type { Metadata } from 'next'
import type { Data } from '@puckeditor/core'
import { createClient } from '@supabase/supabase-js'
import HomepageClient from './HomepageClient'

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

// ── ISR ──────────────────────────────────────────────────────────

export const revalidate = 60

// ── CMS Data Fetcher ─────────────────────────────────────────────
// Reads directly from Supabase — avoids an internal HTTP round-trip
// to /api/puck (which would add latency and a potential timeout).

async function fetchHomepageCmsData(): Promise<Data | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null

    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('puck_pages')
      .select('data')
      .eq('path', '/')
      .single()

    if (error || !data?.data) return null

    const puckData = data.data as Data
    // Validate: must have at least one content block
    if (!puckData?.content || puckData.content.length === 0) return null

    return puckData
  } catch {
    return null
  }
}

// ── Page Component ────────────────────────────────────────────────

export default async function HomePage() {
  const cmsData = await fetchHomepageCmsData()
  return <HomepageClient cmsData={cmsData} />
}
