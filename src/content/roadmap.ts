/**
 * AutopilotROI V3 — Roadmap Data
 *
 * Mirrors the full roadmap artifact: architecture, status audit,
 * phased tasks, component inventory, tech stack, timeline, and decisions.
 *
 * Last updated: May 8, 2026
 */

export const lastUpdated = 'May 8, 2026'

/* ─── Status types ───────────────────────────────────────────── */

export type SystemStatus = 'live' | 'partial' | 'not-started'
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low'
export type TaskEffort = 'small' | 'medium' | 'large'
export type PhaseStatus = 'current' | 'upcoming' | 'later'

/* ─── Built & Working ────────────────────────────────────────── */

export interface SystemRow {
  name: string
  status: SystemStatus
  details: string
}

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
  { name: 'Signup Flow', status: 'live', details: 'Name/email capture → readiness quiz' },
  { name: 'Readiness Quiz', status: 'live', details: 'Multi-step quiz → scoring → tier assignment' },
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

/* ─── Needs Work ─────────────────────────────────────────────── */

export interface NeedsWorkRow {
  name: string
  issue: string
}

export const needsWork: NeedsWorkRow[] = [
  { name: 'Puck Editor — Richtext', issue: 'Text fields are plain inputs, no bold/italic/size/color toolbar' },
  { name: 'Puck Editor — Action Bar', issue: 'Copy/delete buttons not reliably visible on all blocks' },
  { name: 'Puck Editor — Global Header/Footer', issue: 'Header/footer not editable through Puck' },
  { name: 'Partner Dashboard', issue: 'Layout + page exist, but data binding is incomplete' },
  { name: 'Drip Emails', issue: 'Logic written in drip-emails.ts, cron endpoint exists but unwired' },
  { name: 'Blog', issue: '/blog route exists but no content pipeline' },
  { name: 'Turnstile Bot Protection', issue: 'Turnstile.tsx built, env vars not set' },
]

/* ─── Not Built Yet ──────────────────────────────────────────── */

export interface NotBuiltRow {
  name: string
}

export const notBuiltYet: NotBuiltRow[] = [
  { name: 'Admin Dashboard (user/content management)' },
  { name: 'Partner Onboarding Wizard' },
  { name: 'Referral Link Generator' },
  { name: 'Prospect Pipeline (partner view)' },
  { name: 'Leaderboard' },
  { name: 'Performance Analytics (partner)' },
  { name: 'Custom Domain (autopilotroi.com)' },
  { name: 'Webhook-based ISR (Supabase → Vercel)' },
]

/* ─── Database Schema ────────────────────────────────────────── */

export interface DbTable {
  name: string
  rows: number | string
  purpose: string
  rls: boolean
}

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

/* ─── Phased Tasks ───────────────────────────────────────────── */

export interface PhaseTask {
  id: string
  task: string
  priority: TaskPriority
  effort: TaskEffort
}

export interface RoadmapPhase {
  phase: number
  name: string
  status: PhaseStatus
  goal: string
  sessions: string
  tasks: PhaseTask[]
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    name: 'Editor Polish',
    status: 'current',
    goal: 'Make the Puck editor fully production-ready for non-technical content editing.',
    sessions: '2-3',
    tasks: [
      { id: '1.1', task: 'Richtext fields — Convert key text fields to TipTap (bold, italic, size, color, links)', priority: 'high', effort: 'medium' },
      { id: '1.2', task: 'Editor ↔ Published CSS parity — Audit/fix any remaining style gaps in the iframe', priority: 'high', effort: 'small' },
      { id: '1.3', task: 'Action bar — Ensure copy/delete/move buttons work on all block types', priority: 'medium', effort: 'small' },
      { id: '1.4', task: 'Global header/footer editing — Expose navbar + footer content via Puck or a settings panel', priority: 'medium', effort: 'medium' },
      { id: '1.5', task: 'Page selector — Ability to switch between /, /faqs, /products etc. in the editor', priority: 'medium', effort: 'medium' },
      { id: '1.6', task: 'Seed all pages — Pre-populate Puck data for every marketing page (not just /)', priority: 'medium', effort: 'medium' },
      { id: '1.7', task: 'Undo/redo — Verify Puck\'s built-in history works; add keyboard shortcuts', priority: 'low', effort: 'small' },
    ],
  },
  {
    phase: 2,
    name: 'Frontend Completion',
    status: 'upcoming',
    goal: 'Ensure every public page is pixel-perfect and content-driven from Supabase.',
    sessions: '2-3',
    tasks: [
      { id: '2.1', task: 'Blog pipeline — Connect /blog to cms_posts with list + detail views', priority: 'high', effort: 'medium' },
      { id: '2.2', task: 'Media page — Wire to cms_posts (type: video) with tracked YouTube player', priority: 'medium', effort: 'medium' },
      { id: '2.3', task: 'University content — Move curriculum data from hardcoded → CMS or Supabase', priority: 'medium', effort: 'large' },
      { id: '2.4', task: 'FAQ content — Verify FAQ accordion pulls from cms_posts (type: faq)', priority: 'medium', effort: 'small' },
      { id: '2.5', task: 'Mobile QA — Full responsive audit at 375px, 768px, 1024px', priority: 'high', effort: 'medium' },
      { id: '2.6', task: 'Accessibility audit — ARIA labels, keyboard nav, screen reader testing', priority: 'medium', effort: 'medium' },
      { id: '2.7', task: 'Performance — Lighthouse 90+ on all pages, image optimization', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 3,
    name: 'Auth & Signup Funnel',
    status: 'upcoming',
    goal: 'Complete the prospect-to-partner onboarding pipeline.',
    sessions: '2-3',
    tasks: [
      { id: '3.1', task: 'Turnstile integration — Set env vars, wire bot protection on signup', priority: 'high', effort: 'small' },
      { id: '3.2', task: 'Signup → Quiz flow — End-to-end test: submit → quiz → score → tier → waiting room', priority: 'high', effort: 'medium' },
      { id: '3.3', task: 'Email testing — Verify welcome email, partner notification, unsubscribe', priority: 'high', effort: 'medium' },
      { id: '3.4', task: 'Partner code referral — ?ref=jody → stored in lead, partner notified', priority: 'medium', effort: 'small' },
      { id: '3.5', task: 'Drip email cron — Wire /api/cron/re-engage, set CRON_SECRET, test sequences', priority: 'medium', effort: 'medium' },
      { id: '3.6', task: 'Onboarding wizard — Complete PartnerOnboardingWizard.tsx flow', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 4,
    name: 'Partner Dashboard',
    status: 'later',
    goal: 'Give partners a functional portal to manage their prospects and referrals.',
    sessions: '3-4',
    tasks: [
      { id: '4.1', task: 'Dashboard home — Stats cards (total leads, active, conversion rate)', priority: 'high', effort: 'medium' },
      { id: '4.2', task: 'Prospects list — Table with lead name, score, tier, status, date', priority: 'high', effort: 'medium' },
      { id: '4.3', task: 'Referral link generator — Create/manage referral codes + copy link', priority: 'high', effort: 'medium' },
      { id: '4.4', task: 'Lead detail view — Quiz answers, timeline, status transitions', priority: 'medium', effort: 'medium' },
      { id: '4.5', task: 'Leaderboard — Partner rankings by conversions', priority: 'low', effort: 'small' },
      { id: '4.6', task: 'Performance analytics — Charts for referral traffic, conversions over time', priority: 'low', effort: 'large' },
      { id: '4.7', task: 'Settings — Profile edit, notification preferences, password change', priority: 'medium', effort: 'medium' },
    ],
  },
  {
    phase: 5,
    name: 'Pre-Launch Hardening',
    status: 'later',
    goal: 'Security, compliance, and infrastructure for production.',
    sessions: '1-2',
    tasks: [
      { id: '5.1', task: 'Custom domain — Point autopilotroi.com → Vercel, SSL, DNS', priority: 'high', effort: 'small' },
      { id: '5.2', task: 'Resend domain verification — SPF, DKIM, DMARC for @autopilotroi.com', priority: 'high', effort: 'small' },
      { id: '5.3', task: 'Supabase RLS audit — Verify all tables have correct row-level policies', priority: 'high', effort: 'medium' },
      { id: '5.4', task: 'Rate limiting — Apply to /api/leads, /api/notify, /api/contact', priority: 'medium', effort: 'small' },
      { id: '5.5', task: 'CSP headers — Verify next.config.ts security headers are production-ready', priority: 'medium', effort: 'small' },
      { id: '5.6', task: 'Plausible analytics — Verify tracking, set up conversion goals', priority: 'medium', effort: 'small' },
      { id: '5.7', task: 'Sentry — Verify error capture on both client and server', priority: 'medium', effort: 'small' },
      { id: '5.8', task: 'Backup strategy — Supabase PITR or scheduled pg_dump', priority: 'medium', effort: 'small' },
    ],
  },
  {
    phase: 6,
    name: 'Launch & Post-Launch',
    status: 'later',
    goal: 'Go live and iterate based on real traffic.',
    sessions: '1',
    tasks: [
      { id: '6.1', task: 'End-to-end test — Full launch checklist procedure', priority: 'critical', effort: 'medium' },
      { id: '6.2', task: 'Social preview — OG image testing on WhatsApp, Telegram, Twitter', priority: 'medium', effort: 'small' },
      { id: '6.3', task: 'Google Search Console — Submit sitemap, verify indexing', priority: 'medium', effort: 'small' },
      { id: '6.4', task: 'PWA verification — Manifest, icons, install prompts', priority: 'low', effort: 'small' },
      { id: '6.5', task: 'Monitoring dashboard — Plausible + Sentry + Supabase logs', priority: 'low', effort: 'small' },
    ],
  },
]

/* ─── Component Inventory ────────────────────────────────────── */

export interface ComponentGroup {
  category: string
  icon: string
  components: string[]
}

export const componentInventory: ComponentGroup[] = [
  { category: 'Heroes', icon: '🌟', components: ['HeroDark', 'HeroBlue', 'PageHeaderWhite'] },
  { category: 'Layout', icon: '📐', components: ['SectionBox (custom padding)', 'FeatureGrid', 'Spacer'] },
  { category: 'Content', icon: '📝', components: ['StatRow', 'Step', 'CTABand', 'HtmlBlock', 'ImageBlock', 'ButtonBlock'] },
  { category: 'Cards', icon: '🃏', components: ['FeatureCard', 'TrustSignalCard', 'ProductCard'] },
  { category: 'Widgets', icon: '🧩', components: ['FAQ', 'TestimonialCard'] },
]

/* ─── Tech Stack ─────────────────────────────────────────────── */

export interface TechRow {
  layer: string
  technology: string
  status: SystemStatus
}

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

/* ─── Timeline ───────────────────────────────────────────────── */

export interface TimelineRow {
  phase: string
  sessions: string
  focus: string
}

export const timeline: TimelineRow[] = [
  { phase: 'Phase 1 — Editor Polish', sessions: '2-3', focus: 'Richtext, CSS parity, page selector' },
  { phase: 'Phase 2 — Frontend Completion', sessions: '2-3', focus: 'Blog, mobile QA, accessibility' },
  { phase: 'Phase 3 — Auth & Funnel', sessions: '2-3', focus: 'Signup flow, emails, Turnstile' },
  { phase: 'Phase 4 — Partner Dashboard', sessions: '3-4', focus: 'Prospects, referrals, stats' },
  { phase: 'Phase 5 — Pre-Launch', sessions: '1-2', focus: 'Domain, security, monitoring' },
  { phase: 'Phase 6 — Launch', sessions: '1', focus: 'E2E test, go live' },
]

/* ─── Key Decisions ──────────────────────────────────────────── */

export const keyDecisions: string[] = [
  'CMS strategy — Continue with Puck for all pages, or use cms_posts table for blog/FAQ content management? (Currently a hybrid)',
  'Partner Dashboard scope — MVP with basic prospect list + referral links, or full analytics from day one?',
  'Launch domain — When to point autopilotroi.com DNS to Vercel?',
  'Content authoring — Will you be the sole editor, or do partners need CMS access too?',
]
