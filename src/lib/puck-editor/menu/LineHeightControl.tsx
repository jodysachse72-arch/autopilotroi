'use client'

/**
 * LineHeightControl — Dropdown for selecting line height.
 * Uses TipTap LineHeight extension.
 * Reusable across any Puck project.
 */

import { useState, useRef, useEffect } from 'react'
import type { Editor } from '@tiptap/core'

const LINE_HEIGHT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: '1', value: '1' },
  { label: '1.15', value: '1.15' },
  { label: '1.3', value: '1.3' },
  { label: '1.5', value: '1.5' },
  { label: '1.75', value: '1.75' },
  { label: '2', value: '2' },
]

interface LineHeightControlProps {
  editor: Editor | null
}

export function LineHeightControl({ editor }: LineHeightControlProps) {
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

  const current = editor?.getAttributes('paragraph')?.lineHeight || ''
  const currentLabel = LINE_HEIGHT_OPTIONS.find(o => o.value === current)?.label || 'Default'

  const apply = (value: string) => {
    if (!value) {
      editor?.chain().focus().unsetLineHeight().run()
    } else {
      editor?.chain().focus().setLineHeight(value).run()
    }
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Line Height"
        style={{
          display: 'flex', alignItems: 'center', gap: 2,
          padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db',
          background: open ? '#e5e7eb' : 'transparent', cursor: 'pointer',
          fontSize: 12, fontWeight: 500, color: '#374151', lineHeight: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="21" y1="6" x2="3" y2="6" />
          <line x1="21" y1="12" x2="3" y2="12" />
          <line x1="21" y1="18" x2="3" y2="18" />
          <polyline points="7 3 7 21" strokeDasharray="2 2" opacity="0.4" />
        </svg>
        <span style={{ fontSize: 8, marginLeft: 1 }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, zIndex: 9999,
          marginTop: 4, padding: 4, borderRadius: 8,
          background: '#fff', border: '1px solid #e2e8f0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: 100,
        }}>
          {LINE_HEIGHT_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => apply(opt.value)}
              style={{
                display: 'block', width: '100%', padding: '5px 8px',
                border: 'none', cursor: 'pointer', fontSize: 12,
                textAlign: 'left', borderRadius: 4,
                background: currentLabel === opt.label ? '#e5e7eb' : 'transparent',
                fontWeight: currentLabel === opt.label ? 700 : 400,
                color: opt.value ? '#374151' : '#6b7280',
                fontStyle: opt.value ? 'normal' : 'italic',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}