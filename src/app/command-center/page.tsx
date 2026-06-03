import Link from 'next/link'
import { ActionCard } from '@/components/backend'

/* ─────────────────────────────────────────────────────────────────
   COMMAND CENTER — Start Here (index)

   Partner entry point. Workflow shortcut cards route either into
   the Resource Library (filtered by category/type) or to existing
   site pages. Content is intentionally data-light for MVP — a
   refinement pass will add real workflow copy.
   ───────────────────────────────────────────────────────────────── */

const SHORTCUTS = [
  {
    id:          'cc-onboard',
    icon:        '🧭',
    title:       'Onboard Someone',
    description: 'Find guides, checklists, and step-by-step docs for bringing a new partner or customer through the process.',
    href:        '/command-center/resources?category=Onboarding',
    cta:         'Go to Onboarding resources',
  },
  {
    id:          'cc-neyro',
    icon:        '🧠',
    title:       'Neyro Help',
    description: 'Product walkthroughs, explainer videos, and reference materials for the Neyro platform.',
    href:        '/command-center/resources?category=Neyro',
    cta:         'Browse Neyro resources',
  },
  {
    id:          'cc-wallet',
    icon:        '💳',
    title:       'Wallet Help',
    description: 'Setup guides, troubleshooting docs, and PDFs covering the AutopilotROI wallet.',
    href:        '/command-center/resources?category=Wallet',
    cta:         'Browse Wallet resources',
  },
  {
    id:          'cc-video-pdf',
    icon:        '🎬',
    title:       'Find a Video or PDF',
    description: 'Jump straight to visual and downloadable resources — videos, PDFs, and decks.',
    href:        '/command-center/resources?type=video,pdf',
    cta:         'Browse videos & PDFs',
  },
  {
    id:          'cc-presentation',
    icon:        '📊',
    title:       'Presentation Materials',
    description: 'Slide decks, pitch materials, and shareable assets for partner presentations.',
    href:        '/command-center/resources?category=Presentation',
    cta:         'Browse presentations',
  },
  {
    id:          'cc-support',
    icon:        '🛟',
    title:       'Contact Support',
    description: 'Can\'t find what you need? Reach the AutopilotROI team directly.',
    href:        '/contact',
    cta:         'Go to contact page',
  },
]

export default function CommandCenterStartHerePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* ── Hero ── */}
      <div className="space-y-2">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: '#181d26' }}
        >
          What are you trying to do today?
        </h2>
        <p className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          Pick a workflow below to jump straight to the right resources, or{' '}
          <Link
            href="/command-center/resources"
            className="font-semibold underline underline-offset-2"
            style={{ color: '#059669' }}
          >
            browse the full Resource Library
          </Link>
          .
        </p>
      </div>

      {/* ── Shortcut grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHORTCUTS.map(s => (
          <ActionCard
            key={s.id}
            href={s.href}
            icon={s.icon}
            title={s.title}
            description={s.description}
            cta={s.cta}
            external={s.href.startsWith('http')}
          />
        ))}
      </div>

      {/* ── Footer nudge ── */}
      <p className="text-xs pb-4" style={{ color: 'rgba(4,14,32,0.35)' }}>
        Resources are maintained by the AutopilotROI team.{' '}
        <Link href="/command-center/resources" className="underline underline-offset-2">
          View all resources →
        </Link>
      </p>
    </div>
  )
}
