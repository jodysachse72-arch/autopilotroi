'use client'

/**
 * PlasmicClientWrapper — Client Component
 *
 * Wraps Plasmic's PlasmicRootProvider (which requires client-side React context)
 * around the server-fetched Plasmic page data.
 *
 * The page.tsx files fetch data on the server, then pass it here for rendering.
 * This is the standard Plasmic + Next.js App Router pattern.
 */

import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'

interface PlasmicClientWrapperProps {
  /** The component/page name or path to render */
  componentName: string
  /** Pre-fetched data from the server */
  prefetchedData: unknown
  /** Page params for dynamic routes */
  pageParams?: Record<string, string>
  /** Search params from the URL */
  pageQuery?: Record<string, string | string[]>
}

export function PlasmicClientWrapper({
  componentName,
  prefetchedData,
  pageParams,
  pageQuery,
}: PlasmicClientWrapperProps) {
  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={prefetchedData as never}
      pageParams={pageParams}
      pageQuery={pageQuery as Record<string, string>}
    >
      <PlasmicComponent component={componentName} />
    </PlasmicRootProvider>
  )
}
