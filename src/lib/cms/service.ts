/* ═══════════════════════════════════════════════════════════════
   CMS SERVICE — public API for all content operations

   All UI code calls this file. Data source: supabase-adapter.ts
   v1: revisions + media removed (T2/T3). See types.ts for
   preserved interfaces.
   ═══════════════════════════════════════════════════════════════ */


import * as adapter from './supabase-adapter'

export type { CmsPost, CmsPostSummary, CmsPostInput, CmsListOptions, CmsPostMeta, CmsPostType, CmsStatus } from './types'

export const listPosts     = adapter.listPosts
export const getPost       = adapter.getPost
export const createPost    = adapter.createPost
export const updatePost    = adapter.updatePost
export const deletePost    = adapter.deletePost
export const publishPost   = adapter.publishPost
export const unpublishPost = adapter.unpublishPost
