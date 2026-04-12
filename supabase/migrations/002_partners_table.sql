-- ══════════════════════════════════════════════════════════════
-- AutopilotROI — Partners Table Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL → New Query)
-- ══════════════════════════════════════════════════════════════

-- Partners table — maps referral codes to partner contact info
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  referral_code TEXT NOT NULL UNIQUE,
  phone TEXT,
  telegram TEXT,
  is_active BOOLEAN DEFAULT true,
  notification_preferences JSONB DEFAULT '{"email": true, "telegram": false}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast referral code lookups
CREATE INDEX IF NOT EXISTS idx_partners_referral_code ON partners(referral_code);

-- Add last_seen column to leads for re-engagement tracking
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS video_progress JSONB DEFAULT '[]'::jsonb;

-- RLS policies (adapt as needed)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by API routes)
CREATE POLICY "Service role full access on partners" ON partners
  FOR ALL USING (true) WITH CHECK (true);

-- ══════════════════════════════════════════════════════════════
-- Example: Insert a test partner
-- ══════════════════════════════════════════════════════════════
-- INSERT INTO partners (name, email, referral_code) 
-- VALUES ('Jody Sachse', 'jody@autopilotroi.com', 'jody');
