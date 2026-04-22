'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated count-up hook. Starts when the element scrolls into view, runs once,
 * eases with cubic-ease-out, formats with `toLocaleString()`.
 *
 * Usage:
 *   const ref = useCountUp(12000)
 *   <span ref={ref}>0</span>
 */
export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(ease * target).toLocaleString()
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return ref
}
