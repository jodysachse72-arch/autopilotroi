'use client'

import { useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ImageUrlField — Puck custom field that renders a standard text
   input for an image URL plus a live preview thumbnail below it.

   If the URL resolves correctly → shows thumbnail.
   If the URL is blank → shows empty state prompt.
   If the URL fails to load → shows an error indicator.

   Use in puck.config.tsx:
     src: {
       type: 'custom',
       label: 'Image URL',
       render: ({ value, onChange }) => (
         <ImageUrlField value={value} onChange={onChange} />
       ),
     }
   ═══════════════════════════════════════════════════════════════ */

interface ImageUrlFieldProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export default function ImageUrlField({ value, onChange, label = 'Image URL' }: ImageUrlFieldProps) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
    setStatus('idle')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {/* Label */}
      <label
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#374151',
          display: 'block',
        }}
      >
        {label}
      </label>

      {/* URL input */}
      <input
        type="url"
        value={value ?? ''}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: `1.5px solid ${status === 'error' ? '#ef4444' : status === 'ok' ? '#10b981' : '#d1d5db'}`,
          borderRadius: '0.5rem',
          fontSize: '0.8125rem',
          fontFamily: 'monospace',
          color: '#111827',
          background: '#ffffff',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 150ms ease',
        }}
      />

      {/* Live preview */}
      {value ? (
        <div
          style={{
            position: 'relative',
            borderRadius: '0.625rem',
            overflow: 'hidden',
            border: `1.5px solid ${status === 'error' ? '#fecaca' : '#e5e7eb'}`,
            background: '#f9fafb',
            minHeight: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            onLoad={() => setStatus('ok')}
            onError={() => setStatus('error')}
            style={{
              maxWidth: '100%',
              maxHeight: '9rem',
              objectFit: 'contain',
              display: status === 'error' ? 'none' : 'block',
            }}
          />

          {/* Error state */}
          {status === 'error' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#ef4444',
                  fontWeight: 600,
                }}
              >
                Image failed to load
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: '#9ca3af',
                }}
              >
                Check the URL and try again
              </span>
            </div>
          )}

          {/* Loading — shown while idle and img is loading */}
          {status === 'idle' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(249,250,251,0.8)',
                fontSize: '0.75rem',
                color: '#9ca3af',
              }}
            >
              Loading preview…
            </div>
          )}

          {/* Success badge */}
          {status === 'ok' && (
            <div
              style={{
                position: 'absolute',
                top: '0.375rem',
                right: '0.375rem',
                background: '#10b981',
                color: '#ffffff',
                borderRadius: '99px',
                fontSize: '0.625rem',
                fontWeight: 700,
                padding: '0.1rem 0.5rem',
                letterSpacing: '0.05em',
              }}
            >
              ✓ OK
            </div>
          )}
        </div>
      ) : (
        /* Empty state */
        <div
          style={{
            background: '#f9fafb',
            border: '1.5px dashed #d1d5db',
            borderRadius: '0.625rem',
            padding: '1.25rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#9ca3af',
          }}
        >
          📷 Paste an image URL above to preview it here
        </div>
      )}
    </div>
  )
}
