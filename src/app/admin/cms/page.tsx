'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  loadStore, saveStore, undo, getUndoCount, exportContent, importContent,
  createBlog, updateBlog, deleteBlog,
  createFaq, updateFaq, deleteFaq,
  createVideo, updateVideo, deleteVideo,
  type ContentStore, type BlogPost, type FaqItem, type VideoItem,
  updatePageCopy,
} from '@/lib/content-store'
import { useToast } from '@/components/ui/Toast'

/* ═══════════════════════════════════════════════════════════════
   CONTENT EDITOR — In-app CMS for Barry (and team)
   
   Page-based editing: Homepage | Blog | FAQs | Videos
   Features: inline editing, undo, export/import, walkthrough
   ═══════════════════════════════════════════════════════════════ */

type Tab = 'homepage' | 'blog' | 'faqs' | 'videos'

const TABS: { key: Tab; label: string; icon: string; desc: string }[] = [
  { key: 'homepage', label: 'Homepage', icon: '🏠', desc: 'Edit hero headline, CTAs, and page copy' },
  { key: 'blog', label: 'Blog Posts', icon: '📝', desc: 'Create and manage blog articles' },
  { key: 'faqs', label: 'FAQs', icon: '❓', desc: 'Add, edit, and reorder Q&A pairs' },
  { key: 'videos', label: 'Videos', icon: '🎬', desc: 'Manage YouTube video library' },
]

// ── Walkthrough Slides ──────────────────────────────────────

const WALKTHROUGH_KEY = 'autopilotroi-cms-walkthrough-seen'

const slides = [
  {
    title: 'Welcome to the Content Editor ✍️',
    body: 'This is where you edit all the content on your website — headlines, blog posts, FAQs, and videos. No code required.',
    icon: '🎯',
  },
  {
    title: 'Edit by Page',
    body: 'Content is organized by page — click the tab for the section you want to update. Each tab shows the current content with Edit buttons.',
    icon: '📄',
  },
  {
    title: 'Undo Any Mistake',
    body: 'Press Ctrl+Z or click the Undo button to revert your last change. We keep 50 levels of undo history — so feel free to experiment!',
    icon: '↩️',
  },
  {
    title: 'Backup & Restore',
    body: 'Use Export to download all your content as a JSON file. Use Import to restore from a backup. Great for moving content between environments.',
    icon: '💾',
  },
]

export default function ContentEditorPage() {
  const [store, setStore] = useState<ContentStore | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('homepage')
  const [undoCount, setUndoCount] = useState(0)
  const [showWalkthrough, setShowWalkthrough] = useState(false)
  const [walkthroughStep, setWalkthroughStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast, ToastContainer } = useToast()

  // Load store on mount
  useEffect(() => {
    setStore(loadStore())
    setUndoCount(getUndoCount())
    // Show walkthrough on first visit
    if (!localStorage.getItem(WALKTHROUGH_KEY)) {
      setShowWalkthrough(true)
    }
  }, [])

  // Ctrl+Z handler
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        handleUndo()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const refreshStore = useCallback(() => {
    setStore(loadStore())
    setUndoCount(getUndoCount())
  }, [])

  const handleUndo = useCallback(() => {
    const restored = undo()
    if (restored) {
      setStore(restored)
      setUndoCount(getUndoCount())
      toast('Change undone!', 'info')
    } else {
      toast('Nothing to undo', 'info')
    }
  }, [toast])

  const handleExport = useCallback(() => {
    const json = exportContent()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `autopilotroi-content-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast('Content exported!', 'success')
  }, [toast])

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const json = ev.target?.result as string
      const imported = importContent(json)
      if (imported) {
        setStore(imported)
        setUndoCount(getUndoCount())
        toast('Content imported successfully!', 'success')
      } else {
        toast('Invalid file format', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [toast])

  const dismissWalkthrough = useCallback(() => {
    localStorage.setItem(WALKTHROUGH_KEY, 'true')
    setShowWalkthrough(false)
  }, [])

  if (!store) return <div className="p-8 text-[var(--text-muted)]">Loading content...</div>

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
            Content Editor
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Edit your website content — headlines, blog posts, FAQs, and videos. Changes are saved automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={undoCount === 0}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
            title={`Undo (${undoCount} steps available)`}
          >
            ↩️ Undo {undoCount > 0 && <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] text-blue-400">{undoCount}</span>}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)]"
          >
            ⬇️ Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)]"
          >
            ⬆️ Import
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <button
            onClick={() => { setWalkthroughStep(0); setShowWalkthrough(true) }}
            className="flex items-center gap-1.5 rounded-xl border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 transition hover:bg-blue-500/20"
          >
            ❓ Help
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
          {activeTab === 'homepage' && <HomepageEditor store={store} onRefresh={refreshStore} toast={toast} />}
          {activeTab === 'blog' && <BlogEditor store={store} onRefresh={refreshStore} toast={toast} />}
          {activeTab === 'faqs' && <FaqEditor store={store} onRefresh={refreshStore} toast={toast} />}
          {activeTab === 'videos' && <VideoEditor store={store} onRefresh={refreshStore} toast={toast} />}
        </motion.div>
      </AnimatePresence>

      {/* Walkthrough Modal */}
      <AnimatePresence>
        {showWalkthrough && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismissWalkthrough} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <span className="text-5xl">{slides[walkthroughStep].icon}</span>
                <h2 className="mt-4 font-[var(--font-sora)] text-xl font-bold text-[var(--text-primary)]">
                  {slides[walkthroughStep].title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
                  {slides[walkthroughStep].body}
                </p>
              </div>
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {slides.map((_, i) => (
                  <div key={i} className={`h-2 w-2 rounded-full transition ${i === walkthroughStep ? 'bg-blue-500' : 'bg-white/20'}`} />
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={dismissWalkthrough} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]">Skip</button>
                <button
                  onClick={() => {
                    if (walkthroughStep < slides.length - 1) {
                      setWalkthroughStep(s => s + 1)
                    } else {
                      dismissWalkthrough()
                    }
                  }}
                  className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  {walkthroughStep < slides.length - 1 ? 'Next →' : 'Get Started!'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SUB-EDITORS — Each tab gets its own component
// ═══════════════════════════════════════════════════════════════

type ToastFn = (msg: string, type: 'success' | 'error' | 'info') => void

/* ── HOMEPAGE EDITOR ── */
function HomepageEditor({ store, onRefresh, toast }: { store: ContentStore; onRefresh: () => void; toast: ToastFn }) {
  const pageCopy = store.pages.homepage || {}
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const fields = [
    { key: 'heroHeadline', label: 'Hero Headline', hint: 'The big text at the top of the homepage', multiline: true },
    { key: 'heroSubheadline', label: 'Hero Subheadline', hint: 'Smaller text below the headline', multiline: true },
    { key: 'heroPrimaryCta', label: 'Primary CTA Button', hint: 'The main call-to-action button text', multiline: false },
    { key: 'heroSecondaryCta', label: 'Secondary CTA Button', hint: 'The secondary button text (e.g., "Watch Demo")', multiline: false },
    { key: 'heroVideoUrl', label: 'Hero Video URL', hint: 'YouTube URL for the demo video modal', multiline: false },
    { key: 'finalCtaHeadline', label: 'Bottom CTA Headline', hint: 'The headline above the final call-to-action section', multiline: false },
    { key: 'finalCtaDescription', label: 'Bottom CTA Description', hint: 'Supporting text below the bottom CTA headline', multiline: true },
  ]

  function startEdit(key: string) {
    setEditing(key)
    setDraft(pageCopy[key] || '')
  }

  function saveEdit(key: string) {
    updatePageCopy('homepage', { [key]: draft })
    setEditing(null)
    onRefresh()
    toast('Saved!', 'success')
  }

  function cancelEdit() {
    setEditing(null)
    setDraft('')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> Click &quot;Edit&quot; on any field to change it. Press Enter or click &quot;Save&quot; when done. Press Escape to cancel.
        </p>
      </div>

      {fields.map((field) => (
        <div key={field.key} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="text-sm font-semibold text-[var(--text-primary)]">{field.label}</label>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{field.hint}</p>
            </div>
            {editing !== field.key && (
              <button
                onClick={() => startEdit(field.key)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500"
              >
                ✏️ Edit
              </button>
            )}
          </div>
          {editing === field.key ? (
            <div className="space-y-2">
              {field.multiline ? (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') cancelEdit() }}
                  rows={3}
                  className="w-full rounded-xl border border-blue-500/50 bg-blue-500/5 px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(field.key)
                    if (e.key === 'Escape') cancelEdit()
                  }}
                  className="w-full rounded-xl border border-blue-500/50 bg-blue-500/5 px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  autoFocus
                />
              )}
              <div className="flex gap-2">
                <button onClick={() => saveEdit(field.key)} className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500">
                  ✅ Save
                </button>
                <button onClick={cancelEdit} className="rounded-lg border border-[var(--border-primary)] px-4 py-1.5 text-xs text-[var(--text-muted)] transition hover:bg-[var(--bg-card-hover)]">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-[var(--bg-card-hover)] px-4 py-3 text-sm text-[var(--text-secondary)] whitespace-pre-wrap min-h-[2.5rem]">
              {pageCopy[field.key] || <span className="text-[var(--text-muted)] italic">Not set — click Edit to add content</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── BLOG EDITOR ── */
function BlogEditor({ store, onRefresh, toast }: { store: ContentStore; onRefresh: () => void; toast: ToastFn }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', slug: '', excerpt: '', body: '', author: 'Barry Goss', category: 'education', featured: false, publishedAt: new Date().toISOString().slice(0, 10) })

  function handleCreate() {
    if (!newPost.title.trim()) { toast('Title is required', 'error'); return }
    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    createBlog({ ...newPost, slug })
    setNewPost({ title: '', slug: '', excerpt: '', body: '', author: 'Barry Goss', category: 'education', featured: false, publishedAt: new Date().toISOString().slice(0, 10) })
    setShowNew(false)
    onRefresh()
    toast('Blog post created!', 'success')
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? You can undo this.`)) return
    deleteBlog(id)
    onRefresh()
    toast('Post deleted (Ctrl+Z to undo)', 'info')
  }

  function handleUpdate(id: string, updates: Partial<BlogPost>) {
    updateBlog(id, updates)
    setEditingId(null)
    onRefresh()
    toast('Saved!', 'success')
  }

  const categories = ['education', 'product-updates', 'announcements', 'partner-resources', 'market-insights']

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-[var(--text-muted)]">{store.blogs.length} posts</p>
        <button onClick={() => setShowNew(true)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
          + New Post
        </button>
      </div>

      {/* New post form */}
      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5 space-y-3"
          >
            <h3 className="text-sm font-semibold text-emerald-400">New Blog Post</h3>
            <input type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Post title" className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <textarea value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} placeholder="Brief excerpt / summary" rows={2} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <textarea value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} placeholder="Post body (supports plain text or markdown)" rows={4} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none font-mono text-xs" />
            <div className="flex gap-3 flex-wrap">
              <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none">
                {categories.map(c => <option key={c} value={c}>{c.replace('-', ' ')}</option>)}
              </select>
              <input type="text" value={newPost.author} onChange={e => setNewPost({ ...newPost, author: e.target.value })} placeholder="Author" className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none w-40" />
              <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <input type="checkbox" checked={newPost.featured} onChange={e => setNewPost({ ...newPost, featured: e.target.checked })} className="accent-blue-500" /> Featured
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500">Create Post</button>
              <button onClick={() => setShowNew(false)} className="rounded-xl border border-[var(--border-primary)] px-4 py-2 text-xs text-[var(--text-muted)] transition hover:bg-[var(--bg-card-hover)]">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      {store.blogs.length === 0 ? (
        <EmptyState icon="📝" text="No blog posts yet" action="Create your first post" onAction={() => setShowNew(true)} />
      ) : (
        store.blogs.map((post) => (
          <PostCard key={post.id} post={post} isEditing={editingId === post.id}
            onEdit={() => setEditingId(post.id)} onCancel={() => setEditingId(null)}
            onSave={(updates) => handleUpdate(post.id, updates)}
            onDelete={() => handleDelete(post.id, post.title)}
            categories={categories}
          />
        ))
      )}
    </div>
  )
}

/* ── Post Card ── */
function PostCard({ post, isEditing, onEdit, onCancel, onSave, onDelete, categories }: {
  post: BlogPost; isEditing: boolean; onEdit: () => void; onCancel: () => void;
  onSave: (u: Partial<BlogPost>) => void; onDelete: () => void; categories: string[];
}) {
  const [draft, setDraft] = useState(post)
  useEffect(() => { setDraft(post) }, [post])

  return (
    <div className={`rounded-2xl border bg-[var(--bg-card)] p-5 transition ${isEditing ? 'border-blue-500/40' : 'border-[var(--border-primary)]'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input type="text" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] outline-none" />
          <textarea value={draft.excerpt} onChange={e => setDraft({ ...draft, excerpt: e.target.value })} rows={2} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none" />
          <textarea value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} rows={4} placeholder="Post body" className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none font-mono text-xs" />
          <div className="flex gap-3 flex-wrap items-center">
            <select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none">
              {categories.map(c => <option key={c} value={c}>{c.replace('-', ' ')}</option>)}
            </select>
            <input type="text" value={draft.author} onChange={e => setDraft({ ...draft, author: e.target.value })} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none w-40" />
            <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <input type="checkbox" checked={draft.featured} onChange={e => setDraft({ ...draft, featured: e.target.checked })} className="accent-blue-500" /> Featured
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onSave(draft)} className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500">✅ Save</button>
            <button onClick={onCancel} className="rounded-lg border border-[var(--border-primary)] px-4 py-1.5 text-xs text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {post.featured && <span className="text-[10px] rounded-full bg-amber-500/15 text-amber-400 px-2 py-0.5 font-semibold">⭐ Featured</span>}
              <span className="text-[10px] rounded-full bg-blue-500/15 text-blue-400 px-2 py-0.5 font-semibold capitalize">{post.category.replace('-', ' ')}</span>
            </div>
            <h3 className="font-semibold text-[var(--text-primary)]">{post.title}</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{post.excerpt}</p>
            <p className="mt-2 text-[10px] text-[var(--text-muted)]">{post.author} · {post.publishedAt}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={onEdit} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">✏️ Edit</button>
            <button onClick={onDelete} className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">🗑️</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── FAQ EDITOR ── */
function FaqEditor({ store, onRefresh, toast }: { store: ContentStore; onRefresh: () => void; toast: ToastFn }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general' })

  function handleCreate() {
    if (!newFaq.question.trim()) { toast('Question is required', 'error'); return }
    createFaq({ ...newFaq, order: store.faqs.length + 1 })
    setNewFaq({ question: '', answer: '', category: 'general' })
    setShowNew(false)
    onRefresh()
    toast('FAQ added!', 'success')
  }

  function handleUpdate(id: string, updates: Partial<FaqItem>) {
    updateFaq(id, updates)
    setEditingId(null)
    onRefresh()
    toast('Saved!', 'success')
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this FAQ? You can undo.')) return
    deleteFaq(id)
    onRefresh()
    toast('FAQ deleted (Ctrl+Z to undo)', 'info')
  }

  function moveUp(idx: number) {
    if (idx === 0) return
    const ids = store.faqs.map(f => f.id)
    ;[ids[idx - 1], ids[idx]] = [ids[idx], ids[idx - 1]]
    // We need to manually reorder
    const reordered = ids.map((id, i) => ({ ...store.faqs.find(f => f.id === id)!, order: i + 1 }))
    const s = loadStore()
    s.faqs = reordered
    saveStore(s, 'Reordered FAQs')
    onRefresh()
  }

  function moveDown(idx: number) {
    if (idx === store.faqs.length - 1) return
    const ids = store.faqs.map(f => f.id)
    ;[ids[idx], ids[idx + 1]] = [ids[idx + 1], ids[idx]]
    const reordered = ids.map((id, i) => ({ ...store.faqs.find(f => f.id === id)!, order: i + 1 }))
    const s = loadStore()
    s.faqs = reordered
    saveStore(s, 'Reordered FAQs')
    onRefresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-[var(--text-muted)]">{store.faqs.length} questions · drag to reorder</p>
        <button onClick={() => setShowNew(true)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">+ New FAQ</button>
      </div>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5 space-y-3"
          >
            <input type="text" value={newFaq.question} onChange={e => setNewFaq({ ...newFaq, question: e.target.value })} placeholder="Question" className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <textarea value={newFaq.answer} onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })} placeholder="Answer" rows={3} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500">Add FAQ</button>
              <button onClick={() => setShowNew(false)} className="rounded-xl border border-[var(--border-primary)] px-4 py-2 text-xs text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {store.faqs.length === 0 ? (
        <EmptyState icon="❓" text="No FAQs yet" action="Add your first FAQ" onAction={() => setShowNew(true)} />
      ) : (
        store.faqs.sort((a, b) => a.order - b.order).map((faq, idx) => (
          <FaqCard key={faq.id} faq={faq} isEditing={editingId === faq.id}
            onEdit={() => setEditingId(faq.id)} onCancel={() => setEditingId(null)}
            onSave={(u) => handleUpdate(faq.id, u)} onDelete={() => handleDelete(faq.id)}
            onMoveUp={() => moveUp(idx)} onMoveDown={() => moveDown(idx)}
            isFirst={idx === 0} isLast={idx === store.faqs.length - 1}
          />
        ))
      )}
    </div>
  )
}

function FaqCard({ faq, isEditing, onEdit, onCancel, onSave, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: {
  faq: FaqItem; isEditing: boolean; onEdit: () => void; onCancel: () => void;
  onSave: (u: Partial<FaqItem>) => void; onDelete: () => void;
  onMoveUp: () => void; onMoveDown: () => void; isFirst: boolean; isLast: boolean;
}) {
  const [draft, setDraft] = useState(faq)
  useEffect(() => { setDraft(faq) }, [faq])

  return (
    <div className={`rounded-2xl border bg-[var(--bg-card)] p-5 transition ${isEditing ? 'border-blue-500/40' : 'border-[var(--border-primary)]'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input type="text" value={draft.question} onChange={e => setDraft({ ...draft, question: e.target.value })} className="w-full rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] outline-none" />
          <textarea value={draft.answer} onChange={e => setDraft({ ...draft, answer: e.target.value })} rows={3} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none" />
          <div className="flex gap-2">
            <button onClick={() => onSave(draft)} className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500">✅ Save</button>
            <button onClick={onCancel} className="rounded-lg border border-[var(--border-primary)] px-4 py-1.5 text-xs text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-1 shrink-0">
            <button onClick={onMoveUp} disabled={isFirst} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-20">▲</button>
            <span className="text-[10px] text-[var(--text-muted)] text-center">{faq.order}</span>
            <button onClick={onMoveDown} disabled={isLast} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-20">▼</button>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-[var(--text-primary)]">{faq.question}</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{faq.answer}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={onEdit} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">✏️</button>
            <button onClick={onDelete} className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">🗑️</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── VIDEO EDITOR ── */
function VideoEditor({ store, onRefresh, toast }: { store: ContentStore; onRefresh: () => void; toast: ToastFn }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', youtubeId: '', description: '', category: 'Overview', duration: '', order: 0, featured: false, section: 'university' as const })

  function extractYouTubeId(input: string): string {
    // Handle full URLs or just IDs
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : input.trim()
  }

  function handleCreate() {
    if (!newVideo.title.trim()) { toast('Title is required', 'error'); return }
    const ytId = extractYouTubeId(newVideo.youtubeId)
    createVideo({ ...newVideo, youtubeId: ytId, order: store.videos.length + 1 })
    setNewVideo({ title: '', youtubeId: '', description: '', category: 'Overview', duration: '', order: 0, featured: false, section: 'university' })
    setShowNew(false)
    onRefresh()
    toast('Video added!', 'success')
  }

  function handleUpdate(id: string, updates: Partial<VideoItem>) {
    if (updates.youtubeId) updates.youtubeId = extractYouTubeId(updates.youtubeId)
    updateVideo(id, updates)
    setEditingId(null)
    onRefresh()
    toast('Saved!', 'success')
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    deleteVideo(id)
    onRefresh()
    toast('Video deleted (Ctrl+Z to undo)', 'info')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-[var(--text-muted)]">{store.videos.length} videos</p>
        <button onClick={() => setShowNew(true)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">+ Add Video</button>
      </div>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5 space-y-3"
          >
            <input type="text" value={newVideo.title} onChange={e => setNewVideo({ ...newVideo, title: e.target.value })} placeholder="Video title" className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <input type="text" value={newVideo.youtubeId} onChange={e => setNewVideo({ ...newVideo, youtubeId: e.target.value })} placeholder="YouTube URL or Video ID (e.g. dQw4w9WgXcQ)" className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            {newVideo.youtubeId && (
              <div className="rounded-xl overflow-hidden border border-[var(--border-primary)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${extractYouTubeId(newVideo.youtubeId)}/hqdefault.jpg`} alt="Preview" className="w-full max-w-[200px] rounded-lg" />
              </div>
            )}
            <textarea value={newVideo.description} onChange={e => setNewVideo({ ...newVideo, description: e.target.value })} placeholder="Description" rows={2} className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" />
            <div className="flex gap-3 flex-wrap">
              <input type="text" value={newVideo.category} onChange={e => setNewVideo({ ...newVideo, category: e.target.value })} placeholder="Category" className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none w-36" />
              <input type="text" value={newVideo.duration} onChange={e => setNewVideo({ ...newVideo, duration: e.target.value })} placeholder="Duration (e.g. 12:30)" className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none w-32" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreate} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500">Add Video</button>
              <button onClick={() => setShowNew(false)} className="rounded-xl border border-[var(--border-primary)] px-4 py-2 text-xs text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {store.videos.length === 0 ? (
        <EmptyState icon="🎬" text="No videos yet" action="Add your first video" onAction={() => setShowNew(true)} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {store.videos.map((video) => (
            <VideoCard key={video.id} video={video} isEditing={editingId === video.id}
              onEdit={() => setEditingId(video.id)} onCancel={() => setEditingId(null)}
              onSave={(u) => handleUpdate(video.id, u)} onDelete={() => handleDelete(video.id, video.title)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function VideoCard({ video, isEditing, onEdit, onCancel, onSave, onDelete }: {
  video: VideoItem; isEditing: boolean; onEdit: () => void; onCancel: () => void;
  onSave: (u: Partial<VideoItem>) => void; onDelete: () => void;
}) {
  const [draft, setDraft] = useState(video)
  useEffect(() => { setDraft(video) }, [video])

  return (
    <div className={`rounded-2xl border bg-[var(--bg-card)] overflow-hidden transition ${isEditing ? 'border-blue-500/40' : 'border-[var(--border-primary)]'}`}>
      {/* Thumbnail */}
      <div className="aspect-video bg-slate-900 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${isEditing ? draft.youtubeId : video.youtubeId}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover opacity-80" />
        {!isEditing && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">{video.duration}</span>
        )}
      </div>
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <input type="text" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-lg border border-blue-500/30 bg-blue-500/5 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] outline-none" />
            <input type="text" value={draft.youtubeId} onChange={e => setDraft({ ...draft, youtubeId: e.target.value })} placeholder="YouTube ID or URL" className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none" />
            <textarea value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} rows={2} className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none" />
            <div className="flex gap-2">
              <button onClick={() => onSave(draft)} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500">✅ Save</button>
              <button onClick={onCancel} className="rounded-lg border border-[var(--border-primary)] px-3 py-1.5 text-xs text-[var(--text-muted)]">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              {video.featured && <span className="text-[10px] rounded-full bg-amber-500/15 text-amber-400 px-2 py-0.5 font-semibold">⭐</span>}
              <span className="text-[10px] text-[var(--text-muted)]">{video.category}</span>
            </div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)]">{video.title}</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{video.description}</p>
            <div className="flex gap-1.5 mt-3">
              <button onClick={onEdit} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">✏️ Edit</button>
              <button onClick={onDelete} className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">🗑️</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Empty State ── */
function EmptyState({ icon, text, action, onAction }: { icon: string; text: string; action: string; onAction: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-primary)] bg-[var(--bg-card)] p-12 text-center">
      <span className="text-4xl">{icon}</span>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{text}</p>
      <button onClick={onAction} className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">{action}</button>
    </div>
  )
}
