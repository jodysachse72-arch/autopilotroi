/* ═══════════════════════════════════════════════════════════════
   SUPABASE ADAPTER — implements the CMS service API using
   Supabase as the backing store.

   All queries target: cms_posts
   Revisions + media removed in v1 (T2/T3).
   ═══════════════════════════════════════════════════════════════ */

import { createClient } from '@/lib/supabase/client'
import type { CmsPost, CmsPostSummary, CmsPostInput, CmsListOptions } from './types'

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

// ── Revisions / Media ────────────────────────────────────────
// v1: cms_revisions + cms_media were dropped (T2). These features
// will be restored in a future milestone. See types.ts for the
// preserved CmsRevision / CmsMediaItem interfaces.

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
