'use client'

import type { ReactNode, CSSProperties } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CTA = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
  /** Optional element to render before the label (e.g. a play icon) */
  leading?: ReactNode
}

type Bullet = { icon?: ReactNode; text: string }

/**
 * The dark gradient hero used on the homepage.
 * Two-column layout (copy left, visual right) that collapses to one on small viewports.
 *
 * Visual treatment is opinionated — gradient + radial glows + 3 ribbon lines + grain.
 * Use this when a page deserves the "marquee" treatment. For inner pages with less weight,
 * prefer <HeroBlue /> or just a <SectionBox variant="navy" /> with custom content.
 *
 * Usage:
 *   <HeroDark
 *     badge="✦ Powered by Aurum Ecosystem"
 *     title={<>Your Money,<br /><span style={{color:'#93c5fd'}}>Working 24/7</span></>}
 *     description="AutoPilotROI is your structured guide..."
 *     ctas={[
 *       { label: 'Start Here →', href: '/signup', variant: 'primary' },
 *     ]}
 *     bullets={[{ text: 'Start with $100' }, { text: 'AI runs 24/7' }]}
 *     visual={<MyVideoCard />}
 *   />
 */
export default function HeroDark({
  badge,
  title,
  description,
  ctas,
  bullets,
  visual,
  align = 'split',
  innerStyle,
}: {
  badge?: ReactNode
  title: ReactNode
  description?: ReactNode
  ctas?: CTA[]
  bullets?: Bullet[]
  /** Optional right-side visual. If omitted, copy renders centered. */
  visual?: ReactNode
  /** "split" = two-column with visual; "center" = single column copy only */
  align?: 'split' | 'center'
  innerStyle?: CSSProperties
}) {
  const isSplit = align === 'split' && !!visual
  return (
    <section style={{
      background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%)',
      borderRadius: 'var(--radius-section)',
      overflow: 'hidden',
      position: 'relative',
    }}>
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
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.025,
          mixBlendMode: 'overlay',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(5,13,40,0.2) 0%, transparent 30%, transparent 70%, rgba(5,13,40,0.2) 100%)',
        }} />
      </div>

      <div className="container-xl section-padding-lg" style={{ position: 'relative', zIndex: 1, ...innerStyle }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isSplit
            ? 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))'
            : '1fr',
          gap: '4rem',
          alignItems: 'center',
          ...(align === 'center' ? { textAlign: 'center', maxWidth: '52rem', margin: '0 auto' } : {}),
        }}>
          {/* ── Copy column ── */}
          <div>
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="badge badge-white" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-hero"
              style={{ color: '#ffffff', marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                className="text-body-lg"
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  marginBottom: '2.5rem',
                  maxWidth: align === 'center' ? '40rem' : '36rem',
                  ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                {description}
              </motion.p>
            )}

            {ctas && ctas.length > 0 && (
              <motion.div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.875rem',
                  marginBottom: bullets && bullets.length > 0 ? '2rem' : 0,
                  ...(align === 'center' ? { justifyContent: 'center' } : {}),
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                {ctas.map((cta, i) => (
                  <Link
                    key={i}
                    href={cta.href}
                    className={
                      cta.variant === 'ghost'
                        ? 'btn btn-ghost btn-primary-lg shimmer-hover'
                        : 'btn btn-primary-lg shimmer-hover'
                    }
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem' }}
                  >
                    {cta.leading}
                    {cta.label}
                  </Link>
                ))}
              </motion.div>
            )}

            {bullets && bullets.length > 0 && (
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  ...(align === 'center' ? { justifyContent: 'center' } : {}),
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
              >
                {bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>{b.icon ?? '✓'}</span>
                    <span style={{ fontSize: 'var(--text-body)', color: 'rgba(255,255,255,0.68)' }}>{b.text}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ── Visual column ── */}
          {isSplit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
