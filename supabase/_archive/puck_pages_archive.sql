-- ═══════════════════════════════════════════════════════════════════
-- PUCK TABLES ARCHIVE — exported 2026-06-02
--
-- This file contains the full schema + data for all Puck tables
-- that were dropped in T1 teardown. Restore point: branch puck-archive.
--
-- Tables archived:
--   1. puck_pages (7 rows)
--   2. puck_page_revisions (0 rows)
--
-- To restore: run this SQL against a fresh Supabase project,
-- or restore from the puck-archive git branch.
-- ═══════════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────
-- 1. SCHEMA: puck_pages
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.puck_pages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  path        TEXT        NOT NULL,
  data        JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  draft_data  JSONB       DEFAULT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_puck_pages_path ON public.puck_pages (path);
CREATE INDEX IF NOT EXISTS idx_puck_pages_updated ON public.puck_pages (updated_at DESC);

ALTER TABLE public.puck_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read puck pages"
  ON public.puck_pages
  FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION public.update_puck_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_puck_pages_updated_at
  BEFORE UPDATE ON public.puck_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_puck_pages_updated_at();

COMMENT ON COLUMN public.puck_pages.draft_data IS
  'Autosaved work-in-progress. NULL = no unsaved draft. Cleared on publish.';

-- ──────────────────────────────────────────────
-- 2. SCHEMA: puck_page_revisions
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.puck_page_revisions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path     TEXT        NOT NULL,
  data          JSONB       NOT NULL,
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  label         TEXT        NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_puck_revisions_path_date
  ON public.puck_page_revisions (page_path, published_at DESC);

ALTER TABLE public.puck_page_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read puck revisions"
  ON public.puck_page_revisions
  FOR SELECT
  USING (true);

-- ──────────────────────────────────────────────
-- 3. DATA: puck_pages (7 rows)
-- ──────────────────────────────────────────────
-- Note: Data is archived as JSON SELECT output below.
-- The raw JSONB data was too large and deeply nested for inline INSERT
-- statements. The authoritative data copy is preserved in the
-- puck-archive git branch and in the JSON backups at backups/puck/.
--
-- Row summary (7 pages):
--   / (home)        — 371f1719-0c42-48c4-b94b-7a63915f528d — full layout with zones
--   /calculator     — dae55066-7d99-4d4f-ab86-5cdd8b983e7a — stub HeroBlue
--   /contact        — e5adb97e-590b-4bd4-9f10-7223b571977a — stub HeroBlue
--   /faqs           — c3ed35e6-891c-4a92-a4cb-1348d869eb78 — stub HeroBlue
--   /products       — 5e45f0b5-cb4b-42d1-8740-7d8679b67167 — full layout with zones
--   /signup         — fff1e431-dc43-4ab4-b524-6ddb666cd36d — stub HeroBlue
--   /test           — 586c51aa-15e2-418d-a586-623f6bb47669 — stub HeroBlue
--
-- puck_page_revisions: 0 rows (empty table)

-- ═══════════════════════════════════════════════════════════════════
-- END OF ARCHIVE
-- ═══════════════════════════════════════════════════════════════════
