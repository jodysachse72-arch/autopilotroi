'use client'

import { useState } from 'react'
import VideoModal from '@/components/ui/VideoModal'

/* ═══════════════════════════════════════════════════════════════
   VideoBlock — standalone YouTube video embed for the CMS.
   Reuses the existing VideoModal (click-to-play lightbox) so
   behaviour is identical to the HeroDark video player.
   ═══════════════════════════════════════════════════════════════ */

const SIZE_MAP: Record<string, string> = {
  small:  '480px',
  medium: '640px',
  large:  '800px',
  full:   '100%',
}

interface VideoBlockProps {
  videoUrl: string
  caption?: string
  displaySize?: 'small' | 'medium' | 'large' | 'full'
}

/** Extract YouTube video ID from any YouTube URL format */
function extractVideoId(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '')
    }
    return u.searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

export default function VideoBlock({
  videoUrl,
  caption,
  displaySize = 'medium',
}: VideoBlockProps) {
  const [imgError, setImgError] = useState(false)

  if (!videoUrl) {
    return (
      <div
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: '#f1f5f9',
          borderRadius: '0.875rem',
          color: '#94a3b8',
          border: '2px dashed #cbd5e1',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-body)',
        }}
      >
        🎬 Set a YouTube URL in the sidebar to display a video
      </div>
    )
  }

  const videoId = extractVideoId(videoUrl)
  const thumbUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : ''
  const maxWidth = SIZE_MAP[displaySize] ?? SIZE_MAP.medium

  const thumbnail = (
    <div
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '1rem',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          background: 'rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
          padding: '0.625rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
        }}
      >
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
        ))}
      </div>

      {/* Thumbnail image */}
      <div style={{ position: 'relative', aspectRatio: '16/9' }}>
        {thumbUrl && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbUrl}
            alt={caption || 'Video'}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0a1830 0%, #0f2040 100%)',
            }}
          />
        )}

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,0,0,0.90)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(255,0,0,0.45)',
            }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
              <path d="M0 0L20 12L0 24V0Z" />
            </svg>
          </div>
        </div>

        {/* "Watch" label */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.875rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              borderRadius: '99px',
              padding: '0.3rem 0.875rem',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 500,
            }}
          >
            ▶ Watch Video
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ maxWidth, margin: '0 auto' }}>
        <VideoModal videoUrl={videoUrl}>
          {thumbnail}
        </VideoModal>
      </div>

      {caption && (
        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
            marginTop: '0.875rem',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
