'use client'

/**
 * YouTubeThumbnail — dead-simple, zero-JavaScript thumbnail.
 * 
 * Uses a plain <img> tag pointing to i.ytimg.com.
 * Falls back to a styled gradient placeholder with play icon.
 * No state management, no error chains, no canvas tricks.
 */

interface YouTubeThumbnailProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeThumbnail({ videoId, title, className = '' }: YouTubeThumbnailProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0a1830] via-[#0f2040] to-[#061228] ${className}`}>
      {/* Actual YouTube thumbnail — uses i.ytimg.com (most reliable CDN) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: 'auto' }}
      />
      {/* Subtle bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}
