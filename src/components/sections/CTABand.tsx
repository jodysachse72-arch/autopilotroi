'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CTA = { label: string; href: string; variant?: 'primary' | 'ghost' }

/**
 * The dark navy "ready to start?" CTA band that closes most public pages.
 * Eyebrow badge + headline + optional lead + CTA buttons, all centered.
 *
 * Renders as its own <section> with the `section-box-navy` background, so
 * use it as a top-level child of <PageShell>, NOT inside another <SectionBox>.
 *
 * Usage:
 *   <CTABand
 *     eyebrow="Ready to start?"
 *     title={<>Your AI portfolio<br/>starts with $100</>}
 *     description="Join thousands of members…"
 *     ctas={[
 *       { label: 'Begin Onboarding →', href: '/signup' },
 *       { label: 'Read FAQs', href: '/faqs', variant: 'ghost' },
 *     ]}
 *   />
 */
export default function CTABand({
  eyebrow,
  title,
  description,
  ctas,
  id,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  ctas?: CTA[]
  id?: string
}) {
  return (
    <section id={id} className="section-box-navy section-padding">
      <div className="container-xl" style={{ textAlign: 'center' }}>
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <span className="badge" style={{
              background: 'rgba(27,97,201,0.20)',
              color: '#93c5fd',
              border: '1px solid rgba(27,97,201,0.30)',
              marginBottom: '1.5rem',
              display: 'inline-flex',
            }}>
              {eyebrow}
            </span>
          )}

          <h2 className="text-display" style={{ color: '#ffffff', marginBottom: description ? '1.25rem' : '2.5rem' }}>
            {title}
          </h2>

          {description && (
            <p className="text-body-lg" style={{
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '38rem',
              margin: '0 auto 2.5rem',
            }}>
              {description}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {ctas.map((cta, i) =>
                cta.variant === 'ghost' ? (
                  <Link
                    key={i}
                    href={cta.href}
                    className="btn shimmer-hover"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.80)',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      padding: '1rem 2.25rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'var(--text-body-lg)',
                    }}
                  >
                    {cta.label}
                  </Link>
                ) : (
                  <Link key={i} href={cta.href} className="btn btn-primary-lg shimmer-hover">
                    {cta.label}
                  </Link>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
