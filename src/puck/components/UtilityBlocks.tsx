'use client'

import type { ComponentConfig } from '@puckeditor/core'
import type { HtmlBlockProps, SpacerProps, ImageBlockProps, ButtonBlockProps } from '../types'
import type React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Image Block
// ─────────────────────────────────────────────────────────────────────────────

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  label: 'Image',
  fields: {
    src:          { type: 'text', label: 'Image URL' },
    alt:          { type: 'text', label: 'Alt Text' },
    maxWidth:     { type: 'number', label: 'Max Width (px)', min: 100, max: 1400 },
    borderRadius: { type: 'number', label: 'Border Radius (px)', min: 0, max: 50 },
  },
  defaultProps: {
    src:          '',
    alt:          'Image',
    maxWidth:     800,
    borderRadius: 12,
  },
  render: ({ src, alt, maxWidth, borderRadius }) => (
    src ? (
      <div style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: 'auto', borderRadius: `${borderRadius}px`, display: 'block' }}
        />
      </div>
    ) : (
      <div style={{
        padding: '3rem', textAlign: 'center', background: '#f1f5f9',
        borderRadius: `${borderRadius}px`, color: '#94a3b8', border: '2px dashed #cbd5e1',
      }}>
        📷 Set image URL in sidebar
      </div>
    )
  ),
}
