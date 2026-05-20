'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import { ICONS, iconOptions } from '../icons'
import { BankIcon } from '@/components/ui/Icons'
import type { TrustSignalCardProps } from '../types'

export const TrustSignalCard: ComponentConfig<TrustSignalCardProps> = {
  label: 'Trust Signal',
  fields: {
    iconName: { type: 'select', options: iconOptions },
    title:    { type: 'text', contentEditable: true },
    body:     richTextField(),
  },
  defaultProps: {
    iconName: 'BankIcon',
    title:    'Legally Registered',
    body:     'Aurum Foundation Limited was officially incorporated...',
  },
  render: ({ iconName, title, body }) => (
    <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }} className="shimmer-hover">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div className="icon-circle" style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: 'var(--radius-md)', fontSize: '1.375rem' }}>
          {ICONS[iconName] || <BankIcon />}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 700, color: '#181d26', letterSpacing: '-0.01em' }}>
          {title}
        </h3>
      </div>
      <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
        {body}
      </div>
    </div>
  ),
}
