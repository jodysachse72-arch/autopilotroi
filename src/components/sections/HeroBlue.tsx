'use client'

import type { ReactNode, CSSProperties } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CTA = { label: string; href: string; variant?: 'primary' | 'ghost' }

/**
 * The lighter, brand-blue hero used on inner pages (FAQs, Calculator, Evaluate, etc.).
 * Solid `section-box-blue` background, eyebrow + headline + lead + optional CTAs.
 *
 * Use this when the page doesn't need the full marquee weight of <HeroDark />
 * but still wants a visually distinct "page intro" moment above the content.
 *
 * Usage:
 *   <HeroBlue
 *     eyebrow="Knowledge Base"
 *     title={<>Everything you need<br/>to get started.</>}
 *     description="Find clear answers to the most common questions about AutoPilotROI."
 *   />
 */
export default function HeroBlue({
  eyebrow,
  title,
  description,
  ctas,
  align = 'center',
  innerStyle,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  ctas?: CTA[]
  align?: 'center' | 'left'
  innerStyle?: CSSProperties
}) {
  const centered = align === 'center'
  return (
    <section className="section-box-blue">
      <div
        className="container-xl section-padding-lg"
        style={{
          textAlign: centered ? 'center' : 'left',
          ...(centered ? { maxWidth: '52rem', margin: '0 auto' } : {}),
          ...innerStyle,
        }}
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge badge-white" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          className="text-hero"
          style={{ color: '#ffffff', marginBottom: description ? '1.25rem' : '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="text-body-lg"
            style={{
              color: 'rgba(255,255,255,0.85)',
              marginBottom: ctas && ctas.length > 0 ? '2.25rem' : 0,
              maxWidth: centered ? '40rem' : '38rem',
              ...(centered ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
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
              ...(centered ? { justifyContent: 'center' } : {}),
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
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
              >
                {cta.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
