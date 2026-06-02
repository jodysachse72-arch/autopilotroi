-- ═══════════════════════════════════════════════════════════════════
-- T2 CMS Cleanup — Drop cms_content + cms_revisions
-- Migration: 20260602_drop_cms_content.sql
--
-- PREREQUISITE: Schema archived in supabase/_archive/cms_content_archive.sql
-- Original migration: supabase/migrations/20260413_cms_content.sql (kept as record)
--
-- Tables dropped:
--   1. cms_revisions (0 rows — FK child, drop first)
--   2. cms_content   (0 rows)
--
-- Also drops:
--   - trigger_cms_updated_at trigger (via CASCADE)
--   - update_cms_updated_at() function
--   - Associated RLS policies (via CASCADE)
--   - Indexes (via CASCADE)
--
-- KEEP (untouched):
--   - cms_posts table
--   - cms_revisions table used by supabase-adapter.ts (cms_posts revisions)
-- ═══════════════════════════════════════════════════════════════════

-- 1. Drop cms_revisions first (has FK to cms_content)
DROP TABLE IF EXISTS public.cms_revisions CASCADE;

-- 2. Drop cms_content (CASCADE drops trigger, indexes, policies)
DROP TABLE IF EXISTS public.cms_content CASCADE;

-- 3. Drop the orphaned trigger function
DROP FUNCTION IF EXISTS public.update_cms_updated_at() CASCADE;

-- ═══════════════════════════════════════════════════════════════════
-- NOTE: The cms_revisions table in supabase-adapter.ts / cms_posts
-- architecture is a DIFFERENT table (it has post_id FK to cms_posts,
-- not content_id FK to cms_content). That table is NOT dropped here.
-- ═══════════════════════════════════════════════════════════════════
