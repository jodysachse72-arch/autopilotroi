'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import { ICONS, iconOptions } from '../icons'
import { AutomationIcon } from '@/components/ui/Icons'
import type { ProductCardProps } from '../types'

export const ProductCard: ComponentConfig<ProductCardProps> = {
  label: 'Product Card',
  fields: {
    productId:   { type: 'text' },
    name:        { type: 'text', contentEditable: true },
    tagline:     { type: 'text', contentEditable: true },
    description: richTextField(),
    features:    { type: 'array', arrayFields: { value: { type: 'text' } } },
    badge:       { type: 'text' },
    badgeColor:  { type: 'text' },
    iconName:    { type: 'select', options: iconOptions },
    image:       { type: 'text' },
  },
  defaultProps: {
    productId:   'bots',
    name:        'EX-AI Trading Bot',
    tagline:     'AI-Managed Liquidity Engine',
    description: 'Machine-learning algorithms execute trades 24/7...',
    features:    [{ value: '24/7 automated execution' }, { value: 'Multi-exchange arbitrage' }],
    badge:       'Flagship',
    badgeColor:  '#1b61c9',
    iconName:    'AutomationIcon',
    image:       '/product-bots.png',
  },
  render: ({ productId, name, tagline, description, features, badge, badgeColor, iconName, image }) => (
    <div id={productId} style={{ position: 'relative', background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2rem' }} className="shimmer-hover">
      {badge && (
        <span style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: badgeColor || '#1b61c9', color: '#fff', borderRadius: '99px', padding: '0.25rem 0.75rem', fontSize: 'var(--text-caption)', fontWeight: 700 }}>
          {badge}
        </span>
      )}
      {image && (
        <div style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border-light)', aspectRatio: '16 / 9' }}>
          <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      <div className="icon-circle" style={{ width: '3.25rem', height: '3.25rem', borderRadius: 'var(--radius-md)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
        {ICONS[iconName] || <AutomationIcon />}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 700, color: '#181d26', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
        {name}
      </h3>
      <p style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#1b61c9', marginBottom: '0.875rem' }}>
        {tagline}
      </p>
      <div style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, color: 'var(--color-text-weak)', marginBottom: '1.5rem' }}>
        {description}
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {features?.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-body)', color: 'var(--color-text-weak)' }}>
            <svg style={{ width: '1rem', height: '1rem', color: '#1b61c9', flexShrink: 0, marginTop: '0.2rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f.value}
          </li>
        ))}
      </ul>
    </div>
  ),
}
