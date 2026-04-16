'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CmsPost } from '@/lib/cms/types'

const FAQ_CATEGORIES = [
  { id: 'all',             label: 'All Questions' },
  { id: 'basic',           label: '📘 Basic' },
  { id: 'advanced',        label: '📗 Advanced' },
  { id: 'technical',       label: '🔧 Technical' },
  { id: 'partner',         label: '🤝 Partner Program' },
  { id: 'getting-started', label: '🚀 Getting Started' },
  { id: 'products',        label: '🤖 Products' },
  { id: 'general',         label: '📋 General' },
]

interface Props { faqs: CmsPost[] }

export default function FaqsPageClient({ faqs }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId]   = useState<string | null>(null)
  const [search, setSearch]   = useState('')

  const visible = faqs.filter(faq => {
    const cat = faq.meta?.category as string | undefined
    const matchesCat    = activeCategory === 'all' || cat === activeCategory
    const q = faq.title ?? ''
    // Strip HTML tags for search matching against body_html
    const plainAnswer = (faq.body_html ?? '').replace(/<[^>]+>/g, ' ')
    const matchesSearch = !search
      || q.toLowerCase().includes(search.toLowerCase())
      || plainAnswer.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>

      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>FAQs</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Common questions about Aurum, the AI bot, onboarding steps, and the partner program — answered clearly.
          </p>
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl px-5 py-3 text-base outline-none transition"
              style={{ border: '1.5px solid #e0e2e6', color: '#181d26', background: '#fff' }}
              onFocus={e  => (e.target.style.borderColor = '#1b61c9')}
              onBlur={e   => (e.target.style.borderColor = '#e0e2e6')}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#1b61c9' }}>🔍</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition"
              style={{
                background: activeCategory === cat.id ? '#1b61c9' : '#fff',
                color: activeCategory === cat.id ? '#fff' : 'rgba(4,14,32,0.65)',
                border: activeCategory === cat.id ? '1px solid #1b61c9' : '1px solid #e0e2e6',
              }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {visible.length === 0 && (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <div className="text-3xl mb-3">🔍</div>
              <p style={{ color: 'rgba(4,14,32,0.5)' }}>
                {search ? `No questions found for "${search}".` : 'No FAQs in this category yet.'}
              </p>
            </div>
          )}
          {visible.map(faq => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id}
                className="overflow-hidden rounded-xl transition-shadow hover:shadow-[0_4px_16px_rgba(27,97,201,0.08)]"
                style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold" style={{ color: '#181d26' }}>
                    {faq.title}
                  </span>
                  <span className="shrink-0 text-xl font-light transition-transform"
                    style={{ color: '#1b61c9', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0" style={{ borderTop: '1px solid #f0f2f7' }}>
                    {faq.body_html ? (
                      <div
                        className="cms-content text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.body_html }}
                      />
                    ) : (
                      <p className="text-base leading-relaxed" style={{ color: 'rgba(4,14,32,0.65)' }}>
                        No answer content yet. Edit this FAQ in the Content Editor.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-2xl p-10 text-center" style={{ background: '#1b61c9' }}>
          <div className="text-3xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Still have questions?</h2>
          <p className="text-white/75 mb-6 max-w-lg mx-auto">
            Your AutoPilot ROI partner is available to answer any specific questions and walk you through onboarding personally.
          </p>
          <Link href="/signup"
            className="inline-block rounded-xl px-8 py-3.5 font-bold transition hover:opacity-90"
            style={{ background: '#fff', color: '#1b61c9' }}>
            Begin Onboarding →
          </Link>
        </div>
      </div>
    </div>
  )
}
