# Backend Polish Handoff — for Claude Sonnet 4.6 in Antigravity

**Date:** 2026-04-22
**Branch:** `main`
**Last commit:** `6105969` — feat(backend-shell): F1+F2+F3 visible upgrade
**Deploy:** Live at https://autopilotroi-9rhzufli1-autopilot-roi.vercel.app
**User feedback after deploy:** "It still looks terrible" — needs another polish pass

---

## TL;DR for the next agent

Three big visual upgrades to the admin shell, partner dashboard, and admin overview were just shipped in a single commit (`6105969`). The new structure is correct (sparklines, real funnel, activity timeline, triage queue, illustrated tiles, etc.) but the **visual quality and density is not yet at the bar the user wants**. Your job is a polish pass — not a rewrite.

The user has approved this direction; do not refactor or revert. Tighten what's there.

---

## What's been done (already committed and deployed)

### F1 — Admin/Dashboard shell modernized
**Files:**
- `src/components/backend/SidebarShell.tsx` — accepts `SidebarSection[]` for grouping, `LucideIcon`, `badge`/`badgeTone`. Premium slate gradient + accent rail on active link.
- `src/app/admin/layout.tsx` — 13 Lucide icons (LayoutDashboard, Handshake, Users, FileEdit, Mail, ToggleLeft, Map, FileText, CheckSquare, BookOpen, Library, ScrollText, Settings). Sidebar grouped: Workspace / Strategy / System. Red `3` badge on Prospects. Top app bar: sticky search (⌘K), notifications bell with red dot, profile dropdown with Shield avatar.
- `src/app/dashboard/layout.tsx` — 8 Lucide icons (LayoutDashboard, Users, TrendingUp, Trophy, Link2, Video, Library, Settings). Sidebar grouped: Overview / Growth / Account. Blue `7` badge on Prospects. Notifications popover (4 hardcoded items), profile dropdown with `DP` initials avatar.
- `src/components/backend/index.ts` — re-exports `SidebarSection` type.
- `src/app/globals.css` — `.be-sidebar` slate gradient, `.be-sidebar-link__accent`, `.be-sidebar-link__icon`, `.be-card` multi-layer shadow + `.be-card--elevated`, `.be-appbar`, `.be-appbar-search`, `.be-appbar-iconbtn`, `.be-appbar-avatar`, `.be-appbar-avatar__circle`. (These CSS edits were committed earlier in `5be7171` and prior.)

### F2 — Partner Dashboard overview redesign
**File:** `src/app/dashboard/page.tsx`
- `Sparkline` component (inline SVG, gradient-filled area, end-dot)
- `SparkStat` component — 4 KPI cards each with iconified swatch, sparkline, trend delta. Icons: Users (blue), BarChart3 (purple), Target (amber), TrendingUp (green).
- `Funnel` component — tapered horizontal bars with per-stage retention %, animated `motion.div` width.
- `buildAttentionItems` — surfaces hot leads (score ≥70 & not invited), stale leads (>5 days in pipeline), onboarding stalls. Falls back to "all caught up" empty state.
- Welcome banner: dark gradient (`#0b1220 → #1b3556 → #1b61c9`) with two glow-blob bg layers, live/demo pill, "Generate referral link" CTA.
- Leads table: tier-colored avatar circles with initials, animated score bars, drip-progress dots (5 dots, green when sent), status pills with leading colored dot, Lucide Mail icon on Send.
- Quick action tiles (4): Referral Links, Leaderboard, Partner Videos, Profile Settings — using Lucide icons.

### F3 — Admin overview redesign
**File:** `src/app/admin/page.tsx`
- "All systems operational" hero banner — dark gradient (`#0b1220 → #1f2a44 → #312e81`), pulsing emerald pill, "Triage queue" CTA.
- 4 KPI cards with iconified swatches (Users blue, Handshake green, Clock amber, CheckCircle2 purple) + trend deltas.
- Activity Timeline (5/3 grid): vertical rail with pulsing white-haloed circular icons per event type (UserPlus, ClipboardCheck, ArrowUp, Trophy). Each row: action / user · meta / time.
- Triage Queue (2/3 grid): 3 unassigned prospects with avatar initials, score badge, source/wait, Assign (blue) / Skip (outline) buttons.
- 6 illustrated quick-action tiles — gradient corner bg blob (different color per tile), colored icon chip with matching shadow. Tiles: Manage Partners, Prospect Queue, Content Editor, Strategy & Roadmap, Changelog, Launch Checklist.
- Bottom 3-up insight strip: This Week (Conversion up 12%) / Top Partner (James Wilson · 14 leads) / Next Launch (Aurum University 2.0).

### Verification
- `npx tsc --noEmit` — clean
- `npm run lint` — clean for all changed files (10 pre-existing errors elsewhere in repo are unchanged)
- Local `next build` — failed with bus error (sandbox memory limit, NOT a code issue)
- Vercel deploy — ✅ live, screenshots confirm the new structure renders

---

## What's still wrong (visible in deployed screenshots — fix these)

### Partner Dashboard (`src/app/dashboard/page.tsx`)

1. **The "Welcome to AutopilotROI" announcement bar at the top** is a solid bright blue/purple band that fights with the dark hero immediately below it. Consider muting it (lighter background, smaller, or move into the dashboard chrome). It lives in the public root `layout.tsx` — check `src/app/layout.tsx` and `src/components/layout/AnnouncementBanner.tsx`.

2. **The "Welcome! Let's get you started" 3-card wizard (PartnerOnboardingWizard)** dominates the first viewport. It pushes the actual KPIs below the fold. Either:
   - Make it collapsible/dismissible by default after first view
   - Make it a single thin progress strip ("0/3 steps complete · Continue setup →") that expands on click
   - File: `src/components/ui/PartnerOnboardingWizard.tsx`

3. **The dark welcome hero is too tall and the "DEMO DATA" pill + "Welcome back, Partner" headline + paragraph + CTA stack feels redundant** when the wizard above already greets the user. Tighten: smaller padding, drop the paragraph, keep the pill+H2+CTA on one row.

4. **Funnel "200% retained" math is wrong-looking** — when a later stage has more users than an earlier one (e.g. Active=2 from Onboarding=1), it shows >100%. Cap retention display at 100% or compute it differently (use original cohort, not stage-to-stage). The bug is in `Funnel` component, the `conversionFromPrev` calculation around line 200 of `src/app/dashboard/page.tsx`.

5. **KPI sparklines look fake/identical** — they're generated from `genSpark()` with deterministic seeds. They all curve up. Either:
   - Make them more varied (different shapes per metric)
   - Hide them when on demo data (show a "—" placeholder)
   - Wire them to real data once Supabase is connected

6. **Leads table — tier badge color (orange "beginner") clashes with the avatar gradient.** The avatar bg gradient is amber for beginner; the StatusBadge is also amber. Pick one or use a softer avatar bg for beginner.

### Admin Overview (`src/app/admin/page.tsx`)

1. **The hero banner ("All systems operational") repeats info that's already in the KPI row right below.** "12 new signups, 8 prospects awaiting triage, 3 partners promoted" duplicates the stat cards. Either kill the paragraph and keep only the pill+title+CTA, or kill the KPI delta lines.

2. **The Activity Timeline rail dot is a white-haloed circle inside a colored bg.** On the live page it looks like there's no rail line connecting them — the gradient-line is too faint. Either bump the rail opacity or use a solid `1px` line.

3. **Triage Queue cards have Assign + Skip stacked at bottom on every card** — this is heavy. Consider showing actions only on hover (desktop), or moving them to the right side of the row.

4. **Illustrated quick-action tiles look pretty but the gradient corner blob is too saturated** for some colors (the pink "Changelog" tile especially). Reduce opacity from 0.85 → 0.5, or tint with a more pastel palette.

5. **The 3-up insight strip at the bottom feels disconnected from the rest** — no header, no context. Either give it a `SectionHeader` ("This week") or merge into the hero.

### Both pages

6. **The blue gradient "Welcome to AutopilotROI" announcement bar at the very top** is the single most jarring element on every page. It's not from the admin/dashboard — it comes from the global root layout. Investigate `src/components/layout/AnnouncementBanner.tsx` — make it dismissible-and-stay-dismissed (currently dismisses but reappears), or theme it to match the inner panels (slate, not bright purple).

7. **Page padding** — the main content has `p-5 lg:p-7` in both layouts; that's fine, but the cards inside have their own padding too, so things feel cramped near the edges on desktop. Consider bumping main padding to `lg:p-8` and reducing card gaps from `gap-5` → `gap-4`.

8. **Typography hierarchy** — the H2s in cards (`text-sm font-bold`) are all the same size, which makes scanning hard. The hero H2 is `text-2xl`; card H3s are `text-sm`. Bump card H3s to `text-base` and section labels (`be-section-title`) to `text-base font-bold` so there's a clear hierarchy: hero (2xl) → section (base) → card title (sm).

---

## Specific next steps (in priority order)

1. **Hide or shrink the AnnouncementBanner** — biggest visible win. File: `src/components/layout/AnnouncementBanner.tsx` and `src/app/layout.tsx`. Make it dismissible and remember dismissal in `localStorage`.

2. **Collapse PartnerOnboardingWizard by default** after first visit. File: `src/components/ui/PartnerOnboardingWizard.tsx`. Show a thin progress strip when collapsed.

3. **Fix funnel retention math** — cap at 100%, or label it differently. File: `src/app/dashboard/page.tsx`, ~line 200.

4. **Tighten the dark hero banners on both pages** — remove the paragraph, keep pill+H2+CTA on one row at smaller height.

5. **Reduce hero/KPI redundancy on admin** — pick one or the other for the "12 signups, 8 prospects" info.

6. **Improve Activity Timeline rail visibility.**

7. **Polish quick-action tiles** — softer corner gradients.

8. **Type hierarchy pass** — bump card titles up one step.

9. **Consider a "Connected" empty-state pattern** for sparklines and funnel when on demo data so they don't pretend to be real.

---

## Architecture / conventions to follow

- **Backend primitives** are in `src/components/backend/`. Always import from the barrel: `@/components/backend`.
  - `Card`, `StatCard`, `ActionCard`, `EmptyState`, `SectionHeader`
  - `FormField`, `FormInput`, `FormSelect`, `FormTextarea`, `FormButton`, `FormRow`
  - `DataTable`, `FilterPill`, `StatusBadge`, `Toolbar`
  - `SidebarShell` + types `SidebarLink`, `SidebarSection`
- **CSS variables** are defined in `src/app/globals.css`. Backend styles all use the `be-*` prefix. Don't introduce hardcoded colors — use CSS variables (`var(--color-text)`, `var(--color-border)`, `var(--color-blue)`, etc.) where they exist.
- **Lucide icons** — `lucide-react@^1.8.0`. Sized at 18px (`h-[18px] w-[18px]`) with `strokeWidth={2}` or `2.2` is standard. Always type as `LucideIcon` when storing in arrays.
- **Animations** — `framer-motion`. Use `motion.div` with `initial / animate / transition`. Standard easing: `[0.22, 1, 0.36, 1]`. Standard duration: `0.3–0.35s` for entry, stagger `i * 0.06`.
- **Type safety** — strict TS, strict eslint. The rule `react-hooks/set-state-in-effect` is enforced; if you set state in an effect for legitimate reasons (data fetch on mount), use `// eslint-disable-next-line react-hooks/set-state-in-effect -- reason` with a comment explaining why.
- **Write tool truncation** — heads up: when writing files larger than ~150 lines via the Write or Edit tool, output may silently truncate at the end. Use a bash heredoc instead: `cat > path/file.tsx <<'TSXEOF' ... TSXEOF`. Then `wc -l` to verify line count, and `tail -5` to verify ending.

## Branch / push workflow

The cowork sandbox doesn't have git push credentials. After committing locally, the user pushes from PowerShell:
```powershell
cd C:\Users\Jody\Documents\autopilotroi
git push origin main
```
Vercel auto-deploys on push to `main`.

Working branch is `main` directly. The legacy `visual-skin-upgrade` branch was merged in commit `03f9354`.

## Known pre-existing eslint errors (not from F1-F3)

These exist in the repo from before F1-F3 and don't block builds:
- `src/lib/feature-flags.tsx:262` — setState-in-effect (legit, needs eslint-disable)
- `src/components/ThemeProvider.tsx:29` — same
- `src/components/layout/AnnouncementBanner.tsx:36` — same
- `src/components/layout/Navbar.tsx:75` — same
- `src/components/ui/CommandPalette.tsx:72` — same
- `src/app/not-found.tsx:30` — same
- `src/app/api/admin/partners/route.ts:7` — `require()` style import
- `src/app/api/leads/assess/route.ts:12` — same
- `src/app/api/leads/route.ts:14` — same

Ignore these unless touching the file.

## Files to read first

1. `src/app/dashboard/page.tsx` — Partner Dashboard overview (819 lines)
2. `src/app/admin/page.tsx` — Admin overview (472 lines)
3. `src/app/dashboard/layout.tsx` — Partner shell (271 lines)
4. `src/app/admin/layout.tsx` — Admin shell (221 lines)
5. `src/components/backend/SidebarShell.tsx` — Sidebar component (169 lines)
6. `src/app/globals.css` — All `.be-*` styles
7. `src/components/layout/AnnouncementBanner.tsx` — The blue bar that needs taming
8. `src/components/ui/PartnerOnboardingWizard.tsx` — The 3-card welcome wizard

---

## Don't do

- Don't revert the F1/F2/F3 structural changes — the user approved them.
- Don't add more KPIs or more cards. The page is already busy.
- Don't introduce new dependencies. `lucide-react`, `framer-motion`, `next`, `react`, `tailwind` are it.
- Don't change the sidebar grouping — the user has signed off on Workspace/Strategy/System (admin) and Overview/Growth/Account (dashboard).
