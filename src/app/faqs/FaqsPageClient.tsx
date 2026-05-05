'use client'

import { useState, useMemo, useEffect } from 'react'
import type { CmsPost } from '@/lib/cms/types'
import { PageShell, CTABand } from '@/components/sections'
import { SearchIcon } from '@/components/ui/Icons'

/* ═══════════════════════════════════════════════════════════════
   FAQs — Pill category filter style
   Centered hero + search bar · horizontal pill filters · flat accordion
   ═══════════════════════════════════════════════════════════════ */

interface CategoryDef {
  id: string
  label: string
  emoji: string
}

const ALL_CAT = 'all'

const FAQ_CATEGORIES: CategoryDef[] = [
  { id: 'basic',           label: 'Basic',           emoji: '🧭' },
  { id: 'advanced',        label: 'Advanced',        emoji: '⚡' },
  { id: 'technical',       label: 'Technical',       emoji: '🔧' },
  { id: 'partner',         label: 'Partner Program', emoji: '🤝' },
  { id: 'getting-started', label: 'Getting Started', emoji: '🚀' },
  { id: 'products',        label: 'Products',        emoji: '📦' },
  { id: 'general',         label: 'General',         emoji: '📋' },
]

export const HARDCODED_FAQS: CmsPost[] = [
  { id: 'h-1',  type: 'faq', slug: null, title: 'What is Aurum Foundation?',                body: null, body_html: '<p>Aurum Foundation is a decentralised AI-driven financial ecosystem that includes an automated cryptocurrency trading bot (EX-AI Bot), a Visa crypto debit card, a crypto exchange, and a Web3 neobank. AutoPilot ROI is the structured onboarding and support team for Aurum.</p>', meta: { category: 'basic' },          status: 'published', publish_at: null, sort_order: 1,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-2',  type: 'faq', slug: null, title: 'What is the minimum investment to get started?', body: null, body_html: '<p>The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). You can start with $100 and scale as you become comfortable.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 2,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-3',  type: 'faq', slug: null, title: 'How does the AI trading bot work?',         body: null, body_html: '<p>The EX-AI Bot analyses global cryptocurrency markets 24/7 using machine learning. It executes trades automatically on Binance, Bybit, and KuCoin. You activate it once during onboarding, and it runs continuously.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 3,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-4',  type: 'faq', slug: null, title: 'Is this risky? Can I lose my money?',       body: null, body_html: '<p>All investment carries risk. Cryptocurrency markets are volatile, and the AI bot does not guarantee specific returns. Only invest what you can afford to lose.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 4,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-5',  type: 'faq', slug: null, title: 'Do I need any experience with crypto to join?', body: null, body_html: '<p>No experience is required. AutoPilot ROI and the onboarding guide walk you through every step from setting up a wallet to activating the bot.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 5,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-6',  type: 'faq', slug: null, title: 'How long does onboarding take?',            body: null, body_html: '<p>Most members complete all onboarding steps within 1–3 days, including setting up Trust Wallet, a VPN, acquiring USDT, creating your Aurum account, and activating the bot.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 6,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-7',  type: 'faq', slug: null, title: 'How does the Aurum spillover system work?', body: null, body_html: '<p>Aurum uses a 3-deep spillover model. Each partner has 3 direct positions. When those are filled, new members route to the next open position in your downline automatically.</p>', meta: { category: 'advanced' }, status: 'published', publish_at: null, sort_order: 7,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-8',  type: 'faq', slug: null, title: 'How are returns paid out?',                 body: null, body_html: '<p>Returns from the AI bot are credited to your Aurum account balance. You can withdraw to your Trust Wallet in USDT or spend with the Visa crypto card.</p>', meta: { category: 'advanced' }, status: 'published', publish_at: null, sort_order: 8,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-9',  type: 'faq', slug: null, title: 'Why do I need a VPN?',                     body: null, body_html: '<p>Aurum is not available in all countries due to regional restrictions. A VPN masks your location so you can access the platform. We recommend NordVPN or ExpressVPN.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 9,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-10', type: 'faq', slug: null, title: 'Why do I need Trust Wallet?',               body: null, body_html: '<p>Trust Wallet is a self-custodial crypto wallet — meaning you control your own private keys. You use it to hold USDT before depositing into Aurum and to withdraw earnings.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 10, created_at: '', updated_at: '', created_by: null },
  { id: 'h-11', type: 'faq', slug: null, title: 'What is USDT and where do I buy it?',       body: null, body_html: '<p>USDT (Tether) is a stablecoin pegged to the US Dollar — 1 USDT ≈ $1 USD. You can purchase USDT on major exchanges like Binance, Coinbase, or Kraken.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 11, created_at: '', updated_at: '', created_by: null },
  { id: 'h-12', type: 'faq', slug: null, title: 'Can I become a partner?',                   body: null, body_html: '<p>Yes. After completing your own onboarding and activating your bot, you can opt into the Partner Program. Your AutoPilot ROI partner will walk you through the partner tools.</p>', meta: { category: 'partner' }, status: 'published', publish_at: null, sort_order: 12, created_at: '', updated_at: '', created_by: null },
  { id: 'h-13', type: 'faq', slug: null, title: 'What is the Partner Dashboard?',            body: null, body_html: '<p>The Partner Dashboard is live at /dashboard. Partners can track prospects, see readiness scores, tiers, onboarding status, and use a multi-type referral link generator with QR codes.</p>', meta: { category: 'partner' }, status: 'published', publish_at: null, sort_order: 13, created_at: '', updated_at: '', created_by: null },
]

interface Props { faqs?: CmsPost[] }

export function FaqAccordionWidget({ faqs: initialFaqs }: Props) {
  const [faqs, setFaqs] = useState<CmsPost[]>(initialFaqs || HARDCODED_FAQS)
  const [openIds,  setOpenIds]  = useState<Set<string>>(new Set())
  const [search,   setSearch]   = useState('')
  const [activeCat, setActiveCat] = useState<string>(ALL_CAT)

  useEffect(() => {
    if (!initialFaqs) {
      fetch('/api/faqs')
        .then((res) => res.json())
        .then((data) => {
          if (data.faqs && data.faqs.length > 0) {
            setFaqs(data.faqs)
          }
        })
        .catch(console.error)
    }
  }, [initialFaqs])

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return faqs.filter((f) => {
      const cat = (f.meta?.category as string | undefined) ?? ''
      if (activeCat !== ALL_CAT && cat !== activeCat) return false
      if (!q) return true
      const title  = (f.title   ?? '').toLowerCase()
      const answer = (f.body_html ?? '').replace(/<[^>]+>/g, ' ').toLowerCase()
      return title.includes(q) || answer.includes(q)
    })
  }, [faqs, search, activeCat])

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectCat(id: string) {
    setActiveCat(id)
    // Collapse all open items when switching category
    setOpenIds(new Set())
  }

  return (
    <div style={{ width: '100%' }}>
      {/* ══ HERO SECTION / SEARCH ══════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f5ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--color-border-light)',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>

          {/* Eyebrow */}
          <span style={{
            display: 'inline-block',
            background: 'rgba(27,97,201,0.1)',
            color: '#1b61c9',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.375rem 1rem',
            borderRadius: '99px',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-display)',
          }}>
            Frequently Asked Questions
          </span>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#181d26',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 1rem',
          }}>
            FAQs
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.65,
            color: 'var(--color-text-weak)',
            margin: '0 0 2rem',
          }}>
            Common questions about Aurum, the AI bot, onboarding steps, and the partner
            program — answered clearly.
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '1.125rem', top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
            }}>
              <SearchIcon className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveCat(ALL_CAT) }}
              style={{
                width: '100%',
                border: '1.5px solid var(--color-border)',
                borderRadius: '0.875rem',
                padding: '1rem 3rem',
                fontSize: '1rem',
                outline: 'none',
                background: '#ffffff',
                color: '#181d26',
                fontFamily: 'var(--font-body)',
                boxSizing: 'border-box',
                transition: 'border-color 150ms ease, box-shadow 150ms ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1b61c9'
                e.target.style.boxShadow   = '0 0 0 4px rgba(27,97,201,0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)'
                e.target.style.boxShadow   = 'none'
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
        </div>
      </section>

      {/* ══ PILL FILTERS + ACCORDION ══════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        padding: '2.5rem 1.5rem 4rem',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

          {/* Pill row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}>
            {/* All Questions pill */}
            <PillButton
              label="All Questions"
              active={activeCat === ALL_CAT}
              onClick={() => selectCat(ALL_CAT)}
            />
            {FAQ_CATEGORIES.map((cat) => (
              <PillButton
                key={cat.id}
                label={`${cat.emoji} ${cat.label}`}
                active={activeCat === cat.id}
                onClick={() => selectCat(cat.id)}
              />
            ))}
          </div>

          {/* Result count when searching */}
          {search && (
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1.25rem',
            }}>
              {filtered.length === 0
                ? <>No results for <strong style={{ color: '#181d26' }}>&ldquo;{search}&rdquo;</strong> — try a different term.</>
                : <><strong style={{ color: '#181d26' }}>{filtered.length}</strong> {filtered.length === 1 ? 'answer' : 'answers'} for &ldquo;{search}&rdquo;</>
              }
            </p>
          )}

          {/* Empty state */}
          {filtered.length === 0 && !search && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--color-text-muted)',
              background: '#f8fafc',
              borderRadius: '1rem',
              border: '1px solid var(--color-border-light)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
              <p style={{ margin: 0, fontSize: 'var(--text-body)' }}>
                No questions in this category yet. Check back soon.
              </p>
            </div>
          )}

          {/* Accordion list */}
          {filtered.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filtered.map((faq) => {
                const isOpen = openIds.has(faq.id)
                return (
                  <div
                    key={faq.id}
                    style={{
                      background: '#ffffff',
                      border: `1px solid ${isOpen ? '#1b61c9' : 'var(--color-border)'}`,
                      borderRadius: '0.875rem',
                      overflow: 'hidden',
                      boxShadow: isOpen ? '0 4px 20px rgba(27,97,201,0.08)' : 'none',
                      transition: 'border-color 150ms ease, box-shadow 150ms ease',
                    }}
                  >
                    <button
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.25rem',
                        padding: '1.125rem 1.375rem',
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
                          width: '1.625rem',
                          height: '1.625rem',
                          borderRadius: '50%',
                          background: isOpen ? '#1b61c9' : '#f1f5f9',
                          color: isOpen ? '#ffffff' : '#1b61c9',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.125rem',
                          fontWeight: 300,
                          lineHeight: 1,
                          transition: 'background 150ms ease, color 150ms ease, transform 200ms ease',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 1.375rem 1.375rem',
                        borderTop: '1px solid var(--color-border-light)',
                      }}>
                        {faq.body_html ? (
                          <div
                            className="cms-content"
                            style={{
                              fontSize: 'var(--text-body)',
                              lineHeight: 1.7,
                              color: 'var(--color-text-weak)',
                              paddingTop: '1rem',
                            }}
                            dangerouslySetInnerHTML={{ __html: faq.body_html }}
                          />
                        ) : (
                          <p style={{
                            paddingTop: '1rem',
                            fontSize: 'var(--text-body)',
                            color: 'var(--color-text-muted)',
                            margin: 0,
                          }}>
                            No answer content yet.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function FaqsPageClient({ faqs }: { faqs: CmsPost[] }) {
  return (
    <PageShell>
      <FaqAccordionWidget faqs={faqs} />
      {/* ══ CLOSING CTA ═══════════════════════════════════════════ */}
      <CTABand
        eyebrow="Still have questions?"
        title={<>Your partner has answered<br />this before.</>}
        description="Every AutoPilot ROI member has a dedicated partner. Message yours — they walk new members through onboarding every week."
        ctas={[
          { label: 'Begin onboarding →', href: '/signup' },
          { label: 'Read the start guide', href: '/start', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}

/* ── Pill Button ─────────────────────────────────────────────── */
function PillButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.5rem 1.125rem',
        borderRadius: '99px',
        border: active ? '1.5px solid #1b61c9' : '1.5px solid var(--color-border)',
        background: active
          ? 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)'
          : '#ffffff',
        color: active ? '#ffffff' : '#181d26',
        fontSize: '0.9rem',
        fontWeight: active ? 700 : 500,
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: active
          ? '0 4px 12px rgba(27,97,201,0.3)'
          : 'none',
        transition: 'all 160ms ease',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = '#1b61c9'
          ;(e.currentTarget as HTMLElement).style.color = '#1b61c9'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
          ;(e.currentTarget as HTMLElement).style.color = '#181d26'
        }
      }}
    >
      {label}
    </button>
  )
}
