'use client'

import { SectionHeader, ActionCard } from '@/components/backend'

const resources = [
  { href: 'https://supabase.com/docs',              icon: '🗄️', title: 'Supabase Docs',         description: 'Database, auth, storage, and edge functions documentation.', cta: 'Open docs', external: true },
  { href: 'https://vercel.com/docs',                icon: '▲',  title: 'Vercel Docs',            description: 'Deployment, domains, environment variables, and analytics.', cta: 'Open docs', external: true },
  { href: 'https://nextjs.org/docs',                icon: '⚡',  title: 'Next.js 15 Docs',        description: 'App router, server components, API routes, and more.',       cta: 'Open docs', external: true },
  { href: 'https://tailwindcss.com/docs',           icon: '🎨',  title: 'Tailwind CSS v4',        description: 'Utility-first CSS framework — class reference and guides.',  cta: 'Open docs', external: true },
  { href: '/admin/guide',                           icon: '📖',  title: 'Platform Admin Guide',   description: 'Internal guide for managing partners, content, and settings.', cta: 'Read guide' },
  { href: '/admin/changelog',                       icon: '📝',  title: 'Changelog',              description: 'Full history of shipped features, fixes, and updates.',       cta: 'View changes' },
  { href: 'https://github.com',                     icon: '🐙',  title: 'GitHub Repository',      description: 'Source code, pull requests, and issue tracking.',            cta: 'Open repo', external: true },
  { href: 'https://vercel.com/analytics',           icon: '📊',  title: 'Vercel Analytics',       description: 'Real-time page views, Core Web Vitals, and visitor data.',  cta: 'Open analytics', external: true },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Resources" subtitle="Documentation, tools, and platform links" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map(r => <ActionCard key={r.title} {...r} />)}
      </div>
    </div>
  )
}
