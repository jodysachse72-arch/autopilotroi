'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card,
  SectionHeader,
  EmptyState,
  DataTable,
  StatusBadge,
  FilterPill,
  Toolbar,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton,
  FormRow,
  type DataColumn,
} from '@/components/backend'
import type { CmsPostMeta } from '@/lib/cms/types'

/* ═══════════════════════════════════════════════════════════════
   ADMIN CMS — Content Editor
   
   List + Editor views for blog/faq content. Writes go through
   /api/admin/cms (service-role) to bypass RLS.
   
   Architecture: content type config is data-driven so new types
   (resource, script, known_issue) can be added without rework.
   ═══════════════════════════════════════════════════════════════ */

// ── Content-type config (extensible) ─────────────────────────

interface MetaFieldDef {
  key: string
  label: string
  type: 'text' | 'textarea' | 'checkbox' | 'select' | 'date'
  placeholder?: string
  options?: string[]   // for type === 'select'
  required?: boolean
}

interface ContentTypeConfig {
  label: string
  hasSlug: boolean
  icon: string
  metaFields: MetaFieldDef[]
}

const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  blog: {
    label: 'Blog Post',
    hasSlug: true,
    icon: '📝',
    metaFields: [
      { key: 'excerpt',    label: 'Excerpt / Description', type: 'textarea', placeholder: 'Brief summary for SEO and previews…' },
      { key: 'author',     label: 'Author',                type: 'text',     placeholder: 'Author name' },
      { key: 'category',   label: 'Category',              type: 'text',     placeholder: 'e.g. Strategy, Updates' },
      { key: 'coverImage', label: 'Cover Image URL',       type: 'text',     placeholder: 'https://…' },
    ],
  },
  faq: {
    label: 'FAQ',
    hasSlug: false,
    icon: '❓',
    metaFields: [
      { key: 'answer', label: 'Plain-text Answer (fallback)', type: 'textarea', placeholder: 'Short answer shown when HTML is unavailable…' },
    ],
  },
  resource: {
    label: 'Resource',
    hasSlug: false,
    icon: '🔗',
    metaFields: [
      { key: 'url',           label: 'URL',                    type: 'text',     placeholder: 'https://…',                    required: true },
      { key: 'resource_type', label: 'Resource Type',          type: 'select',   options: ['video', 'pdf', 'link', 'doc'] },
      { key: 'category',      label: 'Category',               type: 'text',     placeholder: 'e.g. Neyro, Wallet, Onboarding' },
      { key: 'status',        label: 'Resource Status',        type: 'select',   options: ['active', 'featured', 'needs_review', 'broken', 'archived'] },
      { key: 'official',      label: 'Official / Approved Source', type: 'checkbox' },
      { key: 'last_verified', label: 'Last Verified',          type: 'date' },
      { key: 'description',   label: 'Description',            type: 'textarea', placeholder: 'Brief description of this resource…' },
    ],
  },
}

const TYPE_KEYS = Object.keys(CONTENT_TYPES)

// ── Types (local) ────────────────────────────────────────────

interface CmsPostRow {
  id:         string
  type:       string
  slug:       string | null
  title:      string | null
  meta:       CmsPostMeta
  status:     string
  sort_order: number
  updated_at: string
}

interface CmsPostFull extends CmsPostRow {
  body:       Record<string, unknown> | null
  body_html:  string | null
  publish_at: string | null
  created_at: string
  created_by: string | null
}

interface EditorState {
  type:       string
  title:      string
  slug:       string
  body_html:  string
  meta:       Record<string, unknown>
  sort_order: number
}

const EMPTY_EDITOR: EditorState = {
  type: 'blog', title: '', slug: '', body_html: '', meta: {}, sort_order: 0,
}

// ── Helpers ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

/** Strip <script> tags from HTML for the preview pane */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
}

// ── Component ────────────────────────────────────────────────

export default function AdminCmsPage() {
  // View state
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [editingId, setEditingId] = useState<string | null>(null)

  // List state
  const [posts, setPosts] = useState<CmsPostRow[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Editor state
  const [editor, setEditor] = useState<EditorState>(EMPTY_EDITOR)
  const [saving, setSaving] = useState(false)
  const [slugManual, setSlugManual] = useState(false)

  // Feedback
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<CmsPostRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ── API calls ────────────────────────────────────────────

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (typeFilter !== 'all') params.set('type', typeFilter)
      const res = await fetch(`/api/admin/cms?${params}`)
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts || [])
      } else {
        setError('Failed to load posts')
      }
    } catch {
      setError('Network error loading posts')
    } finally {
      setLoading(false)
    }
  }, [typeFilter])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  // Clear feedback after 5s
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(''), 5000)
    return () => clearTimeout(t)
  }, [success])
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(''), 8000)
    return () => clearTimeout(t)
  }, [error])

  async function openEditor(id?: string) {
    setError('')
    setSuccess('')
    if (id) {
      // Load full post for editing
      try {
        const res = await fetch(`/api/admin/cms/${id}`)
        if (!res.ok) { setError('Failed to load post'); return }
        const { post } = await res.json() as { post: CmsPostFull }
        setEditor({
          type:       post.type,
          title:      post.title || '',
          slug:       post.slug || '',
          body_html:  post.body_html || '',
          meta:       (post.meta as Record<string, unknown>) || {},
          sort_order: post.sort_order ?? 0,
        })
        setEditingId(id)
        setSlugManual(true) // don't auto-overwrite existing slugs
      } catch {
        setError('Network error'); return
      }
    } else {
      setEditor({ ...EMPTY_EDITOR })
      setEditingId(null)
      setSlugManual(false)
    }
    setView('editor')
  }

  function backToList() {
    setView('list')
    setEditingId(null)
    setEditor({ ...EMPTY_EDITOR })
    setSlugManual(false)
    fetchPosts()
  }

  async function handleSave(publishAfter = false) {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const payload = {
        type:       editor.type,
        title:      editor.title,
        slug:       CONTENT_TYPES[editor.type]?.hasSlug ? editor.slug : null,
        body_html:  editor.body_html,
        meta:       editor.meta,
        sort_order: editor.sort_order,
        status:     'draft' as const,
      }

      let postId = editingId

      if (editingId) {
        // Update
        const res = await fetch(`/api/admin/cms/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Failed to update'); setSaving(false); return }
        postId = data.post.id
      } else {
        // Create
        const res = await fetch('/api/admin/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Failed to create'); setSaving(false); return }
        postId = data.post.id
        setEditingId(postId)
      }

      if (publishAfter && postId) {
        const res = await fetch(`/api/admin/cms/${postId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'publish' }),
        })
        if (!res.ok) {
          const d = await res.json()
          setError(d.error || 'Saved but failed to publish')
          setSaving(false)
          return
        }
      }

      setSuccess(publishAfter ? 'Published!' : 'Saved as draft')
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function togglePublish(post: CmsPostRow) {
    const action = post.status === 'published' ? 'unpublish' : 'publish'
    try {
      const res = await fetch(`/api/admin/cms/${post.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || `Failed to ${action}`)
        return
      }
      setSuccess(`${post.title} ${action === 'publish' ? 'published' : 'unpublished'}`)
      fetchPosts()
    } catch {
      setError('Network error')
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/cms/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Failed to delete')
      } else {
        setSuccess(`"${deleteTarget.title}" deleted`)
        fetchPosts()
      }
    } catch {
      setError('Network error')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  // ── Editor field helpers ─────────────────────────────────

  function updateTitle(val: string) {
    setEditor(prev => {
      const next = { ...prev, title: val }
      // Auto-generate slug for new posts (only if user hasn't manually edited)
      if (!slugManual && CONTENT_TYPES[prev.type]?.hasSlug) {
        next.slug = slugify(val)
      }
      return next
    })
  }

  function updateMeta(key: string, val: unknown) {
    setEditor(prev => ({ ...prev, meta: { ...prev.meta, [key]: val } }))
  }

  // ── Table columns ────────────────────────────────────────

  const columns: DataColumn<CmsPostRow>[] = useMemo(() => [
    {
      key: 'title',
      header: 'Title',
      render: (p) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold" style={{ color: '#181d26' }}>
            {CONTENT_TYPES[p.type]?.icon} {p.title || '(untitled)'}
          </span>
          {p.slug && (
            <span className="text-xs font-mono" style={{ color: 'rgba(4,14,32,0.4)' }}>
              /{p.slug}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (p) => (
        <code
          className="rounded px-2 py-1 text-xs font-medium"
          style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}
        >
          {CONTENT_TYPES[p.type]?.label || p.type}
        </code>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <StatusBadge tone={p.status === 'published' ? 'green' : 'amber'}>
          {p.status === 'published' ? 'Published' : 'Draft'}
        </StatusBadge>
      ),
    },
    {
      key: 'updated',
      header: 'Updated',
      render: (p) => (
        <span className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          {timeAgo(p.updated_at)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (p) => (
        <div className="flex items-center gap-1.5 justify-end">
          <FormButton variant="ghost" size="sm" onClick={() => openEditor(p.id)}>
            Edit
          </FormButton>
          <FormButton
            variant={p.status === 'published' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => togglePublish(p)}
          >
            {p.status === 'published' ? 'Unpublish' : 'Publish'}
          </FormButton>
          <FormButton variant="danger" size="sm" onClick={() => setDeleteTarget(p)}>
            Delete
          </FormButton>
        </div>
      ),
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  // ── Active type config ───────────────────────────────────

  const activeCfg = CONTENT_TYPES[editor.type]

  // ── Render ───────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      {/* ── Inline feedback ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="rounded-lg px-4 py-3 text-sm"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#b91c1c' }}
            role="alert"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="rounded-lg px-4 py-3 text-sm"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#047857' }}
            role="status"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ LIST VIEW ═══ */}
      {view === 'list' && (
        <>
          <SectionHeader
            title="Content Editor"
            subtitle="Create and manage blog posts, FAQs, and other content"
            actions={
              <FormButton variant="primary" onClick={() => openEditor()}>
                + New Post
              </FormButton>
            }
          />

          <Toolbar
            left={
              <div className="flex items-center gap-2">
                <FilterPill label="All" active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} />
                {TYPE_KEYS.map(k => (
                  <FilterPill key={k} label={`${CONTENT_TYPES[k].icon} ${CONTENT_TYPES[k].label}`} active={typeFilter === k} onClick={() => setTypeFilter(k)} />
                ))}
              </div>
            }
            right={
              <span className="text-xs" style={{ color: 'rgba(4,14,32,0.55)' }}>
                {loading ? 'Loading…' : `${posts.length} item${posts.length === 1 ? '' : 's'}`}
              </span>
            }
          />

          {loading ? (
            <Card>
              <div className="flex items-center justify-center py-16">
                <div
                  className="h-8 w-8 animate-spin rounded-full"
                  style={{ border: '2px solid #1b61c9', borderTopColor: 'transparent' }}
                />
              </div>
            </Card>
          ) : posts.length === 0 ? (
            <Card>
              <EmptyState
                icon="✏️"
                title="No content yet"
                description='Click "+ New Post" to create your first blog post or FAQ.'
                action={
                  <FormButton variant="primary" onClick={() => openEditor()}>
                    + New Post
                  </FormButton>
                }
              />
            </Card>
          ) : (
            <DataTable
              columns={columns}
              rows={posts}
              rowKey={(p) => p.id}
              emptyState="No posts match the current filter."
            />
          )}
        </>
      )}

      {/* ═══ EDITOR VIEW ═══ */}
      {view === 'editor' && (
        <>
          <SectionHeader
            title={editingId ? `Edit: ${editor.title || '(untitled)'}` : `New ${activeCfg?.label || 'Post'}`}
            subtitle={editingId ? `Editing ${activeCfg?.label || 'post'}` : `Create a new ${activeCfg?.label?.toLowerCase() || 'post'}`}
            actions={
              <FormButton variant="ghost" onClick={backToList}>
                ← Back to List
              </FormButton>
            }
          />

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}
          >
            {/* ── Left: Form ── */}
            <Card padding="lg">
              <div className="space-y-5">
                {/* Type + Title */}
                <FormRow>
                  <FormField label="Content Type" htmlFor="cms-type">
                    <FormSelect
                      id="cms-type"
                      value={editor.type}
                      onChange={(e) => setEditor(prev => ({ ...prev, type: e.target.value }))}
                    >
                      {TYPE_KEYS.map(k => (
                        <option key={k} value={k}>{CONTENT_TYPES[k].icon} {CONTENT_TYPES[k].label}</option>
                      ))}
                    </FormSelect>
                  </FormField>
                  <FormField label="Sort Order" htmlFor="cms-sort">
                    <FormInput
                      id="cms-sort"
                      type="number"
                      value={editor.sort_order}
                      onChange={(e) => setEditor(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    />
                  </FormField>
                </FormRow>

                <FormField label="Title" htmlFor="cms-title" required>
                  <FormInput
                    id="cms-title"
                    required
                    value={editor.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    placeholder="Post title"
                  />
                </FormField>

                {activeCfg?.hasSlug && (
                  <FormField
                    label="Slug"
                    htmlFor="cms-slug"
                    help={editor.slug ? `/${editor.type}/${editor.slug}` : 'Auto-generated from title'}
                  >
                    <FormInput
                      id="cms-slug"
                      value={editor.slug}
                      onChange={(e) => {
                        setSlugManual(true)
                        setEditor(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))
                      }}
                      placeholder="url-friendly-slug"
                    />
                  </FormField>
                )}

                {/* Body HTML */}
                <FormField label="Body HTML" htmlFor="cms-body">
                  <FormTextarea
                    id="cms-body"
                    value={editor.body_html}
                    onChange={(e) => setEditor(prev => ({ ...prev, body_html: e.target.value }))}
                    placeholder="<h2>Your content here...</h2><p>Write HTML directly.</p>"
                    rows={14}
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '13px', lineHeight: '1.6' }}
                  />
                </FormField>

                {/* ── Meta fields (type-specific) ── */}
                {activeCfg && activeCfg.metaFields.length > 0 && (
                  <div className="space-y-4">
                    <h4
                      className="text-xs font-bold uppercase tracking-wider pt-2"
                      style={{ color: 'rgba(4,14,32,0.4)', borderTop: '1px solid rgba(4,14,32,0.08)', paddingTop: '16px' }}
                    >
                      SEO &amp; Meta
                    </h4>
                    {activeCfg.metaFields.map(f => (
                      <FormField key={f.key} label={f.label} htmlFor={`cms-meta-${f.key}`}>
                        {f.type === 'textarea' ? (
                          <FormTextarea
                            id={`cms-meta-${f.key}`}
                            value={(editor.meta[f.key] as string) || ''}
                            onChange={(e) => updateMeta(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            rows={3}
                          />
                        ) : f.type === 'checkbox' ? (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editor.meta[f.key]}
                              onChange={(e) => updateMeta(f.key, e.target.checked)}
                            />
                            <span className="text-sm">{f.label}</span>
                          </label>
                        ) : f.type === 'select' ? (
                          <FormSelect
                            id={`cms-meta-${f.key}`}
                            value={(editor.meta[f.key] as string) || ''}
                            onChange={(e) => updateMeta(f.key, e.target.value)}
                          >
                            <option value="">— select —</option>
                            {(f.options ?? []).map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </FormSelect>
                        ) : f.type === 'date' ? (
                          <FormInput
                            id={`cms-meta-${f.key}`}
                            type="date"
                            value={(editor.meta[f.key] as string) || ''}
                            onChange={(e) => updateMeta(f.key, e.target.value)}
                          />
                        ) : (
                          <FormInput
                            id={`cms-meta-${f.key}`}
                            value={(editor.meta[f.key] as string) || ''}
                            onChange={(e) => updateMeta(f.key, e.target.value)}
                            placeholder={f.placeholder}
                          />
                        )}
                      </FormField>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: '1px solid rgba(4,14,32,0.08)' }}
                >
                  <FormButton variant="ghost" onClick={backToList}>
                    Cancel
                  </FormButton>
                  <div className="flex-1" />
                  <FormButton
                    variant="secondary"
                    loading={saving}
                    onClick={() => handleSave(false)}
                  >
                    {saving ? 'Saving…' : 'Save Draft'}
                  </FormButton>
                  <FormButton
                    variant="primary"
                    loading={saving}
                    onClick={() => handleSave(true)}
                  >
                    {saving ? 'Publishing…' : 'Save & Publish'}
                  </FormButton>
                </div>
              </div>
            </Card>

            {/* ── Right: Live Preview ── */}
            <Card padding="lg">
              <div className="space-y-3">
                <h4
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'rgba(4,14,32,0.4)' }}
                >
                  Live Preview
                </h4>
                <div
                  className="rounded-lg p-5 min-h-[300px] overflow-auto"
                  style={{
                    border: '1px solid rgba(4,14,32,0.08)',
                    background: '#ffffff',
                    maxHeight: '70vh',
                  }}
                >
                  {editor.body_html ? (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(editor.body_html) }}
                    />
                  ) : (
                    <p className="text-sm italic" style={{ color: 'rgba(4,14,32,0.3)' }}>
                      Start typing HTML in the Body field to see a live preview here…
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* ═══ DELETE CONFIRM MODAL ═══ */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.45)' }}
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="rounded-xl p-6 w-full max-w-sm shadow-2xl"
              style={{ background: '#ffffff' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2" style={{ color: '#181d26' }}>
                Delete Post?
              </h3>
              <p className="text-sm mb-5" style={{ color: 'rgba(4,14,32,0.6)' }}>
                Are you sure you want to delete <strong>&ldquo;{deleteTarget.title}&rdquo;</strong>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <FormButton variant="ghost" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                  Cancel
                </FormButton>
                <FormButton variant="danger" loading={deleting} onClick={confirmDelete}>
                  {deleting ? 'Deleting…' : 'Delete'}
                </FormButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
