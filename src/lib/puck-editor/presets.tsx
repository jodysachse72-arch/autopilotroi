'use client'

/**
 * Puck Editor Presets — Reusable richtext field configurations.
 * Thrive-Themes-level editing controls for any Puck project.
 *
 * Usage in puck.config.tsx:
 *   import { richTextField } from '@/lib/puck-editor'
 *   fields: { description: richTextField() }
 *   fields: { title: richTextField({ minimal: true }) }
 *   fields: { body: richTextField({ fontSize: false }) }
 */

import {
  Color,
  TextStyle,
  FontSize,
  FontFamily,
  BackgroundColor,
  LineHeight,
} from '@tiptap/extension-text-style'
import { RichTextMenu } from '@puckeditor/core'
import { ColorPickerControl } from './menu/ColorPickerControl'
import { FontSizeControl } from './menu/FontSizeControl'
import { FontFamilyControl } from './menu/FontFamilyControl'
import { HighlightColorControl } from './menu/HighlightColorControl'
import { LineHeightControl } from './menu/LineHeightControl'
import type { ReactNode } from 'react'
import type { AnyExtension, Editor } from '@tiptap/core'

/* ------------------------------------------------------------------ */
/*  TipTap extension builder                                          */
/* ------------------------------------------------------------------ */

interface ExtensionFlags {
  colors: boolean
  fontSize: boolean
  fontFamily: boolean
  backgroundColor: boolean
  lineHeight: boolean
}

function buildExtensions(flags: ExtensionFlags) {
  // TextStyle is always required — it's the base mark
  const exts: AnyExtension[] = [TextStyle]

  if (flags.colors) exts.push(Color)
  if (flags.fontSize) exts.push(FontSize)
  if (flags.fontFamily) exts.push(FontFamily)
  if (flags.backgroundColor) exts.push(BackgroundColor)
  if (flags.lineHeight) exts.push(LineHeight)

  return exts
}

/* ------------------------------------------------------------------ */
/*  Menu props interface                                              */
/* ------------------------------------------------------------------ */

interface RichTextMenuProps {
  children: ReactNode
  editor: Editor | null
  editorState: Record<string, boolean | undefined> | null
  readOnly: boolean
}

/* ------------------------------------------------------------------ */
/*  Menu builders                                                     */
/* ------------------------------------------------------------------ */

function createFullMenu(flags: ExtensionFlags) {
  return function FullRichMenu({ editor }: RichTextMenuProps) {
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
        {(flags.colors || flags.backgroundColor) && (
          <RichTextMenu.Group>
            {flags.colors && <ColorPickerControl editor={editor} />}
            {flags.backgroundColor && <HighlightColorControl editor={editor} />}
          </RichTextMenu.Group>
        )}
        {(flags.fontSize || flags.fontFamily) && (
          <RichTextMenu.Group>
            {flags.fontSize && <FontSizeControl editor={editor} />}
            {flags.fontFamily && <FontFamilyControl editor={editor} />}
          </RichTextMenu.Group>
        )}
        {flags.lineHeight && (
          <RichTextMenu.Group>
            <LineHeightControl editor={editor} />
          </RichTextMenu.Group>
        )}
        <RichTextMenu.Group>
          <RichTextMenu.AlignSelect />
        </RichTextMenu.Group>
        <RichTextMenu.Group>
          <RichTextMenu.ListSelect />
        </RichTextMenu.Group>
      </RichTextMenu>
    )
  }
}

function createMinimalMenu(flags: ExtensionFlags) {
  return function MinimalRichMenu({ editor }: RichTextMenuProps) {
    return (
      <RichTextMenu>
        <RichTextMenu.Group>
          <RichTextMenu.Bold />
          <RichTextMenu.Italic />
          <RichTextMenu.Underline />
        </RichTextMenu.Group>
        {flags.colors && (
          <RichTextMenu.Group>
            <ColorPickerControl editor={editor} />
          </RichTextMenu.Group>
        )}
        {flags.fontSize && (
          <RichTextMenu.Group>
            <FontSizeControl editor={editor} />
          </RichTextMenu.Group>
        )}
      </RichTextMenu>
    )
  }
}

/**
 * Inline menu for canvas contentEditable editing.
 * Shows core formatting + color + size controls directly on the canvas.
 */
function createInlineMenu(flags: ExtensionFlags) {
  return function InlineRichMenu({ editor, children }: RichTextMenuProps) {
    return (
      <RichTextMenu>
        <RichTextMenu.Group>
          <RichTextMenu.Bold />
          <RichTextMenu.Italic />
          <RichTextMenu.Underline />
        </RichTextMenu.Group>
        {flags.colors && (
          <RichTextMenu.Group>
            <ColorPickerControl editor={editor} />
          </RichTextMenu.Group>
        )}
        {flags.fontSize && (
          <RichTextMenu.Group>
            <FontSizeControl editor={editor} />
          </RichTextMenu.Group>
        )}
        {flags.backgroundColor && (
          <RichTextMenu.Group>
            <HighlightColorControl editor={editor} />
          </RichTextMenu.Group>
        )}
      </RichTextMenu>
    )
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export interface RichTextFieldOptions {
  /** Use minimal toolbar (bold/italic/color/size only). Default: false */
  minimal?: boolean
  /** Enable inline editing on the canvas. Default: true */
  contentEditable?: boolean
  /** Enable text color picker. Default: true */
  colors?: boolean
  /** Enable font size control. Default: true */
  fontSize?: boolean
  /** Enable font family control. Default: true */
  fontFamily?: boolean
  /** Enable background/highlight color. Default: true */
  backgroundColor?: boolean
  /** Enable line height control. Default: true */
  lineHeight?: boolean
  /** Enable inline canvas toolbar via renderInlineMenu. Default: true */
  inline?: boolean
}

/**
 * Create a richtext field config with Thrive-level formatting controls.
 *
 * @example
 * // Full toolbar with all controls
 * fields: { body: richTextField() }
 *
 * // Minimal toolbar (bold/italic/color/size)
 * fields: { title: richTextField({ minimal: true }) }
 *
 * // Custom: disable specific features
 * fields: { quote: richTextField({ fontFamily: false, lineHeight: false }) }
 */
export function richTextField(opts: RichTextFieldOptions = {}) {
  const {
    minimal = false,
    contentEditable = true,
    colors = true,
    fontSize = true,
    fontFamily = true,
    backgroundColor = true,
    lineHeight = true,
    inline = true,
  } = opts

  const flags: ExtensionFlags = { colors, fontSize, fontFamily, backgroundColor, lineHeight }
  const extensions = buildExtensions(flags)
  const renderMenu = minimal ? createMinimalMenu(flags) : createFullMenu(flags)
  const renderInlineMenu = (inline && contentEditable) ? createInlineMenu(flags) : undefined

  return {
    type: 'richtext' as const,
    contentEditable,
    tiptap: { extensions },
    renderMenu,
    ...(renderInlineMenu ? { renderInlineMenu } : {}),
  }
}