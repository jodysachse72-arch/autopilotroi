/* ═══════════════════════════════════════════════════════════════
   CMS TYPES — shared across service, adapters, and UI
   
   All content flows through CmsPost — type-discriminated by the
   `type` field. The `meta` jsonb holds type-specific fields.
   
   Payload-ready: this interface maps directly to a Payload
   collection config (type → collection slug, meta → fields).
   ═══════════════════════════════════════════════════════════════ */

export type CmsPostType = 'blog' | 'faq' | 'video' | 'page_copy'
export type CmsStatus   = 'draft' | 'published' | 'scheduled'

/** Core content record — maps 1:1 with the cms_posts table */
export interface CmsPost {
  id:         string
  type:       CmsPostType
  slug:       string | null
  title:      string | null
  body:       Record<string, unknown> | null   // Tiptap JSON document
  body_html:  string | null                   // Rendered HTML (for display)
  meta:       CmsPostMeta
  status:     CmsStatus
  publish_at: string | null
  sort_order: number
  created_at: string
  updated_at: string
  created_by: string | null
}

/** Type-safe meta fields (stored as jsonb, but typed here) */
export interface CmsPostMeta {
  // Blog-specific
  excerpt?:     string
  author?:      string
  category?:    string
  featured?:    boolean
  publishedAt?: string
  coverImage?:  string

  // FAQ-specific
  answer?:     string   // plain-text fallback for FAQ answer

  // Video-specific
  youtubeId?:  string
  duration?:   string
  section?:    'university' | 'media'

  // Page copy — arbitrary keys
  [key: string]: unknown
}

/** Slim list view (no body JSON — faster to load) */
export interface CmsPostSummary {
  id:         string
  type:       CmsPostType
  slug:       string | null
  title:      string | null
  meta:       CmsPostMeta
  status:     CmsStatus
  sort_order: number
  updated_at: string
}

/** Version history entry */
export interface CmsRevision {
  id:         string
  post_id:    string
  body:       Record<string, unknown> | null
  body_html:  string | null
  meta:       CmsPostMeta
  status:     CmsStatus | null
  created_at: string
  created_by: string | null
  label:      string | null
}

/** Uploaded media */
export interface CmsMediaItem {
  id:           string
  filename:     string
  storage_path: string
  public_url:   string
  size_bytes:   number | null
  mime_type:    string | null
  alt_text:     string
  uploaded_at:  string
}

/** Input for creating/updating a post */
export type CmsPostInput = Omit<CmsPost, 'id' | 'created_at' | 'updated_at'>

/** Filter options for listing posts */
export interface CmsListOptions {
  type?:   CmsPostType
  status?: CmsStatus | 'all'
  limit?:  number
  offset?: number
}

/* ── Payload CMS compatibility note ──────────────────────────
   When migrating to Payload:
   - CmsPost → Payload Document
   - type    → collection slug
   - meta    → Payload fields (auto-mapped)
   - body    → Payload Lexical rich text field
   The service adapter pattern means only supabase-adapter.ts
   needs to be swapped for payload-adapter.ts. Zero UI changes.
   ─────────────────────────────────────────────────────────── */
