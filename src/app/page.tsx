'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Scroll reveal hook ───────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ── Animated counter ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(ease * target).toLocaleString()
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return ref
}

// ── Stat item ────────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stat-number">
        <span ref={ref}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// ── Feature card ─────────────────────────────────────────────────
function FeatureCard({
  icon, title, body, color = '#1b61c9', colorBg = 'rgba(27,97,201,0.08)',
}: { icon: string; title: string; body: string; color?: string; colorBg?: string }) {
  return (
    <div className="card reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        width: '3.5rem', height: '3.5rem',
        background: colorBg, borderRadius: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem',
        color,
      }}>{icon}</div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: '#181d26', lineHeight: 1.3, marginBottom: '0.5rem',
        }}>{title}</h3>
        <p style={{ fontSize: 'var(--text-body)', color: 'rgba(24,29,38,0.62)', lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  )
}

// ── Step ─────────────────────────────────────────────────────────
function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{
        width: '3rem', height: '3rem', flexShrink: 0,
        background: '#1b61c9', color: '#fff',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.125rem',
      }}>{num}</div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)',
          color: '#181d26', marginBottom: '0.5rem', lineHeight: 1.3,
        }}>{title}</h3>
        <p style={{ fontSize: 'var(--text-body)', color: 'rgba(24,29,38,0.62)', lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  )
}

// ── Ecosystem card ───────────────────────────────────────────────
function EcoCard({
  icon, title, description, tag, tagColor,
}: { icon: string; title: string; description: string; tag: string; tagColor: string }) {
  return (
    <div className="card reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
        <span style={{
          fontSize: 'var(--text-caption)', fontWeight: 700,
          padding: '0.25rem 0.75rem', borderRadius: '99px',
          background: `${tagColor}15`, color: tagColor,
          border: `1px solid ${tagColor}25`,
          letterSpacing: '0.06em',
        }}>{tag}</span>
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
          color: '#181d26', marginBottom: '0.375rem', lineHeight: 1.3,
        }}>{title}</h3>
        <p style={{ fontSize: 'var(--text-body)', color: 'rgba(24,29,38,0.62)', lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  )
}

// ── Testimonial ──────────────────────────────────────────────────
function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="reveal" style={{
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '1.25rem',
      padding: '1.75rem',
    }}>
      <p style={{
        fontSize: 'var(--text-body-lg)', color: 'rgba(255,255,255,0.90)',
        lineHeight: 1.7, marginBottom: '1.25rem',
        fontStyle: 'italic',
      }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
          background: 'rgba(255,255,255,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '0.875rem', color: '#ffffff',
        }}>{author[0]}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff', fontSize: 'var(--text-body)' }}>{author}</div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.55)' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// HOME PAGE
// ════════════════════════════════════════════════════════════════
export default function HomePage() {
  useScrollReveal()

  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* ══════════════════════════════════════════════════════
            HERO — Blue gradient, big text
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(145deg, #0c1f6e 0%, #1b61c9 58%, #0d3599 100%)',
          borderRadius: 'var(--radius-section)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Decorative radial glows */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', right: '-10%', top: '-20%',
              width: '55vmax', height: '55vmax', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 65%)',
            }} />
            <div style={{
              position: 'absolute', left: '-5%', bottom: '-15%',
              width: '40vmax', height: '40vmax', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(96,165,250,0.20) 0%, transparent 65%)',
            }} />
            {/* Subtle grid */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
              <defs>
                <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.75"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
          </div>

          <div className="container-xl section-padding-lg" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}>
              {/* Left — copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="badge badge-white" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                    ✦ Powered by Aurum Ecosystem
                  </span>
                </motion.div>

                <motion.h1
                  className="text-hero"
                  style={{ color: '#ffffff', marginBottom: '1.5rem' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  Your Money,<br />
                  <span style={{ color: '#93c5fd' }}>Working 24/7</span>
                </motion.h1>

                <motion.p
                  className="text-body-lg"
                  style={{ color: 'rgba(255,255,255,0.78)', marginBottom: '2.5rem', maxWidth: '36rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.
                </motion.p>

                <motion.div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/signup" className="btn btn-primary-lg">
                    Begin Onboarding →
                  </Link>
                  <Link href="/calculator" className="btn btn-ghost btn-primary-lg" style={{
                    background: 'rgba(255,255,255,0.10)',
                    padding: '1rem 2.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-body-lg)',
                  }}>
                    Calculate ROI
                  </Link>
                </motion.div>

                <motion.div
                  style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 }}
                >
                  {[
                    { icon: '✓', text: 'Start with $100 USDT' },
                    { icon: '✓', text: 'AI runs 24/7' },
                    { icon: '✓', text: 'Guided onboarding' },
                  ].map(item => (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>{item.icon}</span>
                      <span style={{ fontSize: 'var(--text-body)', color: 'rgba(255,255,255,0.68)' }}>{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — dashboard placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  backdropFilter: 'blur(8px)',
                }}>
                  {/* Mock app header */}
                  <div style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderBottom: '1px solid rgba(255,255,255,0.10)',
                    padding: '1rem 1.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
                      <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                    ))}
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.40)', marginLeft: '0.5rem' }}>
                      AutoPilotROI Dashboard
                    </span>
                  </div>

                  {/* Mock dashboard body */}
                  <div style={{ padding: '1.5rem' }}>
                    {/* Top stats row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {[
                        { label: 'Portfolio Value', value: '$12,847', up: true },
                        { label: "Today's Gain",    value: '+$234',   up: true },
                        { label: 'Active Since',    value: '47 days', up: null },
                      ].map(s => (
                        <div key={s.label} style={{
                          background: 'rgba(255,255,255,0.07)',
                          borderRadius: '0.75rem', padding: '0.875rem',
                        }}>
                          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.25rem' }}>{s.label}</div>
                          <div style={{
                            fontFamily: 'var(--font-display)', fontWeight: 700,
                            fontSize: '1.0625rem', color: s.up === true ? '#34d399' : s.up === false ? '#f87171' : '#ffffff',
                          }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Fake chart bars */}
                    <div style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '0.875rem',
                      padding: '1rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.40)', marginBottom: '0.75rem' }}>
                        Portfolio Performance (30d)
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.375rem', height: '72px' }}>
                        {[40,55,48,62,58,70,65,78,72,85,80,90,88,95].map((h, i) => (
                          <div key={i} style={{
                            flex: 1,
                            height: `${h}%`,
                            background: i > 10 ? '#34d399' : 'rgba(255,255,255,0.20)',
                            borderRadius: '3px 3px 0 0',
                            transition: 'height 0.5s ease',
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* AI status pill */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(52,211,153,0.12)',
                      border: '1px solid rgba(52,211,153,0.25)',
                      borderRadius: '99px', padding: '0.5rem 1rem',
                      width: 'fit-content',
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 0 3px rgba(52,211,153,0.3)' }} />
                      <span style={{ fontSize: '0.8125rem', color: '#34d399', fontWeight: 600 }}>EX-AI Bot Active — trading</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════ */}
        <section className="section-box section-padding">
          <div className="container-xl">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
            }}>
              <StatItem value={12000} suffix="+"   label="Members Onboarded" />
              <StatItem value={47}    suffix="%"   label="Avg. Portfolio Growth" />
              <StatItem value={24}    suffix="/7"  label="AI Bot Active Hours" />
              <StatItem value={100}   suffix="+"   label="Countries Supported" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FEATURES
        ══════════════════════════════════════════════════════ */}
        <section className="section-box-surface section-padding">
          <div className="container-xl">
            <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 4rem' }}>
              <span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                Why AutoPilotROI
              </span>
              <h2 className="text-display reveal reveal-delay-1" style={{ color: '#181d26', marginBottom: '1rem' }}>
                Everything you need<br />to grow on autopilot
              </h2>
              <p className="text-body-lg reveal reveal-delay-2" style={{ color: 'rgba(24,29,38,0.60)' }}>
                From your first $100 to a fully active portfolio — we guide you through every step of the Aurum ecosystem.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.25rem',
            }}>
              <FeatureCard
                icon="🤖"
                title="EX-AI Trading Bot"
                body="The AI analyzes global crypto markets 24/7 and executes trades automatically on Binance, Bybit, and KuCoin. You activate it once."
              />
              <FeatureCard
                icon="💳"
                title="Visa Crypto Card"
                body="Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide."
                color="#7c3aed" colorBg="rgba(124,58,237,0.08)"
              />
              <FeatureCard
                icon="🏦"
                title="Web3 Neobank"
                body="A full-featured digital bank built on blockchain infrastructure. IBAN accounts, cross-border transfers, DeFi integration."
                color="#0891b2" colorBg="rgba(8,145,178,0.08)"
              />
              <FeatureCard
                icon="📊"
                title="Crypto Exchange"
                body="Trade 200+ assets at competitive rates with institutional-grade liquidity and a clean, intuitive interface."
                color="#059669" colorBg="rgba(5,150,105,0.08)"
              />
              <FeatureCard
                icon="🧭"
                title="Guided Onboarding"
                body="Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped."
              />
              <FeatureCard
                icon="🤝"
                title="Partner Program"
                body="Earn additional income by introducing others. 3-deep spillover model — your network grows even while you sleep."
                color="#d97706" colorBg="rgba(217,119,6,0.08)"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════════ */}
        <section className="section-box section-padding">
          <div className="container-xl">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '5rem',
              alignItems: 'center',
            }}>
              {/* Left — steps */}
              <div>
                <span className="badge badge-blue reveal" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                  The Process
                </span>
                <h2 className="text-display reveal reveal-delay-1" style={{ color: '#181d26', marginBottom: '3rem' }}>
                  Up and running<br />in 3 days or less
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <Step
                    num="1"
                    title="Set up your infrastructure"
                    body="Install Trust Wallet, activate a VPN, and acquire USDT from a major exchange. Your partner walks you through every click."
                  />
                  <Step
                    num="2"
                    title="Create your Aurum account"
                    body="Register at Aurum, complete verification, fund your account with USDT, and select your subscription tier."
                  />
                  <Step
                    num="3"
                    title="Activate the AI bot & sit back"
                    body="Turn on the EX-AI Bot. It begins scanning and trading automatically. Monitor your dashboard and withdraw whenever you choose."
                  />
                </div>
              </div>

              {/* Right — timeline visual */}
              <div className="reveal" style={{
                background: '#f8fafc',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                border: '1px solid #e0e2e6',
              }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1b61c9', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  Typical Timeline
                </div>
                {[
                  { day: 'Day 1',   action: 'Wallet + VPN setup',           done: true },
                  { day: 'Day 1–2', action: 'Acquire USDT, fund account',   done: true },
                  { day: 'Day 2–3', action: 'Aurum account + verification', done: true },
                  { day: 'Day 3',   action: 'EX-AI Bot activated ✓',         done: true, highlight: true },
                  { day: 'Ongoing', action: 'AI trades 24/7, you watch',    done: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    marginBottom: '1.25rem',
                  }}>
                    <div style={{
                      width: '0.5rem', height: '0.5rem', borderRadius: '50%', flexShrink: 0, marginTop: '0.45rem',
                      background: item.highlight ? '#1b61c9' : item.done ? '#059669' : '#e0e2e6',
                    }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(24,29,38,0.45)', marginBottom: '0.125rem' }}>{item.day}</div>
                      <div style={{
                        fontSize: 'var(--text-body)', color: item.highlight ? '#1b61c9' : '#181d26', fontWeight: item.highlight ? 700 : 400,
                      }}>{item.action}</div>
                    </div>
                  </div>
                ))}
                <Link href="/onboarding" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  Start Your Onboarding
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            AURUM ECOSYSTEM
        ══════════════════════════════════════════════════════ */}
        <section className="section-box-surface section-padding">
          <div className="container-xl">
            <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 4rem' }}>
              <span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                The Ecosystem
              </span>
              <h2 className="text-display reveal reveal-delay-1" style={{ color: '#181d26', marginBottom: '1rem' }}>
                One ecosystem.<br />Four powerful products.
              </h2>
              <p className="text-body-lg reveal reveal-delay-2" style={{ color: 'rgba(24,29,38,0.60)' }}>
                Aurum Foundation has built a complete financial infrastructure stack. AutoPilotROI is your onboarding partner for all of it.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
            }}>
              <EcoCard
                icon="🤖"
                title="EX-AI Trading Bot"
                description="Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis."
                tag="LIVE"
                tagColor="#059669"
              />
              <EcoCard
                icon="💳"
                title="Visa Crypto Card"
                description="Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available."
                tag="LIVE"
                tagColor="#059669"
              />
              <EcoCard
                icon="🏛️"
                title="Crypto Exchange"
                description="Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement."
                tag="LIVE"
                tagColor="#059669"
              />
              <EcoCard
                icon="🌐"
                title="Web3 Neobank"
                description="Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets."
                tag="LAUNCHING"
                tagColor="#7c3aed"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SOCIAL PROOF / TESTIMONIALS
        ══════════════════════════════════════════════════════ */}
        <section className="section-box-blue section-padding">
          <div className="container-xl">
            <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3.5rem' }}>
              <span className="badge badge-white reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                Members Speak
              </span>
              <h2 className="text-display reveal reveal-delay-1" style={{ color: '#ffffff', marginBottom: '1rem' }}>
                Real people.<br />Real returns.
              </h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
            }}>
              <Testimonial
                quote="I was skeptical at first but my partner walked me through every step. Had my bot running in 2 days and already seeing consistent daily returns."
                author="Marcus T."
                role="Member since March 2025"
              />
              <Testimonial
                quote="The guided onboarding made all the difference. Never dealt with crypto before — now I have an active portfolio and the bot handles everything."
                author="Sandra K."
                role="Member since January 2025"
              />
              <Testimonial
                quote="What I appreciate most is the transparency. Everything is documented, every step is explained. This isn't some black box — you understand exactly what's happening."
                author="David R."
                role="Partner & Member"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════ */}
        <section className="section-box-navy section-padding">
          <div className="container-xl" style={{ textAlign: 'center' }}>
            <motion.div
              className="reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge" style={{
                background: 'rgba(27,97,201,0.20)',
                color: '#93c5fd',
                border: '1px solid rgba(27,97,201,0.30)',
                marginBottom: '1.5rem',
                display: 'inline-flex',
              }}>
                Ready to start?
              </span>
              <h2 className="text-display" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
                Your AI portfolio<br />starts with $100
              </h2>
              <p className="text-body-lg" style={{
                color: 'rgba(255,255,255,0.62)',
                maxWidth: '38rem',
                margin: '0 auto 2.5rem',
              }}>
                Join thousands of members who activated the EX-AI Bot and put their money to work around the clock. Your AutoPilotROI partner handles the entire setup.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/signup" className="btn btn-primary-lg">
                  Begin Onboarding →
                </Link>
                <Link href="/faqs" className="btn" style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.80)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  padding: '1rem 2.25rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'var(--text-body-lg)',
                }}>
                  Read FAQs
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  )
}
