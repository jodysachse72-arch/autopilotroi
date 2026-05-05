/**
 * Plasmic Catch-All Page — Server Component
 *
 * This route handles ANY path that doesn't have a dedicated route file.
 * When Plasmic has a published page at that path → renders it with SSR.
 * When Plasmic has NO page → returns 404.
 *
 * Existing routes (/blog, /calculator, /contact, /dashboard, etc.)
 * have their own page.tsx files and take precedence over this catch-all.
 * This only fires for paths without dedicated route files.
 *
 * Example: Barry creates a "/pricing" page in Plasmic Studio → publishes
 * → autopilotroi.vercel.app/pricing renders it automatically.
 */

import { notFound } from 'next/navigation'
import { PLASMIC_SERVER } from '@/plasmic-init-server'
import { PlasmicClientWrapper } from '@/components/builder/PlasmicClientWrapper'
import type { Metadata } from 'next'

// Dynamic rendering — Plasmic pages may change anytime Barry publishes
export const dynamic = 'force-dynamic'

interface CatchAllPageProps {
  params: Promise<{ catchall: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const path = '/' + resolvedParams.catchall.join('/')

  try {
    const data = await PLASMIC_SERVER.maybeFetchComponentData(path)
    if (data && data.entryCompMetas?.length > 0) {
      const meta = data.entryCompMetas[0]
      return {
        title: meta.displayName || 'AutopilotROI',
      }
    }
  } catch {
    // Fall through to defaults
  }

  return {}
}

export default async function PlasmicCatchAllPage({ params, searchParams }: CatchAllPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const path = '/' + resolvedParams.catchall.join('/')

  try {
    const plasmicData = await PLASMIC_SERVER.maybeFetchComponentData(path)

    if (plasmicData && plasmicData.entryCompMetas?.length > 0) {
      const pageMeta = plasmicData.entryCompMetas[0]
      return (
        <PlasmicClientWrapper
          componentName={pageMeta.displayName}
          prefetchedData={plasmicData}
          pageParams={pageMeta.params}
          pageQuery={resolvedSearchParams}
        />
      )
    }
  } catch {
    // Plasmic fetch failed — treat as not found
  }

  // No Plasmic page for this path → 404
  notFound()
}
