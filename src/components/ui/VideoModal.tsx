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
    } else {
      dialog.close()
    }
  }, [isOpen])

  // Close on backdrop click
  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    if (isOutside) setIsOpen(false)
  }

  // Derive embed URL
  function getEmbedUrl(url: string) {
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
        let videoId = u.searchParams.get('v')
        if (!videoId) {
          // Handle youtu.be/ID and youtube.com/embed/ID
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
      <span onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        {children}
      </span>

      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="m-auto max-h-screen max-w-5xl w-full rounded-[1.8rem] border border-white/20 bg-slate-950/95 p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative w-full overflow-hidden rounded-[1.8rem]">
          {/* Video */}
          <div className="aspect-video w-full">
            {isOpen && (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="AutoPilot ROI Overview Video"
              />
            )}
          </div>

          {/* CTA Button below video */}
          {ctaLabel && ctaHref && (
            <div className="flex justify-center bg-slate-950/95 px-6 py-5">
              <Link
                href={ctaHref}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 text-lg font-bold text-white shadow-[0_8px_24px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(59,130,246,0.65)]"
              >
                <span className="relative z-10">{ctaLabel}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/35"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  )
}
