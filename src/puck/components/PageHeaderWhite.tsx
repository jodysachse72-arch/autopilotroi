'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import type { PageHeaderWhiteProps } from '../types'

export const PageHeaderWhite: ComponentConfig<PageHeaderWhiteProps> = {
  label: 'Page Header (White)',
  fields: {
    badge:           { type: 'text', contentEditable: true },
    title:           { type: 'text', contentEditable: true },
    highlightedText: { type: 'text', contentEditable: true },
    description1:    richTextField(),
    description2:    richTextField(),
    cta1Label:       { type: 'text', contentEditable: true },
    cta1Href:        { type: 'text' },
    cta2Label:       { type: 'text', contentEditable: true },
    cta2Href:        { type: 'text' },
  },
  defaultProps: {
    badge:           'What Is Aurum',
    title:           'A Complete Financial Ecosystem',
    highlightedText: 'Built on AI and Blockchain',
    description1:    'Aurum Foundation is a legally registered financial technology company...',
    description2:    'The core product is the EX-AI Bot...',
    cta1Label:       'Start Here →',
    cta1Href:        '/signup',
    cta2Label:       'Calculate Your Returns →',
    cta2Href:        '/calculator',
  },
  render: ({ badge, title, highlightedText, description1, description2, cta1Label, cta1Href, cta2Label, cta2Href }) => (
    <section className="section-box" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container-xl section-padding">
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          {badge && (
            <span style={{
              display: 'inline-block', background: 'rgba(27,97,201,0.08)', color: '#1b61c9',
              border: '1px solid rgba(27,97,201,0.15)', borderRadius: '99px',
              padding: '0.375rem 1rem', fontSize: 'var(--text-label)', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              {badge}
            </span>
          )}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800,
            color: '#181d26', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem',
          }}>
            {title}<br /><span style={{ color: '#1b61c9' }}>{highlightedText}</span>
          </h1>
          {description1 && (
            <div style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2rem' }}>
              {description1}
            </div>
          )}
          {description2 && (
            <div style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2.5rem' }}>
              {description2}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
            {cta1Label && cta1Href && (
              <a href={cta1Href} className="btn-primary shimmer-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-btn)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', textDecoration: 'none' }}>
                {cta1Label}
              </a>
            )}
            {cta2Label && cta2Href && (
              <a href={cta2Href} className="btn-outline shimmer-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-btn)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-body)', textDecoration: 'none' }}>
                {cta2Label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  ),
}
