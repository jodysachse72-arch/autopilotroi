'use client'

/**
 * FontSizeControl — Dropdown for selecting text font size.
 * Uses TipTap FontSize extension.
 * Reusable across any Puck project.
 */

import { useState, useRef, useEffect } from 'react'
import type { Editor } from '@tiptap/core'

const PRESET_SIZES = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]

interface FontSizeControlProps {
  editor: Editor | null
}

export function FontSizeControl({ editor }: FontSizeControlProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = editor?.getAttributes('textStyle')?.fontSize || ''
  const label = current ? String(current).replace('px', '') : '—'

  const apply = (size: number | null) => {
    if (size === null) {
      editor?.chain().focus().unsetFontSize().run()
    } else {
      editor?.chain().focus().setFontSize(`${size}px`).run()
    }
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Font Size"
        style={{
          display: 'flex', alignItems: 'center', gap: 2,
          padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db',
          background: open ? '#e5e7eb' : 'transparent', cursor: 'pointer',
          fontSize: 12, fontWeight: 600, color: '#374151', lineHeight: 1,
          minWidth: 36, justifyContent: 'center',
        }}
      >
        {label}
        <span style={{ fontSize: 8, marginLeft: 2 }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 9999,
          marginTop: 4, padding: 4, borderRadius: 8,
          background: '#fff', border: '1px solid #e2e8f0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: 80,
          maxHeight: 240, overflowY: 'auto',
        }}>
          <button
            type="button"
            onClick={() => apply(null)}
            style={{
              display: 'block', width: '100%', padding: '4px 8px',
              border: 'none', background: !current ? '#e5e7eb' : 'transparent',
              cursor: 'pointer', fontSize: 12, textAlign: 'left',
              borderRadius: 4, color: '#6b7280', fontStyle: 'italic',
            }}
          >
            Default
          </button>
          {PRESET_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => apply(size)}
              style={{
                display: 'block', width: '100%', padding: '4px 8px',
                border: 'none', cursor: 'pointer', fontSize: 12,
                textAlign: 'left', borderRadius: 4,
                background: label === String(size) ? '#e5e7eb' : 'transparent',
                fontWeight: label === String(size) ? 700 : 400,
                color: '#374151',
              }}
            >
              {size}px
            </button>
          ))}
        </div>
      )}
    </div>
  )
}