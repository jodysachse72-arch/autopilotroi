/**
 * AutopilotROI V3 Roadmap Data
 * V1: Everything built and working. V2: Broke it all via global CSS. V3: The fix.
 * Old V1 deployment: https://autopilotroi-rocz45oa9-autopilot-roi.vercel.app
 * Last updated: May 8, 2026
 */

export const lastUpdated = 'May 8, 2026'

export type SystemStatus = 'live' | 'partial' | 'not-started' | 'broken-by-v2'
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low'
export type TaskEffort = 'small' | 'medium' | 'large'
export type PhaseStatus = 'current' | 'upcoming' | 'later'

export interface SystemRow { name: string; status: SystemStatus; details: string }

export const builtAndWorking: SystemRow[] = [
  { name: 'Homepage', status: 'live', details: 'Puck-rendered from Supabase, force-dynamic, scroll animations' },
  { name: 'Hero Section', status: 'live', details: 'Dark hero with video modal, CTA, bullet points' },
  { name: 'Puck Visual Editor', status: 'live', details: '18 components, sidebar categories, save/publish to Supabase' },
  { name: 'Navigation', status: 'live', details: 'Responsive navbar, hamburger menu, dropdowns' },
  { name: 'Footer', status: 'live', details: 'Full footer with links, newsletter, legal' },
  { name: 'Announcement Banner', status: 'live', details: 'Dismissible top banner' },
  { name: 'FAQs Page', status: 'live', details: 'Accordion-style FAQ from cms_posts' },
  { name: 'Products Page', status: 'live', details: 'Product cards with badges' },
  { name: 'Calculator Page', status: 'live', details: 'ROI calculator UI' },
  { name: 'University Page', status: 'live', details: 'Course curriculum browser (42KB component)' },
  { name: 'Media / Resources', status: 'live', details: 'Video library, resource pages' },
  { name: 'Contact Page', status: 'live', details: 'Contact form' },
  { name: 'Legal Pages', status: 'live', details: 'Terms, Privacy, Disclaimer' },
  { name: 'Signup Flow', status: 'live', details: 'Name/email capture, readiness quiz' },
  { name: 'Readiness Quiz', status: 'live', details: 'Multi-step quiz, scoring, tier assignment' },
  { name: 'Waiting Room', status: 'live', details: 'Post-signup holding page' },
  { name: 'Auth System', status: 'live', details: 'Login, forgot password, reset password (Supabase Auth)' },
  { name: 'Email System', status: 'live', details: 'Resend integration, welcome + partner notification emails' },
  { name: 'Smart FAQ Bot', status: 'live', details: 'Floating chat widget for FAQ answers' },
  { name: 'SEO', status: 'live', details: 'Sitemap, robots.txt, OG tags, meta descriptions' },
  { name: 'Analytics', status: 'live', details: 'Plausible tracking, custom event helpers' },
  { name: 'Error Monitoring', status: 'live', details: 'Sentry client + server configs' },
  { name: 'Feature Flags', status: 'live', details: 'Provider + flag system for gated rollouts' },
  { name: 'Rate Limiting', status: 'live', details: 'Upstash Redis rate limiter' },
]

export interface NeedsWorkRow { name: string; issue: string }

export const needsWork: NeedsWorkRow[] = [
  { name: 'Puck Editor — Richtext', issue: 'Text fields are plain inputs, no bold/italic/size/color toolbar' },
  { name: 'Puck Editor — Action Bar', issue: 'Copy/delete buttons not reliably visible on all blocks' },
  { name: 'Puck Editor — Global Header/Footer', issue: 'Header/footer not editable through Puck' },
  { name: 'Drip Emails', issue: 'Logic in drip-emails.ts, cron endpoint exists but unwired' },
  { name: 'Blog', issue: '/blog route exists but no content pipeline' },
  { name: 'Turnstile Bot Protection', issue: 'Turnstile.tsx built, env vars not set' },
]

export interface BrokenByV2Row { name: string; v1Route: string; whatBroke: string }

export const brokenByV2: BrokenByV2Row[] = [
  { name: 'Admin Dashboard', v1Route: '/admin', whatBroke: 'Styling destroyed by V2 global CSS overhaul' },
  { name: 'Partner Dashboard', v1Route: '/dashboard', whatBroke: 'Layout functional but styles broken by V2' },
  { name: 'Internal Roadmap Tool', v1Route: '/admin/roadmap', whatBroke: 'Working tool, needs restyling' },
  { name: 'Launch Checklist', v1Route: '/admin/checklist', whatBroke: 'Built and deployed, styles broken' },
  { name: 'Feature Management', v1Route: '/admin/features', whatBroke: 'Feature flag UI built, styles broken' },
  { name: 'Partner Onboarding Wizard', v1Route: '/dashboard', whatBroke: 'Component complete, CSS conflicts from V2' },
  { name: 'Referral Link Generator', v1Route: '/dashboard', whatBroke: 'referral_links table + UI built, broken by cascade' },
  { name: 'Prospect Pipeline', v1Route: '/dashboard', whatBroke: 'Lead view built, data binding works, V2 broke styles' },
  { name: 'Leaderboard', v1Route: '/dashboard', whatBroke: 'Rankings component built, V2 destroyed layout' },
  { name: 'Performance Analytics', v1Route: '/dashboard', whatBroke: 'Chart components built, V2 broke rendering' },
]

export const v2PostMortem = {
  title: 'What happened in V2',
  summary: 'V2 frontend redesign used global CSS that overwrote admin and partner dashboard styles. Every fix to the frontend broke the backend and vice versa. 3 weeks lost. V3 strategy: build public frontend first (Puck), then resurface V1 backend with scoped CSS.',
  lessons: [
    'Global CSS between public and admin pages causes cascade conflicts.',
    'Admin/partner backend was fully working in V1. Do not rebuild what works.',
    'V3 must use CSS Modules or separate layout groups to prevent this.',
    'Old V1 deployment proves features exist.',
  ],
  v1Deployment: 'https://autopilotroi-rocz45oa9-autopilot-roi.vercel.app',
}

export interface DbTable { name: string; rows: number | string; purpose: string; rls: boolean }

export const dbTables: DbTable[] = [
  { name: 'profiles', rows: 4, purpose: 'User accounts (prospect/partner/admin)', rls: true },
  { name: 'leads', rows: 2, purpose: 'Pre-auth signup captures', rls: true },
  { name: 'readiness_responses', rows: 8, purpose: 'Quiz answers linked to profiles', rls: true },
  { name: 'referral_links', rows: 0, purpose: 'Partner referral codes + tracking', rls: true },
  { name: 'puck_pages', rows: 4, purpose: 'Visual editor page configs (JSON)', rls: true },
  { name: 'cms_posts', rows: 7, purpose: 'Blog, FAQ, video, page content', rls: true },
  { name: 'cms_content', rows: 0, purpose: 'Generic CMS content blocks', rls: true },
  { name: 'cms_revisions', rows: 0, purpose: 'Content revision history', rls: true },
]
export interface PhaseTask { id: string; task: string; priority: TaskPriority; effort: TaskEffort }
export interface RoadmapPhase { phase: number; name: string; status: PhaseStatus; goal: string; sessions: string; tasks: PhaseTask[] }

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1, name: 'Editor Polish', status: 'current',
    goal: 'Make the Puck editor fully production-ready for non-technical content editing.',
    sessions: '2-3',
    tasks: [
      { id: '1.1', task: 'Richtext fields — TipTap (bold, italic, size, color, links)', priority: 'high', effort: 'medium' },
      { id: '1.2', task: 'Editor to Published CSS parity — fix style gaps in iframe', priority: 'high', effort: 'small' },
      { id: '1.3', task: 'Action bar — copy/delete/move on all block types', priority: 'medium', effort: 'small' },
      { id: '1.4', task: 'Global header/footer editing — via Puck or settings panel', priority: 'medium', effort: 'medium' },
      { id: '1.5', task: 'Page selector — switch pages in the editor', priority: 'medium', effort: 'medium' },
      { id: '1.6', task: 'Seed all pages — Puck data for every marketing page', priority: 'medium', effort: 'medium' },
      { id: '1.7', task: 'Undo/redo — verify Puck history + keyboard shortcuts', priority: 'low', effort: 'small' },
    ],
  },
  {
    phase: 2, name: 'Public Frontend Completion', status: 'upcoming',
    goal: 'Finish every public marketing page. Pixel-perfect, content-driven from Supabase.',
    sessions: '2-3',
    tasks: [
      { id: '2.1', task: 'Blog pipeline — /blog with cms_posts list + detail', priority: 'high', effort: 'medium' },
      { id: '2.2', task: 'Media page — cms_posts (type: video) with YouTube player', priority: 'medium', effort: 'medium' },
      { id: '2.3', task: 'University content — hardcoded to CMS/Supabase', priority: 'medium', effort: 'large' },
      { id: '2.4', task: 'FAQ content — verify accordion pulls from cms_posts', priority: 'medium', effort: 'small' },
      { id: '2.5', task: 'Mobile QA — responsive audit 375/768/1024px', priority: 'high', effort: 'medium' },
      { id: '2.6', task: 'Accessibility — ARIA, keyboard nav, screen reader', priority: 'medium', effort: 'medium' },
      { id: '2.7', task: 'Performance — Lighthouse 90+, image optimization', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 3, name: 'Auth & Signup Funnel', status: 'upcoming',
    goal: 'Complete the prospect-to-partner onboarding pipeline.',
    sessions: '2-3',
    tasks: [
      { id: '3.1', task: 'Turnstile — env vars, bot protection on signup', priority: 'high', effort: 'small' },
      { id: '3.2', task: 'Signup flow — E2E: submit, quiz, score, tier, waiting room', priority: 'high', effort: 'medium' },
      { id: '3.3', task: 'Email testing — welcome, partner notification, unsubscribe', priority: 'high', effort: 'medium' },
      { id: '3.4', task: 'Partner referral — ?ref=jody stored in lead', priority: 'medium', effort: 'small' },
      { id: '3.5', task: 'Drip email cron — /api/cron/re-engage, CRON_SECRET', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 4, name: 'Resurface V1 Admin & Partner Backend', status: 'later',
    goal: 'Bring back working V1 dashboards with isolated CSS that cannot break V3 public frontend.',
    sessions: '3-4',
    tasks: [
      { id: '4.1', task: 'CSS isolation — Modules or separate layout group for /admin + /dashboard', priority: 'critical', effort: 'medium' },
      { id: '4.2', task: 'Admin Dashboard — restyle /admin with scoped CSS', priority: 'high', effort: 'medium' },
      { id: '4.3', task: 'Partner Dashboard — restyle /dashboard, verify prospects + stats', priority: 'high', effort: 'medium' },
      { id: '4.4', task: 'Referral links — verify table binding, restyle UI', priority: 'high', effort: 'small' },
      { id: '4.5', task: 'Onboarding Wizard — reconnect with scoped styles', priority: 'medium', effort: 'medium' },
      { id: '4.6', task: 'Leaderboard + Analytics — restyle charts, verify data', priority: 'medium', effort: 'medium' },
      { id: '4.7', task: 'Admin sub-pages — /admin/roadmap, /checklist, /features', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 5, name: 'Pre-Launch Hardening', status: 'later',
    goal: 'Security, compliance, and infrastructure for production.',
    sessions: '1-2',
    tasks: [
      { id: '5.1', task: 'Custom domain — autopilotroi.com to Vercel', priority: 'high', effort: 'small' },
      { id: '5.2', task: 'Resend domain — SPF, DKIM, DMARC', priority: 'high', effort: 'small' },
      { id: '5.3', task: 'RLS audit — verify all table policies', priority: 'high', effort: 'medium' },
      { id: '5.4', task: 'Rate limiting — /api/leads, /api/notify, /api/contact', priority: 'medium', effort: 'small' },
      { id: '5.5', task: 'CSP headers — production-ready security headers', priority: 'medium', effort: 'small' },
      { id: '5.6', task: 'Plausible — verify tracking + conversion goals', priority: 'medium', effort: 'small' },
      { id: '5.7', task: 'Sentry — verify client + server error capture', priority: 'medium', effort: 'small' },
      { id: '5.8', task: 'Webhook ISR — Supabase to Vercel revalidation', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 6, name: 'Launch & Post-Launch', status: 'later',
    goal: 'Go live and iterate based on real traffic.',
    sessions: '1',
    tasks: [
      { id: '6.1', task: 'End-to-end test — full launch checklist', priority: 'critical', effort: 'medium' },
      { id: '6.2', task: 'Social preview — OG images on WhatsApp, Telegram, Twitter', priority: 'medium', effort: 'small' },
      { id: '6.3', task: 'Search Console — sitemap, verify indexing', priority: 'medium', effort: 'small' },
      { id: '6.4', task: 'PWA — manifest, icons, install prompts', priority: 'low', effort: 'small' },
      { id: '6.5', task: 'Monitoring — Plausible + Sentry + Supabase logs', priority: 'low', effort: 'small' },
    ],
  },
]

export interface ComponentGroup { category: string; icon: string; components: string[] }
export const componentInventory: ComponentGroup[] = [
  { category: 'Heroes', icon: '🌟', components: ['HeroDark', 'HeroBlue', 'PageHeaderWhite'] },
  { category: 'Layout', icon: '📐', components: ['SectionBox (custom padding)', 'FeatureGrid', 'Spacer'] },
  { category: 'Content', icon: '📝', components: ['StatRow', 'Step', 'CTABand', 'HtmlBlock', 'ImageBlock', 'ButtonBlock'] },
  { category: 'Cards', icon: '🃏', components: ['FeatureCard', 'TrustSignalCard', 'ProductCard'] },
  { category: 'Widgets', icon: '🧩', components: ['FAQ', 'TestimonialCard'] },
]

export interface TechRow { layer: string; technology: string; status: SystemStatus }
export const techStack: TechRow[] = [
  { layer: 'Framework', technology: 'Next.js 16.2.2 (App Router)', status: 'live' },
  { layer: 'UI', technology: 'React 19 + Vanilla CSS + Framer Motion', status: 'live' },
  { layer: 'Visual Editor', technology: 'Puck Editor 0.21.2', status: 'live' },
  { layer: 'Database', technology: 'Supabase Postgres 17', status: 'live' },
  { layer: 'Auth', technology: 'Supabase Auth', status: 'live' },
  { layer: 'Email', technology: 'Resend', status: 'live' },
  { layer: 'Hosting', technology: 'Vercel (auto-deploy from main)', status: 'live' },
  { layer: 'Analytics', technology: 'Plausible (self-hosted script)', status: 'partial' },
  { layer: 'Errors', technology: 'Sentry', status: 'partial' },
  { layer: 'Bot Protection', technology: 'Cloudflare Turnstile', status: 'partial' },
  { layer: 'Rate Limiting', technology: 'Upstash Redis', status: 'live' },
  { layer: 'Fonts', technology: 'Plus Jakarta Sans + Inter (Google)', status: 'live' },
]

export interface TimelineRow { phase: string; sessions: string; focus: string }
export const timeline: TimelineRow[] = [
  { phase: 'Phase 1 — Editor Polish', sessions: '2-3', focus: 'Richtext, CSS parity, page selector' },
  { phase: 'Phase 2 — Public Frontend', sessions: '2-3', focus: 'Blog, mobile QA, accessibility' },
  { phase: 'Phase 3 — Auth & Funnel', sessions: '2-3', focus: 'Signup flow, emails, Turnstile' },
  { phase: 'Phase 4 — Resurface V1 Backend', sessions: '3-4', focus: 'Admin + partner dashboards, isolated CSS' },
  { phase: 'Phase 5 — Pre-Launch', sessions: '1-2', focus: 'Domain, security, monitoring' },
  { phase: 'Phase 6 — Launch', sessions: '1', focus: 'E2E test, go live' },
]

export const keyDecisions: string[] = [
  'CSS isolation for V1 backend — CSS Modules vs. separate layout groups for admin/partner routes?',
  'CMS strategy — Puck for all pages, or cms_posts for blog/FAQ? (Currently hybrid)',
  'Partner Dashboard — Restyle V1 as-is, or redesign the UX?',
  'Launch domain — When to point autopilotroi.com DNS to Vercel?',
  'Content authoring — Sole editor, or do partners need CMS access?',
]