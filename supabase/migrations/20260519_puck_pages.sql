-- ═══════════════════════════════════════════════════════════════════
-- AutopilotROI — Puck Pages Table
-- Migration: 20260519_puck_pages.sql
--
-- STATUS: This table already exists in production (verified 2026-05-19).
-- This migration is RETROACTIVE — it documents the schema that was
-- created manually via the Supabase dashboard. Run this only if
-- recreating the database from scratch.
--
-- Verified runtime schema (inferred from live table + API behaviour):
--   id          uuid, primary key, auto-generated
--   path        text, unique (upsert onConflict target)
--   data        jsonb (Puck Data object: { root, content, zones })
--   updated_at  timestamptz (written explicitly by API on every save)
--   created_at  timestamptz, default now() (auto-set, never written by API)
--
-- RLS:
--   Read  — anon key allowed (public reads, confirmed live)
--   Write — anon key denied (service_role key required, confirmed live)
-- ═══════════════════════════════════════════════════════════════════

-- Table
CREATE TABLE IF NOT EXISTS public.puck_pages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  path        TEXT        NOT NULL UNIQUE,
  data        JSONB       NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast path lookups (primary query pattern)
CREATE UNIQUE INDEX IF NOT EXISTS idx_puck_pages_path ON public.puck_pages (path);

-- Index for ordering by updated_at (used in list queries)
CREATE INDEX IF NOT EXISTS idx_puck_pages_updated ON public.puck_pages (updated_at DESC);

-- Row Level Security
ALTER TABLE public.puck_pages ENABLE ROW LEVEL SECURITY;

-- Public read: anyone with the anon key can read page data
-- Required by the Puck API which uses anon key for GET requests
CREATE POLICY IF NOT EXISTS "Public can read puck pages"
  ON public.puck_pages
  FOR SELECT
  USING (true);

-- No insert/update/delete policy for anon — service_role key bypasses RLS
-- The Puck API write client uses service_role key for all mutations

-- Updated-at trigger (keeps updated_at current even if caller forgets to set it)
CREATE OR REPLACE FUNCTION public.update_puck_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_puck_pages_updated_at ON public.puck_pages;
CREATE TRIGGER trigger_puck_pages_updated_at
  BEFORE UPDATE ON public.puck_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_puck_pages_updated_at();

-- ═══════════════════════════════════════════════════════════════════
-- NOTES FOR FUTURE DEVELOPERS
-- ═══════════════════════════════════════════════════════════════════
--
-- The `data` column stores a Puck Data object with this shape:
--   {
--     "root":    { "props": { "title": "...", "description": "..." } },
--     "content": [ { "type": "ComponentName", "props": { ... } } ],
--     "zones":   { "zone-id:slot": [ { "type": "...", "props": {} } ] }
--   }
--
-- The `path` column stores the URL path (e.g. '/', '/products', '/faqs').
-- It is the unique key for upsert operations (onConflict: 'path').
--
-- Live rows as of 2026-05-19:
--   /           (updated 2026-05-09)
--   /calculator (updated 2026-05-06)
--   /contact    (updated 2026-05-06)
--   /faqs       (updated 2026-05-13)
--   /products   (updated 2026-05-05)
--   /signup     (updated 2026-05-13)
-- ═══════════════════════════════════════════════════════════════════
