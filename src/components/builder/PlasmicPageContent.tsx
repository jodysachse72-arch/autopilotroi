'use client'

/**
 * PlasmicPageContent — Client Component
 *
 * Handles all Plasmic interactions on the browser side.
 * The server page (page.tsx) simply renders this component,
 * passing the URL path. Everything Plasmic happens here.
 *
 * Why client-only:
 * Plasmic's initPlasmicLoader uses browser APIs to communicate
 * with the studio iframe for live editing. It cannot run server-side.
 */

import { useEffect, useState } from 'react'
import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'
import { registerAllComponents } from '@/components/builder/plasmicComponents'

// Register custom blocks once
registerAllComponents(PLASMIC)

interface PlasmicPageContentProps {
  /** The URL path to fetch from Plasmic, e.g. "/" or "/about" */
  path: string
  /** Rendered when Plasmic has no page for this path */
  fallback: React.ReactNode
}

export function PlasmicPageContent({ path, fallback }: PlasmicPageContentProps) {
  const [plasmicData, setPlasmicData] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    PLASMIC.maybeFetchComponentData(path)
      .then((data) => {
        setPlasmicData(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [path])

  // Still fetching
  if (loading) return null

  // No Plasmic page for this path → show static fallback
  if (!plasmicData) return <>{fallback}</>

  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData as never}>
      <PlasmicComponent component={path} />
    </PlasmicRootProvider>
  )
}
