-- ─────────────────────────────────────────────
-- 002: Leads table for pre-auth prospects
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────

-- Leads: prospects who have entered name/email but don't have an account yet
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  readiness_score integer,
  readiness_tier text CHECK (readiness_tier IN ('beginner', 'intermediate', 'advanced')),
  referred_by text,                    -- partner referral code from URL
  partner_notified boolean DEFAULT false,
  onboarding_status text DEFAULT 'new' CHECK (onboarding_status IN ('new', 'assessed', 'assigned', 'onboarding', 'complete')),
  quiz_answers jsonb,                  -- store all quiz answers as JSON
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for partner lookup
CREATE INDEX IF NOT EXISTS idx_leads_referred_by ON leads (referred_by);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (onboarding_status);

-- RLS: Allow anonymous inserts (for the public signup form)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public signup form)
CREATE POLICY "Allow public lead creation"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Only authenticated users with admin/partner role can read
CREATE POLICY "Partners and admins can read leads"
  ON leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('partner', 'admin')
    )
  );

-- Admins can update leads
CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();
