'use client'

/**
 * DropdownPortal — Renders dropdown menus via React Portal to escape
 * overflow:hidden containers (like Puck's sidebar richtext field).
 *
 * Positions the portal panel relative to the trigger button using
 * getBoundingClientRect(), so it works regardless of parent overflow.
 *
 * Reusable across any Puck project.
 */

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
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
  /** Align dropdown to left or right of trigger. Default 'left' */
  align?: 'left' | 'right'
}

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
  const [pos, setPos] = useState({ top: 0, left: 0 })

  // Calculate position when open
  const updatePos = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const left = align === 'right'
      ? rect.right - width
      : rect.left
    setPos({
      top: rect.bottom + 4,
      left: Math.max(4, left), // don't go off-screen left
    })
  }, [align, width])

  useEffect(() => {
    if (!open) return
    updatePos()
    // Reposition on scroll/resize
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
            padding: 8,
            borderRadius: 8,
            background: '#fff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          }}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  )
}
