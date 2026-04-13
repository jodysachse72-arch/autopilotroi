-- ═══════════════════════════════════════════════════════════════
-- AutopilotROI Content Editor — Supabase Migration
-- 
-- Run this in Supabase SQL Editor to set up the content tables.
-- This replaces localStorage storage with cloud persistence.
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Content Table ──────────────────────────────────────────
-- Stores ALL editable content: blog posts, FAQs, videos, resources, page copy
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('blog', 'faq', 'video', 'resource', 'page_copy')),
  page_key TEXT,               -- NULL for blog/faq/video/resource; 'homepage'/'products' for page_copy
  slug TEXT,                   -- URL slug for blog posts
  data JSONB NOT NULL DEFAULT '{}',  -- flexible payload (title, body, author, etc.)
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by TEXT              -- email of who made the change
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_cms_content_type ON cms_content (content_type);
CREATE INDEX IF NOT EXISTS idx_cms_content_slug ON cms_content (slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cms_page_key ON cms_content (page_key) WHERE page_key IS NOT NULL;

-- ─── Revision History ───────────────────────────────────────
-- Stores previous versions for undo functionality and audit trail
CREATE TABLE IF NOT EXISTS cms_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES cms_content(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  previous_data JSONB,         -- full snapshot before change (NULL for create)
  changed_by TEXT,             -- email of who made the change
  description TEXT,            -- human-readable change description
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for undo lookups (most recent first)
CREATE INDEX IF NOT EXISTS idx_cms_revisions_content ON cms_revisions (content_id, created_at DESC);

-- ─── Row Level Security ─────────────────────────────────────
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_revisions ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published content"
  ON cms_content FOR SELECT
  USING (is_published = true);

-- Authenticated users can read all content (including drafts)
CREATE POLICY "Authenticated can read all content"
  ON cms_content FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated can manage content"
  ON cms_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Revision access for authenticated users only
CREATE POLICY "Authenticated can read revisions"
  ON cms_revisions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can create revisions"
  ON cms_revisions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ─── Updated At Trigger ─────────────────────────────────────
CREATE OR REPLACE FUNCTION update_cms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cms_updated_at
  BEFORE UPDATE ON cms_content
  FOR EACH ROW
  EXECUTE FUNCTION update_cms_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- MIGRATION NOTES
-- ═══════════════════════════════════════════════════════════════
-- 
-- After running this migration:
-- 1. Content Editor will auto-detect Supabase tables and sync
-- 2. Existing localStorage content can be imported via Export/Import
-- 3. RLS ensures public visitors can only see published content
-- 4. The updated_at column auto-updates on every change
-- 5. Revisions table grows unbounded — add a cleanup cron if needed
--
-- To seed initial demo data, use the Content Editor's Import function
-- with the exported JSON from your localStorage.
-- ═══════════════════════════════════════════════════════════════
