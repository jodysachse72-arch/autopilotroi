'use client'

/**
 * TextTransformControl — Uppercase / Lowercase / Capitalize / None.
 * Implemented as a custom TipTap mark that applies text-transform via inline style.
 * No extra package required — uses the TextStyle extension infrastructure.
 */

import { useState, useCallback } from 'react'
import type { Editor } from '@tiptap/core'
import { DropdownPortal } from '../utils/DropdownPortal'

type Transform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

const OPTIONS: { value: Transform; label: string }[] = [
  { value: 'none',       label: 'Default'    },
  { value: 'uppercase',  label: 'UPPERCASE'  },
  { value: 'lowercase',  label: 'lowercase'  },
  { value: 'capitalize', label: 'Capitalize' },
]

interface Props {
  editor: Editor | null
}

export function TextTransformControl({ editor }: Props) {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])

  // Read current textTransform from the selection via textStyle attrs
  const current = (editor?.getAttributes('textStyle')?.textTransform as Transform | undefined) ?? 'none'

  const apply = (value: Transform) => {
    if (!editor) return
    if (value === 'none') {
      // Remove text-transform via custom textStyle attribute unset
      editor.chain().focus().setMark('textStyle', { textTransform: null }).run()
    } else {
      editor.chain().focus().setMark('textStyle', { textTransform: value }).run()
    }
    setOpen(false)
  }

  const activeLabel = OPTIONS.find(o => o.value === current)?.label ?? 'Aa'

  const trigger = (
    <button
      type="button"
      title="Text transform"
      onClick={() => setOpen(o => !o)}
      style={{
        display: 'flex', alignItems: 'center', gap: 3,
        padding: '4px 6px', borderRadius: 4,
        border: '1px solid #d1d5db',
        background: open ? '#e5e7eb' : current !== 'none' ? '#f0f9ff' : 'transparent',
        cursor: 'pointer', fontSize: 11,
        color: current !== 'none' ? '#1b61c9' : '#374151',
        fontWeight: 600, minWidth: 28,
      }}
    >
      Aa
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" style={{ opacity: 0.6 }}>
        <path d="M4 5.5L1 2.5h6L4 5.5z"/>
      </svg>
    </button>
  )

  return (
    <DropdownPortal trigger={trigger} open={open} onClose={onClose} width={140}>
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
              textTransform: opt.value === 'none' ? 'none' : opt.value,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </DropdownPortal>
  )
}
