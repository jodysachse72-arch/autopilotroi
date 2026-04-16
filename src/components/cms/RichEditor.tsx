'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { useEffect, useCallback, useRef, useState } from 'react'
import type { JSONContent } from '@tiptap/react'

interface RichEditorProps {
  content?: JSONContent | null
  contentHtml?: string | null
  placeholder?: string
  onChange?: (json: JSONContent, html: string) => void
  onImageUpload?: (file: File) => Promise<string>
  readOnly?: boolean
  minHeight?: number
}

/* ── Toolbar button ────────────────────────────────────── */
function ToolBtn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all ${
        active
          ? 'bg-[#1b61c9] text-white shadow-sm'
          : 'text-[rgba(4,14,32,0.55)] hover:bg-[#f0f4ff] hover:text-[#1b61c9]'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="h-5 w-px bg-[#e0e2e6] mx-1" />
}

export default function RichEditor({
  content,
  contentHtml,
  placeholder = 'Start writing...',
  onChange,
  onImageUpload,
  readOnly = false,
  minHeight = 360,
}: RichEditorProps) {
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showYoutubeModal, setShowYoutubeModal] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'cms-link' } }),
      Image.configure({ HTMLAttributes: { class: 'cms-image' } }),
      Youtube.configure({ width: 640, height: 360, HTMLAttributes: { class: 'cms-youtube' } }),
      CharacterCount,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content ?? contentHtml ?? '',
    editable: !readOnly,
    onUpdate({ editor: e }) {
      onChange?.(e.getJSON(), e.getHTML())
    },
  })

  // Sync external content changes
  useEffect(() => {
    if (!editor) return
    if (content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  const addLink = useCallback(() => {
    if (!editor || !linkUrl) return
    editor.chain().focus().setLink({ href: linkUrl }).run()
    setLinkUrl('')
    setShowLinkModal(false)
  }, [editor, linkUrl])

  const addYoutube = useCallback(() => {
    if (!editor || !youtubeUrl) return
    editor.commands.setYoutubeVideo({ src: youtubeUrl })
    setYoutubeUrl('')
    setShowYoutubeModal(false)
  }, [editor, youtubeUrl])

  const handleImageFile = useCallback(async (file: File) => {
    if (!editor) return
    if (onImageUpload) {
      const url = await onImageUpload(file)
      editor.chain().focus().setImage({ src: url }).run()
    } else {
      // Fallback: object URL (ephemeral, for preview only)
      const url = URL.createObjectURL(file)
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor, onImageUpload])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) {
      await handleImageFile(file)
    }
  }, [handleImageFile])

  if (!editor) return null

  const wordCount = editor.storage.characterCount?.words() ?? 0
  const charCount = editor.storage.characterCount?.characters() ?? 0

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e0e2e6] bg-white shadow-sm">

      {/* ── Toolbar ───────────────────────────────────────── */}
      {!readOnly && (
        <div className="flex flex-wrap gap-0.5 border-b border-[#e0e2e6] bg-[#f8fafc] p-2">
          
          {/* History */}
          <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"/><path d="M3 13A9 9 0 1 0 6 6.4"/></svg>
          </ToolBtn>
          <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"/><path d="M21 13A9 9 0 1 1 18 6.4"/></svg>
          </ToolBtn>

          <Divider />

          {/* Headings */}
          <ToolBtn title="Heading 1" active={editor.isActive('heading', { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <span className="font-black text-[11px] leading-none">H1</span>
          </ToolBtn>
          <ToolBtn title="Heading 2" active={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <span className="font-black text-[11px] leading-none">H2</span>
          </ToolBtn>
          <ToolBtn title="Heading 3" active={editor.isActive('heading', { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <span className="font-black text-[11px] leading-none">H3</span>
          </ToolBtn>

          <Divider />

          {/* Marks */}
          <ToolBtn title="Bold" active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}>
            <span className="font-black text-sm">B</span>
          </ToolBtn>
          <ToolBtn title="Italic" active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}>
            <span className="italic font-semibold text-sm">I</span>
          </ToolBtn>
          <ToolBtn title="Underline" active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <span className="underline font-semibold text-sm">U</span>
          </ToolBtn>
          <ToolBtn title="Strikethrough" active={editor.isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}>
            <span className="line-through font-semibold text-sm">S</span>
          </ToolBtn>
          <ToolBtn title="Highlight" active={editor.isActive('highlight')}
            onClick={() => editor.chain().focus().toggleHighlight().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="16" width="18" height="4" rx="1"/><path d="M9.5 13.5l3-9h1l3 9h-1.5l-.75-2.25h-2.5L11 13.5z" fillRule="evenodd"/></svg>
          </ToolBtn>

          <Divider />

          {/* Lists */}
          <ToolBtn title="Bullet List" active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg>
          </ToolBtn>
          <ToolBtn title="Numbered List" active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="9" fontSize="7" strokeWidth="0" fill="currentColor">1</text><text x="2" y="15" fontSize="7" strokeWidth="0" fill="currentColor">2</text><text x="2" y="21" fontSize="7" strokeWidth="0" fill="currentColor">3</text></svg>
          </ToolBtn>
          <ToolBtn title="Blockquote" active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.123.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.375c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.292 4.421 6.621c-.299.32-.617.637-.867.958-.24.302-.43.664-.613.921-.173.303-.337.602-.458.115-.261.491-.423.926-.581 1.179-.158.253-.318.379-.405.547-.085.165-.135.253-.135.253v.126h.001z"/><path d="M14.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.123.474-.197.474-.197L17.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.201-.271.05-.56.187-.882.312-.318.112-.686.208-1.028.436-.344.218-.741.4-1.091.692-.338.3-.747.476-1.049.805-.299.32-.617.637-.867.958-.24.302-.43.664-.613.921-.173.303-.337.602-.458.915-.261.491-.423.926-.581 1.179-.158.253-.318.379-.405.547-.085.165-.135.253-.135.253v.126h.001z"/></svg>
          </ToolBtn>

          <Divider />

          {/* Align */}
          <ToolBtn title="Align Left" active={editor.isActive({ textAlign: 'left' })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
          </ToolBtn>
          <ToolBtn title="Align Center" active={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </ToolBtn>

          <Divider />

          {/* Link */}
          <ToolBtn title="Add Link" active={editor.isActive('link')}
            onClick={() => { setLinkUrl(editor.getAttributes('link').href ?? ''); setShowLinkModal(true) }}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </ToolBtn>

          {/* Image upload */}
          <ToolBtn title="Insert Image" onClick={() => fileInputRef.current?.click()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </ToolBtn>

          {/* YouTube */}
          <ToolBtn title="Embed YouTube" onClick={() => setShowYoutubeModal(true)}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
          </ToolBtn>

          {/* Code */}
          <ToolBtn title="Code Block" active={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </ToolBtn>

          {/* HR */}
          <ToolBtn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/></svg>
          </ToolBtn>

          {/* Clear Marks */}
          <ToolBtn title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19H5l2.5-3h5L15 19z"/><path d="M10.5 8h8l-4.5 6"/><path d="m4 4 16 16"/></svg>
          </ToolBtn>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) await handleImageFile(file)
              e.target.value = ''
            }}
          />
        </div>
      )}

      {/* ── Editor area ───────────────────────────────────── */}
      <div
        className={`relative flex-1 transition-colors ${isDragging ? 'bg-blue-50' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{ minHeight }}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-[#1b61c9] bg-blue-50/80">
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm font-semibold text-[#1b61c9]">Drop image to insert</p>
            </div>
          </div>
        )}
        <EditorContent
          editor={editor}
          className="cms-editor h-full"
        />
      </div>

      {/* ── Status bar ────────────────────────────────────── */}
      {!readOnly && (
        <div className="flex items-center justify-between border-t border-[#e0e2e6] bg-[#f8fafc] px-4 py-2">
          <div className="flex items-center gap-4 text-[10px] text-[rgba(4,14,32,0.35)]">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          <div className="text-[10px] text-[rgba(4,14,32,0.35)]">
            Drag images to insert · Cmd+Z to undo
          </div>
        </div>
      )}

      {/* ── Link modal ────────────────────────────────────── */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 font-semibold text-[#181d26]">Insert Link</h3>
            <input
              autoFocus
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addLink(); if (e.key === 'Escape') setShowLinkModal(false) }}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9] focus:ring-2 focus:ring-[#1b61c9]/20"
            />
            <div className="mt-4 flex gap-2 justify-end">
              {editor.isActive('link') && (
                <button onClick={() => { editor.chain().focus().unsetLink().run(); setShowLinkModal(false) }}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Remove
                </button>
              )}
              <button onClick={() => setShowLinkModal(false)}
                className="rounded-xl border border-[#e0e2e6] px-4 py-2 text-sm text-[rgba(4,14,32,0.55)] hover:bg-[#f8fafc]">
                Cancel
              </button>
              <button onClick={addLink}
                className="rounded-xl bg-[#1b61c9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1550aa]">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── YouTube modal ─────────────────────────────────── */}
      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 font-semibold text-[#181d26]">Embed YouTube Video</h3>
            <input
              autoFocus
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addYoutube(); if (e.key === 'Escape') setShowYoutubeModal(false) }}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9] focus:ring-2 focus:ring-[#1b61c9]/20"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setShowYoutubeModal(false)}
                className="rounded-xl border border-[#e0e2e6] px-4 py-2 text-sm text-[rgba(4,14,32,0.55)] hover:bg-[#f8fafc]">
                Cancel
              </button>
              <button onClick={addYoutube}
                className="rounded-xl bg-[#1b61c9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1550aa]">
                Embed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
