'use client'

/**
 * HighlightColorControl — Background/highlight color picker for text.
 * Uses TipTap BackgroundColor extension.
 * Reuses the same palette pattern as ColorPickerControl.
 * Reusable across any Puck project.
 */

import { useState, useRef, useEffect } from 'react'
import type { Editor } from '@tiptap/core'

const PRESET_COLORS = [
  '', '#fff3cd', '#cce5ff', '#d4edda', '#f8d7da',
  '#fef9c3', '#dbeafe', '#dcfce7', '#fecaca', '#e2e8f0',
  '#fbbf24', '#3b82f6', '#22c55e', '#ef4444', '#64748b',
  '#f59e0b', '#1b61c9', '#059669', '#dc2626', '#1e293b',
]

interface HighlightColorControlProps {
  editor: Editor | null
}

export function HighlightColorControl({ editor }: HighlightColorControlProps) {
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

  const currentBg = editor?.getAttributes('textStyle')?.backgroundColor || ''

  const apply = (color: string) => {
    if (!color) {
      editor?.chain().focus().unsetBackgroundColor().run()
    } else {
      editor?.chain().focus().setBackgroundColor(color).run()
    }
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Highlight Color"
        style={{
          display: 'flex', alignItems: 'center', gap: 2,
          padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db',
          background: open ? '#e5e7eb' : 'transparent', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1,
        }}
      >
        <span style={{
          display: 'inline-block', width: 14, height: 14, borderRadius: 3,
          background: currentBg || 'linear-gradient(135deg, #fbbf24 25%, #3b82f6 75%)',
          border: '1px solid rgba(0,0,0,0.15)',
        }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 9999,
          marginTop: 4, padding: 8, borderRadius: 8,
          background: '#fff', border: '1px solid #e2e8f0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: 200,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 4, marginBottom: 4,
          }}>
            {PRESET_COLORS.map((color, i) => (
              <button
                key={color || 'none'}
                type="button"
                onClick={() => apply(color)}
                title={color || 'Remove highlight'}
                style={{
                  width: 28, height: 28, borderRadius: 4,
                  background: color || '#fff',
                  border: (currentBg === color)
                    ? '2px solid #1b61c9'
                    : '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer', outline: 'none',
                  position: 'relative',
                }}
              >
                {!color && (
                  <span style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%) rotate(-45deg)',
                    width: 20, height: 2, background: '#dc2626',
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}