/**
 * Home Page — powered by Builder.io visual editor
 *
 * Barry edits this page at: https://builder.io → Pages → Home (/)
 * He sees the real site, clicks any element, and types.
 *
 * HOW IT WORKS:
 * - Server fetches the "page" model from Builder.io with urlPath="/"
 * - BuilderPageContent renders it (enables visual editing iframe)
 * - If Builder.io is not yet configured, falls back to the static layout below
 */

import { fetchOneEntry, getBuilderSearchParams, isPreviewing } from '@builder.io/sdk-react'
import { BuilderPageContent } from '@/components/builder/BuilderContent'
import { StaticHomePage } from '@/components/pages/StaticHomePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutopilotROI — Your AI-Powered Finance Onboarding Platform',
  description:
    'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
}

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY

interface HomePageProps {
  searchParams: Promise<Record<string, string>>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearch = await searchParams
  const isConfigured =
    BUILDER_API_KEY && BUILDER_API_KEY !== 'PASTE_YOUR_KEY_HERE' && BUILDER_API_KEY.length > 10

  // If Builder.io is configured, fetch from the cloud editor
  if (isConfigured) {
    const content = await fetchOneEntry({
      model: 'page',
      apiKey: BUILDER_API_KEY!,
      options: getBuilderSearchParams(resolvedSearch),
      userAttributes: { urlPath: '/' },
    })

    // In Builder.io preview mode OR if content exists → render it
    if (content || isPreviewing()) {
      return <BuilderPageContent content={content} />
    }
  }

  // Fallback: render the static homepage until Barry builds it in Builder.io
  return <StaticHomePage />
}
