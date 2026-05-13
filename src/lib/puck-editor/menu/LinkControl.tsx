'use client'

/**
 * LinkControl — Insert / edit / remove hyperlinks on selected text.
 * Uses TipTap's built-in Link extension (already bundled by Puck).
 *
 * Behaviour:
 *  - Button shows active state when cursor is inside a link
 *  - Click opens a compact popover with URL input + new-tab toggle
 *  - "Remove" button unlinks when an existing link is active
 */

import { useState, useCallback, useEffect } from 'react'
import type { Editor } from '@tiptap/core'
import { DropdownPortal } from '../utils/DropdownPortal'

interface Props {
  editor: Editor | null
}

export function LinkControl({ editor }: Props) {
  const [open, setOpen] = useState(false)
  const [url, setUrl]   = useState('')
  const [newTab, setNewTab] = useState(true)
  const onClose = useCallback(() => setOpen(false), [])

  const isActive = editor?.isActive('link') ?? false

  // Pre-fill URL when opening on an existing link
  const handleOpen = () => {
    if (!open) {
      const attrs = editor?.getAttributes('link')
      setUrl(attrs?.href ?? '')
      setNewTab(attrs?.target === '_blank')
    }
    setOpen(o => !o)
  }

  const applyLink = () => {
    if (!url.trim()) return
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url.trim(), target: newTab ? '_blank' : undefined })
      .run()
    setOpen(false)
  }

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run()
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); applyLink() }
  }

  const trigger = (
    <button
      type="button"
      title="Insert link"
      onClick={handleOpen}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '4px 6px', borderRadius: 4,
        border: '1px solid #d1d5db',
        background: isActive ? '#dbeafe' : 'transparent',
        cursor: 'pointer', fontSize: 13, color: isActive ? '#1b61c9' : '#374151',
        fontWeight: isActive ? 700 : 400,
      }}
    >
      {/* Chain-link icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    </button>
  )

  return (
    <DropdownPortal trigger={trigger} open={open} onClose={onClose} width={240}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Insert Link
        </div>

        {/* URL input */}
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
          autoFocus
          style={{
            width: '100%', padding: '6px 8px', fontSize: 12,
            border: '1px solid #d1d5db', borderRadius: 4,
            outline: 'none', boxSizing: 'border-box',
          }}
        />

        {/* New tab toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={newTab}
            onChange={e => setNewTab(e.target.checked)}
            style={{ margin: 0, accentColor: '#1b61c9' }}
          />
          Open in new tab
        </label>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            onClick={applyLink}
            style={{
              flex: 1, padding: '5px 0', borderRadius: 4, border: 'none',
              background: '#1b61c9', color: '#fff',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Apply
          </button>
          {isActive && (
            <button
              type="button"
              onClick={removeLink}
              style={{
                flex: 1, padding: '5px 0', borderRadius: 4,
                border: '1px solid #fca5a5', background: '#fff',
                color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </DropdownPortal>
  )
}
