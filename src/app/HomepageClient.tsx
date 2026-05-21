'use client'

/**
 * HomepageClient — CMS-driven or static homepage renderer.
 *
 * Receives Puck JSON data from the parent server component.
 * If data is valid: renders via PuckPageRenderer (Puck <Render>)
 * If data is null/empty: renders StaticHomePage (guaranteed fallback)
 *
 * This is a 'use client' component because PuckPageRenderer requires it,
 * and StaticHomePage uses client-side hooks (useScrollReveal).
 */

import type { Data } from '@puckeditor/core'
import PuckPageRenderer from '@/components/puck/PuckPageRenderer'
import StaticHomePage from './StaticHomePage'

interface Props {
  cmsData: Data | null
}

export default function HomepageClient({ cmsData }: Props) {
  if (cmsData && cmsData.content && cmsData.content.length > 0) {
    return (
      <PuckPageRenderer
        data={cmsData}
        fallback={<StaticHomePage />}
      />
    )
  }
  return <StaticHomePage />
}
