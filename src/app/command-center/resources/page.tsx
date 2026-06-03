import { Suspense } from 'react'
import { getPublishedResourcesServer } from '@/lib/cms/server-adapter'
import ResourceLibraryClient from './ResourceLibraryClient'

/* ─────────────────────────────────────────────────────────────────
   RESOURCE LIBRARY — server component

   Fetches published, non-archived resources via the PCC-1
   server adapter (SSR cookie-aware client), then hands the data
   to ResourceLibraryClient for client-side search + filtering.

   This page is PARTNER-GATED — never public. The middleware at
   src/lib/supabase/middleware.ts enforces role='partner'|'admin'.
   ───────────────────────────────────────────────────────────────── */

export const metadata = {
  title: 'Resource Library | Command Center',
}

// Loading skeleton while resources stream in
function ResourcesSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-10 rounded-lg animate-pulse" style={{ background: '#e0e2e6' }} />
      <div className="h-6 w-48 rounded animate-pulse" style={{ background: '#e0e2e6' }} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="be-card h-36 animate-pulse" style={{ background: '#f0f2f7' }} />
        ))}
      </div>
    </div>
  )
}

async function ResourceLibraryContent() {
  const resources = await getPublishedResourcesServer()

  return (
    <ResourceLibraryClient resources={resources} />
  )
}

export default function ResourceLibraryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* ── Page header ── */}
      <div className="space-y-1">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: '#181d26' }}
        >
          Resource Library
        </h2>
        <p className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          All partner resources — search, filter by category or type, click to open.
        </p>
      </div>

      {/* ── Content (streaming) ── */}
      <Suspense fallback={<ResourcesSkeleton />}>
        <ResourceLibraryContent />
      </Suspense>
    </div>
  )
}
