'use client'

import { useState, useMemo } from 'react'
import type { CmsPost } from '@/lib/cms/types'
import {
  PageShell,
  SectionBox,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import {
  AcademyIcon,
  AutomationIcon,
  SecurityIcon,
  PartnerIcon,
  OnboardingIcon,
  CompassIcon,
  SearchIcon,
  SparkleIcon,
} from '@/components/ui/Icons'

/* ═══════════════════════════════════════════════════════════════
   FAQS — Stripe Docs style
   Left sticky topic sidebar · right grouped, anchored Q&A.
   Search filters across all sections.
   ═══════════════════════════════════════════════════════════════ */

interface CategoryDef {
  id: string
  label: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent: string
}

const FAQ_CATEGORIES: CategoryDef[] = [
  { id: 'basic',           label: 'Basics',           Icon: CompassIcon,    accent: '#1b61c9' },
  { id: 'getting-started', label: 'Getting started',  Icon: OnboardingIcon, accent: '#0891b2' },
  { id: 'products',        label: 'Products',         Icon: AutomationIcon, accent: '#7c3aed' },
  { id: 'technical',       label: 'Technical',        Icon: SecurityIcon,   accent: '#d97706' },
  { id: 'advanced',        label: 'Advanced',         Icon: SparkleIcon,    accent: '#059669' },
  { id: 'partner',         label: 'Partner program',  Icon: PartnerIcon,    accent: '#dc2626' },
  { id: 'general',         label: 'General',          Icon: AcademyIcon,    accent: '#64748b' },
]

interface Props { faqs: CmsPost[] }

export default function FaqsPageClient({ faqs }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  // Group by category, applying search filter
  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase()
    const out: Record<string, CmsPost[]> = {}
    FAQ_CATEGORIES.forEach((c) => { out[c.id] = [] })
    out['_uncat'] = []

    for (const f of faqs) {
      const cat = (f.meta?.category as string | undefined) ?? '_uncat'
      const title = (f.title ?? '').toLowerCase()
      const answer = (f.body_html ?? '').replace(/<[^>]+>/g, ' ').toLowerCase()
      if (q && !title.includes(q) && !answer.includes(q)) continue
      if (out[cat]) out[cat].push(f)
      else out['_uncat'].push(f)
    }
    return out
  }, [faqs, search])

  const totalVisible = Object.values(grouped).reduce((n, arr) => n + arr.length, 0)
  const visibleCats = FAQ_CATEGORIES.filter((c) => grouped[c.id].length > 0)

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <PageShell>

      {/* ── 1. HERO ── */}
      <HeroBlue
        eyebrow="Knowledge base"
        title={<>Everything you need<br />to know.</>}
        description="Search across every answer, or browse by topic. Written in plain English — no jargon traps."
      />

      {/* ── 2. SEARCH + DOCS LAYOUT ── */}
      <SectionBox variant="white" padding="lg">

        {/* Search bar */}
        <div style={{ position: 'relative', maxWidth: '40rem', margin: '0 0 2.5rem' }}>
          <span style={{
            position: 'absolute',
            left: '1.125rem', top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
          }}>
            <SearchIcon className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search the docs — try 'minimum', 'VPN', or 'spillover'..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              border: '1.5px solid var(--color-border)',
              borderRadius: '0.75rem',
              padding: '1rem 3rem 1rem 3rem',
              fontSize: 'var(--text-body-lg)',
              outline: 'none',
              background: '#ffffff',
              color: '#181d26',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1b61c9'
              e.target.style.boxShadow = '0 0 0 4px rgba(27,97,201,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)'
              e.target.style.boxShadow = 'none'
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '1rem', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(24,29,38,0.06)',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-weak)',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Two-column docs layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 14rem) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* LEFT: Sticky topic sidebar */}
          <nav style={{
            position: 'sticky',
            top: '6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-display)',
              marginBottom: '0.625rem',
              padding: '0 0.625rem',
            }}>
              On this page
            </div>
            {FAQ_CATEGORIES.map((cat) => {
              const count = grouped[cat.id].length
              const dimmed = count === 0
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.625rem',
                    padding: '0.5rem 0.625rem',
                    borderRadius: '0.5rem',
                    fontSize: 'var(--text-body)',
                    fontWeight: 500,
                    color: dimmed ? 'var(--color-text-muted)' : '#181d26',
                    textDecoration: 'none',
                    opacity: dimmed ? 0.5 : 1,
                    transition: 'background 120ms ease',
                    fontFamily: 'var(--font-display)',
                  }}
                  onMouseEnter={(e) => { if (!dimmed) (e.currentTarget as HTMLElement).style.background = '#f1f5f9' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <span style={{ color: cat.accent, flexShrink: 0 }}>
                    <cat.Icon className="w-4 h-4" />
                  </span>
                  <span style={{ flex: 1 }}>{cat.label}</span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {count}
                  </span>
                </a>
              )
            })}
          </nav>

          {/* RIGHT: Grouped Q&A */}
          <div style={{ minWidth: 0 }}>

            {/* Result count header */}
            {search && (
              <div style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-weak)',
                marginBottom: '1.75rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border-light)',
              }}>
                {totalVisible === 0
                  ? <>No matches for <strong style={{ color: '#181d26' }}>&ldquo;{search}&rdquo;</strong>. Try a broader term, or contact your partner.</>
                  : <><strong style={{ color: '#181d26' }}>{totalVisible}</strong> {totalVisible === 1 ? 'answer' : 'answers'} matching <strong style={{ color: '#181d26' }}>&ldquo;{search}&rdquo;</strong></>}
              </div>
            )}

            {totalVisible === 0 && !search && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--color-border-light)',
                borderRadius: '0.875rem',
                padding: '3rem 2rem',
                textAlign: 'center',
              }}>
                <span style={{ display: 'inline-block', color: 'var(--color-text-muted)', marginBottom: '0.875rem' }}>
                  <SearchIcon className="w-8 h-8" />
                </span>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  No FAQs published yet. Check back soon.
                </p>
              </div>
            )}

            {/* Grouped sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {visibleCats.map((cat) => (
                <section key={cat.id} id={`cat-${cat.id}`} style={{ scrollMarginTop: '6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '2rem', height: '2rem',
                      borderRadius: '0.5rem',
                      background: `${cat.accent}14`,
                      color: cat.accent,
                    }}>
                      <cat.Icon className="w-5 h-5" />
                    </span>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.375rem',
                      fontWeight: 800,
                      color: '#181d26',
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}>
                      {cat.label}
                    </h2>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-text-muted)',
                      background: '#f1f5f9',
                      borderRadius: '99px',
                      padding: '0.125rem 0.5rem',
                      marginLeft: '0.25rem',
                    }}>
                      {grouped[cat.id].length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {grouped[cat.id].map((faq) => {
                      const isOpen = openIds.has(faq.id)
                      return (
                        <div
                          key={faq.id}
                          style={{
                            background: '#ffffff',
                            border: '1px solid var(--color-border)',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                            transition: 'border-color 150ms ease, box-shadow 150ms ease',
                            boxShadow: isOpen ? '0 4px 16px rgba(24,29,38,0.06)' : 'none',
                            borderColor: isOpen ? cat.accent : 'var(--color-border)',
                          }}
                        >
                          <button
                            onClick={() => toggle(faq.id)}
                            aria-expanded={isOpen}
                            style={{
                              display: 'flex', width: '100%',
                              alignItems: 'center', justifyContent: 'space-between',
                              gap: '1rem',
                              padding: '1rem 1.25rem',
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
                              lineHeight: 1.45,
                            }}>
                              {faq.title}
                            </span>
                            <span
                              aria-hidden
                              style={{
                                flexShrink: 0,
                                width: '1.5rem', height: '1.5rem',
                                borderRadius: '50%',
                                background: isOpen ? cat.accent : '#f1f5f9',
                                color: isOpen ? '#ffffff' : cat.accent,
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 150ms ease, transform 200ms ease',
                                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                fontSize: '1rem', fontWeight: 400, lineHeight: 1,
                              }}
                            >
                              +
                            </span>
                          </button>
                          {isOpen && (
                            <div style={{
                              padding: '0 1.25rem 1.25rem',
                              borderTop: '1px solid var(--color-border-light)',
                            }}>
                              {faq.body_html ? (
                                <div
                                  className="cms-content"
                                  style={{
                                    fontSize: 'var(--text-body)',
                                    lineHeight: 1.65,
                                    color: 'var(--color-text-weak)',
                                    paddingTop: '1rem',
                                  }}
                                  dangerouslySetInnerHTML={{ __html: faq.body_html }}
                                />
                              ) : (
                                <p style={{ paddingTop: '1rem', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
                                  No answer content yet.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}

              {/* Uncategorized FAQs (if any) */}
              {grouped['_uncat'] && grouped['_uncat'].length > 0 && (
                <section style={{ scrollMarginTop: '6rem' }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 800,
                    color: '#181d26',
                    letterSpacing: '-0.015em',
                    margin: '0 0 1.25rem',
                  }}>
                    Other questions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {grouped['_uncat'].map((faq) => {
                      const isOpen = openIds.has(faq.id)
                      return (
                        <div key={faq.id} style={{
                          background: '#ffffff',
                          border: '1px solid var(--color-border)',
                          borderRadius: '0.75rem',
                          overflow: 'hidden',
                        }}>
                          <button
                            onClick={() => toggle(faq.id)}
                            style={{
                              display: 'flex', width: '100%',
                              alignItems: 'center', justifyContent: 'space-between',
                              padding: '1rem 1.25rem',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              gap: '1rem',
                            }}
                          >
                            <span style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#181d26', fontFamily: 'var(--font-display)' }}>
                              {faq.title}
                            </span>
                            <span aria-hidden style={{
                              flexShrink: 0,
                              transition: 'transform 200ms ease',
                              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                              color: '#1b61c9',
                              fontSize: '1.25rem', fontWeight: 300,
                            }}>+</span>
                          </button>
                          {isOpen && faq.body_html && (
                            <div
                              className="cms-content"
                              style={{
                                padding: '1rem 1.25rem 1.25rem',
                                borderTop: '1px solid var(--color-border-light)',
                                fontSize: 'var(--text-body)',
                                lineHeight: 1.65,
                                color: 'var(--color-text-weak)',
                              }}
                              dangerouslySetInnerHTML={{ __html: faq.body_html }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </SectionBox>

      {/* ── 3. CLOSING CTA ── */}
      <CTABand
        eyebrow="Still stuck?"
        title={<>Your partner has answered<br />this question before.</>}
        description="Every AutoPilot ROI member has a dedicated partner. Message yours — they walk new members through onboarding every week."
        ctas={[
          { label: 'Begin onboarding →', href: '/signup' },
          { label: 'Read the start guide', href: '/start', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
