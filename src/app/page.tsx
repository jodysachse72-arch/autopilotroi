import { StaticHomePage } from '@/components/pages/StaticHomePage'
import PuckRenderer from '@/components/builder/PuckRenderer'
import { PageShell } from '@/components/sections'
import type { Metadata } from 'next'
import type { Data } from '@puckeditor/core'
import { createClient } from '@supabase/supabase-js'

// Force dynamic rendering so published edits appear immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

/**
 * Homepage — loads saved Puck data from Supabase if it exists,
 * otherwise falls back to the original StaticHomePage component.
 *
 * This means:
 *  - First deploy: shows the exact same page as before (zero regression)
 *  - After editing in /admin/edit and publishing: shows the edited version
 *  - If no Puck data row exists: automatically reverts to static
 */
async function loadPuckData(): Promise<Data | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('puck_pages')
      .select('data')
      .eq('path', '/')
      .single()

    if (error || !data) return null

    const puckData = data.data as Data
    // Only use Puck data if it has content (not an empty editor save)
    if (puckData.content && puckData.content.length > 0) return puckData
    return null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const puckData = await loadPuckData()

  if (puckData) {
    return <PuckRenderer data={puckData} />
  }

  return <StaticHomePage />
}
