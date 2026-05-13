'use client'

/**
 * SuperSubControl — Superscript and Subscript buttons.
 * Implemented as custom TipTap marks using Mark.create() — no extra package required.
 * Each mark renders a <sup> or <sub> HTML element.
 */

import type { Editor } from '@tiptap/core'

interface Props {
  editor: Editor | null
}

export function SuperSubControl({ editor }: Props) {
  const isSup = editor?.isActive('superscript') ?? false
  const isSub = editor?.isActive('subscript')   ?? false

  const toggleSup = () => editor?.chain().focus().toggleMark('superscript').run()
  const toggleSub = () => editor?.chain().focus().toggleMark('subscript').run()

  return (
    <>
      <button
        type="button"
        title="Superscript"
        onClick={toggleSup}
        style={{
          display: 'flex', alignItems: 'center',
          padding: '4px 6px', borderRadius: 4,
          border: '1px solid #d1d5db',
          background: isSup ? '#dbeafe' : 'transparent',
          cursor: 'pointer', fontSize: 13, fontWeight: 700,
          color: isSup ? '#1b61c9' : '#374151',
        }}
      >
        X<sup style={{ fontSize: 9, lineHeight: 1 }}>2</sup>
      </button>
      <button
        type="button"
        title="Subscript"
        onClick={toggleSub}
        style={{
          display: 'flex', alignItems: 'center',
          padding: '4px 6px', borderRadius: 4,
          border: '1px solid #d1d5db',
          background: isSub ? '#dbeafe' : 'transparent',
          cursor: 'pointer', fontSize: 13, fontWeight: 700,
          color: isSub ? '#1b61c9' : '#374151',
        }}
      >
        X<sub style={{ fontSize: 9, lineHeight: 1 }}>2</sub>
      </button>
    </>
  )
}
