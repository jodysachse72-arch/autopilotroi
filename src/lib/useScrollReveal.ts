'use client'

import { useEffect } from 'react'

/**
 * Reveal-on-scroll hook used by every public page.
 * Adds `in-view` class to elements with `.reveal` once they enter the viewport.
 * Pair with `.reveal`, `.reveal-delay-1`, `.reveal-delay-2`, `.reveal-delay-3` in globals.css.
 *
 * Usage:
 *   useScrollReveal()
 *   <h2 className="reveal">Heading</h2>
 *   <p className="reveal reveal-delay-1">Sub</p>
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
