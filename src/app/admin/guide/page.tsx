'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   ADMIN GUIDE — Built-in documentation for non-technical admins
   Searchable, categorized, written in plain English
   ═══════════════════════════════════════════════════════════════ */

interface Guide {
  id: string
  title: string
  category: string
  icon: string
  content: string[]
}

const guides: Guide[] = [
  // ── Getting Oriented ──
  {
    id: 'what-is-this',
    title: 'What Is This Platform?',
    category: 'Getting Oriented',
    icon: '🏠',
    content: [
      'AutopilotROI is a structured onboarding platform. It helps people go from "I heard about crypto/trading bots" to "I\'m signed up and ready to go."',
      'Think of it like a funnel: visitors arrive → take a readiness quiz → get matched with a partner → complete guided onboarding → start investing.',
      'You (the admin) manage the partners, monitor leads, and control which features are active on the site.',
    ],
  },
  {
    id: 'who-sees-what',
    title: 'Who Sees What?',
    category: 'Getting Oriented',
    icon: '👀',
    content: [
      '**Public visitors** see: Homepage, Products, University, Media, Resources, FAQs, and the signup flow.',
      '**Logged-in partners** see: Partner Dashboard with their referral stats, prospects, performance analytics, leaderboard, and referral link generator.',
      '**Admins (you)** see: Everything above PLUS the Admin Panel — strategy roadmap, changelog, checklist, feature toggles, partner management, and this guide.',
      'The admin panel is at /admin. Partners cannot see it. Visitors cannot see it.',
    ],
  },
  {
    id: 'daily-routine',
    title: 'What Should I Check Every Day?',
    category: 'Getting Oriented',
    icon: '📋',
    content: [
      '1. **Admin Dashboard** (/admin) — Check for new leads and partner activity.',
      '2. **Feature Toggles** (/admin/features) — Make sure maintenance mode is OFF (unless you intentionally turned it on).',
      '3. **Partner list** (/admin/partners) — Check if any new partners need activation.',
      'That\'s it. The drip emails, analytics tracking, and social proof all run automatically.',
    ],
  },
  // ── Feature Management ──
  {
    id: 'feature-toggles',
    title: 'How Feature Toggles Work',
    category: 'Feature Management',
    icon: '🎛️',
    content: [
      'Go to /admin/features. You\'ll see a list of every feature with an ON/OFF switch.',
      '**Green** = ON (the feature is live, visitors can see/use it)',
      '**Gray** = OFF (the feature is hidden, like it doesn\'t exist)',
      'Click any feature name to see a detailed explanation of what it does, why it matters, and when to turn it on/off.',
      '⚠️ **Be careful with Maintenance Mode** — when ON, the ENTIRE site shows a "we\'re upgrading" page. Only use this when you\'re actually doing maintenance.',
      'Changes take effect immediately. No deploy needed. No code changes needed.',
    ],
  },
  {
    id: 'dangerous-toggles',
    title: 'Which Toggles Are Dangerous?',
    category: 'Feature Management',
    icon: '⚠️',
    content: [
      '**🚧 Maintenance Mode** (HIGH RISK) — Blocks ALL visitors. Only turn on during actual maintenance.',
      '**Partner Self-Registration** (MEDIUM RISK) — Lets anyone become a partner without your approval. Only enable once you trust the process.',
      '**SMS Notifications** (MEDIUM RISK) — Costs real money per message. Only enable with a funded Twilio account.',
      'All other toggles are Safe or Low Risk — feel free to experiment with them.',
    ],
  },
  // ── Lead Management ──
  {
    id: 'lead-pipeline',
    title: 'Understanding the Lead Pipeline',
    category: 'Lead Management',
    icon: '🎯',
    content: [
      'Every person who visits the site goes through these stages:',
      '**Visitor** → They land on the homepage. They\'re browsing.',
      '**New** → They started the signup form but haven\'t finished the assessment.',
      '**Assessed** → They completed the readiness quiz. You know their score and tier.',
      '**Invited** → Their assigned partner has been notified and has reached out.',
      '**Onboarding** → They\'re going through the step-by-step setup process.',
      '**Active** → They\'ve completed onboarding and are using the platform.',
      'The dashboard shows you where each lead is in this pipeline.',
    ],
  },
  {
    id: 'drip-emails',
    title: 'How Drip Emails Work',
    category: 'Lead Management',
    icon: '📧',
    content: [
      'When someone completes their assessment but doesn\'t connect with their partner, the system automatically sends follow-up emails:',
      '**Day 1**: "Your partner is reviewing your profile" — gentle reminder with their score',
      '**Day 2**: "3 videos to get you started" — educational content push',
      '**Day 3**: "Quick question for you" — engagement through questions',
      '**Day 5**: "Others are seeing results" — social proof / FOMO',
      '**Day 7**: "Last call: your spot is being reassigned" — urgency',
      'After Day 7, we stop emailing them. No one likes being spammed.',
      'This runs automatically via a daily cron job. You don\'t need to do anything. To turn it off, flip the "Drip Email Sequence" toggle in /admin/features.',
    ],
  },
  // ── Partner Management ──
  {
    id: 'partner-management',
    title: 'Adding & Managing Partners',
    category: 'Partner Management',
    icon: '🤝',
    content: [
      'Go to /admin/partners to see all partners.',
      '**To add a partner**: Click "Add Partner," fill in their name, email, and referral code.',
      '**To deactivate**: Click the deactivate button next to their name. Their referral link stops working immediately.',
      '**To reactivate**: Click activate. Their link works again.',
      'Each partner gets a unique referral code (like "jody" or "marcus"). When someone signs up through their link, the partner is automatically notified by email.',
    ],
  },
  {
    id: 'referral-codes',
    title: 'How Referral Codes Work',
    category: 'Partner Management',
    icon: '🔗',
    content: [
      'Every partner has a unique referral code. It gets added to the signup URL like this:',
      'autopilotroi.com/signup?ref=jody',
      'When a visitor uses that link, two things happen:',
      '1. The referral code is saved in their browser (survives page refreshes)',
      '2. When they complete the assessment, the partner with code "jody" gets an email notification',
      'Partners can generate their own links, QR codes, and social share templates from /dashboard/links.',
    ],
  },
  // ── Understanding Analytics ──
  {
    id: 'analytics',
    title: 'Understanding Your Analytics',
    category: 'Analytics',
    icon: '📊',
    content: [
      'We use **Plausible Analytics** — a privacy-friendly tracker. No cookies, no pop-ups, no GDPR headaches.',
      'It tracks page views, top pages, traffic sources, and custom events (like quiz completions and video watches).',
      'You can access it at your Plausible dashboard (set the NEXT_PUBLIC_PLAUSIBLE_DOMAIN environment variable).',
      'Additionally, the dashboard shows partner-specific metrics: how many leads each partner brings, their conversion rate, and referral sources.',
    ],
  },
  {
    id: 'ab-testing',
    title: 'A/B Testing Explained',
    category: 'Analytics',
    icon: '🧪',
    content: [
      'A/B testing shows different versions of the same button/headline to different visitors, then measures which one gets more clicks.',
      '**Don\'t turn this on until you have 500+ weekly visitors.** With less traffic, the results are random noise, not real insights.',
      'When enabled, it runs automatically using cookies so each visitor sees the same version consistently.',
      'Results appear in your Plausible dashboard as custom events.',
    ],
  },
  // ── Common Problems ──
  {
    id: 'site-is-down',
    title: 'Help! The Site Is Down!',
    category: 'Troubleshooting',
    icon: '🆘',
    content: [
      '**First check**: Is Maintenance Mode turned ON? Go to /admin/features and check. If it\'s on, turn it off.',
      '**Second check**: Is Vercel having issues? Check status.vercel.com.',
      '**Third check**: Is Supabase having issues? Check status.supabase.com.',
      'If none of the above, check browser\'s Developer Console (F12 → Console tab) for error messages.',
      'For persistent issues, contact your technical support or check the error monitoring in Sentry.',
    ],
  },
  {
    id: 'partner-not-getting-emails',
    title: 'Partner Not Getting Email Notifications',
    category: 'Troubleshooting',
    icon: '📭',
    content: [
      '1. **Check their spam/junk folder** — emails from new senders often land there.',
      '2. **Verify their email in /admin/partners** — is it spelled correctly?',
      '3. **Check if they\'re active** — deactivated partners don\'t get notifications.',
      '4. **Check Resend dashboard** — log in to resend.com and check the delivery logs.',
      'If Resend shows the email was delivered but the partner can\'t find it, it\'s a spam filter issue on their end.',
    ],
  },
  {
    id: 'cant-login',
    title: 'I Can\'t Access the Admin Panel',
    category: 'Troubleshooting',
    icon: '🔐',
    content: [
      'The admin panel is at /admin. Make sure you\'re going to the right URL.',
      'Currently, the admin panel doesn\'t require authentication (it\'s pre-launch). After launch, it will require Supabase auth.',
      'If the page shows a blank screen, try clearing your browser cache (Ctrl+Shift+Delete) or using an incognito window.',
    ],
  },
  // ── Content Editor ──
  {
    id: 'content-editor-basics',
    title: 'Content Editor: Getting Started',
    category: 'Content Editor',
    icon: '✏️',
    content: [
      'Go to /admin/cms (or click "Content Editor" in the sidebar).',
      'You\'ll see 4 tabs: **Homepage**, **Blog**, **FAQs**, and **Videos**.',
      'Click **Edit** on any field to modify it. Press **Save** when done, or **Cancel** to discard changes.',
      'For text fields, you can also press **Enter** to save or **Escape** to cancel.',
      'A first-time walkthrough will appear on your first visit. Click **Help** (❓) in the header to replay it anytime.',
    ],
  },
  {
    id: 'content-editor-blog',
    title: 'Content Editor: Managing Blog Posts',
    category: 'Content Editor',
    icon: '📝',
    content: [
      'Go to the **Blog** tab in the Content Editor.',
      'Click **+ New Post** to create a post. Fill in the title, excerpt, body, category, and author.',
      'The slug (URL path) is auto-generated from the title. You can override it.',
      'Toggle **Featured** to highlight a post at the top of the blog page.',
      'Click **✏️ Edit** on any existing post to update it, or **🗑️** to delete it.',
      'Deleted posts can be recovered using **Undo** (Ctrl+Z).',
    ],
  },
  {
    id: 'content-editor-undo',
    title: 'Content Editor: Undo & Backup',
    category: 'Content Editor',
    icon: '↩️',
    content: [
      '**Undo**: Press Ctrl+Z or click the ↩️ Undo button. We keep the last 50 changes.',
      '**Export**: Click ⬇️ Export to download ALL your content as a JSON file. This is your backup.',
      '**Import**: Click ⬆️ Import to restore content from a JSON backup file.',
      '⚠️ Import replaces ALL current content. Always export first as a safety net.',
      'The undo counter shows how many steps you can go back. After 50 changes, the oldest one is dropped.',
    ],
  },
  {
    id: 'content-editor-supabase',
    title: 'Content Editor: Cloud Sync (Supabase)',
    category: 'Content Editor',
    icon: '☁️',
    content: [
      'By default, content is stored in your browser\'s localStorage. This is great for development and testing.',
      'To enable cloud sync, run the migration SQL in your Supabase Dashboard → SQL Editor.',
      'The migration file is at: supabase/migrations/20260413_cms_content.sql',
      'Once the tables exist, the Content Editor will automatically sync with Supabase.',
      'Cloud sync means: Barry can edit on his computer, and changes appear on the live site for everyone.',
    ],
  },
]

const categories = [...new Set(guides.map((g) => g.category))]

export default function AdminGuidePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)

  const filtered = guides.filter((g) => {
    const matchesCategory = !activeCategory || g.category === activeCategory
    const matchesSearch = !searchQuery || [g.title, g.category, ...g.content].some((s) =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Admin Guide
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Everything you need to know about running AutopilotROI. Written in plain English — no tech jargon.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the guide... (try: feature toggles, drip emails, partner)"
          className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-3 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-2 text-xs font-medium transition ${
            !activeCategory ? 'bg-blue-600 text-white' : 'border border-[var(--border-primary)] text-[var(--text-secondary)]'
          }`}
        >
          All ({guides.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'border border-[var(--border-primary)] text-[var(--text-secondary)]'
            }`}
          >
            {cat} ({guides.filter((g) => g.category === cat).length})
          </button>
        ))}
      </div>

      {/* Guides */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-12 text-center">
            <span className="text-3xl">🔍</span>
            <p className="mt-3 text-[var(--text-muted)]">No guides match your search. Try different keywords.</p>
          </div>
        ) : (
          filtered.map((guide) => {
            const isExpanded = expandedGuide === guide.id
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-[var(--bg-card-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{guide.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{guide.title}</div>
                      <div className="text-xs text-[var(--text-muted)]">{guide.category}</div>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">{isExpanded ? '▼' : '▶'}</span>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-[var(--border-primary)] px-6 py-5 space-y-3"
                  >
                    {guide.content.map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-[var(--text-secondary)] leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#181d26] font-semibold">$1</strong>'),
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          })
        )}
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-5 text-center">
        <p className="text-sm text-[rgba(4,14,32,0.55)]">
          Can&apos;t find what you need? Check the{' '}
          <a href="/admin/features" className="text-[#1b61c9] hover:underline">Feature Toggles</a> page for detailed feature documentation, or the{' '}
          <a href="/admin/checklist" className="text-[#1b61c9] hover:underline">Launch Checklist</a> for pre-go-live tasks.
        </p>
      </div>
    </div>
  )
}
