'use client'

/**
 * FontFamilyControl — Font family dropdown using React Portal.
 * Dropdown renders into document.body to escape Puck sidebar overflow.
 */

import { useState, useCallback } from 'react'
import type { Editor } from '@tiptap/core'
import { DropdownPortal } from '../utils/DropdownPortal'

const FONT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", sans-serif' },
  { label: 'System Sans', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  { label: 'Serif', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Mono', value: '"SF Mono", "Fira Code", "Courier New", monospace' },
]

interface FontFamilyControlProps {
  editor: Editor | null
}

export function FontFamilyControl({ editor }: FontFamilyControlProps) {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])

  const currentFont = editor?.getAttributes('textStyle')?.fontFamily || ''
  const currentLabel = FONT_OPTIONS.find(f => f.value === currentFont)?.label || 'Default'

  const apply = (value: string) => {
    if (!value) {
      editor?.chain().focus().unsetFontFamily().run()
    } else {
      editor?.chain().focus().setFontFamily(value).run()
    }
    setOpen(false)
  }

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      title="Font Family"
      style={{
        display: 'flex', alignItems: 'center', gap: 2,
        padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db',
        background: open ? '#e5e7eb' : 'transparent', cursor: 'pointer',
        fontSize: 11, fontWeight: 500, color: '#374151', lineHeight: 1,
        maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {currentLabel}
      <span style={{ fontSize: 8, marginLeft: 2, flexShrink: 0 }}>▼</span>
    </button>
  )

  return (
    <DropdownPortal trigger={trigger} open={open} onClose={onClose} width={200}>
      {FONT_OPTIONS.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => apply(opt.value)}
          style={{
            display: 'block', width: '100%', padding: '6px 8px',
            border: 'none', cursor: 'pointer', fontSize: 12,
            textAlign: 'left', borderRadius: 4,
            fontFamily: opt.value || 'inherit',
            background: currentLabel === opt.label ? '#e5e7eb' : 'transparent',
            fontWeight: currentLabel === opt.label ? 700 : 400,
            color: opt.value ? '#374151' : '#6b7280',
            fontStyle: opt.value ? 'normal' : 'italic',
          }}
        >
          {opt.label}
        </button>
      ))}
    </DropdownPortal>
  )
}