'use client'

import { useState, useMemo } from 'react'

/* ═══════════════════════════════════════════════════════════════
   VideoUrlField — Puck custom field for YouTube video URLs
   with automatic thumbnail preview and manual override.

   Features:
   - YouTube URL input with validation
   - Auto-extracted thumbnail preview
   - Manual thumbnail URL override
   - Broken thumbnail fallback
   - Clear helper text
   ═══════════════════════════════════════════════════════════════ */

interface VideoUrlFieldProps {
  value: string
  onChange: (value: string) => void
  label?: string
  /** Optional: manual thumbnail override URL */
  thumbnailValue?: string
  onThumbnailChange?: (value: string) => void
}

/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string | null {
  if (!url) return null
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  // youtube.com/watch?v=ID
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]
  // youtube.com/embed/ID
  const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/)
  if (embedMatch) return embedMatch[1]
  return null
}

export default function VideoUrlField({
  value,
  onChange,
  label = 'YouTube Video URL',
  thumbnailValue,
  onThumbnailChange,
}: VideoUrlFieldProps) {
  const [thumbStatus, setThumbStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  const videoId = useMemo(() => extractYouTubeId(value || ''), [value])
  const autoThumb = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null
  const displayThumb = thumbnailValue || autoThumb
  const isValidUrl = !!videoId

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
    setThumbStatus('idle')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {/* Label */}
      <label style={{
        fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block',
      }}>
        {label}
      </label>

      {/* URL input */}
      <input
        type="url"
        value={value ?? ''}
        onChange={handleChange}
        placeholder="https://youtu.be/abc123 or https://youtube.com/watch?v=abc123"
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: `1.5px solid ${isValidUrl ? '#10b981' : value ? '#f59e0b' : '#d1d5db'}`,
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

      {/* Validation hint */}
      {value && !isValidUrl && (
        <div style={{
          fontSize: '0.6875rem', color: '#d97706',
          background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: '0.375rem', padding: '0.375rem 0.625rem',
          fontWeight: 500,
        }}>
          ⚠ Could not detect a YouTube video ID. Use: youtu.be/ID or youtube.com/watch?v=ID
        </div>
      )}
      {value && isValidUrl && (
        <div style={{ fontSize: '0.625rem', color: '#059669', fontWeight: 500 }}>
          ✓ Video ID: {videoId}
        </div>
      )}

      {/* Thumbnail preview */}
      {displayThumb ? (
        <div style={{
          position: 'relative',
          borderRadius: '0.625rem',
          overflow: 'hidden',
          border: `1.5px solid ${thumbStatus === 'error' ? '#fecaca' : '#e5e7eb'}`,
          background: '#0f172a',
          aspectRatio: '16/9',
          maxHeight: '10rem',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayThumb}
            alt="Video thumbnail"
            onLoad={() => setThumbStatus('ok')}
            onError={() => setThumbStatus('error')}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: thumbStatus === 'error' ? 'none' : 'block',
            }}
          />

          {/* Play button overlay */}
          {thumbStatus === 'ok' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,0,0,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="white">
                  <path d="M0 0L14 8L0 16V0Z" />
                </svg>
              </div>
            </div>
          )}

          {/* Broken thumbnail */}
          {thumbStatus === 'error' && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '0.375rem',
              padding: '1.5rem', textAlign: 'center', height: '100%',
              color: '#9ca3af',
            }}>
              <span style={{ fontSize: '1.5rem' }}>🎬</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                Thumbnail unavailable
              </span>
              <span style={{ fontSize: '0.625rem' }}>
                The video will still work — thumbnail may load after publishing
              </span>
            </div>
          )}

          {/* Source label */}
          {thumbStatus === 'ok' && (
            <div style={{
              position: 'absolute', bottom: '0.375rem', right: '0.375rem',
              background: 'rgba(0,0,0,0.6)', color: '#fff',
              borderRadius: 99, fontSize: '0.5625rem', fontWeight: 600,
              padding: '0.15rem 0.5rem',
              backdropFilter: 'blur(4px)',
            }}>
              {thumbnailValue ? '📷 Custom' : '🔗 Auto'}
            </div>
          )}
        </div>
      ) : (
        /* No URL yet */
        <div style={{
          background: '#0f172a', border: '1.5px dashed #334155',
          borderRadius: '0.625rem', padding: '1.25rem',
          textAlign: 'center', fontSize: '0.75rem', color: '#64748b',
          aspectRatio: '16/9', maxHeight: '8rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          🎬 Paste a YouTube URL above to preview
        </div>
      )}

      {/* Manual thumbnail override */}
      {onThumbnailChange && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#6b7280' }}>
            Custom Thumbnail URL (optional — overrides auto-generated)
          </label>
          <input
            type="url"
            value={thumbnailValue ?? ''}
            onChange={(e) => onThumbnailChange(e.target.value)}
            placeholder="Leave blank to use YouTube auto-thumbnail"
            style={{
              width: '100%',
              padding: '0.375rem 0.625rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#6b7280',
              background: '#fafafa',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {/* Helper text */}
      <div style={{ fontSize: '0.625rem', color: '#9ca3af', lineHeight: 1.4 }}>
        Supported: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
      </div>
    </div>
  )
}
