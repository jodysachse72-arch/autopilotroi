-- ═══════════════════════════════════════════════════════════════════
-- AutopilotROI — Phase 0: Operator Safety Layer
-- Migration: 20260521_puck_drafts_revisions.sql
--
-- Adds draft/autosave support and revision history to puck_pages.
--
-- CHANGES:
--   1. puck_pages.draft_data — JSONB column for autosaved work-in-progress
--   2. puck_page_revisions — Snapshot table for publish history
--
-- SAFETY:
--   - draft_data is nullable — NULL means "no unsaved draft"
--   - Existing data column is untouched
--   - Revision snapshots are created on publish, not on draft save
--   - RLS: revisions inherit public read from puck_pages
-- ═══════════════════════════════════════════════════════════════════

-- 1. Add draft_data column to puck_pages
ALTER TABLE public.puck_pages
  ADD COLUMN IF NOT EXISTS draft_data JSONB DEFAULT NULL;

COMMENT ON COLUMN public.puck_pages.draft_data IS
  'Autosaved work-in-progress. NULL = no unsaved draft. Cleared on publish.';

-- 2. Create revision history table
CREATE TABLE IF NOT EXISTS public.puck_page_revisions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path     TEXT        NOT NULL,
  data          JSONB       NOT NULL,
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  label         TEXT        NOT NULL DEFAULT ''
);

-- Index for fast lookups by page + date (primary query pattern)
CREATE INDEX IF NOT EXISTS idx_puck_revisions_path_date
  ON public.puck_page_revisions (page_path, published_at DESC);

-- RLS: public reads allowed (same as puck_pages)
ALTER TABLE public.puck_page_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public can read puck revisions"
  ON public.puck_page_revisions
  FOR SELECT
  USING (true);

-- ═══════════════════════════════════════════════════════════════════
-- NOTES
-- ═══════════════════════════════════════════════════════════════════
--
-- draft_data lifecycle:
--   1. Editor autosaves every ~30s → writes to draft_data only
--   2. On Publish: data = draft_data (or editor state), draft_data = NULL
--   3. On editor load: if draft_data IS NOT NULL, resume from draft
--
-- Revision lifecycle:
--   1. On Publish: snapshot current data → puck_page_revisions BEFORE overwriting
--   2. On Restore: copy revision.data → puck_pages.data
--   3. Pruning: keep last 20 revisions per page (enforced by API)
--
-- No foreign key constraint to puck_pages.path to avoid cascade issues
-- with page deletion. Orphaned revisions are harmless and can be pruned.
-- ═══════════════════════════════════════════════════════════════════
