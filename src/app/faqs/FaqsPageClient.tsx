'use client'

import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { CmsPost } from '@/lib/cms/types'
import HomeCTABand from '@/components/home/CTABand'
import PageShell from '@/components/sections/PageShell'
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

interface CategoryDef {
  id: string
  label: string
  description: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent: string
  tint: string
}

const FAQ_CATEGORIES: CategoryDef[] = [
  { id: 'basic', label: 'The basics', description: 'Aurum, costs, risk, and what to expect.', Icon: CompassIcon, accent: '#1b61c9', tint: '#e8f0fd' },
  { id: 'getting-started', label: 'Getting started', description: 'Your first steps into the ecosystem.', Icon: OnboardingIcon, accent: '#0891b2', tint: '#ecfeff' },
  { id: 'products', label: 'Products', description: 'The bot, card, exchange, and neobank.', Icon: AutomationIcon, accent: '#7c3aed', tint: '#f5f3ff' },
  { id: 'technical', label: 'Wallets & setup', description: 'USDT, Trust Wallet, VPNs, and access.', Icon: SecurityIcon, accent: '#d97706', tint: '#fffbeb' },
  { id: 'advanced', label: 'Trading & returns', description: 'Payouts, spillover, and deeper details.', Icon: SparkleIcon, accent: '#059669', tint: '#ecfdf5' },
  { id: 'partner', label: 'Partner program', description: 'Partner access, tools, and dashboards.', Icon: PartnerIcon, accent: '#dc2626', tint: '#fef2f2' },
  { id: 'general', label: 'General', description: 'Everything else you may want to know.', Icon: AcademyIcon, accent: '#64748b', tint: '#f1f5f9' },
]

interface Props {
  faqs: CmsPost[]
}

export default function FaqsPageClient({ faqs }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const faq of faqs) {
      const category = (faq.meta?.category as string | undefined) ?? '_uncat'
      counts[category] = (counts[category] ?? 0) + 1
    }
    return counts
  }, [faqs])

  const grouped = useMemo(() => {
    const query = search.trim().toLowerCase()
    const groups: Record<string, CmsPost[]> = { _uncat: [] }
    FAQ_CATEGORIES.forEach((category) => { groups[category.id] = [] })

    for (const faq of faqs) {
      const category = (faq.meta?.category as string | undefined) ?? '_uncat'
      const title = (faq.title ?? '').toLowerCase()
      const answer = (faq.body_html ?? '').replace(/<[^>]+>/g, ' ').toLowerCase()
      if (query && !title.includes(query) && !answer.includes(query)) continue
      ;(groups[category] ?? groups._uncat).push(faq)
    }

    return groups
  }, [faqs, search])

  const topicCategories = FAQ_CATEGORIES.filter((category) => (categoryCounts[category.id] ?? 0) > 0)
  const visibleCategories = FAQ_CATEGORIES.filter((category) => grouped[category.id].length > 0)
  const totalVisible = Object.values(grouped).reduce((total, group) => total + group.length, 0)
  const popularFaqs = faqs.slice(0, 4)

  function toggle(id: string) {
    setOpenIds((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function scrollToId(id: string) {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  function openPopularFaq(id: string) {
    setOpenIds((previous) => new Set(previous).add(id))
    scrollToId(`faq-${id}`)
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    scrollToId('faq-answers')
  }

  return (
    <PageShell>
        {/* OnePay-inspired help-center hero, adapted to the AutoPilotROI brand. */}
        <section
          style={{
            position: 'relative',
            minHeight: '24rem',
            overflow: 'hidden',
            borderRadius: 'var(--radius-section, 1.125rem)',
            background: 'linear-gradient(135deg, #2d7ff9 0%, #4fb8f6 58%, #76d4f7 100%)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '28rem',
              height: '28rem',
              right: '-8rem',
              bottom: '-17rem',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
            }}
          />

          <div
            className="grid min-h-[24rem] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 'var(--container)',
              margin: '0 auto',
              padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem' }}>
              <p style={{ marginBottom: '0.625rem', fontWeight: 700, color: 'rgba(18,18,18,0.65)' }}>
                Help Center
              </p>
              <h1 className="text-display" style={{ marginBottom: '1.75rem', color: '#121212' }}>
                How can we help?
              </h1>

              <form
                onSubmit={submitSearch}
                role="search"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '38rem',
                  gap: '0.5rem',
                  padding: '0.375rem 0.375rem 0.375rem 1rem',
                  border: '1px solid rgba(18,18,18,0.12)',
                  borderRadius: '0.875rem',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1rem 2.5rem rgba(18,18,18,0.12)',
                }}
              >
                <SearchIcon className="h-5 w-5 shrink-0" />
                <input
                  type="search"
                  aria-label="Search frequently asked questions"
                  placeholder="Search a question or topic"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  style={{
                    minWidth: 0,
                    flex: 1,
                    border: 0,
                    outline: 0,
                    padding: '0.75rem 0.25rem',
                    background: 'transparent',
                    color: '#121212',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flexShrink: 0, minHeight: '2.875rem', padding: '0.75rem 1.25rem' }}
                >
                  Search
                </button>
              </form>
              <p style={{ marginTop: '0.875rem', color: 'rgba(18,18,18,0.62)', fontSize: '0.875rem' }}>
                Try “minimum,” “VPN,” “risk,” or “partner.”
              </p>
            </div>

            <div className="relative hidden min-h-[15rem] lg:block" aria-hidden="true">
              <div style={{ position: 'absolute', top: '0.25rem', right: '5rem', width: '8.5rem', height: '8.5rem', display: 'grid', placeItems: 'center', borderRadius: '2rem', background: '#121212', color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 800, transform: 'rotate(6deg)', boxShadow: '0 1.5rem 3rem rgba(18,18,18,0.2)' }}>
                ?
              </div>
              <div style={{ position: 'absolute', left: '0', bottom: '2rem', padding: '0.875rem 1.125rem', borderRadius: '0.875rem', background: '#ffffff', fontWeight: 700, transform: 'rotate(-3deg)', boxShadow: '0 0.75rem 2rem rgba(18,18,18,0.12)' }}>
                AI trading bot
              </div>
              <div style={{ position: 'absolute', right: '0', bottom: '0', padding: '0.875rem 1.125rem', borderRadius: '0.875rem', background: '#ecfdf5', color: '#047857', fontWeight: 700, transform: 'rotate(2deg)', boxShadow: '0 0.75rem 2rem rgba(18,18,18,0.1)' }}>
                Getting started
              </div>
            </div>
          </div>
        </section>

        {!search && (popularFaqs.length > 0 || topicCategories.length > 0) && (
          <section
            aria-label="Explore frequently asked questions"
            style={{
              borderRadius: 'var(--radius-section, 1.125rem)',
              backgroundColor: 'var(--color-surface)',
              padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <div style={{ width: '100%', maxWidth: 'var(--container)', margin: '0 auto' }}>
              {popularFaqs.length > 0 && (
                <div aria-labelledby="popular-faqs-heading">
                  <h2 id="popular-faqs-heading" className="text-heading" style={{ marginBottom: '2rem' }}>
                    Popular questions
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {popularFaqs.map((faq) => (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => openPopularFaq(faq.id)}
                        className="group flex w-full items-center justify-between gap-5 rounded-2xl text-left transition-colors hover:bg-[#e8e8e8]"
                        style={{ border: 0, cursor: 'pointer', color: '#121212', backgroundColor: 'var(--color-surface-alt)', padding: '1.5rem' }}
                      >
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-body-lg)', fontWeight: 700, lineHeight: 1.3 }}>
                          {faq.title}
                        </span>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {topicCategories.length > 0 && (
                <nav aria-labelledby="browse-topics-heading" style={{ marginTop: popularFaqs.length > 0 ? 'clamp(4rem, 8vw, 6rem)' : 0 }}>
                  <h2 id="browse-topics-heading" className="text-heading" style={{ marginBottom: '2rem' }}>
                    Browse by topic
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {topicCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => scrollToId(`cat-${category.id}`)}
                        className="group flex min-h-[12rem] flex-col items-start rounded-2xl bg-white text-left transition-transform hover:-translate-y-1"
                        style={{ border: '1px solid var(--color-border)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', padding: '1.5rem' }}
                      >
                  <span style={{ display: 'grid', width: '3rem', height: '3rem', placeItems: 'center', marginBottom: '1.5rem', borderRadius: '0.875rem', color: category.accent, backgroundColor: category.tint }}>
                    <category.Icon className="h-6 w-6" />
                  </span>
                  <span style={{ marginBottom: '0.375rem', color: '#121212', fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 800 }}>
                    {category.label}
                  </span>
                  <span style={{ color: 'var(--color-fg-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {category.description}
                  </span>
                  <span style={{ marginTop: 'auto', paddingTop: '1rem', color: category.accent, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {categoryCounts[category.id]} {categoryCounts[category.id] === 1 ? 'answer' : 'answers'}
                  </span>
                      </button>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </section>
        )}

        <section
          id="faq-answers"
          style={{
            scrollMarginTop: '6rem',
            borderRadius: 'var(--radius-section, 1.125rem)',
            backgroundColor: 'var(--color-surface)',
            padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <div style={{ width: '100%', maxWidth: '62rem', margin: '0 auto' }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" style={{ marginBottom: '3rem' }}>
              <div>
                <p className="badge mb-4 inline-flex">Answers</p>
                <h2 className="text-heading">
                  {search ? 'Search results' : 'Frequently asked questions'}
                </h2>
              </div>
              {search && (
                <button type="button" className="btn btn-ghost" onClick={() => setSearch('')}>
                  Clear search
                </button>
              )}
            </div>

            {search && (
              <p style={{ margin: '-1.75rem 0 2.5rem', color: 'var(--color-fg-muted)' }}>
                {totalVisible === 0
                  ? <>No answers found for <strong>“{search}”</strong>.</>
                  : <>{totalVisible} {totalVisible === 1 ? 'answer' : 'answers'} found for <strong>“{search}”</strong>.</>}
              </p>
            )}

            {totalVisible === 0 ? (
              <div style={{ padding: '3rem 2rem', border: '1px solid var(--color-border)', borderRadius: '1rem', backgroundColor: 'var(--color-surface-alt)', textAlign: 'center' }}>
                <SearchIcon className="mx-auto mb-4 h-8 w-8" />
                <h3 className="text-subheading" style={{ marginBottom: '0.5rem' }}>Try another search</h3>
                <p style={{ color: 'var(--color-fg-muted)' }}>Use a broader word, or browse the topic cards above.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {visibleCategories.map((category) => (
                  <section key={category.id} id={`cat-${category.id}`} style={{ scrollMarginTop: '7rem' }}>
                    <div className="flex items-center gap-4" style={{ marginBottom: '1.25rem' }}>
                      <span style={{ display: 'grid', width: '2.75rem', height: '2.75rem', flexShrink: 0, placeItems: 'center', borderRadius: '0.875rem', color: category.accent, backgroundColor: category.tint }}>
                        <category.Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 style={{ margin: 0, color: '#121212', fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 800 }}>
                          {category.label}
                        </h3>
                        <p style={{ margin: '0.125rem 0 0', color: 'var(--color-fg-muted)', fontSize: '0.875rem' }}>
                          {grouped[category.id].length} {grouped[category.id].length === 1 ? 'question' : 'questions'}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {grouped[category.id].map((faq) => {
                        const isOpen = openIds.has(faq.id)
                        return (
                          <article
                            key={faq.id}
                            id={`faq-${faq.id}`}
                            style={{
                              overflow: 'hidden',
                              scrollMarginTop: '7rem',
                              border: `1px solid ${isOpen ? category.accent : 'var(--color-border)'}`,
                              borderRadius: '1rem',
                              backgroundColor: '#ffffff',
                              boxShadow: isOpen ? '0 0.75rem 2rem rgba(18,18,18,0.07)' : 'none',
                              transition: 'border-color 150ms ease, box-shadow 150ms ease',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => toggle(faq.id)}
                              aria-expanded={isOpen}
                              className="flex w-full items-center justify-between gap-5 text-left"
                              style={{
                                border: 0,
                                background: 'transparent',
                                cursor: 'pointer',
                                color: '#121212',
                                padding: 'clamp(1.25rem, 3vw, 1.5rem)',
                              }}
                            >
                              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-body-lg)', fontWeight: 700, lineHeight: 1.35 }}>
                                {faq.title}
                              </span>
                              <span
                                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                                aria-hidden="true"
                                style={{ backgroundColor: isOpen ? category.accent : '#121212', color: '#ffffff', fontSize: '1.25rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 180ms ease, background-color 180ms ease' }}
                              >
                                +
                              </span>
                            </button>
                            {isOpen && (
                              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                                <div style={{ height: '1px', marginBottom: '1.25rem', backgroundColor: 'var(--color-border-light)' }} />
                                {faq.body_html ? (
                                  <div
                                    className="cms-content"
                                    style={{ color: 'var(--color-fg-muted)', fontSize: 'var(--text-body)', lineHeight: 1.7 }}
                                    dangerouslySetInnerHTML={{ __html: faq.body_html }}
                                  />
                                ) : (
                                  <p style={{ color: 'var(--color-fg-muted)' }}>Answer coming soon.</p>
                                )}
                              </div>
                            )}
                          </article>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>
      <HomeCTABand />
    </PageShell>
  )
}
