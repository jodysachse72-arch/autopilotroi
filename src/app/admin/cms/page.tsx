'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { JSONContent } from '@tiptap/react'
import {
  listPosts, getPost, createPost, updatePost, deletePost,
  publishPost, unpublishPost, getRevisions, restoreRevision, uploadMedia,
  type CmsPost, type CmsPostSummary, type CmsRevision,
} from '@/lib/cms/service'
import { useToast } from '@/components/ui/Toast'
import {
  Card,
  FormButton,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormRow,
  StatusBadge,
  type StatusTone,
} from '@/components/backend'

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CONTENT EDITOR  (/admin/cms)
   3-panel layout: List | Tiptap Editor | Meta
   Data: Supabase cms_posts / cms_revisions / cms_media
   Editor: Tiptap (rich text — bold, headings, images, YouTube…)
   To migrate to Payload CMS: change src/lib/cms/service.ts only.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
type PostStatus = 'published' | 'draft' | 'scheduled'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'blog',      label: 'Blog Posts',   icon: '📝' },
  { key: 'faq',       label: 'FAQs',         icon: '❓' },
  { key: 'video',     label: 'Videos',       icon: '🎬' },
  { key: 'page_copy', label: 'Page Copy',    icon: '🏠' },
]

const statusToneMap: Record<PostStatus, StatusTone> = {
  published: 'green',
  draft:     'amber',
  scheduled: 'blue',
}

const BLOG_CATEGORIES = ['education', 'product-updates', 'announcements', 'partner-resources', 'market-insights']
const FAQ_CATEGORIES  = ['general', 'products', 'getting-started', 'payments', 'partners']

const HOW_IT_WORKS = [
  { step: '1', label: 'Choose a content type', detail: 'Use the Blog / FAQs / Videos / Page Copy tabs above' },
  { step: '2', label: 'Create or select a post', detail: 'Click any item in the left panel, or press "+ New"' },
  { step: '3', label: 'Write, save, publish', detail: 'Body auto-saves as you type. Hit Publish to go live.' },
] as const

const CONTENT_MAP = [
  { icon: '📝', tab: 'Blog Posts', url: '/blog  ·  /blog/[slug]', note: 'Title + excerpt on list. Full rich-text body on post page.' },
  { icon: '❓', tab: 'FAQs',       url: '/faqs',                  note: 'Title = question. Body (rich text) = answer in accordion.' },
  { icon: '🎬', tab: 'Videos',     url: '/university  or  /media', note: 'Set the "Section" field to choose which page it appears on.' },
  { icon: '🏠', tab: 'Page Copy',  url: 'Homepage, Products…',    note: 'Slug = page key (e.g. "homepage"). Key-value meta fields.' },
] as const

// â”€â”€ Empty post template per type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function newPost(type: Tab): Partial<CmsPost> {
  const base = { type, status: 'draft' as const, sort_order: 0, meta: {} }
  if (type === 'blog')  return { ...base, title: 'Untitled Post', slug: '', meta: { category: 'education', author: 'Barry Goss', featured: false } }
  if (type === 'faq')   return { ...base, title: 'New FAQ',       meta: { category: 'general' } }
  if (type === 'video') return { ...base, title: 'New Video',     meta: { youtubeId: '', duration: '', category: 'Overview', featured: false, section: 'university' } }
  return { ...base, title: 'Page Copy', slug: 'homepage', meta: {} }
}

// â”€â”€ Main page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ContentEditorPage() {
  const [activeTab, setActiveTab]           = useState<Tab>('blog')
  const [posts, setPosts]                   = useState<CmsPostSummary[]>([])
  const [selectedId, setSelectedId]         = useState<string | null>(null)
  const [selected, setSelected]             = useState<CmsPost | null>(null)
  const [revisions, setRevisions]           = useState<CmsRevision[]>([])
  const [showRevisions, setShowRevisions]   = useState(false)
  const [isSaving, setIsSaving]             = useState(false)
  const [isLoading, setIsLoading]           = useState(true)
  const [isNew, setIsNew]                   = useState(false)
  const [draft, setDraft]                   = useState<Partial<CmsPost>>({})
  const [bodyJson, setBodyJson]             = useState<JSONContent | null>(null)
  const [bodyHtml, setBodyHtml]             = useState<string>('')
  const autoSaveTimer                       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const { toast, ToastContainer }           = useToast()

  const activeTabMeta = useMemo(() => TABS.find(t => t.key === activeTab), [activeTab])

  // Load list when tab changes
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
          body:       bodyJson ?? null,
          body_html:  bodyHtml || null,
          type:       activeTab,
          status:     draft.status ?? 'draft',
          sort_order: draft.sort_order ?? 0,
          meta:       draft.meta ?? {},
          slug:       draft.slug ?? null,
          title:      draft.title ?? null,
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
  }, [selectedId, toast])

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    const media = await uploadMedia(file, '')
    return media.public_url
  }, [])

  const startNew = useCallback(() => {
    setIsNew(true)
    setSelectedId(null)
    setSelected(null)
    setBodyJson(null)
    setBodyHtml('')
    setDraft(newPost(activeTab) as Partial<CmsPost>)
  }, [activeTab])

  const hasEditor     = selected !== null || isNew
  const currentStatus = (draft.status ?? 'draft') as PostStatus
  const dotClass      = currentStatus === 'published' ? 'bg-emerald-500 animate-pulse'
                      : currentStatus === 'scheduled' ? 'bg-blue-500'
                      : 'bg-amber-500'

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">

      {/* â”€â”€â”€ Top bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#e0e2e6] bg-white px-6 py-3">
        <div>
          <h1 className="font-[var(--font-sora)] text-xl font-bold text-[#181d26]">Content Editor</h1>
          <p className="text-xs text-[rgba(4,14,32,0.40)]">
            Supabase-backed · changes auto-save · {posts.length} {activeTab === 'blog' ? 'posts' : activeTab === 'faq' ? 'FAQs' : activeTab === 'video' ? 'videos' : 'entries'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {autoSaveStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-xs text-[rgba(4,14,32,0.45)]"
              >
                {autoSaveStatus === 'saving'
                  ? <><div className="h-3 w-3 animate-spin rounded-full border border-[#1b61c9] border-t-transparent" /> Saving…</>
                  : <><span className="text-emerald-500">✓</span> Saved</>}
              </motion.div>
            )}
          </AnimatePresence>

          {hasEditor && selected && (
            <>
              <FormButton
                variant="ghost"
                size="sm"
                onClick={() => setShowRevisions(s => !s)}
              >
                🕐 History {revisions.length > 0 && `(${revisions.length})`}
              </FormButton>
              <FormButton
                variant="danger"
                size="sm"
                onClick={handleDelete}
              >
                🗑️ Delete
              </FormButton>
            </>
          )}

          {hasEditor && (
            <>
              <FormButton
                variant="secondary"
                size="sm"
                loading={isSaving}
                onClick={handleSave}
              >
                {isSaving ? 'Saving…' : '💾 Save'}
              </FormButton>
              {currentStatus !== 'published' ? (
                <FormButton
                  variant="primary"
                  size="sm"
                  loading={isSaving}
                  disabled={isNew}
                  onClick={handlePublish}
                >
                  🚀 Publish
                </FormButton>
              ) : (
                <FormButton
                  variant="secondary"
                  size="sm"
                  onClick={handleUnpublish}
                >
                  â†© Unpublish
                </FormButton>
              )}
            </>
          )}
        </div>
      </div>

      {/* â”€â”€â”€ Type tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex shrink-0 gap-0 border-b border-[#e0e2e6] bg-[#f8fafc]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition border-b-2 ${
              activeTab === tab.key
                ? 'border-[#1b61c9] text-[#1b61c9] bg-white'
                : 'border-transparent text-[rgba(4,14,32,0.50)] hover:text-[#181d26]'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* â”€â”€â”€ 3-panel body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex flex-1 overflow-hidden">

        {/* â”€â”€ LEFT: Post list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-[#e0e2e6] bg-white overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#e0e2e6] px-4 py-3">
            <span className="text-xs font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-widest">
              {activeTabMeta?.label}
            </span>
            <FormButton variant="primary" size="sm" onClick={startNew}>+ New</FormButton>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1b61c9] border-t-transparent" />
            </div>
          ) : posts.length === 0 && !isNew ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-3xl">{activeTabMeta?.icon}</span>
              <p className="text-sm text-[rgba(4,14,32,0.45)]">No {activeTab === 'faq' ? 'FAQs' : 'posts'} yet</p>
              <FormButton variant="primary" size="sm" onClick={startNew}>Create first</FormButton>
            </div>
          ) : (
            <div className="flex-1 divide-y divide-[#f0f2f7]">
              {isNew && (
                <div className="flex items-start gap-3 bg-blue-50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1b61c9]">{draft.title || 'New Post'}</div>
                    <div className="text-[10px] text-[rgba(4,14,32,0.40)] mt-0.5">Unsaved draft</div>
                  </div>
                  <StatusBadge tone="amber">draft</StatusBadge>
                </div>
              )}
              {posts.map((post) => {
                const isSelected = selectedId === post.id && !isNew
                return (
                  <button
                    key={post.id}
                    onClick={() => { setSelectedId(post.id); setIsNew(false) }}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition hover:bg-[#f8fafc] ${
                      isSelected ? 'bg-blue-50/60 border-l-2 border-[#1b61c9]' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${isSelected ? 'text-[#1b61c9]' : 'text-[#181d26]'}`}>
                        {post.title || 'Untitled'}
                      </div>
                      <div className="text-[10px] text-[rgba(4,14,32,0.35)] mt-0.5 truncate">
                        {(post.meta?.category as string) ?? (post.meta?.youtubeId as string) ?? '—'} · {new Date(post.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    <StatusBadge tone={statusToneMap[post.status as PostStatus]}>{post.status}</StatusBadge>
                  </button>
                )
              })}
            </div>
          )}
        </aside>

        {/* â”€â”€ CENTER: Editor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
          {!hasEditor ? (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <Card padding="lg" className="m-6 shadow-sm">

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
                    {HOW_IT_WORKS.map(s => (
                      <Card key={s.step} padding="lg">
                        <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1b61c9] text-xs font-bold text-white">{s.step}</div>
                        <div className="text-sm font-semibold text-[#181d26]">{s.label}</div>
                        <div className="mt-1 text-xs text-[rgba(4,14,32,0.50)]">{s.detail}</div>
                      </Card>
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
                        {CONTENT_MAP.map(r => (
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
                  <Card padding="lg">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgba(4,14,32,0.40)]">Draft â†’ Published workflow</h3>
                    <ol className="space-y-1.5 text-xs text-[rgba(4,14,32,0.65)]">
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">1.</span> Create or select a post from the left panel</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">2.</span> Write content — body auto-saves every 1.5 s</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">3.</span> Fill metadata in the right panel (author, excerpt, category…)</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">4.</span> Press <strong className="text-[#181d26]">💾 Save</strong> to persist metadata</li>
                      <li className="flex items-start gap-2"><span className="font-bold text-[#1b61c9]">5.</span> Press <strong className="text-[#181d26]">🚀 Publish</strong> — appears on site in ~60 s</li>
                    </ol>
                  </Card>
                  <Card padding="lg" className="space-y-3">
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
                  </Card>
                </div>

                <div className="flex justify-center">
                  <FormButton variant="primary" onClick={startNew}>
                    + Create new {activeTabMeta?.label.slice(0, -1) || 'Post'}
                  </FormButton>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-6">

              {/* Title — kept as a custom oversized input for editorial feel */}
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
                    activeTab === 'faq'  ? 'Write the answer…'
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
                <Card padding="lg" className="space-y-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#181d26]">Video details</h3>

                  <FormField label="YouTube URL or ID">
                    <FormInput
                      type="text"
                      value={(draft.meta?.youtubeId as string) ?? ''}
                      onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, youtubeId: e.target.value } }))}
                      placeholder="https://youtube.com/watch?v=… or dQw4w9WgXcQ"
                    />
                  </FormField>

                  {draft.meta?.youtubeId ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={`https://i.ytimg.com/vi/${String(draft.meta.youtubeId).replace(/.*[?&]v=/, '').split('&')[0]}/hqdefault.jpg`}
                      alt="Thumbnail preview"
                      className="rounded-xl border border-[#e0e2e6] max-h-40 object-cover"
                    />
                  ) : null}

                  <FormRow cols={3}>
                    <FormField label="Duration">
                      <FormInput
                        type="text"
                        value={(draft.meta?.duration as string) ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, duration: e.target.value } }))}
                        placeholder="12:30"
                      />
                    </FormField>
                    <FormField label="Category">
                      <FormInput
                        type="text"
                        value={(draft.meta?.category as string) ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                        placeholder="Overview"
                      />
                    </FormField>
                    <FormField label="Section">
                      <FormSelect
                        value={(draft.meta?.section as string) ?? 'university'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, section: e.target.value as 'university' | 'media' } }))}
                      >
                        <option value="university">University</option>
                        <option value="media">Media</option>
                      </FormSelect>
                    </FormField>
                  </FormRow>

                  <FormField label="Display order">
                    <FormInput
                      type="number"
                      value={draft.sort_order ?? 0}
                      onChange={(e) => setDraft(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </FormField>

                  <FormField label="Description">
                    <FormTextarea
                      value={(draft.body_html ?? '') as string}
                      onChange={(e) => setBodyHtml(e.target.value)}
                      rows={3}
                      placeholder="Brief description of the video…"
                    />
                  </FormField>
                </Card>
              )}

            </div>
          )}
        </main>

        {/* â”€â”€ RIGHT: Meta panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden />
                    <StatusBadge tone={statusToneMap[currentStatus]}>{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</StatusBadge>
                  </div>
                  {currentStatus !== 'published' ? (
                    <FormButton
                      variant="primary"
                      size="sm"
                      loading={isSaving}
                      disabled={isNew}
                      onClick={handlePublish}
                      className="w-full justify-center"
                    >
                      🚀 Publish now
                    </FormButton>
                  ) : (
                    <FormButton
                      variant="secondary"
                      size="sm"
                      onClick={handleUnpublish}
                      className="w-full justify-center"
                    >
                      â†© Move to draft
                    </FormButton>
                  )}
                </div>

                {/* Blog meta */}
                {activeTab === 'blog' && (
                  <div className="p-4 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">Post settings</div>

                    <FormField label="Author">
                      <FormInput
                        type="text"
                        value={(draft.meta?.author as string) ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, author: e.target.value } }))}
                      />
                    </FormField>

                    <FormField label="Category">
                      <FormSelect
                        value={(draft.meta?.category as string) ?? 'education'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                      >
                        {BLOG_CATEGORIES.map(c => (
                          <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
                        ))}
                      </FormSelect>
                    </FormField>

                    <FormField label="Excerpt">
                      <FormTextarea
                        value={(draft.meta?.excerpt as string) ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, excerpt: e.target.value } }))}
                        rows={3}
                        placeholder="Short summary for post cards…"
                      />
                    </FormField>

                    <FormField label="Publish date">
                      <FormInput
                        type="date"
                        value={(draft.meta?.publishedAt as string) ?? ''}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, publishedAt: e.target.value } }))}
                      />
                    </FormField>

                    <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                      <button
                        type="button"
                        onClick={() => setDraft(d => ({ ...d, meta: { ...d.meta, featured: !d.meta?.featured } }))}
                        aria-pressed={!!draft.meta?.featured}
                        className={`relative h-5 w-9 rounded-full transition-colors ${draft.meta?.featured ? 'bg-[#1b61c9]' : 'bg-[#e0e2e6]'}`}
                      >
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${draft.meta?.featured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                      <span className="text-xs font-medium text-[rgba(4,14,32,0.65)]">Featured post</span>
                    </label>
                  </div>
                )}

                {/* FAQ meta */}
                {activeTab === 'faq' && (
                  <div className="p-4 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">FAQ settings</div>
                    <FormField label="Category">
                      <FormSelect
                        value={(draft.meta?.category as string) ?? 'general'}
                        onChange={(e) => setDraft(d => ({ ...d, meta: { ...d.meta, category: e.target.value } }))}
                      >
                        {FAQ_CATEGORIES.map(c => (
                          <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
                        ))}
                      </FormSelect>
                    </FormField>
                    <FormField label="Sort order">
                      <FormInput
                        type="number"
                        value={draft.sort_order ?? 0}
                        onChange={(e) => setDraft(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))}
                      />
                    </FormField>
                  </div>
                )}

                {/* SEO preview (blog only) */}
                {activeTab === 'blog' && draft.title && (
                  <div className="p-4 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)]">SEO preview</div>
                    <div className="rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-3 space-y-1">
                      <div className="text-[11px] text-emerald-600 truncate">autopilotroi.com â€º blog â€º {draft.slug || 'post-slug'}</div>
                      <div className="text-sm font-semibold text-[#1a0dab] line-clamp-2 leading-tight">{draft.title}</div>
                      {draft.meta?.excerpt ? (
                        <div className="text-[11px] text-[rgba(4,14,32,0.55)] line-clamp-3 leading-relaxed">{draft.meta.excerpt as string}</div>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Version history */}
                {(showRevisions || revisions.length > 0) && revisions.length > 0 && (
                  <div className="p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[rgba(4,14,32,0.35)] mb-3">Version history</div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {revisions.map((rev) => (
                        <div key={rev.id} className="flex items-center justify-between gap-2 rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-3 py-2">
                          <div>
                            <div className="text-[11px] font-semibold text-[#181d26]">{rev.label || 'Auto-save'}</div>
                            <div className="text-[10px] text-[rgba(4,14,32,0.40)]">{new Date(rev.created_at).toLocaleString()}</div>
                          </div>
                          <FormButton variant="ghost" size="sm" onClick={() => handleRestore(rev)}>
                            Restore
                          </FormButton>
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


