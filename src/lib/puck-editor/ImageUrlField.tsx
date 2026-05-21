'use client'

import { useState, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ImageUrlField — Puck custom field with UPLOAD + URL input.

   Features:
   - Upload button → Supabase Storage → public URL auto-filled
   - Manual URL input with live preview
   - File type/size validation
   - Upload progress indicator
   - Broken image detection
   ═══════════════════════════════════════════════════════════════ */

interface ImageUrlFieldProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

const MAX_SIZE_MB = 5
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']

export default function ImageUrlField({ value, onChange, label = 'Image URL' }: ImageUrlFieldProps) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
    setStatus('idle')
    setUploadError(null)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side validation
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setUploadError(`Invalid type: .${ext}. Use: ${ALLOWED_EXTENSIONS.join(', ')}`)
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadError(`Too large: ${(file.size / 1024 / 1024).toFixed(1)} MB. Max: ${MAX_SIZE_MB} MB`)
      return
    }

    setUploading(true)
    setUploadError(null)
    setStatus('idle')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const writeSecret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || ''
      const res = await fetch('/api/puck/upload', {
        method: 'POST',
        headers: { 'x-puck-write-secret': writeSecret },
        body: formData,
      })

      const data = await res.json()

      if (res.ok && data.url) {
        onChange(data.url)
        setStatus('idle') // Will become 'ok' when img loads
        setUploadError(null)
      } else {
        setUploadError(data.error || 'Upload failed')
      }
    } catch {
      setUploadError('Upload failed — check your connection')
    } finally {
      setUploading(false)
      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
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

      {/* Upload button + URL input row */}
      <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'stretch' }}>
        {/* Upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1.5px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: uploading ? '#9ca3af' : '#1b61c9',
            background: uploading ? '#f3f4f6' : '#eff6ff',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontFamily: 'system-ui',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'background 0.15s ease',
            flexShrink: 0,
          }}
        >
          {uploading ? (
            <>
              <span style={{
                width: 12, height: 12,
                border: '2px solid #e2e8f0', borderTopColor: '#3b82f6',
                borderRadius: '50%', display: 'inline-block',
                animation: 'spin 0.7s linear infinite',
              }} />
              Uploading…
            </>
          ) : (
            <>📤 Upload</>
          )}
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />

        {/* URL text input */}
        <input
          type="url"
          value={value ?? ''}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          style={{
            flex: 1,
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
            minWidth: 0,
          }}
        />
      </div>

      {/* Upload error */}
      {uploadError && (
        <div style={{
          fontSize: '0.6875rem',
          color: '#dc2626',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.375rem',
          padding: '0.375rem 0.625rem',
          fontWeight: 500,
        }}>
          ⚠ {uploadError}
        </div>
      )}

      {/* Helper text */}
      <div style={{ fontSize: '0.625rem', color: '#9ca3af', lineHeight: 1.4 }}>
        Upload an image (max {MAX_SIZE_MB} MB) or paste a URL. Supports: JPG, PNG, WebP, GIF, SVG.
      </div>

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
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '0.375rem', padding: '1rem', textAlign: 'center',
            }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>
                Image failed to load
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#9ca3af' }}>
                Check the URL and try again
              </span>
            </div>
          )}

          {/* Loading */}
          {status === 'idle' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(249,250,251,0.8)',
              fontSize: '0.75rem', color: '#9ca3af',
            }}>
              Loading preview…
            </div>
          )}

          {/* Success badge */}
          {status === 'ok' && (
            <div style={{
              position: 'absolute', top: '0.375rem', right: '0.375rem',
              background: '#10b981', color: '#ffffff',
              borderRadius: '99px', fontSize: '0.625rem', fontWeight: 700,
              padding: '0.1rem 0.5rem', letterSpacing: '0.05em',
            }}>
              ✓ OK
            </div>
          )}
        </div>
      ) : (
        /* Empty state */
        <div style={{
          background: '#f9fafb',
          border: '1.5px dashed #d1d5db',
          borderRadius: '0.625rem',
          padding: '1.25rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#9ca3af',
        }}>
          📷 Upload or paste an image URL to preview
        </div>
      )}
    </div>
  )
}
