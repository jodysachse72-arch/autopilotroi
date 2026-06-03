/* ═══════════════════════════════════════════════════════════════
   CMS TYPES — shared across service, adapters, and UI
   
   All content flows through CmsPost — type-discriminated by the
   `type` field. The `meta` jsonb holds type-specific fields.
   
   Payload-ready: this interface maps directly to a Payload
   collection config (type → collection slug, meta → fields).
   ═══════════════════════════════════════════════════════════════ */

export type CmsPostType = 'blog' | 'faq' | 'video' | 'page_copy' | 'resource'
export type CmsStatus   = 'draft' | 'published' | 'scheduled'

/** Core content record — maps 1:1 with the cms_posts table */
export interface CmsPost {
  id:         string
  type:       CmsPostType
  slug:       string | null
  title:      string | null
  body:       Record<string, unknown> | null
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

  // Resource-specific (PCC-1)
  url?:           string
  resource_type?: 'video' | 'pdf' | 'link' | 'doc'
  // category reuses blog's category field above
  // status (resource lifecycle) stored separately from post status
  resource_status?: 'active' | 'featured' | 'needs_review' | 'broken' | 'archived'
  official?:        boolean
  last_verified?:   string  // ISO date string
  description?:     string

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

