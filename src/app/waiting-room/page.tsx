'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'
import VideoModal from '@/components/ui/VideoModal'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { trackEvent, EVENTS } from '@/lib/analytics'
import PersonalizedPath from '@/components/sections/PersonalizedPath'
import { PageShell, SectionBox, CTABand } from '@/components/sections'
import { CheckCircleIcon, PlayCircleIcon, SparkleIcon } from '@/components/ui/Icons'

/* Curated Aurum University Video Library */
/* All IDs verified live via YouTube oembed API on 2026-04-13 */
const WAITING_ROOM_VIDEOS = [
  { id: 'MmAnR4YAPv4', title: 'Aurum Platform Overview',                      description: 'Learn what Aurum Foundation is and how the full ecosystem works.',                              category: 'Getting Started',     duration: '15:22', priority: 1 },
  { id: 'CRuZqkc8sh4', title: 'AI Trading Bots vs Aurum: The Key Difference', description: 'What sets Aurum\u0027s AI trading apart from generic trading bots in the market.',              category: 'Trading & Bots',      duration: '12:30', priority: 2 },
  { id: 'X1TO-hC1Geg', title: 'Aurum Account Registration + Bot Activation',  description: 'Step-by-step guide to creating your Aurum account and activating the EX-AI Bot.',           category: 'Getting Started',     duration: '14:00', priority: 3 },
  { id: 'hgPSheoUs_s', title: 'VPN Required? U.S. & Canada Access Rules',     description: 'Important access requirements for members in the United States and Canada.',                  category: 'Wallets & Security',  duration: '7:15',  priority: 4 },
  { id: 'GJEK3wOjlyQ', title: 'Aurum Packages and Percentages',                description: 'Complete overview of all investment packages and their return percentages.',                  category: 'Getting Started',     duration: '18:00', priority: 5 },
  { id: 'K8qYdD1sC7w', title: 'Two-Factor Authentication Setup',              description: 'Why 2FA is critical and how to enable it before your first deposit.',                          category: 'Wallets & Security',  duration: '6:42',  priority: 6 },
  { id: '1BI9_YikUKc', title: 'Compounding Strategies: Plan A vs Plan B',     description: 'Choose the right strategy \u2014 compound or take daily profits.',                              category: 'Trading & Bots',      duration: '22:15', priority: 7 },
  { id: 'xc97Nr3G3vU', title: 'Gold Tokenization Partnership | Clinq.Gold',   description: 'Aurum\u0027s real-world asset tokenization partnership with Sierra Leone.',                     category: 'Products',            duration: '11:20', priority: 8 },
]

const CATEGORIES = ['All', 'Getting Started', 'Trading & Bots', 'Wallets & Security', 'Products']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface LeadInfo  { id: string; name: string; email: string }
interface ReadinessData { score: number; tier: string; tierLabel: string }

const TIER_CHIPS: Record<string, { bg: string; color: string; border: string }> = {
  beginner:     { bg: 'rgba(245,158,11,0.08)', color: '#b45309', border: 'rgba(245,158,11,0.25)' },
  intermediate: { bg: 'rgba(27,97,201,0.08)',  color: '#1b61c9', border: 'rgba(27,97,201,0.20)' },
  advanced:     { bg: 'rgba(16,185,129,0.10)', color: '#059669', border: 'rgba(16,185,129,0.25)' },
}

export default function WaitingRoomPage() {
  const [lead, setLead] = useState<LeadInfo | null>(null)
  const [readiness, setReadiness] = useState<ReadinessData | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())

  useEffect(() => {
    const storedLead = localStorage.getItem('autopilotroi-lead')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedLead) { try { setLead(JSON.parse(storedLead)) } catch {} }
    const storedReadiness = localStorage.getItem('autopilotroi-readiness')
    if (storedReadiness) { try { setReadiness(JSON.parse(storedReadiness)) } catch {} }
    const storedWatched = localStorage.getItem('autopilotroi-watched')
    if (storedWatched) { try { setWatchedVideos(new Set(JSON.parse(storedWatched))) } catch {} }
    trackEvent(EVENTS.WAITING_ROOM_VIEW)
  }, [])

  function markWatched(videoId: string) {
    const updated = new Set(watchedVideos)
    updated.add(videoId)
    setWatchedVideos(updated)
    localStorage.setItem('autopilotroi-watched', JSON.stringify([...updated]))
    trackEvent(EVENTS.VIDEO_WATCHED, { videoId })
  }

  const filteredVideos = activeCategory === 'All'
    ? WAITING_ROOM_VIDEOS
    : WAITING_ROOM_VIDEOS.filter(v => v.category === activeCategory)

  const watchProgress = Math.round((watchedVideos.size / WAITING_ROOM_VIDEOS.length) * 100)
  const tier = (readiness?.tier as keyof typeof TIER_CHIPS) || 'beginner'
  const chip = TIER_CHIPS[tier]

  return (
    <PageShell>
      {/* Sticky header bar — authenticated chrome */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--color-border)', background: '#fff' }}>
        <div className="container-xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem' }}>
          <Link href="/"><Logo size={32} showText /></Link>
          {readiness && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              borderRadius: '99px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: chip.bg,
              color: chip.color,
              border: '1px solid ' + chip.border,
            }}>
              <SparkleIcon className="w-3.5 h-3.5" /> {readiness.tierLabel} \u2014 {readiness.score}/100
            </span>
          )}
        </div>
      </header>

      {/* Hero (custom dark — branded welcome) */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#061238', padding: '4rem 1.5rem', textAlign: 'center', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 60%)' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '48rem', margin: '0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              borderRadius: '99px', border: '1px solid rgba(96,165,250,0.30)',
              background: 'rgba(59,130,246,0.10)', padding: '0.375rem 1rem',
              fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: '#93c5fd', marginBottom: '1rem',
            }}>
              <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#60a5fa' }} />
              Learning Center
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-display"
            style={{ color: '#fff', marginBottom: '1rem' }}
          >
            Welcome{lead ? ', ' + lead.name.split(' ')[0] : ''}.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-body-lg"
            style={{ maxWidth: '34rem', margin: '0 auto', color: 'rgba(191,219,254,0.7)', lineHeight: 1.6 }}
          >
            Your assessment is complete and your partner has been notified. While you wait, explore these videos to learn about the Aurum ecosystem.
          </motion.p>

          {/* Status grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            style={{ marginTop: '2rem', display: 'grid', gap: '0.75rem', maxWidth: '32rem', margin: '2rem auto 0', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))' }}
          >
            {[
              { label: 'Status',        value: 'Partner Notified', valueColor: '#34d399', dot: true },
              { label: 'Next Step',     value: 'Check Your Email', valueColor: '#e0e7ff' },
              { label: 'Videos Watched', value: watchedVideos.size + '/' + WAITING_ROOM_VIDEOS.length, valueColor: '#e0e7ff' },
            ].map(s => (
              <div key={s.label} style={{
                borderRadius: '0.75rem',
                border: '1px solid rgba(96,165,250,0.2)',
                background: 'rgba(255,255,255,0.05)',
                padding: '0.875rem 1rem',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(147,197,253,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: s.valueColor }}>
                  {s.dot && <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#34d399' }} />}
                  {s.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Personalized path */}
      {readiness && <PersonalizedPath tier={readiness.tier} watchedVideoCount={watchedVideos.size} />}

      {/* Progress + filters + grid */}
      <SectionBox variant="white" padding="lg">
        {/* Progress */}
        <div style={{ maxWidth: '60rem', margin: '0 auto 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#181d26' }}>Learning Progress</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1b61c9' }}>{watchProgress}%</span>
          </div>
          <div style={{ height: '0.5rem', width: '100%', overflow: 'hidden', borderRadius: '99px', background: 'var(--color-border)' }}>
            <motion.div
              style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #1b61c9, #06b6d4)' }}
              initial={{ width: 0 }}
              animate={{ width: watchProgress + '%' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                borderRadius: '99px',
                padding: '0.4375rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: activeCategory === cat ? '#1b61c9' : '#fff',
                color: activeCategory === cat ? '#fff' : 'var(--color-text-weak)',
                border: activeCategory === cat ? '1px solid #1b61c9' : '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 16rem), 1fr))',
          gap: '1.25rem',
        }}>
          {filteredVideos.map((video, i) => (
            <motion.div key={video.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.08}>
              <VideoModal videoUrl={'https://www.youtube.com/watch?v=' + video.id} ctaLabel="Ready to Get Started? \u2192" ctaHref="/signup">
                <div
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-card)',
                    background: '#fff',
                    border: '1px solid var(--color-border)',
                    transition: 'box-shadow 200ms ease, transform 200ms ease',
                  }}
                  onClick={() => markWatched(video.id)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#0f172a' }}>
                    <YouTubeThumbnail videoId={video.id} title={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.20)', color: '#0f172a',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '50%', background: '#dc2626', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', color: '#fff' }}>
                        <PlayCircleIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', borderRadius: '0.25rem', background: 'rgba(0,0,0,0.8)', padding: '0.125rem 0.375rem', fontSize: '0.6875rem', fontWeight: 500, color: '#fff' }}>{video.duration}</div>
                    {watchedVideos.has(video.id) && (
                      <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', borderRadius: '50%', background: '#10b981', padding: '0.25rem', color: '#fff', display: 'inline-flex' }}>
                        <CheckCircleIcon className="w-3 h-3" />
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', borderRadius: '99px', padding: '0.125rem 0.5rem', fontSize: '0.625rem', fontWeight: 600, color: '#fff', background: 'rgba(27,97,201,0.9)' }}>{video.category}</div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{
                      marginBottom: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#181d26',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>{video.title}</h3>
                    <p style={{
                      fontSize: '0.75rem',
                      lineHeight: 1.55,
                      color: 'var(--color-text-muted)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>{video.description}</p>
                  </div>
                </div>
              </VideoModal>
            </motion.div>
          ))}
        </div>
      </SectionBox>

      <CTABand
        eyebrow="What happens next?"
        title={<>Your partner is reviewing<br />your assessment.</>}
        description={lead?.email
          ? 'Watch your inbox at ' + lead.email + ' for a personalized onboarding link from your AutoPilot ROI partner.'
          : 'Watch your inbox for a personalized onboarding link from your AutoPilot ROI partner.'}
        ctas={[
          { label: 'Explore Aurum University \u2192', href: '/university' },
          { label: 'Back to home', href: '/', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}
