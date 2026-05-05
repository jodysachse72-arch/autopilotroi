'use client'

/**
 * PlasmicPageContent — Client Component (legacy compatibility)
 *
 * This component renders a Plasmic-managed page by path.
 * It fetches Plasmic data client-side and falls back to the provided
 * static content if Plasmic has no page for the given path.
 *
 * NOTE: For new pages, prefer the SSR approach in [[...catchall]]/page.tsx
 * which fetches data on the server. This component is kept for backward
 * compatibility with pages that already use it.
 */

import { useEffect, useState } from 'react'
import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'

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
