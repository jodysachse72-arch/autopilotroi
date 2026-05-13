# Graph Report - c:/Users/Jody/Documents/autopilotroi  (2026-05-04)

## Corpus Check
- Large corpus: 233 files · ~559,813 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 475 nodes · 380 edges · 37 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Blog & Content Server|Blog & Content Server]]
- [[_COMMUNITY_CMS Content CRUD|CMS Content CRUD]]
- [[_COMMUNITY_Post & Revision Management|Post & Revision Management]]
- [[_COMMUNITY_Email Drip & Notifications|Email Drip & Notifications]]
- [[_COMMUNITY_AB Testing & Analytics|A/B Testing & Analytics]]
- [[_COMMUNITY_Guided Tour & Session|Guided Tour & Session]]
- [[_COMMUNITY_Brand Identity & Assets|Brand Identity & Assets]]
- [[_COMMUNITY_Pricing Tier Utilities|Pricing Tier Utilities]]
- [[_COMMUNITY_Rate Limiting Middleware|Rate Limiting Middleware]]
- [[_COMMUNITY_Prospect Email Flows|Prospect Email Flows]]
- [[_COMMUNITY_Generic API Routes|Generic API Routes]]
- [[_COMMUNITY_Theme System|Theme System]]
- [[_COMMUNITY_Auth Middleware & Proxy|Auth Middleware & Proxy]]
- [[_COMMUNITY_Partner Badge & Chevron|Partner Badge & Chevron]]
- [[_COMMUNITY_Announcement Banner|Announcement Banner]]
- [[_COMMUNITY_Module Group 34|Module Group 34]]
- [[_COMMUNITY_Module Group 35|Module Group 35]]
- [[_COMMUNITY_Module Group 98|Module Group 98]]
- [[_COMMUNITY_Module Group 99|Module Group 99]]
- [[_COMMUNITY_Module Group 100|Module Group 100]]
- [[_COMMUNITY_Module Group 101|Module Group 101]]
- [[_COMMUNITY_Module Group 102|Module Group 102]]
- [[_COMMUNITY_Module Group 103|Module Group 103]]
- [[_COMMUNITY_Module Group 104|Module Group 104]]
- [[_COMMUNITY_Module Group 105|Module Group 105]]
- [[_COMMUNITY_Module Group 106|Module Group 106]]
- [[_COMMUNITY_Module Group 107|Module Group 107]]
- [[_COMMUNITY_Module Group 179|Module Group 179]]
- [[_COMMUNITY_Module Group 180|Module Group 180]]
- [[_COMMUNITY_Module Group 181|Module Group 181]]
- [[_COMMUNITY_Module Group 182|Module Group 182]]
- [[_COMMUNITY_Module Group 183|Module Group 183]]
- [[_COMMUNITY_Module Group 184|Module Group 184]]
- [[_COMMUNITY_Module Group 185|Module Group 185]]
- [[_COMMUNITY_Module Group 186|Module Group 186]]
- [[_COMMUNITY_Module Group 187|Module Group 187]]
- [[_COMMUNITY_Module Group 188|Module Group 188]]

## God Nodes (most connected - your core abstractions)
1. `supabase()` - 17 edges
2. `createClient()` - 17 edges
3. `loadStore()` - 16 edges
4. `saveStore()` - 16 edges
5. `AutoPilotROI Platform` - 9 edges
6. `getServiceClient()` - 6 edges
7. `getServiceClient()` - 5 edges
8. `GET()` - 5 edges
9. `trackEvent()` - 5 edges
10. `generateId()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `exchangeToken()` --calls--> `createClient()`  [INFERRED]
  src\app\(auth)\reset-password\page.tsx → src\lib\supabase\server.ts
- `POST()` --calls--> `createClient()`  [INFERRED]
  src\app\api\admin\migrate-cms\route.ts → src\lib\supabase\server.ts
- `getServiceClient()` --calls--> `createClient()`  [INFERRED]
  src\app\api\admin\partners\route.ts → src\lib\supabase\server.ts
- `GET()` --calls--> `getDripTemplate()`  [INFERRED]
  src\app\api\cron\re-engage\route.ts → src\lib\drip-emails.ts
- `GET()` --calls--> `createClient()`  [INFERRED]
  src\app\api\dashboard\leads\route.ts → src\lib\supabase\server.ts

## Hyperedges (group relationships)
- **V3 Aesthetic Overhaul** — design_system_v2, handoff_visual_skin_upgrade, test_v3_aceternity_ui [EXTRACTED 0.95]
- **User Onboarding Flow** — v3autopilotroistart_progresstrack, v3autopilotroistart_sidebar, v3autopilotroistart_trustwallet [EXTRACTED 0.95]

## Communities

### Community 0 - "Blog & Content Server"
Cohesion: 0.09
Nodes (16): BlogPage(), getPostBySlugServer(), getPostServer(), getPublishedBlogsServer(), getPublishedFaqsServer(), getVideosBySection(), listPostsServer(), fetchVideos() (+8 more)

### Community 1 - "CMS Content CRUD"
Cohesion: 0.23
Nodes (20): createBlog(), createFaq(), createResource(), createVideo(), deleteBlog(), deleteFaq(), deleteResource(), deleteVideo() (+12 more)

### Community 2 - "Post & Revision Management"
Cohesion: 0.26
Nodes (16): createPost(), _createRevision(), deletePost(), getPost(), getPostBySlug(), getPublishedBlogs(), getPublishedFaqs(), getRevisions() (+8 more)

### Community 3 - "Email Drip & Notifications"
Cohesion: 0.21
Nodes (11): getServiceClient(), POST(), getDripTemplate(), getResend(), sendDripEmail(), getPartnerByReferralCode(), getServiceClient(), getStaleLeads() (+3 more)

### Community 4 - "A/B Testing & Analytics"
Cohesion: 0.23
Nodes (7): trackEvent(), getCookie(), getVariant(), setCookie(), trackConversion(), handleSubmit(), markWatched()

### Community 6 - "Guided Tour & Session"
Cohesion: 0.27
Nodes (5): getStorageKey(), handler(), isElementVisible(), measure(), useTour()

### Community 8 - "Brand Identity & Assets"
Cohesion: 0.27
Nodes (10): Apple Icon Brandmark, AutoPilotROI Platform, PWA Icon 192px, PWA Icon 512px, Full Logo Brandmark, Logo Icon Brandmark, Landing Page Mockup 1C, Combined Landing Page Mockup (+2 more)

### Community 9 - "Pricing Tier Utilities"
Cohesion: 0.33
Nodes (2): autoDetectTier(), handleAmountChange()

### Community 11 - "Rate Limiting Middleware"
Cohesion: 0.47
Nodes (4): getServiceClient(), POST(), checkRateLimit(), rateLimitResponse()

### Community 14 - "Prospect Email Flows"
Cohesion: 0.53
Nodes (4): getResend(), notifyPartnerNewProspect(), sendProspectWelcome(), POST()

### Community 15 - "Generic API Routes"
Cohesion: 0.7
Nodes (4): GET(), getServiceClient(), PATCH(), POST()

### Community 18 - "Theme System"
Cohesion: 0.4
Nodes (2): useTheme(), ThemeToggle()

### Community 19 - "Auth Middleware & Proxy"
Cohesion: 0.5
Nodes (2): proxy(), updateSession()

### Community 21 - "Partner Badge & Chevron"
Cohesion: 0.5
Nodes (1): badgeTone()

### Community 22 - "Announcement Banner"
Cohesion: 0.67
Nodes (2): getAnnouncementMessage(), handleUpdate()

### Community 34 - "Module Group 34"
Cohesion: 0.67
Nodes (3): Custom Next.js (Breaking Changes), Claude Agent Reference, Next.js App Router Architecture

### Community 35 - "Module Group 35"
Cohesion: 0.67
Nodes (3): Aurum EX-AI Bot, Aurum Bot Dashboard Hero, Aurum Bot Performance Stats

### Community 98 - "Module Group 98"
Cohesion: 1.0
Nodes (2): Trust Engine, Marketing Agent Skills

### Community 99 - "Module Group 99"
Cohesion: 1.0
Nodes (2): Design System V2, Visual Theme (Bright SaaS)

### Community 100 - "Module Group 100"
Cohesion: 1.0
Nodes (2): Visual Skin Upgrade Phase, Aceternity UI Mockups

### Community 101 - "Module Group 101"
Cohesion: 1.0
Nodes (2): Algo Pro Bot, Algo Pro Bot Dashboard

### Community 102 - "Module Group 102"
Cohesion: 1.0
Nodes (2): Digital Exchange Platform, CoinWave Exchange UI

### Community 103 - "Module Group 103"
Cohesion: 1.0
Nodes (2): AutoGeniusOS, AutoGeniusOS Dashboard Render

### Community 104 - "Module Group 104"
Cohesion: 1.0
Nodes (2): Crypto Debit Card, Physical Crypto Card

### Community 105 - "Module Group 105"
Cohesion: 1.0
Nodes (2): Neo Bank Mobile App, Apex Finance Mobile UI

### Community 106 - "Module Group 106"
Cohesion: 1.0
Nodes (2): Barry Goss, Resource Library Hero

### Community 107 - "Module Group 107"
Cohesion: 1.0
Nodes (2): Trust Wallet Info, USDT (TRC-20) Requirement

### Community 179 - "Module Group 179"
Cohesion: 1.0
Nodes (1): Next.js Custom Docs Guide

### Community 180 - "Module Group 180"
Cohesion: 1.0
Nodes (1): Design Thinking Methodology

### Community 181 - "Module Group 181"
Cohesion: 1.0
Nodes (1): Required Environment Variables

### Community 182 - "Module Group 182"
Cohesion: 1.0
Nodes (1): Main Navigation

### Community 183 - "Module Group 183"
Cohesion: 1.0
Nodes (1): Team AutoPilot Gated Banner

### Community 184 - "Module Group 184"
Cohesion: 1.0
Nodes (1): Onboarding Progress Track

### Community 185 - "Module Group 185"
Cohesion: 1.0
Nodes (1): AI Strategy Section

### Community 186 - "Module Group 186"
Cohesion: 1.0
Nodes (1): Marketing Readiness Scorecard

### Community 187 - "Module Group 187"
Cohesion: 1.0
Nodes (1): Downline Network Power

### Community 188 - "Module Group 188"
Cohesion: 1.0
Nodes (1): V3 Gateway Hero

## Knowledge Gaps
- **38 isolated node(s):** `Next.js Custom Docs Guide`, `Claude Agent Reference`, `Trust Engine`, `Visual Theme (Bright SaaS)`, `Next.js App Router Architecture` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Pricing Tier Utilities`** (7 nodes): `autoDetectTier()`, `calculateProfit()`, `formatInt()`, `formatNumber()`, `formatRange()`, `handleAmountChange()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme System`** (5 nodes): `ThemeProvider()`, `useTheme()`, `ThemeProvider.tsx`, `ThemeToggle.tsx`, `ThemeToggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Middleware & Proxy`** (4 nodes): `middleware.ts`, `proxy()`, `proxy.ts`, `updateSession()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Partner Badge & Chevron`** (4 nodes): `badgeTone()`, `ChevronRight()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Announcement Banner`** (4 nodes): `getAnnouncementMessage()`, `handleUpdate()`, `setAnnouncementMessage()`, `AnnouncementBanner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 98`** (2 nodes): `Trust Engine`, `Marketing Agent Skills`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 99`** (2 nodes): `Design System V2`, `Visual Theme (Bright SaaS)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 100`** (2 nodes): `Visual Skin Upgrade Phase`, `Aceternity UI Mockups`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 101`** (2 nodes): `Algo Pro Bot`, `Algo Pro Bot Dashboard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 102`** (2 nodes): `Digital Exchange Platform`, `CoinWave Exchange UI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 103`** (2 nodes): `AutoGeniusOS`, `AutoGeniusOS Dashboard Render`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 104`** (2 nodes): `Crypto Debit Card`, `Physical Crypto Card`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 105`** (2 nodes): `Neo Bank Mobile App`, `Apex Finance Mobile UI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 106`** (2 nodes): `Barry Goss`, `Resource Library Hero`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 107`** (2 nodes): `Trust Wallet Info`, `USDT (TRC-20) Requirement`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 179`** (1 nodes): `Next.js Custom Docs Guide`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 180`** (1 nodes): `Design Thinking Methodology`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 181`** (1 nodes): `Required Environment Variables`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 182`** (1 nodes): `Main Navigation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 183`** (1 nodes): `Team AutoPilot Gated Banner`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 184`** (1 nodes): `Onboarding Progress Track`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 185`** (1 nodes): `AI Strategy Section`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 186`** (1 nodes): `Marketing Readiness Scorecard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 187`** (1 nodes): `Downline Network Power`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Group 188`** (1 nodes): `V3 Gateway Hero`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createClient()` connect `Blog & Content Server` to `Email Drip & Notifications`, `Post & Revision Management`, `Rate Limiting Middleware`, `Generic API Routes`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `supabase()` connect `Post & Revision Management` to `Blog & Content Server`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `getServiceClient()` connect `Email Drip & Notifications` to `Blog & Content Server`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `createClient()` (e.g. with `exchangeToken()` and `POST()`) actually correct?**
  _`createClient()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js Custom Docs Guide`, `Claude Agent Reference`, `Trust Engine` to the rest of the system?**
  _38 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Blog & Content Server` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._