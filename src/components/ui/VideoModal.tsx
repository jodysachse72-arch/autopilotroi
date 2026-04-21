'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface VideoModalProps {
  videoUrl: string
  children: React.ReactNode
  /** Optional CTA button shown below the video */
  ctaLabel?: string
  ctaHref?: string
}

export default function VideoModal({ videoUrl, children, ctaLabel, ctaHref }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on backdrop click
  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const isOutside =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    if (isOutside) setIsOpen(false)
  }

  // Derive embed URL
  function getEmbedUrl(url: string) {
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
        let videoId = u.searchParams.get('v')
        if (!videoId) {
          videoId = u.pathname.replace('/embed/', '').replace('/', '')
        }
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      }
      if (url.includes('/embed/')) return `${url}?autoplay=1`
    } catch {
      // fall through
    }
    return url
  }

  return (
    <>
      <span onClick={() => setIsOpen(true)} style={{ cursor: 'pointer', display: 'contents' }}>
        {children}
      </span>

      {/* ── Dialog: fixed + inset:0 + margin:auto = always centered ── */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        style={{
          position: 'fixed',
          inset: 0,
          margin: 'auto',
          padding: 0,
          border: '1px solid rgba(255,255,255,0.12)',
          width: '90vw',
          maxWidth: '56rem',
          maxHeight: '90vh',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          background: 'transparent',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
        }}
        className="backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div style={{ background: '#0c1220', width: '100%' }}>
          {/* Video */}
          <div style={{ aspectRatio: '16/9', width: '100%' }}>
            {isOpen && (
              <iframe
                src={getEmbedUrl(videoUrl)}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="AutoPilot ROI Overview Video"
              />
            )}
          </div>

          {/* CTA below video */}
          {ctaLabel && ctaHref && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.25rem 1.5rem', background: '#0c1220' }}>
              <Link
                href={ctaHref}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                  color: '#ffffff',
                  padding: '0.875rem 2.5rem',
                  borderRadius: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(27,97,201,0.45)',
                  transition: 'transform 150ms ease, box-shadow 150ms ease',
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute', right: '1rem', top: '1rem',
              width: '2.25rem', height: '2.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.125rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'background 150ms ease',
            }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  )
}
