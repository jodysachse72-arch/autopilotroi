'use client'

import { useState } from 'react'

/**
 * YouTube thumbnail with multi-quality fallback chain.
 * Uses mqdefault.jpg as primary (most reliable across all videos).
 * Falls back to 0.jpg, then a styled gradient placeholder.
 * Always renders with a dark gradient background behind the image
 * so gray/missing thumbnails are masked.
 */
export default function YouTubeThumbnail({
  videoId,
  title,
  className = '',
}: {
  videoId: string
  title: string
  className?: string
}) {
  // mqdefault is the most reliable — 320x180, always generated
  // hqdefault can return gray for some videos
  const sources = [
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`,
  ]

  const [sourceIdx, setSourceIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  function handleError() {
    if (sourceIdx < sources.length - 1) {
      setSourceIdx((i) => i + 1)
    } else {
      setFailed(true)
    }
  }

  // Gradient fallback — always visible behind the image
  const gradientBg = 'bg-gradient-to-br from-[#0c1e4a] via-[#162d6b] to-[#0a1535]'

  if (failed) {
    return (
      <div className={`flex items-center justify-center ${gradientBg} ${className}`}>
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-400/20">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-blue-400">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
          <p className="text-xs font-medium text-white/60 line-clamp-2 max-w-[160px]">{title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${gradientBg} ${className}`}>
      <img
        src={sources[sourceIdx]}
        alt={title}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
