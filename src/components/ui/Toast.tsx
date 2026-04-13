'use client'

import { useState, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION — Floating feedback for copy/save actions
   Usage: const { toast, ToastContainer } = useToast()
          toast('Copied to clipboard!', 'success')
   ═══════════════════════════════════════════════════════════════ */

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  function ToastContainer() {
    return (
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-[fadeUp_0.3s_ease-out] rounded-xl px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-lg transition-all ${
              t.type === 'success'
                ? 'bg-emerald-500/90 text-white'
                : t.type === 'error'
                ? 'bg-red-500/90 text-white'
                : 'bg-blue-500/90 text-white'
            }`}
          >
            {t.type === 'success' && '✅ '}
            {t.type === 'error' && '❌ '}
            {t.type === 'info' && 'ℹ️ '}
            {t.message}
          </div>
        ))}
      </div>
    )
  }

  return { toast, ToastContainer }
}
