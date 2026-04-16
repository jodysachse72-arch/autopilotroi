/* ═══════════════════════════════════════════════════════════════
   CMS SERVICE — public API for all content operations
   
   All UI code calls this file. Data source is determined by the
   adapter. To switch to Payload: change the import below.
   ═══════════════════════════════════════════════════════════════ */

import * as adapter from './supabase-adapter'
// Future: import * as adapter from './payload-adapter'

export type { CmsPost, CmsPostSummary, CmsRevision, CmsMediaItem, CmsPostInput, CmsListOptions } from './types'

export const listPosts    = adapter.listPosts
export const getPost      = adapter.getPost
export const createPost   = adapter.createPost
export const updatePost   = adapter.updatePost
export const deletePost   = adapter.deletePost
export const publishPost  = adapter.publishPost
export const unpublishPost = adapter.unpublishPost
export const getRevisions = adapter.getRevisions
export const restoreRevision = adapter.restoreRevision
export const uploadMedia  = adapter.uploadMedia
export const listMedia    = adapter.listMedia
