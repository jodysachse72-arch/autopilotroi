'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import VideoModal from '@/components/ui/VideoModal'

/* ═══════════════════════════════════════════════════════════════
   HERO — dark navy gradient with split layout.
   Left:  badge → headline → description → CTAs → social proof → trust bullets
   Right: video mockup panel (browser-chrome style card)
   ═══════════════════════════════════════════════════════════════ */

const TRUST_BULLETS = [
  'Start with $100 USDT',
  'AI trades 24/7 — you sleep',
  'Setup complete in 3 days',
] as const

const VIDEO_URL = 'https://youtu.be/MmAnR4YAPv4'

/* ── Reusable SVG check icon with glow circle ── */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill="rgba(52,211,153,0.15)" />
      <path
        d="M5.5 9l2.5 2.5 4.5-4.5"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Avatar cluster for social proof ── */
const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#059669'] as const

function AvatarCluster() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      <div style={{ display: 'flex' }}>
        {AVATAR_COLORS.map((bg, i) => (
          <div
            key={bg}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: bg,
              border: '2px solid rgba(5,13,40,0.8)',
              marginLeft: i === 0 ? 0 : -8,
              position: 'relative',
              zIndex: AVATAR_COLORS.length - i,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {['J', 'M', 'S', 'A'][i]}
          </div>
        ))}
      </div>
      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}>
        Join <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>12,000+</strong> members
      </span>
    </div>
  )
}

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%)',
        borderRadius: 'var(--radius-section, 1.5rem)',
        overflow: 'hidden',
        position: 'relative',
        margin: '0',
      }}
    >
      {/* ── Atmospheric layers ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Primary right glow */}
        <div style={{
          position: 'absolute', right: '-5%', top: '-10%',
          width: '60vmax', height: '60vmax', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,97,201,0.42) 0%, rgba(27,97,201,0.08) 45%, transparent 65%)',
        }} />
        {/* Secondary left ambient */}
        <div style={{
          position: 'absolute', left: '-10%', bottom: '-15%',
          width: '50vmax', height: '50vmax', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 55%)',
        }} />
        {/* Data ribbons */}
        <div className="hero-ribbon-line" style={{ top: '28%', animationDelay: '0s' }} />
        <div className="hero-ribbon-line" style={{ top: '52%', animationDelay: '2s' }} />
        <div className="hero-ribbon-line" style={{ top: '74%', animationDelay: '4s' }} />
        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.025,
          mixBlendMode: 'overlay' as const,
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(5,13,40,0.2) 0%, transparent 30%, transparent 70%, rgba(5,13,40,0.2) 100%)',
        }} />
      </div>

      {/* ── Content ── */}
      <div
        className="container-content"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(4rem, 10vw, 7rem)',
          paddingBottom: 'clamp(4rem, 10vw, 7rem)',
        }}
      >
        {/* EXPLICIT 2-col on lg, stack on mobile */}
        <div className="hero-split">
          {/* ── Copy column ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.375rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.72)',
                  marginBottom: '1.5rem',
                }}
              >
                ✦ AI Managed Finance
              </span>
            </motion.div>

            <motion.h1
              className="text-hero"
              style={{ color: '#ffffff', marginBottom: '1.25rem' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Money,
              <br />
              <span style={{ color: '#93c5fd' }}>Working 24/7</span>
            </motion.h1>

            <motion.p
              className="text-body-lg"
              style={{
                color: 'rgba(255,255,255,0.78)',
                marginBottom: '2rem',
                maxWidth: '32rem',
                lineHeight: '1.7',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Start earning with $100 USDT. AutoPilotROI guides you into the Aurum
              ecosystem step by step — AI trading bot, Visa crypto card, exchange,
              and Web3 neobank. No experience needed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/signup"
                className="hero-btn-primary"
              >
                Start Here →
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="hero-btn-secondary"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.8 }}>
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
                See how it works
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              style={{ marginBottom: '1.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
            >
              <AvatarCluster />
            </motion.div>

            {/* Trust bullets */}
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
            >
              {TRUST_BULLETS.map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckIcon />
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.01em' }}>
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Visual column — video mockup ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <VideoModal
              videoUrl={VIDEO_URL}
              ctaLabel="Start Here →"
              ctaHref="/signup"
              externalOpen={videoOpen}
              onOpenChange={setVideoOpen}
            >
              <div
                className="hero-video-card"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                  width: '100%',
                  maxWidth: '520px',
                }}
              >
                {/* Browser chrome bar — hidden on mobile via CSS */}
                <div className="hero-video-chrome"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderBottom: '1px solid rgba(255,255,255,0.10)',
                    padding: '0.625rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                  ))}
                  <span
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '0.6875rem',
                      color: 'rgba(255,255,255,0.35)',
                      marginLeft: '-1.5rem',
                    }}
                  >
                    app.autopilotroi.com
                  </span>
                </div>

                {/* Video thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg"
                    alt="AutoPilotROI Overview Video"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
                  {/* Play button */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                        transition: 'transform 200ms ease, background 200ms ease',
                      }}
                    >
                      <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
                        <path d="M0 0L18 11L0 22V0Z" />
                      </svg>
                    </div>
                  </div>
                  {/* Watch label */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.875rem',
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '99px',
                        padding: '0.35rem 0.875rem',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.85)',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}
                    >
                      ▶ Watch Overview
                    </span>
                  </div>
                </div>
              </div>
            </VideoModal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
