'use client'

/**
 * Custom TipTap extensions for the Puck rich-text editor.
 *
 * These add Superscript, Subscript marks and extend TextStyle
 * with textTransform + letterSpacing attributes.
 *
 * NOTE: Link is intentionally excluded — Puck already bundles
 * @tiptap/extension-link internally. Adding it again causes a
 * duplicate-extension warning.
 */

import { Mark, mergeAttributes } from '@tiptap/core'
import { TextStyle } from '@tiptap/extension-text-style'

/* ------------------------------------------------------------------ */
/*  Superscript Mark                                                    */
/* ------------------------------------------------------------------ */

export const Superscript = Mark.create({
  name: 'superscript',
  excludes: 'subscript',
  parseHTML() {
    return [
      { tag: 'sup' },
      { style: 'vertical-align', getAttrs: v => v === 'super' ? {} : false },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['sup', mergeAttributes(HTMLAttributes), 0]
  },
  addKeyboardShortcuts() {
    return { 'Mod-,': () => this.editor.commands.toggleMark(this.name) }
  },
})

/* ------------------------------------------------------------------ */
/*  Subscript Mark                                                      */
/* ------------------------------------------------------------------ */

export const Subscript = Mark.create({
  name: 'subscript',
  excludes: 'superscript',
  parseHTML() {
    return [
      { tag: 'sub' },
      { style: 'vertical-align', getAttrs: v => v === 'sub' ? {} : false },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['sub', mergeAttributes(HTMLAttributes), 0]
  },
  addKeyboardShortcuts() {
    return { 'Mod-.': () => this.editor.commands.toggleMark(this.name) }
  },
})

/* ------------------------------------------------------------------ */
/*  TextStyle extended with textTransform + letterSpacing               */
/* ------------------------------------------------------------------ */

/**
 * Drop-in replacement for the base TextStyle extension.
 * Adds text-transform and letter-spacing as composable CSS attributes.
 * Use this instead of the plain TextStyle import in buildExtensions().
 */
export const ExtendedTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      textTransform: {
        default: null,
        parseHTML: el => (el as HTMLElement).style.textTransform || null,
        renderHTML: (attrs: Record<string, unknown>) => {
          if (!attrs.textTransform) return {}
          return { style: `text-transform: ${attrs.textTransform}` }
        },
      },

      letterSpacing: {
        default: null,
        parseHTML: el => (el as HTMLElement).style.letterSpacing || null,
        renderHTML: (attrs: Record<string, unknown>) => {
          if (!attrs.letterSpacing) return {}
          return { style: `letter-spacing: ${attrs.letterSpacing}` }
        },
      },
    }
  },
})
