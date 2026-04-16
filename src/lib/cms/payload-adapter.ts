/* ═══════════════════════════════════════════════════════════════
   PAYLOAD ADAPTER — stub for future Payload CMS migration
   
   When you're ready to upgrade to Payload:
   1. Run: npx create-payload-app@latest
   2. Implement each function below using Payload's Local API
   3. In service.ts: swap supabase-adapter for payload-adapter
   4. Done — zero UI changes needed.
   ═══════════════════════════════════════════════════════════════ */

import type { CmsPost, CmsPostSummary, CmsRevision, CmsMediaItem, CmsPostInput, CmsListOptions } from './types'

export async function listPosts(_opts?: CmsListOptions): Promise<CmsPostSummary[]> {
  throw new Error('Payload adapter not implemented. See payload-adapter.ts for migration guide.')
}

export async function getPost(_id: string): Promise<CmsPost | null> {
  throw new Error('Payload adapter not implemented.')
}

export async function createPost(_input: CmsPostInput): Promise<CmsPost> {
  throw new Error('Payload adapter not implemented.')
}

export async function updatePost(_id: string, _input: Partial<CmsPostInput>): Promise<CmsPost> {
  throw new Error('Payload adapter not implemented.')
}

export async function deletePost(_id: string): Promise<void> {
  throw new Error('Payload adapter not implemented.')
}

export async function publishPost(_id: string): Promise<CmsPost> {
  throw new Error('Payload adapter not implemented.')
}

export async function unpublishPost(_id: string): Promise<CmsPost> {
  throw new Error('Payload adapter not implemented.')
}

export async function getRevisions(_postId: string): Promise<CmsRevision[]> {
  throw new Error('Payload adapter not implemented.')
}

export async function restoreRevision(_revisionId: string): Promise<CmsPost> {
  throw new Error('Payload adapter not implemented.')
}

export async function uploadMedia(_file: File, _altText: string): Promise<CmsMediaItem> {
  throw new Error('Payload adapter not implemented.')
}

export async function listMedia(): Promise<CmsMediaItem[]> {
  throw new Error('Payload adapter not implemented.')
}
