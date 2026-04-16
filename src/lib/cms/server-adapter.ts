/* ═══════════════════════════════════════════════════════════════
   CMS SERVER ADAPTER — fetch content from Supabase in server
   components using the SSR cookie-aware client.
   
   Use this in: app/blog/page.tsx, app/faqs/page.tsx, etc.
   For client components, use the regular supabase-adapter.ts
   ═══════════════════════════════════════════════════════════════ */

import { createClient } from '@/lib/supabase/server'
import type { CmsPost, CmsPostSummary, CmsListOptions } from './types'

export async function listPostsServer(opts: CmsListOptions = {}): Promise<CmsPostSummary[]> {
  try {
    const db = await createClient()
    let q = db
      .from('cms_posts')
      .select('id,type,slug,title,meta,status,sort_order,updated_at')
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false })

    if (opts.type)                           q = q.eq('type', opts.type)
    if (opts.status && opts.status !== 'all') q = q.eq('status', opts.status)
    if (opts.limit)                          q = q.limit(opts.limit)

    const { data, error } = await q
    if (error) throw error
    return (data ?? []) as CmsPostSummary[]
  } catch (e) {
    console.error('[cms server-adapter] listPostsServer error:', e)
    return []
  }
}

export async function getPostBySlugServer(slug: string): Promise<CmsPost | null> {
  try {
    const db = await createClient()
    const { data, error } = await db
      .from('cms_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (error) return null
    return data as CmsPost
  } catch {
    return null
  }
}

export async function getPostServer(id: string): Promise<CmsPost | null> {
  try {
    const db = await createClient()
    const { data, error } = await db
      .from('cms_posts')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as CmsPost
  } catch {
    return null
  }
}

/** Published blog posts for /blog list page */
export async function getPublishedBlogsServer(): Promise<CmsPost[]> {
  try {
    const db = await createClient()
    const { data, error } = await db
      .from('cms_posts')
      .select('*')
      .eq('type', 'blog')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false })
    if (error) return []
    return (data ?? []) as CmsPost[]
  } catch {
    return []
  }
}

/** Published FAQs for /faqs page */
export async function getPublishedFaqsServer(): Promise<CmsPost[]> {
  try {
    const db = await createClient()
    const { data, error } = await db
      .from('cms_posts')
      .select('*')
      .eq('type', 'faq')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) return []
    return (data ?? []) as CmsPost[]
  } catch {
    return []
  }
}

/** Videos for a specific section (university | media) */
export async function getVideosBySection(section: 'university' | 'media'): Promise<CmsPost[]> {
  try {
    const db = await createClient()
    const { data, error } = await db
      .from('cms_posts')
      .select('*')
      .eq('type', 'video')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    if (error) return []
    // Filter by section in meta
    return ((data ?? []) as CmsPost[]).filter(v => v.meta?.section === section)
  } catch {
    return []
  }
}
