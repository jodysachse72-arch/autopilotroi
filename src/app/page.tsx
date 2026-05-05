import { StaticHomePage } from '@/components/pages/StaticHomePage'
import PuckRenderer from '@/components/builder/PuckRenderer'
import { PageShell } from '@/components/sections'
import type { Metadata } from 'next'
import type { Data } from '@puckeditor/core'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

/**
 * Homepage — loads saved Puck data if it exists, otherwise falls back
 * to the original StaticHomePage component.
 *
 * This means:
 *  - First deploy: shows the exact same page as before (zero regression)
 *  - After editing in /admin/edit and publishing: shows the edited version
 *  - If the Puck data file is deleted: automatically reverts to static
 */
async function loadPuckData(): Promise<Data | null> {
  const filePath = join(process.cwd(), 'puck-data', 'index.json')
  if (!existsSync(filePath)) return null

  try {
    const raw = await readFile(filePath, 'utf-8')
    const data = JSON.parse(raw) as Data
    // Only use Puck data if it has content (not an empty editor save)
    if (data.content && data.content.length > 0) return data
    return null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const puckData = await loadPuckData()

  if (puckData) {
    return (
      <PageShell>
        <PuckRenderer data={puckData} />
      </PageShell>
    )
  }

  return <StaticHomePage />
}
