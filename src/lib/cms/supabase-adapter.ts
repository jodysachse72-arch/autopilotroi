'use client'
/* ═══════════════════════════════════════════════════════════════
   SUPABASE ADAPTER — implements the CMS service API using
   Supabase as the backing store.
   
   All queries target: cms_posts, cms_revisions, cms_media
   Storage bucket: cms-media (public)
   ═══════════════════════════════════════════════════════════════ */

import { createClient } from '@/lib/supabase/client'
import type { CmsPost, CmsPostSummary, CmsRevision, CmsMediaItem, CmsPostInput, CmsListOptions } from './types'

const BUCKET = 'cms-media'

function supabase() {
  return createClient()
}

// ── List ─────────────────────────────────────────────────────

export async function listPosts(opts: CmsListOptions = {}): Promise<CmsPostSummary[]> {
  const db = supabase()
  let q = db
    .from('cms_posts')
    .select('id,type,slug,title,meta,status,sort_order,updated_at')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })

  if (opts.type)                      q = q.eq('type', opts.type)
  if (opts.status && opts.status !== 'all') q = q.eq('status', opts.status)
  if (opts.limit)                     q = q.limit(opts.limit)
  if (opts.offset)                    q = q.range(opts.offset, opts.offset + (opts.limit ?? 50) - 1)

  const { data, error } = await q
  if (error) throw error
  return (data ?? []) as CmsPostSummary[]
}

// ── Get ──────────────────────────────────────────────────────

export async function getPost(id: string): Promise<CmsPost | null> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data as CmsPost
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) return null
  return data as CmsPost
}

// ── Create ───────────────────────────────────────────────────

export async function createPost(input: CmsPostInput): Promise<CmsPost> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data as CmsPost
}

// ── Update ───────────────────────────────────────────────────

export async function updatePost(id: string, input: Partial<CmsPostInput>): Promise<CmsPost> {
  // Create revision before updating
  const existing = await getPost(id)
  if (existing) {
    await _createRevision(existing, 'Auto-save')
  }

  const { data, error } = await supabase()
    .from('cms_posts')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as CmsPost
}

// ── Delete ───────────────────────────────────────────────────

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase()
    .from('cms_posts')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── Publish / Unpublish ──────────────────────────────────────

export async function publishPost(id: string): Promise<CmsPost> {
  const existing = await getPost(id)
  if (existing) await _createRevision(existing, 'Published')

  const { data, error } = await supabase()
    .from('cms_posts')
    .update({ status: 'published', publish_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as CmsPost
}

export async function unpublishPost(id: string): Promise<CmsPost> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .update({ status: 'draft' })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as CmsPost
}

// ── Revisions ────────────────────────────────────────────────

async function _createRevision(post: CmsPost, label: string): Promise<void> {
  await supabase().from('cms_revisions').insert({
    post_id:   post.id,
    body:      post.body,
    body_html: post.body_html,
    meta:      post.meta,
    status:    post.status,
    label,
    created_by: post.created_by,
  })
}

export async function getRevisions(postId: string): Promise<CmsRevision[]> {
  const { data, error } = await supabase()
    .from('cms_revisions')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) throw error
  return (data ?? []) as CmsRevision[]
}

export async function restoreRevision(revisionId: string): Promise<CmsPost> {
  const { data: rev, error: revErr } = await supabase()
    .from('cms_revisions')
    .select('*')
    .eq('id', revisionId)
    .single()
  if (revErr) throw revErr

  return updatePost(rev.post_id, {
    body:      rev.body,
    body_html: rev.body_html,
    meta:      rev.meta,
    status:    rev.status,
  })
}

// ── Media Upload ─────────────────────────────────────────────

export async function uploadMedia(file: File, altText: string = ''): Promise<CmsMediaItem> {
  const db = supabase()
  const ext  = file.name.split('.').pop()
  const path = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

  // Upload to storage
  const { error: uploadErr } = await db.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })
  if (uploadErr) throw uploadErr

  // Get public URL
  const { data: { publicUrl } } = db.storage.from(BUCKET).getPublicUrl(path)

  // Record in media table
  const { data, error } = await db
    .from('cms_media')
    .insert({
      filename:     file.name,
      storage_path: path,
      public_url:   publicUrl,
      size_bytes:   file.size,
      mime_type:    file.type,
      alt_text:     altText,
    })
    .select()
    .single()

  if (error) throw error
  return data as CmsMediaItem
}

export async function listMedia(): Promise<CmsMediaItem[]> {
  const { data, error } = await supabase()
    .from('cms_media')
    .select('*')
    .order('uploaded_at', { ascending: false })
    .limit(100)
  if (error) throw error
  return (data ?? []) as CmsMediaItem[]
}

// ── Public helpers (for frontend pages) ─────────────────────

/** Get published blog posts for the blog page */
export async function getPublishedBlogs(): Promise<CmsPost[]> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .select('*')
    .eq('type', 'blog')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })
  if (error) return []
  return (data ?? []) as CmsPost[]
}

/** Get published FAQs for the FAQ page */
export async function getPublishedFaqs(): Promise<CmsPost[]> {
  const { data, error } = await supabase()
    .from('cms_posts')
    .select('*')
    .eq('type', 'faq')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
  if (error) return []
  return (data ?? []) as CmsPost[]
}
