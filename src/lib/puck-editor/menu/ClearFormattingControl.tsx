'use client'

/**
 * ClearFormattingControl — Removes ALL inline formatting from the selection.
 * Strips marks, colours, font size, font family, highlights, etc.
 */

import type { Editor } from '@tiptap/core'

interface Props {
  editor: Editor | null
}

export function ClearFormattingControl({ editor }: Props) {
  const handleClear = () => {
    editor?.chain().focus().clearNodes().unsetAllMarks().run()
  }

  return (
    <button
      type="button"
      title="Clear formatting"
      onClick={handleClear}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '4px 6px', borderRadius: 4,
        border: '1px solid #d1d5db', background: 'transparent',
        cursor: 'pointer', color: '#374151',
      }}
    >
      {/* Eraser icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20H7L3 16l11-11 6 6-1.5 1.5"/>
        <path d="m6.5 17.5-2-2"/>
        <path d="M3.5 20.5 10 14"/>
      </svg>
    </button>
  )
}
