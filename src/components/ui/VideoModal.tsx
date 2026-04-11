'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoModalProps {
  videoUrl: string
  children: React.ReactNode
}

export default function VideoModal({ videoUrl, children }: VideoModalProps) {
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
        const videoId =
          u.searchParams.get('v') ??
          u.pathname.replace('/embed/', '').replace('/', '')
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      }
      // Already an embed URL
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
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.8rem]">
          {isOpen && (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="AutoPilot ROI Overview Video"
            />
          )}
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
