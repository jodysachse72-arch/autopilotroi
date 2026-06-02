-- ═══════════════════════════════════════════════════════════════════
-- T1 Puck Teardown — Drop puck_pages + puck_page_revisions
-- Migration: 20260602_drop_puck_tables.sql
--
-- PREREQUISITE: Data archived in supabase/_archive/puck_pages_archive.sql
--               and in the puck-archive git branch.
--
-- Tables dropped:
--   1. puck_pages (7 orphaned rows, no front-end consumers)
--   2. puck_page_revisions (0 rows)
--
-- Also drops:
--   - trigger_puck_pages_updated_at trigger
--   - update_puck_pages_updated_at() function
--   - Associated RLS policies
-- ═══════════════════════════════════════════════════════════════════

-- 1. Drop tables (CASCADE drops triggers, indexes, policies)
DROP TABLE IF EXISTS public.puck_page_revisions CASCADE;
DROP TABLE IF EXISTS public.puck_pages CASCADE;

-- 2. Drop the orphaned trigger function
DROP FUNCTION IF EXISTS public.update_puck_pages_updated_at() CASCADE;

-- ═══════════════════════════════════════════════════════════════════
-- NOTE: puck_saved_sections does NOT exist in the live DB (migration
-- was never applied). No action needed for it.
-- ═══════════════════════════════════════════════════════════════════
