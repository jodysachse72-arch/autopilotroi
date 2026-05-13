'use client'

/**
 * ColorPickerControl — Text color picker using React Portal.
 * Dropdown renders into document.body to escape Puck sidebar overflow.
 */

import { useState, useCallback } from 'react'
import type { Editor } from '@tiptap/core'
import { DropdownPortal } from '../utils/DropdownPortal'

const PRESET_COLORS = [
  '#ffffff', '#000000', '#1b61c9', '#93c5fd', '#059669',
  '#dc2626', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b',
  '#f1f5f9', '#1e293b', '#0ea5e9', '#22d3ee', '#a3e635',
  '#fb923c', '#fbbf24', '#c084fc', '#f472b6', '#94a3b8',
]

interface ColorPickerProps {
  editor: Editor | null
}

export function ColorPickerControl({ editor }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [customColor, setCustomColor] = useState('#ffffff')
  const onClose = useCallback(() => setOpen(false), [])

  const currentColor = editor?.getAttributes('textStyle')?.color || ''

  const applyColor = (color: string) => {
    if (!color) {
      editor?.chain().focus().unsetColor().run()
    } else {
      editor?.chain().focus().setColor(color).run()
    }
    setOpen(false)
  }

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      title="Text Color"
      style={{
        display: 'flex', alignItems: 'center', gap: 3,
        padding: '4px 6px', borderRadius: 4, border: '1px solid #d1d5db',
        background: open ? '#e5e7eb' : 'transparent', cursor: 'pointer',
        fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 700 }}>A</span>
      <span style={{
        display: 'block', width: 14, height: 4,
        borderRadius: 1,
        background: currentColor || '#000000',
        border: '1px solid rgba(0,0,0,0.15)',
      }} />
    </button>
  )

  return (
    <DropdownPortal trigger={trigger} open={open} onClose={onClose} width={216}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 4, marginBottom: 8,
      }}>
        {/* Unset/remove color */}
        <button
          type="button"
          onClick={() => applyColor('')}
          title="Remove color"
          style={{
            width: 32, height: 32, borderRadius: 4,
            background: '#fff',
            border: !currentColor ? '2px solid #1b61c9' : '1px solid rgba(0,0,0,0.15)',
            cursor: 'pointer', outline: 'none', position: 'relative',
          }}
        >
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%) rotate(-45deg)',
            width: 20, height: 2, background: '#dc2626',
          }} />
        </button>
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => applyColor(color)}
            style={{
              width: 32, height: 32, borderRadius: 4,
              background: color,
              border: currentColor === color
                ? '2px solid #1b61c9'
                : '1px solid rgba(0,0,0,0.15)',
              cursor: 'pointer', outline: 'none',
            }}
            title={color}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <input
          type="color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          style={{ width: 32, height: 32, padding: 0, border: 'none', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          style={{
            flex: 1, padding: '4px 8px', fontSize: 12,
            border: '1px solid #d1d5db', borderRadius: 4,
            fontFamily: 'monospace',
          }}
        />
        <button
          type="button"
          onClick={() => applyColor(customColor)}
          style={{
            padding: '4px 8px', borderRadius: 4, border: 'none',
            background: '#1b61c9', color: '#fff', fontSize: 11,
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          Apply
        </button>
      </div>
    </DropdownPortal>
  )
}