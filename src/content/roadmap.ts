/**
 * AutopilotROI V3 — Internal Roadmap Data
 *
 * Single source of truth for team-facing project status.
 * Update this file to reflect the current build state.
 *
 * Last updated: May 8, 2026
 */

export const lastUpdated = 'May 8, 2026'

/* ─── Status Types ───────────────────────────────────────────── */

export type ItemStatus = 'done' | 'active' | 'next' | 'later' | 'abandoned'

export interface StatusItem {
  label: string
  note?: string
  status: ItemStatus
}

/* ─── Active Focus ───────────────────────────────────────────── */

export const activeFocus: StatusItem[] = [
  { label: 'Finish current front-facing pages', note: 'Products, University, Calculator, Media — need content and polish', status: 'active' },
  { label: 'Stabilize Puck editor for homepage and marketing pages', note: 'Inline editing works, save/publish pipeline stable, richtext still basic', status: 'active' },
  { label: 'Complete frontend polish and responsive QA', note: 'Mobile breakpoints, font sizing, spacing consistency', status: 'active' },
  { label: 'Clarify content editing model for Barry\'s lane', note: 'What can Barry safely edit vs what needs developer involvement', status: 'next' },
  { label: 'Prepare next phase: blog, university, partner portal, community', note: 'Scope and tooling decisions still needed', status: 'next' },
]

/* ─── Architecture Decisions ─────────────────────────────────── */

export interface ArchDecision {
  area: string
  decision: string
}

export const archDecisions: ArchDecision[] = [
  { area: 'Framework', decision: 'Continuing with Next.js 16 / React 19 / App Router' },
  { area: 'Database & Auth', decision: 'Supabase — Postgres, RLS, auth, storage' },
  { area: 'Hosting', decision: 'Vercel for deployments and CI/CD' },
  { area: 'Marketing Page Editing', decision: 'Puck — handles front-of-house marketing pages via visual editor' },
  { area: 'Blog / University', decision: 'Not Puck — will use structured CMS/database content later' },
  { area: 'Community / Forum', decision: 'Handled later as a separate system or integration' },
]

/* ─── CMS / Editor Attempts ──────────────────────────────────── */

export interface EditorAttempt {
  name: string
  status: 'current' | 'tried' | 'considered' | 'reference'
  summary: string
  reason: string
}

export const editorAttempts: EditorAttempt[] = [
  {
    name: 'Puck',
    status: 'current',
    summary: 'Inline visual editor for marketing pages',
    reason: 'Current direction. 18 custom components, save/publish to Supabase. Works well for structured marketing page editing. Not intended for blog/article content.',
  },
  {
    name: 'Plasmic',
    status: 'tried',
    summary: 'Full visual builder with code generation',
    reason: 'Attempted integration. Initial output and workflow were not suitable for this project\'s architecture. May revisit if needs change.',
  },
  {
    name: 'TinaCMS',
    status: 'considered',
    summary: 'Git-backed structured content CMS',
    reason: 'Considered for structured blog/university content. Not selected for current front-page editing work. Could be useful later for content-heavy sections.',
  },
  {
    name: 'TipTap',
    status: 'considered',
    summary: 'Rich text editor framework',
    reason: 'Likely useful later for rich text editing in blog posts, university content, or inline text formatting inside Puck blocks.',
  },
  {
    name: 'WordPress / Thrive Themes',
    status: 'reference',
    summary: 'Strong visual editor benchmark',
    reason: 'Good reference point for what visual editing should feel like. Not selected because this project is more app/platform than a standard WordPress site.',
  },
]

/* ─── Completed Frontend Work ────────────────────────────────── */

export interface WorkCategory {
  category: string
  items: string[]
}

export const completedFrontend: WorkCategory[] = [
  {
    category: 'Design & Layout',
    items: [
      'V3 design direction — OnePay-inspired system with fluid typography, rounded sections, scroll animations',
      'Design system v2 — CSS tokens, spacing scale, color palette, typography scale',
      'Hero section with atmospheric effects',
      'Navigation header with dropdown menus',
      'Footer with link columns and legal links',
      'Announcement banner (top bar)',
      'PageShell / SectionBox / SectionHeader layout primitives',
    ],
  },
  {
    category: 'Marketing Components',
    items: [
      'FeatureCard, StatRow, Step, CTABand, TestimonialCarousel',
      'Social proof components (count-up stats, testimonials)',
      'Exit-intent popup',
      'Video player with modal and tracking',
      'Command palette (search/nav overlay)',
      'Smart FAQ bot (AI-powered floating widget)',
    ],
  },
  {
    category: 'Visual Editor',
    items: [
      'Puck integration with 18 custom blocks',
      'Save/publish pipeline to Supabase (puck_pages table)',
      'Section container with variant and padding controls',
      'Inline overlay editing on existing blocks',
      'ButtonBlock with variant/alignment controls',
      'force-dynamic rendering to bypass stale Vercel cache',
      'useScrollReveal added to PuckRenderer for below-fold animations',
    ],
  },
  {
    category: 'Pages (scaffolded or substantially built)',
    items: [
      'Homepage (rebuilt in Puck)',
      'Products / What Is Aurum',
      'FAQs',
      'Calculator / ROI estimator',
      'University',
      'Media',
      'Contact',
      'Terms / Privacy / Disclaimer (legal pages)',
      'Signup flow',
      'Readiness quiz / evaluation',
      'Onboarding / orientation',
      'Waiting room',
      'Roadmap (this page)',
    ],
  },
]

/* ─── Later-Phase Work (built but not current focus) ──────────── */

export const laterPhaseWork: WorkCategory[] = [
  {
    category: 'Auth & Backend',
    items: [
      'Supabase auth integration with SSR middleware',
      'Profile management',
      'Email system via Resend (welcome emails, partner notifications)',
      'Database tables: profiles, leads, cms_posts, cms_content, referral_codes, puck_pages, contacts',
    ],
  },
  {
    category: 'Partner Tools',
    items: [
      'Partner dashboard scaffold (placeholder views)',
      'Referral code generation basics',
      'Partner-tools route structure',
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      'Feature flag system',
      'Rate limiting via Upstash Redis',
      'Sentry error monitoring',
      'Plausible analytics integration',
      'Turnstile bot protection component (not yet wired to forms)',
      'CSP headers',
      'Supabase RLS policies',
      'SEO: sitemap, robots.txt, Open Graph, PWA manifest',
    ],
  },
]

/* ─── Time Investment ────────────────────────────────────────── */

export interface TimeEntry {
  category: string
  days: string
  note: string
}

export const timeInvestment: TimeEntry[] = [
  { category: 'Frontend rebuild / design direction', days: '~8–10 days', note: 'Design system, layout primitives, component library, all page scaffolds' },
  { category: 'Puck editor integration and debugging', days: '~5–6 days', note: 'Block creation, save/publish pipeline, scroll reveal, padding, inline editing' },
  { category: 'CMS/editor exploration (Plasmic, Tina, etc.)', days: '~2–3 days', note: 'Evaluation, attempted integrations, decision process' },
  { category: 'Signup / auth / backend foundation', days: '~3–4 days', note: 'Supabase setup, auth flows, email system, database schema' },
  { category: 'Partner dashboard groundwork', days: '~1–2 days', note: 'Route scaffolding, placeholder views, referral basics' },
  { category: 'QA / debugging / rework', days: '~3–4 days', note: 'Hydration fixes, caching issues, responsive bugs, editor edge cases' },
]

/* ─── V3 Roadmap Phases ──────────────────────────────────────── */

export interface RoadmapPhase {
  phase: string
  name: string
  status: 'done' | 'active' | 'next' | 'later'
  items: string[]
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 'Phase 1',
    name: 'Editor Polish & Frontend Pages',
    status: 'active',
    items: [
      'Stabilize Puck editor for marketing pages',
      'TipTap richtext integration for editor fields',
      'Finish scaffolded page content and design',
      'Homepage content finalization',
    ],
  },
  {
    phase: 'Phase 2',
    name: 'Frontend Completion & Mobile QA',
    status: 'next',
    items: [
      'Full responsive audit across all pages',
      'WCAG accessibility pass',
      'Content editing workflow for Barry',
      'Polish animations and interactions',
    ],
  },
  {
    phase: 'Phase 3',
    name: 'Signup, Auth, Email, Funnel',
    status: 'next',
    items: [
      'Complete signup → quiz → scoring → tier flow',
      'Turnstile bot protection on forms',
      'Drip email sequences',
      'Funnel analytics and conversion tracking',
    ],
  },
  {
    phase: 'Phase 4',
    name: 'Partner Dashboard',
    status: 'later',
    items: [
      'Lead tracking and referral analytics',
      'Prospect pipeline views',
      'Referral link generator with QR codes',
      'Performance metrics',
    ],
  },
  {
    phase: 'Phase 5',
    name: 'Pre-Launch Hardening',
    status: 'later',
    items: [
      'Security audit',
      'Performance optimization',
      'Domain migration to Vercel',
      'Staging → production promotion',
    ],
  },
  {
    phase: 'Phase 6',
    name: 'Launch',
    status: 'later',
    items: [
      'Public launch',
      'Blog / content pipeline',
      'University content structure',
      'Community / forum evaluation',
    ],
  },
]

/* ─── Next Decisions ─────────────────────────────────────────── */

export const nextDecisions: string[] = [
  'Confirm Puck remains the editor for marketing pages',
  'Decide blog CMS approach (database-driven, TinaCMS, or other)',
  'Decide university content structure',
  'Decide community/forum platform (separate tool or integration)',
  'Decide when to move autopilotroi.com domain to Vercel',
  'Decide what Barry should be allowed to edit directly in Puck',
]
