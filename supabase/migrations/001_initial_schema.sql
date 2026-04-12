-- ═══════════════════════════════════════════════════════════
-- AutopilotROI — Initial Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. PROFILES — extends Supabase auth.users
-- ─────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text not null default 'prospect' check (role in ('prospect', 'partner', 'admin')),
  readiness_score integer,
  readiness_tier text check (readiness_tier in ('beginner', 'intermediate', 'advanced')),
  onboarding_status text default 'new' check (onboarding_status in ('new', 'assessed', 'invited', 'onboarding', 'active')),
  referred_by uuid references public.profiles(id),
  partner_code text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────
-- 2. READINESS RESPONSES — individual quiz answers
-- ─────────────────────────────────────────────
create table if not exists public.readiness_responses (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  question_key text not null,
  answer text not null,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────
-- 3. REFERRAL LINKS — partner tracking URLs
-- ─────────────────────────────────────────────
create table if not exists public.referral_links (
  id uuid primary key default uuid_generate_v4(),
  partner_id uuid not null references public.profiles(id) on delete cascade,
  code text not null unique,
  label text, -- e.g. "Facebook", "YouTube", "Newsletter"
  clicks integer default 0,
  conversions integer default 0,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.readiness_responses enable row level security;
alter table public.referral_links enable row level security;

-- Profiles: users can read their own, partners can read their referrals, admins read all
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Partners can view referred profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('partner', 'admin')
    )
  );

-- Readiness responses: users see own, partners/admins see referred users
create policy "Users can insert own responses"
  on public.readiness_responses for insert
  with check (auth.uid() = profile_id);

create policy "Users can view own responses"
  on public.readiness_responses for select
  using (auth.uid() = profile_id);

create policy "Partners can view responses"
  on public.readiness_responses for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('partner', 'admin')
    )
  );

-- Referral links: partners manage their own, admins see all
create policy "Partners can manage own links"
  on public.referral_links for all
  using (auth.uid() = partner_id);

create policy "Admins can view all links"
  on public.referral_links for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role = 'admin'
    )
  );

-- ─────────────────────────────────────────────
-- 5. INDEXES for performance
-- ─────────────────────────────────────────────
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_referred_by on public.profiles(referred_by);
create index if not exists idx_profiles_partner_code on public.profiles(partner_code);
create index if not exists idx_readiness_responses_profile on public.readiness_responses(profile_id);
create index if not exists idx_referral_links_partner on public.referral_links(partner_id);
create index if not exists idx_referral_links_code on public.referral_links(code);
