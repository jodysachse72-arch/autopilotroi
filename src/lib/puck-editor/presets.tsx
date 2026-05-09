'use client'

/**
 * Puck Editor Presets — Reusable richtext field configurations.
 *
 * Usage in puck.config.tsx:
 *   import { richTextField } from '@/lib/puck-editor'
 *   fields: { description: richTextField() }
 */

import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { RichTextMenu } from '@puckeditor/core'
import { ColorPickerControl } from './menu/ColorPickerControl'
import type { ReactNode } from 'react'
import type { Editor } from '@tiptap/core'

// TipTap extensions we inject into every richtext field
const EXTENSIONS = [TextStyle, Color]

interface RichTextMenuProps {
  children: ReactNode
  editor: Editor | null
  editorState: Record<string, boolean | undefined> | null
  readOnly: boolean
}

/**
 * Default rich toolbar — all formatting + color picker.
 * This mirrors the Thrive Themes approach: full inline editing toolbar.
 */
function DefaultRichMenu({ editor, editorState }: RichTextMenuProps) {
  return (
    <RichTextMenu>
      <RichTextMenu.Group>
        <RichTextMenu.HeadingSelect />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <RichTextMenu.Bold />
        <RichTextMenu.Italic />
        <RichTextMenu.Underline />
        <RichTextMenu.Strikethrough />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <ColorPickerControl editor={editor} />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <RichTextMenu.AlignSelect />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <RichTextMenu.ListSelect />
      </RichTextMenu.Group>
    </RichTextMenu>
  )
}

/**
 * Minimal toolbar — just bold/italic/color for short text fields.
 */
function MinimalRichMenu({ editor }: RichTextMenuProps) {
  return (
    <RichTextMenu>
      <RichTextMenu.Group>
        <RichTextMenu.Bold />
        <RichTextMenu.Italic />
        <RichTextMenu.Underline />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <ColorPickerControl editor={editor} />
      </RichTextMenu.Group>
    </RichTextMenu>
  )
}

interface RichTextFieldOptions {
  /** Use minimal toolbar (bold/italic/color only) */
  minimal?: boolean
  /** Enable inline editing on the canvas */
  contentEditable?: boolean
}

/**
 * Create a richtext field config with color support.
 *
 * @example
 * // Full toolbar with inline editing
 * fields: { body: richTextField() }
 *
 * // Minimal toolbar
 * fields: { title: richTextField({ minimal: true }) }
 */
export function richTextField(opts: RichTextFieldOptions = {}) {
  const { minimal = false, contentEditable = true } = opts
  return {
    type: 'richtext' as const,
    contentEditable,
    tiptap: {
      extensions: EXTENSIONS,
    },
    renderMenu: minimal ? MinimalRichMenu : DefaultRichMenu,
  }
}