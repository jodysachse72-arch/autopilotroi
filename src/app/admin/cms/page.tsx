'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { JSONContent } from '@tiptap/react'
import {
  listPosts, getPost, createPost, updatePost, deletePost,
  publishPost, unpublishPost, getRevisions, restoreRevision, uploadMedia,
  type CmsPost, type CmsPostSummary, type CmsRevision,
} from '@/lib/cms/service'
import { useToast } from '@/components/ui/Toast'

/* ═══════════════════════════════════════════════════════════════
   CONTENT EDITOR  (/admin/cms)
   3-panel layout: List | Tiptap Editor | Meta
   
   Data: Supabase cms_posts / cms_revisions / cms_media
   Editor: Tiptap (rich text — bold, headings, images, YouTube…)
   
   To migrate to Payload CMS: only change src/lib/cms/service.ts
   ═══════════════════════════════════════════════════════════════ */

// Lazy-load Tiptap (it's heavy — no SSR)
const RichEditor = dynamic(() => import('@/components/cms/RichEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center text-sm text-[rgba(4,14,32,0.35)]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1b61c9] border-t-transparent" />
        Loading editor…
      </div>
    </div>
  ),
})

type Tab = 'blog' | 'faq' | 'video' | 'page_copy'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'blog',      label: 'Blog Posts',   icon: '📝' },
  { key: 'faq',       label: 'FAQs',         icon: '❓' },
  { key: 'video',     label: 'Videos',       icon: '🎬' },
  { key: 'page_copy', label: 'Page Copy',    icon: '🏠' },
]

const STATUS_STYLES = {
  published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  draft:     'bg-amber-50  text-amber-700  border-amber-200',
  scheduled: 'bg-blue-50   text-blue-700   border-blue-200',
}

const BLOG_CATEGORIES = ['education','product-updates','announcements','partner-resources','market-insights']
const FAQ_CATEGORIES  = ['general','products','getting-started','payments','partners']

// ── Empty post template per type ─────────────────────────────

function newPost(type: Tab): Partial<CmsPost> {
  const base = { type, status: 'draft' as const, sort_order: 0, meta: {} }
  if (type === 'blog')  return { ...base, title: 'Untitled Post', slug: '', meta: { category: 'education', author: 'Barry Goss', featured: false } }
  if (type === 'faq')   return { ...base, title: 'New FAQ',       meta: { category: 'general' } }
  if (type === 'video') return { ...base, title: 'New Video',     meta: { youtubeId: '', duration: '', category: 'Overview', featured: false, section: 'university' } }
  return { ...base, title: 'Page Copy', slug: 'homepage', meta: {} }
}

// ── Main page ────────────────────────────────────────────────

export default function ContentEditorPage() {
  const [activeTab, setActiveTab]         = useState<Tab>('blog')
  const [posts, setPosts]                 = useState<CmsPostSummary[]>([])
  const [selectedId, setSelectedId]       = useState<string | null>(null)
  const [selected, setSelected]           = useState<CmsPost | null>(null)
  const [revisions, setRevisions]         = useState<CmsRevision[]>([])
  const [showRevisions, setShowRevisions] = useState(false)
  const [isSaving, setIsSaving]           = useState(false)
  const [isLoading, setIsLoading]         = useState(true)
  const [isNew, setIsNew]                 = useState(false)
  const [draft, setDraft]                 = useState<Partial<CmsPost>>({})
  const [bodyJson, setBodyJson]           = useState<JSONContent | null>(null)
  const [bodyHtml, setBodyHtml]           = useState<string>('')
  const autoSaveTimer                     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const { toast, ToastContainer }         = useToast()

  // Load list
  const loadList = useCallback(async () => {
    setIsLoading(true)
    const data = await listPosts({ type: activeTab })
    setPosts(data)
    setIsLoading(false)
  }, [activeTab])

  useEffect(() => {
    loadList()
    setSelectedId(null)
    setSelected(null)
    setIsNew(false)
    setDraft({})
  }, [loadList])

  // Load full post when selected
  useEffect(() => {
    if (!selectedId || isNew) return
    getPost(selectedId).then((p) => {
      if (!p) return
      setSelected(p)
      setDraft({ title: p.title, slug: p.slug, meta: p.meta, status: p.status, sort_order: p.sort_order })
      setBodyJson(p.body as JSONContent | null)
      setBodyHtml(p.body_html ?? '')
    })
    getRevisions(selectedId).then(setRevisions)
  }, [selectedId, isNew])

  // Auto-save on body change (1.5s debounce)
  const triggerAutoSave = useCallback(() => {
    if (!selectedId || isNew) return
    setAutoSaveStatus('saving')
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(async () => {
      await updatePost(selectedId, { body: bodyJson ?? undefined, body_html: bodyHtml })
      setAutoSaveStatus('saved')
      setTimeout(() => setAutoSaveStatus('idle'), 2000)
    }, 1500)
  }, [selectedId, isNew, bodyJson, bodyHtml])

  const handleEditorChange = useCallback((json: JSONContent, html: string) => {
    setBodyJson(json)
    setBodyHtml(html)
    triggerAutoSave()
  }, [triggerAutoSave])

  // Save (meta + body)
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      if (isNew) {
        const created = await createPost({
          ...newPost(activeTab),
          ...draft,
          body:      bodyJson ?? null,
          body_html: bodyHtml || null,
          type:      activeTab,
          status:    draft.status ?? 'draft',
          sort_order: draft.sort_order ?? 0,
          meta:      draft.meta ?? {},
          slug:      draft.slug ?? null,
          title:     draft.title ?? null,
          created_by: null,
          publish_at: null,
        })
        setSelectedId(created.id)
        setIsNew(false)
        toast('Post created!', 'success')
      } else if (selectedId) {
        await updatePost(selectedId, {
          ...draft,
          body:      bodyJson ?? undefined,
          body_html: bodyHtml || undefined,
        })
        toast('Saved!', 'success')
      }
      loadList()
    } catch (e) {
      toast('Save failed', 'error')
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }, [isNew, selectedId, draft, bodyJson, bodyHtml, activeTab, loadList, toast])

  const handlePublish = useCallback(async () => {
    if (!selectedId) return
    setIsSaving(true)
    try {
      await publishPost(selectedId)
      setDraft(d => ({ ...d, status: 'published' }))
      loadList()
      toast('Published! 🚀', 'success')
    } catch { toast('Publish failed', 'error') }
    finally { setIsSaving(false) }
  }, [selectedId, loadList, toast])

  const handleUnpublish = useCallback(async () => {
    if (!selectedId) return
    await unpublishPost(selectedId)
    setDraft(d => ({ ...d, status: 'draft' }))
    loadList()
    toast('Moved to Draft', 'info')
  }, [selectedId, loadList, toast])

  const handleDelete = useCallback(async () => {
    if (!selectedId || !confirm('Delete this post? This cannot be undone.')) return
    await deletePost(selectedId)
    setSelectedId(null)
    setSelected(null)
    setDraft({})
    loadList()
    toast('Deleted', 'info')
  }, [selectedId, loadList, toast])

  const handleRestore = useCallback(async (rev: CmsRevision) => {
    if (!selectedId) return
    await restoreRevision(rev.id)
    const refreshed = await getPost(selectedId)
    if (refreshed) {
      setSelected(refreshed)
      setBodyJson(refreshed.body as JSONContent | null)
      setBodyHtml(refreshed.body_html ?? '')
    }
    setShowRevisions(false)
    toast('Version restored', 'success')
  }, [selectedId])

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    const media = await uploadMedia(file, '')
    return media.public_url
  }, [])

  const startNew = () => {
    setIsNew(true)
    setSelectedId(null)
    setSelected(null)
    setBodyJson(null)
    setBodyHtml('')
    setDraft(newPost(activeTab) as Partial<CmsPost>)
  }

  const hasEditor = selected !== null || isNew
  const currentStatus = (draft.status ?? 'draft') as keyof typeof STATUS_STYLES

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">

      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#e0e2e6] bg-white px-6 py-3">
        <div>
          <h1 className="font-[var(--font-sora)] text-xl font-bold text-[#181d26]">Content Editor</h1>
          <p className="text-xs text-[rgba(4,14,32,0.40)]">Supabase-backed · changes auto-save · {posts.length} {activeTab === 'blog' ? 'posts' : activeTab === 'faq' ? 'FAQs' : activeTab === 'video' ? 'videos' : 'entries'}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Auto-save status */}
          <AnimatePresence>
            {autoSaveStatus !== 'idle' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-xs text-[rgba(4,14,32,0.45)]">
                {autoSaveStatus === 'saving'
                  ? <><div className="h-3 w-3 animate-spin rounded-full border border-[#1b61c9] border-t-transparent" /> Saving…</>
                  : <><span className="text-emerald-500">✓</span> Saved</>}
              </motion.div>
            )}
          </AnimatePresence>

          {hasEditor && selected && (
            <>
              <button onClick={() => { setShowRevisions(!showRevisions) }}
                className="rounded-xl border border-[#e0e2e6] bg-white px-3 py-1.5 text-xs font-medium text-[rgba(4,14,32,0.55)] hover:bg-[#f8fafc]">
                🕐 History {revisions.length > 0 && `(${revisions.length})`}
              </button>
              <button onClick={handleDelete}
                className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                🗑️ Delete
              </button>
            </>
          )}

          {hasEditor && (
            <>
              <button onClick={handleSave} disabled={isSaving}
                className="rounded-xl border border-[#e0e2e6] bg-white px-4 py-1.5 text-xs font-semibold text-[#181d26] transition hover:bg-[#f8fafc] disabled:opacity-50">
                {isSaving ? 'Saving…' : '💾 Save'}
              </button>
              {currentStatus !== 'published' ? (
                <button onClick={handlePublish} disabled={isSaving || isNew}
                  className="rounded-xl bg-[#1b61c9] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1550aa] disabled:opacity-40">
                  🚀 Publish
                </button>
              ) : (
                <button onClick={handleUnpublish}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100">
                  ↩ Unpublish
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex shrink-0 gap-0 border-b border-[#e0e2e6] bg-[#f8fafc]">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition border-b-2 ${
              activeTab === tab.key
                ? 'border-[#1b61c9] text-[#1b61c9] bg-white'
                : 'border-transparent text-[rgba(4,14,32,0.50)] hover:text-[#181d26]'
            }`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* 3-panel body */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Post List ────────────────────────────── */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-[#e0e2e6] bg-white overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#e0e2e6] px-4 py-3">
            <span className="text-xs font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-widest">{TABS.find(t=>t.key===activeTab)?.label}</span>
            <button onClick={startNew}
              className="rounded-lg bg-[#1b61c9] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1550aa]">
              + New
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1b61c9] border-t-transparent" />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-3xl">{TABS.find(t => t.key === activeTab)?.icon}</span>
              <p className="text-sm text-[rgba(4,14,32,0.45)]">No {activeTab === 'faq' ? 'FAQs' : 'posts'} yet</p>
              <button onClick={startNew} className="rounded-lg bg-[#1b61c9] px-4 py-2 text-xs font-semibold text-white">Create First</button>
            </div>
          ) : (
            <div className="flex-1 divide-y divide-[#f0f2f7]">
              {/* New post placeholder in list */}
              {isNew && (
                <div className="flex items-start gap-3 bg-blue-50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1b61c9]">{draft.title || 'New Post'}</div>
                    <div className="text-[10px] text-[rgba(4,14,32,0.40)] mt-0.5">Unsaved draft</div>
                  </div>
                  <span className="text-[10px] rounded-full border px-1.5 py-0.5 bg-amber-50 text-amber-700 border-amber-200">draft</span>
                </div>
              )}
              {posts.map((post) => (
                <button key={post.id} onClick={() => { setSelectedId(post.id); setIsNew(false) }}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition hover:bg-[#f8fafc] ${selectedId === post.id && !isNew ? 'bg-blue-50/60 border-l-2 border-[#1b61c9]' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${selectedId === post.id && !isNew ? 'text-[#1b61c9]' : 'text-[#181d26]'}`}>
                      {post.title || 'Untitled'}
                    </div>
                    <div className="text-[10px] text-[rgba(4,14,32,0.35)] mt-0.5 truncate">
                      {post.meta?.category ?? post.meta?.youtubeId ?? '—'} · {new Date(post.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`shrink-0 text-[10px] rounded-full border px-1.5 py-0.5 font-semibold ${STATUS_STYLES[post.status]}`}>
                    {post.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* ── CENTER: Editor ─────────────────────────────── */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
          {!hasEditor ? (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="m-6 rounded-2xl border border-[#e0e2e6] bg-white p-8 shadow-sm">

                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1b61c9]">
                    <span className="text-xl">✍️</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#181d26]">Content Editor</h2>
                    <p className="mt-1 text-sm text-[rgba(4,14,32,0.50)] leading-relaxed">
                      Backed by Supabase — edits go live on the public site within 60 seconds. No rebuild needed.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">How it works</h3>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      { step: '1', label: 'Choose a content type', detail: 'Use the Blog / FAQs / Videos / Page Copy tabs above' },
                      { step: '2', label: 'Create or select a post', detail: 'Click any item in the left panel, or press "+ New"' },
                      { step: '3', label: 'Write, save, publish', detail: 'Body auto-saves as you type. Hit Publish to go live.' },
                    ].map(s => (
                      <div key={s.step} className="rounded-xl border border-[#e0e2e6] p-4">
                        <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1b61c9] text-xs font-bold text-white">{s.step}</div>
                        <div className="text-sm font-semibold text-[#181d26]">{s.label}</div>
                        <div className="mt-1 text-xs text-[rgba(4,14,32,0.50)]">{s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Where content appears on the public site</h3>
                  <div className="overflow-hidden rounded-xl border border-[#e0e2e6]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0e2e6] bg-[#f8fafc]">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgba(4,14,32,0.45)]">Tab</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgba(4,14,32,0.45)]">Public URL</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgba(4,14,32,0.45)]">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f2f7]">
                        {[
                          { icon: '📝', tab: 'Blog Posts', url: '/blog  ·  /blog/[slug]',        note: 'Title + excerpt on list. Full rich-text body on post page.' },
                          { icon: '❓', tab: 'FAQs',       url: '/faqs',                          note: 'Title = question. Body (rich text) = answer in accordion.' },
                          { icon: '🎬', tab: 'Videos',     url: '/university  or  /media',        note: 'Set the "Section" field to choose which page it appears on.' },
                          { icon: '🏠', tab: 'Page Copy',  url: 'Homepage, Products…',           note: 'Slug = page key (e.g. "homepage"). Key-value meta fields.' },
                        ].map(r => (
                          <tr key={r.tab}>
                            <td className="px-4 py-3 font-medium text-[#181d26]">{r.icon} {r.tab}</td>
                            <td className="px-4 py-3 font-mono text-xs text-[#1b61c9]">{r.url}</td>
                            <td className="px-4 py-3 text-xs text-[rgba(4,14,32,0.50)]">{r.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e0e2e6] p-4">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Draft → Published workflow</h3>
                    <ol className="space-y-1.5 text-xs text-[rgba(4,14,32,0.65)]">
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">1.</span> Create or select a post from the left panel</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">2.</span> Write content — body auto-saves every 1.5 s</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">3.</span> Fill metadata in the right panel (author, excerpt, category…)</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">4.</span> Press <strong className="text-[#181d26]">💾 Save</strong> to persist metadata</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">5.</span> Press <strong className="text-[#181d26]">🚀 Publish</strong> — appears on site in ~60 s</li>
                    </ol>
                  </div>
                  <div className="rounded-xl border border-[#e0e2e6] p-4 space-y-3">
                    <div>
                      <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Version History</h3>
                      <p className="text-xs text-[rgba(4,14,32,0.65)]">Every save creates a snapshot. Click <strong className="text-[#181d26]">🕐 History</strong> in the top bar to browse and restore any previous version.</p>
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Images &amp; YouTube</h3>
                      <p className="text-xs text-[rgba(4,14,32,0.65)]">Drag images into the editor or click 🖼️. Paste a YouTube URL and click the YouTube button to embed a video inline. Images upload to Supabase Storage automatically.</p>
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Rich Text Toolbar</h3>
                      <p className="text-xs text-[rgba(4,14,32,0.65)]">H1/H2/H3 · Bold · Italic · Underline · Lists · Quote · Code · Link · Align · Highlight · HR · Undo/Redo</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button onClick={startNew}
                    className="rounded-xl bg-[#1b61c9] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#1550aa]">
                    + Create New {TABS.find(t => t.key === activeTab)?.label.slice(0, -1) || 'Post'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-6">

              {/* Title */}
              <input
                type="text"
                value={draft.title ?? ''}
                onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                placeholder={activeTab === 'faq' ? 'Question…' : activeTab === 'video' ? 'Video title…' : 'Post title…'}
                className="w-full rounded-2xl border border-[#e0e2e6] bg-white px-5 py-3.5 font-[var(--font-sora)] text-2xl font-bold text-[#181d26] placeholder:text-[rgba(4,14,32,0.25)] outline-none focus:border-[#1b61c9] focus:ring-2 focus:ring-[#1b61c9]/15 shadow-sm transition"
              />

              {/* Slug (blog only) */}
              {activeTab === 'blog' && (
                <div className="flex items-center gap-2 rounded-xl border border-[#e0e2e6] bg-white px-4 py-2 shadow-sm">
                  <span className="text-xs text-[rgba(4,14,32,0.35)] shrink-0">slug /blog/</span>
                  <input
                    type="text"
                    value={draft.slug ?? ''}
                    onChange={(e) => setDraft(d => ({ ...d, slug: e.target.value }))}
                    placeholder="my-post-slug"
                    className="flex-1 bg-transparent text-sm text-[#181d26] outline-none placeholder:text-[rgba(4,14,32,0.25)]"
                  />
                </div>
              )}

              {/* Rich editor (blog, faq, page_copy) */}
              {(activeTab === 'blog' || activeTab === 'faq' || activeTab === 'page_copy') && (
                <RichEditor
                  key={selectedId ?? 'new'}
                  content={bodyJson}
                  contentHtml={bodyHtml}
                  placeholder={
                    activeTab === 'faq' ? 'Write the answer…'
                    : activeTab === 'blog' ? 'Start writing your post…'
                    : 'Edit page copy…'
                  }
                  onChange={handleEditorChange}
                  onImageUpload={handleImageUpload}
                  minHeight={400}
                />
              )}

              {/* Video-specific fields */}
              {activeTab === 'video' && (
                <div className="space-y-3 rounded-2xl border border-[#e0e2e6] bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#181d26]">Video Details</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="col-span-2">
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">YouTube URL or ID</label>
                      <input type="text"
                        value={draft.meta?.youtubeId as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, youtubeId: e.target.value } }))}
                        placeholder="https://youtube.com/watch?v=... or dQw4w9WgXcQ"
                        className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>
                    {draft.meta?.youtubeId && (
                      <div className="col-span-2">
                        <img
                          src={`https://i.ytimg.com/vi/${String(draft.meta.youtubeId).replace(/.*[?&]v=/, '').split('&')[0]}/hqdefault.jpg`}
                          alt="Thumbnail preview"
                          className="rounded-xl border border-[#e0e2e6] max-h-40 object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Duration</label>
                      <input type="text"
                        value={draft.meta?.duration as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, duration: e.target.value } }))}
                        placeholder="12:30"
                        className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Category</label>
                      <input type="text"
                        value={draft.meta?.category as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                        placeholder="Overview"
                        className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Section</label>
                      <select
                        value={draft.meta?.section as string ?? 'university'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, section: e.target.value as 'university' | 'media' } }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9]">
                        <option value="university">University</option>
                        <option value="media">Media</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Display order</label>
                      <input type="number"
                        value={draft.sort_order ?? 0}
                        onChange={(e) => setDraft(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Description</label>
                    <textarea
                      value={(draft.body_html ?? '') as string}
                      onChange={(e) => setBodyHtml(e.target.value)}
                      rows={3}
                      placeholder="Brief description of the video…"
                      className="w-full rounded-xl border border-[#e0e2e6] px-4 py-2.5 text-sm text-[#181d26] outline-none focus:border-[#1b61c9] resize-none" />
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        {/* ── RIGHT: Meta Panel ──────────────────────────── */}
        <AnimatePresence>
          {hasEditor && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 272, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex shrink-0 flex-col border-l border-[#e0e2e6] bg-white overflow-y-auto overflow-x-hidden"
            >
              <div className="divide-y divide-[#f0f2f7]">

                {/* Status */}
                <div className="p-4 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">Status</div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[currentStatus]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${currentStatus === 'published' ? 'bg-emerald-500 animate-pulse' : currentStatus === 'scheduled' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                  </div>
                  {currentStatus !== 'published' ? (
                    <button onClick={handlePublish} disabled={isSaving || isNew}
                      className="w-full rounded-xl bg-[#1b61c9] py-2 text-xs font-semibold text-white hover:bg-[#1550aa] disabled:opacity-40 transition">
                      🚀 Publish Now
                    </button>
                  ) : (
                    <button onClick={handleUnpublish}
                      className="w-full rounded-xl border border-amber-200 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition">
                      ↩ Move to Draft
                    </button>
                  )}
                </div>

                {/* Blog meta */}
                {activeTab === 'blog' && (
                  <div className="p-4 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">Post Settings</div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Author</label>
                      <input type="text"
                        value={draft.meta?.author as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, author: e.target.value } }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Category</label>
                      <select
                        value={draft.meta?.category as string ?? 'education'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]">
                        {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Excerpt</label>
                      <textarea
                        value={draft.meta?.excerpt as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, excerpt: e.target.value } }))}
                        rows={3}
                        placeholder="Short summary for post cards…"
                        className="w-full resize-none rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Publish Date</label>
                      <input type="date"
                        value={draft.meta?.publishedAt as string ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, publishedAt: e.target.value } }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() => setDraft(d => ({ ...d, meta: { ...d.meta, featured: !d.meta?.featured } }))}
                        className={`relative h-5 w-9 rounded-full transition-colors ${draft.meta?.featured ? 'bg-[#1b61c9]' : 'bg-[#e0e2e6]'}`}>
                        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${draft.meta?.featured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </div>
                      <span className="text-xs font-medium text-[rgba(4,14,32,0.65)]">Featured post</span>
                    </label>
                  </div>
                )}

                {/* FAQ meta */}
                {activeTab === 'faq' && (
                  <div className="p-4 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">FAQ Settings</div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Category</label>
                      <select
                        value={draft.meta?.category as string ?? 'general'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]">
                        {FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[rgba(4,14,32,0.55)]">Sort Order</label>
                      <input type="number"
                        value={draft.sort_order ?? 0}
                        onChange={(e) => setDraft(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))}
                        className="w-full rounded-xl border border-[#e0e2e6] px-3 py-2 text-xs text-[#181d26] outline-none focus:border-[#1b61c9]" />
                    </div>
                  </div>
                )}

                {/* SEO preview (blog only) */}
                {activeTab === 'blog' && draft.title && (
                  <div className="p-4 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">SEO Preview</div>
                    <div className="rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-3 space-y-1">
                      <div className="text-[11px] text-emerald-600 truncate">autopilotroi.com › blog › {draft.slug || 'post-slug'}</div>
                      <div className="text-sm font-semibold text-[#1a0dab] line-clamp-2 leading-tight">{draft.title}</div>
                      {draft.meta?.excerpt && (
                        <div className="text-[11px] text-[rgba(4,14,32,0.55)] line-clamp-3 leading-relaxed">{draft.meta.excerpt as string}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Version history pill */}
                {revisions.length > 0 && (
                  <div className="p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)] mb-3">Version History</div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {revisions.map((rev) => (
                        <div key={rev.id} className="flex items-center justify-between gap-2 rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-3 py-2">
                          <div>
                            <div className="text-[11px] font-semibold text-[#181d26]">{rev.label || 'Auto-save'}</div>
                            <div className="text-[10px] text-[rgba(4,14,32,0.40)]">{new Date(rev.created_at).toLocaleString()}</div>
                          </div>
                          <button onClick={() => handleRestore(rev)}
                            className="rounded-lg border border-[#1b61c9]/20 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-[#1b61c9] hover:bg-blue-100 transition">
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>

      <ToastContainer />
    </div>
  )
}
