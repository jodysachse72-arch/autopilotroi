-- ═══════════════════════════════════════════════════════════════════
-- CMS_CONTENT / CMS_REVISIONS ARCHIVE — exported 2026-06-02
--
-- Archived as part of T2 teardown (abandoned CMS layer removal).
-- These tables were the first-generation CMS attempt, superseded by
-- the cms_posts / supabase-adapter.ts architecture.
--
-- Tables archived:
--   1. cms_content  (0 rows at time of drop)
--   2. cms_revisions (0 rows at time of drop)
--
-- Original migration: supabase/migrations/20260413_cms_content.sql
-- (that file is kept as a historical record)
--
-- Restore point: this file contains full DDL to recreate the tables.
-- ═══════════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────
-- 1. SCHEMA: cms_content
-- ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.cms_content (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT        NOT NULL CHECK (content_type IN ('blog', 'faq', 'video', 'resource', 'page_copy')),
  page_key     TEXT,
  slug         TEXT,
  data         JSONB       NOT NULL DEFAULT '{}'::jsonb,
  sort_order   INT         DEFAULT 0,
  is_published BOOLEAN     DEFAULT true,
  is_featured  BOOLEAN     DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now(),
  updated_by   TEXT
);

CREATE INDEX IF NOT EXISTS idx_cms_content_type ON public.cms_content (content_type);
CREATE INDEX IF NOT EXISTS idx_cms_content_slug ON public.cms_content (slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cms_page_key     ON public.cms_content (page_key) WHERE page_key IS NOT NULL;

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published content"
  ON public.cms_content FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated can read all content"
  ON public.cms_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can manage content"
  ON public.cms_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_cms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cms_updated_at
  BEFORE UPDATE ON public.cms_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_updated_at();

-- ──────────────────────────────────────────────
-- 2. SCHEMA: cms_revisions
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_revisions (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id   UUID        REFERENCES public.cms_content(id) ON DELETE CASCADE,
  action       TEXT        NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  previous_data JSONB,
  changed_by   TEXT,
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cms_revisions_content
  ON public.cms_revisions (content_id, created_at DESC);

ALTER TABLE public.cms_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read revisions"
  ON public.cms_revisions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can create revisions"
  ON public.cms_revisions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ──────────────────────────────────────────────
-- 3. DATA
-- ──────────────────────────────────────────────
-- cms_content:  0 rows at time of archive
-- cms_revisions: 0 rows at time of archive
-- (No INSERT statements needed)

-- ═══════════════════════════════════════════════════════════════════
-- END OF ARCHIVE
-- ═══════════════════════════════════════════════════════════════════
