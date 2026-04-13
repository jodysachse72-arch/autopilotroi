-- ══════════════════════════════════════════════════════════════
-- AutopilotROI — Partner Profile Fields Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL → New Query)
-- Adds optional CRM-style fields for partner profile settings
-- ══════════════════════════════════════════════════════════════

-- Personal info fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS timezone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Social links (JSONB for flexibility)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;

-- Notification preferences (overrides if already set via partners table)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_preferences JSONB
  DEFAULT '{"email":true,"telegram":false,"weekly_digest":true,"new_lead_alert":true}'::jsonb;
