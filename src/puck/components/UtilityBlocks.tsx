'use client'

import type { ComponentConfig } from '@puckeditor/core'
import type { HtmlBlockProps, SpacerProps, ImageBlockProps, ButtonBlockProps } from '../types'
import type React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// HTML Block — raw HTML editing
// ─────────────────────────────────────────────────────────────────────────────

export const HtmlBlock: ComponentConfig<HtmlBlockProps> = {
  label: 'HTML Block',
  fields: {
    html: { type: 'textarea', label: 'HTML Code' },
  },
  defaultProps: {
    html: '<div style="padding: 2rem; text-align: center; color: #666;"><p>Custom HTML block — edit the HTML in the sidebar panel.</p></div>',
  },
  render: ({ html }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Spacer — vertical whitespace
// ─────────────────────────────────────────────────────────────────────────────

export const Spacer: ComponentConfig<SpacerProps> = {
  label: 'Spacer',
  fields: {
    height: { type: 'number', label: 'Height (px)', min: 8, max: 200 },
  },
  defaultProps: { height: 40 },
  render: ({ height }) => (
    <div style={{ height: `${height}px` }} aria-hidden="true" />
  ),
}

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

// ─────────────────────────────────────────────────────────────────────────────
// Button Block
// ─────────────────────────────────────────────────────────────────────────────

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  label: 'Button',
  fields: {
    label:   { type: 'text', contentEditable: true, label: 'Button Text' },
    href:    { type: 'text', label: 'Link URL' },
    variant: {
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Primary (blue)', value: 'primary' },
        { label: 'Outline',        value: 'outline' },
        { label: 'Ghost (text only)', value: 'ghost' },
      ],
    },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left',   value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right',  value: 'right' },
      ],
    },
    fullWidth: { type: 'radio', label: 'Full Width', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
  },
  defaultProps: {
    label:     'Click Here →',
    href:      '#',
    variant:   'primary',
    align:     'left',
    fullWidth: false,
  },
  render: ({ label, href, variant, align, fullWidth }) => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: '0.375rem', padding: '0.875rem 2rem',
      borderRadius: 'var(--radius-btn, 12px)',
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: 'var(--text-body, 1rem)', textDecoration: 'none',
      cursor: 'pointer', transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
    }
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: { background: 'var(--color-accent, #1b61c9)', color: '#fff', border: 'none' },
      outline: { background: 'transparent', color: 'var(--color-accent, #1b61c9)', border: '2px solid var(--color-accent, #1b61c9)' },
      ghost:   { background: 'transparent', color: 'var(--color-accent, #1b61c9)', border: 'none', textDecoration: 'underline' },
    }
    return (
      <div style={{ textAlign: align as 'left' | 'center' | 'right' }}>
        <a href={href} style={{ ...baseStyle, ...variantStyles[variant] }} className="shimmer-hover">
          {label}
        </a>
      </div>
    )
  },
}
