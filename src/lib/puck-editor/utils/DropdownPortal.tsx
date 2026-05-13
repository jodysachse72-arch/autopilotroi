'use client'

/**
 * DropdownPortal — Renders dropdown menus via React Portal to escape
 * overflow:hidden containers (like Puck's sidebar richtext field).
 *
 * Smart positioning:
 * - Measures both trigger and panel after render
 * - Flips above trigger if not enough space below
 * - Shifts left if panel would overflow viewport right edge
 * - Repositions on scroll/resize
 *
 * Reusable across any Puck project.
 */

import { useState, useRef, useEffect, useCallback, useLayoutEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface DropdownPortalProps {
  /** The trigger button element */
  trigger: ReactNode
  /** The dropdown panel content */
  children: ReactNode
  /** Whether the dropdown is open */
  open: boolean
  /** Called when the dropdown should close */
  onClose: () => void
  /** Dropdown panel width in px. Default 200 */
  width?: number
  /** Preferred alignment: 'left' or 'right' of trigger. Default 'left'. Auto-corrects if off-screen. */
  align?: 'left' | 'right'
}

const GAP = 4       // gap between trigger and panel
const MARGIN = 8    // minimum margin from viewport edges

export function DropdownPortal({
  trigger,
  children,
  open,
  onClose,
  width = 200,
  align = 'left',
}: DropdownPortalProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0, opacity: 0 })

  // Calculate position — runs after panel is mounted so we can measure it
  const updatePos = useCallback(() => {
    if (!triggerRef.current) return
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const panelEl = panelRef.current
    const panelHeight = panelEl ? panelEl.offsetHeight : 300
    const panelWidth = panelEl ? panelEl.offsetWidth : width

    const vw = window.innerWidth
    const vh = window.innerHeight

    // --- Vertical positioning ---
    // Prefer below the trigger
    let top = triggerRect.bottom + GAP
    // If panel would overflow bottom, flip above
    if (top + panelHeight + MARGIN > vh) {
      top = triggerRect.top - panelHeight - GAP
    }
    // If still off-screen (tiny viewport), clamp to top
    if (top < MARGIN) {
      top = MARGIN
    }

    // --- Horizontal positioning ---
    let left: number
    if (align === 'right') {
      // Align panel's right edge with trigger's right edge
      left = triggerRect.right - panelWidth
    } else {
      // Align panel's left edge with trigger's left edge
      left = triggerRect.left
    }
    // Clamp: don't overflow right edge
    if (left + panelWidth + MARGIN > vw) {
      left = vw - panelWidth - MARGIN
    }
    // Clamp: don't overflow left edge
    if (left < MARGIN) {
      left = MARGIN
    }

    setPos({ top, left, opacity: 1 })
  }, [align, width])

  // Position on open and after panel mounts
  useLayoutEffect(() => {
    if (!open) return
    // Reset opacity so panel is invisible during first measure
    setPos(prev => ({ ...prev, opacity: 0 }))
    // Wait one frame for panel to mount, then measure
    const raf = requestAnimationFrame(() => {
      updatePos()
    })
    return () => cancelAnimationFrame(raf)
  }, [open, updatePos])

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)
    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [open, updatePos])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-flex' }}>
        {trigger}
      </div>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: 99999,
            width,
            maxHeight: `calc(100vh - ${MARGIN * 2}px)`,
            overflowY: 'auto',
            padding: 8,
            borderRadius: 8,
            background: '#fff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            opacity: pos.opacity,
            transition: 'opacity 0.08s ease-out',
          }}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  )
}
