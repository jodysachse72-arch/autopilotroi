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
    const plainAnswer = (faq.body_html ?? '').replace(/<[^>]+>/g, ' ')
    const matchesSearch = !search
      || q.toLowerCase().includes(search.toLowerCase())
      || plainAnswer.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* ── Hero ── */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            <span className="text-label" style={{
              display: 'inline-block',
              background: 'rgba(27,97,201,0.08)',
              color: '#1b61c9',
              border: '1px solid rgba(27,97,201,0.15)',
              borderRadius: '99px',
              padding: '0.375rem 1rem',
              marginBottom: '1.25rem',
            }}>
              Frequently Asked Questions
            </span>

            <h1 className="text-display" style={{ color: '#181d26', marginBottom: '1rem' }}>
              FAQs
            </h1>

            <p className="text-body-lg" style={{
              color: 'var(--color-text-weak)',
              maxWidth: '36rem',
              margin: '0 auto 2rem',
              lineHeight: 'var(--lh-relaxed)',
            }}>
              Common questions about Aurum, the AI bot, onboarding steps, and the partner program — answered clearly.
            </p>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: '28rem', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.8125rem 3rem 0.8125rem 1.25rem',
                  fontSize: 'var(--text-body)',
                  outline: 'none',
                  border: '1.5px solid var(--color-border)',
                  color: '#181d26',
                  background: '#fff',
                  transition: 'border-color 150ms ease',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={e  => (e.target.style.borderColor = '#1b61c9')}
                onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
              />
              <span style={{
                position: 'absolute', right: '1rem', top: '50%',
                transform: 'translateY(-50%)',
                color: '#1b61c9',
                pointerEvents: 'none',
              }}>🔍</span>
            </div>
          </div>
        </section>

        {/* ── Category filters + Accordion ── */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ maxWidth: '52rem', margin: '0 auto' }}>

            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {FAQ_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    borderRadius: '99px',
                    padding: '0.4375rem 1rem',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                    background: activeCategory === cat.id ? '#1b61c9' : '#ffffff',
                    color: activeCategory === cat.id ? '#fff' : 'var(--color-text-weak)',
                    border: activeCategory === cat.id ? '1.5px solid #1b61c9' : '1.5px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {visible.length === 0 && (
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  padding: '3rem',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {search ? `No questions found for "${search}".` : 'No FAQs in this category yet.'}
                  </p>
                </div>
              )}

              {visible.map(faq => {
                const isOpen = openId === faq.id
                return (
                  <div
                    key={faq.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-card)',
                      overflow: 'hidden',
                      transition: 'box-shadow 150ms ease',
                      boxShadow: isOpen ? 'var(--shadow-card)' : 'none',
                    }}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      style={{
                        display: 'flex', width: '100%',
                        alignItems: 'center', justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '1.25rem 1.5rem',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{
                        fontSize: 'var(--text-body)',
                        fontWeight: 600,
                        color: '#181d26',
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1.4,
                      }}>
                        {faq.title}
                      </span>
                      <span style={{
                        flexShrink: 0,
                        fontSize: '1.375rem',
                        fontWeight: 300,
                        color: '#1b61c9',
                        transition: 'transform 200ms ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        lineHeight: 1,
                      }}>
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 1.5rem 1.5rem',
                        borderTop: '1px solid var(--color-border-light)',
                      }}>
                        {faq.body_html ? (
                          <div
                            className="cms-content"
                            style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)', color: 'var(--color-text-weak)' }}
                            dangerouslySetInnerHTML={{ __html: faq.body_html }}
                          />
                        ) : (
                          <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)', color: 'var(--color-text-muted)' }}>
                            No answer content yet. Edit this FAQ in the Content Editor.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Still have questions CTA ── */}
        <section className="section-box-navy">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
            <h2 className="text-heading" style={{ color: '#ffffff', marginBottom: '0.875rem' }}>
              Still have questions?
            </h2>
            <p style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '32rem',
              margin: '0 auto 2rem',
              lineHeight: 'var(--lh-relaxed)',
            }}>
              Your AutoPilot ROI partner is available to answer any specific questions and walk you through onboarding personally.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
              color: '#ffffff',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'var(--text-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(27,97,201,0.45)',
              letterSpacing: '0.01em',
            }}>
              Begin Onboarding →
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
