'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { EmptyState, FilterPill, StatusBadge } from '@/components/backend'
import type { CmsPost } from '@/lib/cms/types'

/* ─────────────────────────────────────────────────────────────────
   RESOURCE LIBRARY CLIENT
   Receives server-rendered resources, applies client-side search
   + category + type filters (URL-synced for deep-linking from
   the Start Here shortcut cards).
   ───────────────────────────────────────────────────────────────── */

// ── Type icons ─────────────────────────────────────────────────
const TYPE_ICON: Record<string, string> = {
  video: '🎬',
  pdf:   '📄',
  link:  '🔗',
  doc:   '📝',
}
const TYPE_LABEL: Record<string, string> = {
  video: 'Video',
  pdf:   'PDF',
  link:  'Link',
  doc:   'Doc',
}

// ── Helpers ────────────────────────────────────────────────────
function getMeta(post: CmsPost, key: string): string {
  return ((post.meta as Record<string, unknown>)?.[key] as string) ?? ''
}
function getMetaBool(post: CmsPost, key: string): boolean {
  return !!((post.meta as Record<string, unknown>)?.[key])
}
function formatDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

// ── Resource Card ─────────────────────────────────────────────

function ResourceCard({ post }: { post: CmsPost }) {
  const url          = getMeta(post, 'url')
  const resourceType = getMeta(post, 'resource_type')
  const category     = getMeta(post, 'category')
  const metaStatus   = getMeta(post, 'status')   // resource lifecycle status
  const official     = getMetaBool(post, 'official')
  const lastVerified = getMeta(post, 'last_verified')
  const description  = getMeta(post, 'description')

  const isFeatured    = metaStatus === 'featured'
  const isNeedsReview = metaStatus === 'needs_review'
  const isBroken      = metaStatus === 'broken'

  function handleOpen() {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleOpen}
      disabled={!url}
      className="be-card be-card--interactive text-left w-full flex flex-col gap-3"
      style={{ cursor: url ? 'pointer' : 'default' }}
      aria-label={`Open ${post.title ?? 'resource'}`}
    >
      {/* ── Top row: type icon + title + badges ── */}
      <div className="flex items-start gap-3">
        {/* Type icon bubble */}
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
          style={{ background: 'rgba(16,185,129,0.10)' }}
          aria-hidden
        >
          {TYPE_ICON[resourceType] ?? '📦'}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
            <span className="text-sm font-semibold leading-snug" style={{ color: '#181d26' }}>
              {post.title ?? '(untitled)'}
            </span>
            {isFeatured && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#b45309' }}
                title="Featured resource"
              >
                ⭐ Featured
              </span>
            )}
            {official && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: 'rgba(16,185,129,0.12)', color: '#047857' }}
                title="Official AutopilotROI resource"
              >
                ✓ Official
              </span>
            )}
            {isNeedsReview && (
              <StatusBadge tone="amber">Needs Review</StatusBadge>
            )}
            {isBroken && (
              <StatusBadge tone="red">Broken</StatusBadge>
            )}
          </div>

          {/* Category + type pills */}
          <div className="flex flex-wrap gap-1.5">
            {category && (
              <span
                className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium"
                style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}
              >
                {category}
              </span>
            )}
            {resourceType && (
              <span
                className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium"
                style={{ background: 'rgba(4,14,32,0.06)', color: 'rgba(4,14,32,0.55)' }}
              >
                {TYPE_ICON[resourceType]} {TYPE_LABEL[resourceType] ?? resourceType}
              </span>
            )}
          </div>
        </div>

        {/* External link arrow */}
        {url && (
          <span className="shrink-0 text-sm" style={{ color: 'rgba(4,14,32,0.3)' }} aria-hidden>↗</span>
        )}
      </div>

      {/* ── Description ── */}
      {description && (
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(4,14,32,0.6)' }}>
          {description}
        </p>
      )}

      {/* ── Footer: last verified ── */}
      {lastVerified && (
        <p className="text-[10px] mt-auto" style={{ color: 'rgba(4,14,32,0.35)' }}>
          Verified {formatDate(lastVerified)}
        </p>
      )}
    </button>
  )
}

// ── Main Client Component ─────────────────────────────────────

interface ResourceLibraryClientProps {
  resources: CmsPost[]
}

export default function ResourceLibraryClient({ resources }: ResourceLibraryClientProps) {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const pathname     = usePathname()

  // ── State initialised from URL params (for Start Here deep-links) ──
  const [query,    setQuery]    = useState(() => searchParams.get('q') ?? '')
  const [category, setCategory] = useState(() => searchParams.get('category') ?? 'all')
  // type param may be comma-separated (e.g. "video,pdf") — we pick the first value
  const [typeFilter, setTypeFilter] = useState<string>(() => {
    const t = searchParams.get('type') ?? 'all'
    return t.includes(',') ? 'all' : t   // multi-value → show all, let user refine
  })

  // ── Sync URL when filters change ──
  useEffect(() => {
    const params = new URLSearchParams()
    if (query)            params.set('q', query)
    if (category !== 'all') params.set('category', category)
    if (typeFilter !== 'all') params.set('type', typeFilter)
    const qs = params.toString()
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, typeFilter])

  // ── Derive unique categories + types from data ──
  const categories = useMemo(() => {
    const cats = new Set<string>()
    resources.forEach(r => {
      const c = getMeta(r, 'category')
      if (c) cats.add(c)
    })
    return Array.from(cats).sort()
  }, [resources])

  const types = useMemo(() => {
    const ts = new Set<string>()
    resources.forEach(r => {
      const t = getMeta(r, 'resource_type')
      if (t) ts.add(t)
    })
    return Array.from(ts).sort()
  }, [resources])

  // ── Filtered results ──
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(r => {
      // Category filter
      if (category !== 'all' && getMeta(r, 'category') !== category) return false
      // Type filter
      if (typeFilter !== 'all' && getMeta(r, 'resource_type') !== typeFilter) return false
      // Text search: title + description
      if (q) {
        const haystack = `${r.title ?? ''} ${getMeta(r, 'description')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [resources, query, category, typeFilter])

  return (
    <div className="space-y-5">

      {/* ── Search bar ── */}
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
          style={{ color: 'rgba(4,14,32,0.35)' }}
          aria-hidden
        >
          🔍
        </span>
        <input
          id="cc-resource-search"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search resources…"
          className="w-full rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none transition"
          style={{
            border: '1px solid #e0e2e6',
            background: '#ffffff',
            color: '#181d26',
          }}
          aria-label="Search resources"
        />
      </div>

      {/* ── Filters ── */}
      <div className="space-y-2">
        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: 'rgba(4,14,32,0.4)' }}>
              Category
            </span>
            <FilterPill label="All" active={category === 'all'} onClick={() => setCategory('all')} />
            {categories.map(c => (
              <FilterPill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>
        )}

        {/* Type pills */}
        {types.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: 'rgba(4,14,32,0.4)' }}>
              Type
            </span>
            <FilterPill label="All" active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} />
            {types.map(t => (
              <FilterPill
                key={t}
                label={`${TYPE_ICON[t] ?? ''} ${TYPE_LABEL[t] ?? t}`}
                active={typeFilter === t}
                onClick={() => setTypeFilter(t)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Count ── */}
      <p className="text-xs" style={{ color: 'rgba(4,14,32,0.4)' }}>
        {filtered.length === resources.length
          ? `${resources.length} resource${resources.length === 1 ? '' : 's'}`
          : `${filtered.length} of ${resources.length} resource${resources.length === 1 ? '' : 's'}`}
      </p>

      {/* ── Resource grid ── */}
      {filtered.length === 0 ? (
        <div className="be-card py-12">
          <EmptyState
            icon="🔍"
            title="No resources match"
            description="Try adjusting the search or clearing a filter."
            action={
              <button
                className="text-sm font-semibold underline underline-offset-2"
                style={{ color: '#059669' }}
                onClick={() => { setQuery(''); setCategory('all'); setTypeFilter('all') }}
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(r => (
            <ResourceCard key={r.id} post={r} />
          ))}
        </div>
      )}
    </div>
  )
}
