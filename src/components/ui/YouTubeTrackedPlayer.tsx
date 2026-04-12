'use client'

import { useEffect, useRef, useCallback } from 'react'
import { trackEvent } from '@/lib/analytics'

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, config: Record<string, unknown>) => YTPlayerInstance
      PlayerState: Record<string, number>
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayerInstance {
  destroy: () => void
  getCurrentTime: () => number
  getDuration: () => number
}

interface YouTubeTrackedPlayerProps {
  videoId: string
  title: string
  width?: string | number
  height?: string | number
  className?: string
  /** Called when video reaches milestone (25%, 50%, 75%, 100%) */
  onMilestone?: (milestone: number, videoId: string) => void
}

const MILESTONES = [25, 50, 75, 100]

/**
 * YouTube embedded player with automatic watch-time tracking.
 * Tracks video milestones (25%, 50%, 75%, 100%) via Plausible events.
 * Drop-in replacement for raw iframe embeds when you need analytics.
 */
export default function YouTubeTrackedPlayer({
  videoId,
  title,
  width = '100%',
  height = '100%',
  className = '',
  onMilestone,
}: YouTubeTrackedPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayerInstance | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const milestonesHit = useRef(new Set<number>())

  const checkProgress = useCallback(() => {
    if (!playerRef.current) return

    try {
      const current = playerRef.current.getCurrentTime()
      const duration = playerRef.current.getDuration()
      if (!duration) return

      const percent = (current / duration) * 100

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !milestonesHit.current.has(milestone)) {
          milestonesHit.current.add(milestone)

          trackEvent('video_milestone', {
            videoId,
            title,
            milestone: `${milestone}%`,
          })

          onMilestone?.(milestone, videoId)
        }
      }
    } catch {
      // Player may be destroyed
    }
  }, [videoId, title, onMilestone])

  useEffect(() => {
    if (!containerRef.current) return

    const initPlayer = () => {
      if (!window.YT || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        width,
        height,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onStateChange: (event: { data: number }) => {
            // 1 = Playing
            if (event.data === 1) {
              // Start polling for progress every 2 seconds
              if (!intervalRef.current) {
                intervalRef.current = setInterval(checkProgress, 2000)
              }
            }
            // 0 = Ended, 2 = Paused
            if (event.data === 0 || event.data === 2) {
              checkProgress() // One final check
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
              }
            }
          },
        },
      })
    }

    // Load YouTube IFrame API
    if (window.YT) {
      initPlayer()
    } else {
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
      if (!existingScript) {
        window.onYouTubeIframeAPIReady = initPlayer
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(script)
      } else {
        const poll = setInterval(() => {
          if (window.YT) {
            clearInterval(poll)
            initPlayer()
          }
        }, 100)
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      playerRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  return (
    <div className={`aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}
