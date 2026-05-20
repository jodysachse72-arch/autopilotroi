'use client'

/**
 * LetterSpacingControl — Applies letter-spacing via textStyle mark attribute.
 * Presets: tight / normal / wide / wider — matching Thrive's spacing options.
 */

import { useState, useCallback } from 'react'
import type { Editor } from '@tiptap/core'
import { DropdownPortal } from '../utils/DropdownPortal'

const OPTIONS = [
  { value: '',       label: 'Default',  display: 'Ag' },
  { value: '-0.05em', label: 'Tight',   display: 'Ag' },
  { value: '0.05em',  label: 'Wide',    display: 'A  g' },
  { value: '0.10em',  label: 'Wider',   display: 'A   g' },
  { value: '0.15em',  label: 'Widest',  display: 'A    g' },
]

interface Props {
  editor: Editor | null
}

export function LetterSpacingControl({ editor }: Props) {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])

  const current = (editor?.getAttributes('textStyle')?.letterSpacing as string | undefined) ?? ''

  const apply = (value: string) => {
    editor?.chain().focus().setMark('textStyle', { letterSpacing: value || null }).run()
    setOpen(false)
  }

  const trigger = (
    <button
      type="button"
      title="Letter spacing"
      onClick={() => setOpen(o => !o)}
      style={{
        display: 'flex', alignItems: 'center', gap: 2,
        padding: '4px 6px', borderRadius: 4,
        border: '1px solid #d1d5db',
        background: open ? '#e5e7eb' : current ? '#f0f9ff' : 'transparent',
        cursor: 'pointer', fontSize: 11,
        color: current ? '#1b61c9' : '#374151',
        fontWeight: 600,
      }}
    >
      {/* Spacing icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
      </svg>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" style={{ opacity: 0.6 }}>
        <path d="M4 5.5L1 2.5h6L4 5.5z"/>
      </svg>
    </button>
  )

  return (
    <DropdownPortal trigger={trigger} open={open} onClose={onClose} width={150}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => apply(opt.value)}
            style={{
              padding: '6px 8px', borderRadius: 4, border: 'none',
              background: current === opt.value ? '#dbeafe' : 'transparent',
              color: current === opt.value ? '#1b61c9' : '#374151',
              fontSize: 12, fontWeight: current === opt.value ? 600 : 400,
              textAlign: 'left', cursor: 'pointer',
              letterSpacing: opt.value || 'normal',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </DropdownPortal>
  )
}
