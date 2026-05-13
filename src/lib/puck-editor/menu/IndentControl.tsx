'use client'

/**
 * IndentControl — Indent and outdent list items and blockquotes.
 * Works with TipTap's built-in list indentation commands.
 */

import type { Editor } from '@tiptap/core'

interface Props {
  editor: Editor | null
}

const btnStyle = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  padding: '4px 6px',
  borderRadius: 4,
  border: '1px solid #d1d5db',
  background: 'transparent' as const,
  cursor: 'pointer' as const,
  color: '#374151',
}

export function IndentControl({ editor }: Props) {
  const canSink  = editor?.can().sinkListItem('listItem')  ?? false
  const canLift  = editor?.can().liftListItem('listItem')  ?? false

  const indent   = () => editor?.chain().focus().sinkListItem('listItem').run()
  const outdent  = () => editor?.chain().focus().liftListItem('listItem').run()

  return (
    <>
      {/* Outdent */}
      <button
        type="button"
        title="Decrease indent (Outdent)"
        onClick={outdent}
        disabled={!canLift}
        style={{ ...btnStyle, opacity: canLift ? 1 : 0.4 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="21" y1="6"  x2="3"  y2="6" />
          <line x1="21" y1="12" x2="9"  y2="12" />
          <line x1="21" y1="18" x2="9"  y2="18" />
          <polyline points="5,15 2,12 5,9" />
        </svg>
      </button>

      {/* Indent */}
      <button
        type="button"
        title="Increase indent"
        onClick={indent}
        disabled={!canSink}
        style={{ ...btnStyle, opacity: canSink ? 1 : 0.4 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="21" y1="6"  x2="3"  y2="6" />
          <line x1="21" y1="12" x2="9"  y2="12" />
          <line x1="21" y1="18" x2="9"  y2="18" />
          <polyline points="3,9 6,12 3,15" />
        </svg>
      </button>
    </>
  )
}
