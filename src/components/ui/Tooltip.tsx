'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TOOLTIP — Contextual help that appears on hover/focus
   
   Usage:
   <Tooltip content="This explains what the button does">
     <button>My Button</button>
   </Tooltip>
   
   For longer explanations:
   <Tooltip 
     content="Short title"
     detail="Longer explanation that appears below the title"
   >
     <span>Hover me</span>
   </Tooltip>
   ═══════════════════════════════════════════════════════════════ */

interface TooltipProps {
  children: ReactNode
  content: string
  detail?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: number
}

export default function Tooltip({ children, content, detail, position = 'top', maxWidth = 280 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const tooltip = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = trigger.top - tooltip.height - 8
        left = trigger.left + trigger.width / 2 - tooltip.width / 2
        break
      case 'bottom':
        top = trigger.bottom + 8
        left = trigger.left + trigger.width / 2 - tooltip.width / 2
        break
      case 'left':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2
        left = trigger.left - tooltip.width - 8
        break
      case 'right':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2
        left = trigger.right + 8
        break
    }

    // Keep within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltip.width - 8))
    top = Math.max(8, top)

    setCoords({ top, left })
  }, [visible, position])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          className="fixed z-[200] pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{ top: coords.top, left: coords.left, maxWidth }}
        >
          <div className="rounded-lg bg-[#0c1a35] border border-white/10 px-3 py-2 shadow-xl shadow-black/30">
            <p className="text-xs font-medium text-white leading-relaxed">{content}</p>
            {detail && (
              <p className="mt-1 text-[11px] text-white/50 leading-relaxed">{detail}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* ── Info Icon + Tooltip combo ── */
export function InfoTip({ content, detail }: { content: string; detail?: string }) {
  return (
    <Tooltip content={content} detail={detail}>
      <span className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-white/5 text-[10px] text-white/30 hover:bg-white/10 hover:text-white/50 transition">
        ?
      </span>
    </Tooltip>
  )
}
