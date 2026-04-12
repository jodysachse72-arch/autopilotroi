'use client'

import { useState } from 'react'

/**
 * YouTube thumbnail with multi-quality fallback chain.
 * YouTube returns a grey placeholder (valid 200 image) for missing resolutions.
 * We try hqdefault → 0.jpg (always exists). If all fail, gradient fallback.
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
  // 0.jpg is the most reliable — every YouTube video has it
  const sources = [
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`,
  ]

  const [sourceIdx, setSourceIdx] = useState(0)
  const [failed, setFailed] = useState(false)

  function handleError() {
    if (sourceIdx < sources.length - 1) {
      setSourceIdx((i) => i + 1)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#0c1e4a] via-[#162d6b] to-[#0a1535] ${className}`}>
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
    <img
      src={sources[sourceIdx]}
      alt={title}
      onError={handleError}
      loading="lazy"
      className={className}
    />
  )
}
