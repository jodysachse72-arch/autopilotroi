'use client'

import { useEffect, useRef, useCallback } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onloadTurnstileCallback?: () => void
  }
}

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact' | 'invisible'
}

export default function Turnstile({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = 'dark',
  size = 'normal',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current)
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
      theme,
      size,
    })
  }, [siteKey, onVerify, onExpire, onError, theme, size])

  useEffect(() => {
    // Load Turnstile script if not already loaded
    if (window.turnstile) {
      renderWidget()
      return
    }

    const existingScript = document.querySelector('script[src*="turnstile"]')
    if (!existingScript) {
      window.onloadTurnstileCallback = renderWidget
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    } else {
      // Script already loading, wait for it
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          renderWidget()
        }
      }, 100)
      return () => clearInterval(interval)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="flex justify-center" />
}
