-- ═══════════════════════════════════════════════════════════════════
-- AutopilotROI — Phase 1: Campaign Velocity
-- Migration: 20260521_puck_saved_sections.sql
--
-- Creates saved section library for reusable campaign blocks.
--
-- SAFETY:
--   - No changes to existing tables
--   - RLS: public reads allowed, writes via service_role
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.puck_saved_sections (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL DEFAULT 'content',
  data        JSONB       NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_sections_category
  ON public.puck_saved_sections (category, created_at DESC);

ALTER TABLE public.puck_saved_sections ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'puck_saved_sections'
    AND policyname = 'Public can read saved sections'
  ) THEN
    CREATE POLICY "Public can read saved sections"
      ON public.puck_saved_sections
      FOR SELECT
      USING (true);
  END IF;
END $$;

COMMENT ON TABLE public.puck_saved_sections IS
  'Reusable section library for campaign velocity. Stores SectionBox + zone content as JSONB.';
