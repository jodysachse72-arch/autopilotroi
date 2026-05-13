/**
 * getPuckMetadata — Shared utility for extracting SEO metadata from Puck page data.
 * loadPuckPage     — Shared utility for fetching Puck page content for rendering.
 *
 * Both read directly from Supabase (server-side), replacing the fragile
 * self-HTTP `getPuckData()` pattern that was duplicated across every page file.
 *
 * Usage — generateMetadata:
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return getPuckMetadata('/products', { title: 'Products | AutopilotROI' })
 *   }
 *
 * Usage — page rendering:
 *   export default async function ProductsPage() {
 *     const puckData = await loadPuckPage('/products')
 *     if (puckData) return <PuckRenderer data={puckData} />
 *     return <StaticProductsPage />
 *   }
 */

import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import type { Data } from '@puckeditor/core'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PuckRootProps {
  title?:          string
  description?:    string
  ogTitle?:        string
  ogDescription?:  string
  ogImage?:        string
  noindex?:        boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal Supabase fetch — returns full Puck Data (server-side only)
// ─────────────────────────────────────────────────────────────────────────────

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

async function fetchPuckData(path: string): Promise<Data | null> {
  try {
    const { data, error } = await getSupabaseClient()
      .from('puck_pages')
      .select('data')
      .eq('path', path)
      .single()

    if (error || !data?.data) return null
    return data.data as Data
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Sitewide defaults
// ─────────────────────────────────────────────────────────────────────────────

const SITE_DEFAULTS = {
  title:       'AutopilotROI | AI-Driven Finance',
  description: 'AutopilotROI is the structured onboarding platform for AI-managed finance — trading bots, crypto cards, exchange, and a Web3 neobank.',
  ogImage:     '/og-image.png',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches the saved Puck page data for rendering.
 * Returns null if no data exists → page should fall back to its static component.
 *
 * Replaces the copy-pasted `getPuckData()` + self-HTTP pattern in every page file.
 * Direct Supabase call — no internal HTTP round-trip, no host detection needed.
 */
export async function loadPuckPage(path: string): Promise<Data | null> {
  const puckData = await fetchPuckData(path)
  if (!puckData) return null
  // Only use Puck data if it has actual content blocks
  if (!puckData.content || puckData.content.length === 0) return null
  return puckData
}

/**
 * Returns a Next.js Metadata object for a given Puck-managed page path.
 * Falls back to per-page fallback → sitewide defaults when fields are empty.
 *
 * @param path     The page path, e.g. '/', '/products', '/faqs'
 * @param fallback Hardcoded fallback for this specific page (overrides sitewide defaults)
 */
export async function getPuckMetadata(
  path: string,
  fallback?: Partial<PuckRootProps>,
): Promise<Metadata> {
  const puckData  = await fetchPuckData(path)
  const rootProps = (puckData?.root?.props as PuckRootProps | undefined) ?? null

  // Merge priority: Puck editor → per-page fallback → sitewide defaults
  const title       = rootProps?.title         || fallback?.title         || SITE_DEFAULTS.title
  const description = rootProps?.description   || fallback?.description   || SITE_DEFAULTS.description
  const ogTitle     = rootProps?.ogTitle       || fallback?.ogTitle       || title
  const ogDesc      = rootProps?.ogDescription || fallback?.ogDescription || description
  const ogImage     = rootProps?.ogImage       || fallback?.ogImage       || SITE_DEFAULTS.ogImage
  const noindex     = rootProps?.noindex       ?? fallback?.noindex       ?? false

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

  return {
    title,
    description,
    robots: {
      index:  !noindex,
      follow: !noindex,
    },
    openGraph: {
      type:        'website',
      siteName:    'AutopilotROI',
      title:       ogTitle,
      description: ogDesc,
      url:         `${siteUrl}${path}`,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
        : undefined,
    },
    twitter: {
      card:        'summary_large_image',
      title:       ogTitle,
      description: ogDesc,
      images:      ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
  }
}
