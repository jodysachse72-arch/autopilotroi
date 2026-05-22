# Frontend Bring-Forward Checklist

> **Mission**: Ship the approved beautiful frontend as the public AutoPilotROI onboarding/marketing site.  
> **Branch**: `feature/frontend-pages`  
> **Date**: 2026-05-22

---

## Route Inventory

| Route | Exists | Visual Quality | Design System | Connected | Ship Now | Action Needed |
|-------|--------|---------------|---------------|-----------|----------|---------------|
| `/` (homepage) | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, SectionBox, HeroDark, etc.) | ✅ | ✅ Ship | None — CMS fallback renders StaticHomePage perfectly |
| `/products` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, SectionBox, HeroBlue) | ✅ | ✅ Ship | None — server component + ProductsClient |
| `/start` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, HeroBlue, SectionBox, CTABand) | ✅ | ✅ Ship | None — 6-chapter onboarding guide complete |
| `/signup` | ✅ | 🟢 Good | ✅ Uses FormField/FormInput + clean card layout | ✅ | ✅ Ship | Minor: Navbar hidden (intentional). Restyle to match DS card more precisely |
| `/orientation` | ✅ | 🟢 Good | ⚠️ Mixed — uses `page-bg` class + inline styles | ✅ | ✅ Ship | Restyle wrapper to use PageShell/SectionBox pattern |
| `/waiting-room` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, SectionBox, CTABand, PersonalizedPath) | ✅ | ✅ Ship | None — full learning center with video grid |
| `/calculator` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, HeroBlue, SectionBox, CTABand) | ✅ | ✅ Ship | None — 8-tier calculator fully built |
| `/faqs` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, HeroBlue, SectionBox, CTABand) | ✅ | ✅ Ship | None — Stripe-style sidebar + accordion |
| `/university` | ✅ | 🟢 Good | ✅ Uses UniversityContent with approved styling | ✅ | ✅ Ship | None — video learning center |
| `/media` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, HeroBlue, SectionBox, CTABand) | ✅ | ✅ Ship | None — full video library with filters |
| `/join` | ✅ | ⭐ Excellent | ✅ Approved DS (PageShell, HeroBlue, SectionBox, CTABand) | ✅ | ✅ Ship | None — referral landing page |
| `/privacy` | ✅ | 🟡 Stale | ⚠️ Uses old `page-bg`/`sections-stack`/`section-box` CSS classes | ✅ | ✅ Ship | **Restyle** to use PageShell/SectionBox/HeroBlue |
| `/terms` | ✅ | 🟡 Stale | ⚠️ Uses old `page-bg`/`sections-stack`/`section-box` CSS classes | ✅ | ✅ Ship | **Restyle** to use PageShell/SectionBox/HeroBlue |
| `/disclaimer` | ✅ | 🟡 Stale | ⚠️ Uses old `page-bg`/`sections-stack`/`section-box` CSS classes | ✅ | ✅ Ship | **Restyle** to use PageShell/SectionBox/HeroBlue |
| `/blog` | ✅ | 🟡 Stale | ⚠️ CMS-driven, needs review | ❓ | 🔶 Maybe | Review content rendering — may need restyle |
| `/resources` | ✅ | ❌ Redirect | Redirects to `/dashboard/resources` | ❌ Disconnected | ❌ Later | Partner backend — not public |
| `/onboarding` | ✅ | ❓ Unknown | Backend/admin flow | ❌ | ❌ Later | Internal admin workflow |
| `/evaluate` | ✅ | ❓ Unknown | Backend flow | ❌ | ❌ Later | Internal admin page |
| `/partner-tools` | ✅ | ❓ Unknown | Backend page | ❌ | ❌ Later | Partner backend |
| `/maintenance` | ✅ | 🟢 Good | Utility page | ✅ | ✅ Ship | Maintenance mode page |
| `/status` | ✅ | ❓ Unknown | Backend page | ❌ | ❌ Later | Internal status |
| `/summary` | ✅ | ❓ Unknown | Backend page | ❌ | ❌ Later | Internal summary |
| `/contact` | ❌ Missing | — | — | — | 🔶 Maybe | Create contact/support page or rely on ThriveDesk widget |

---

## Design System Components (Approved)

### Section Components (`src/components/sections/`)
- `PageShell` — page wrapper with `sections-stack` pattern
- `SectionBox` — rounded card section (variants: white, surface, blue, navy)
- `SectionHeader` — eyebrow + title + description
- `HeroDark` — dark gradient hero with CTAs and visual
- `HeroBlue` — blue gradient hero (used on subpages)
- `CTABand` — closing call-to-action section
- `FeatureCard`, `EcoCard`, `TestimonialCard`, `PricingCard` — content cards
- `StatRow`, `Step`, `QuoteBlock`, `ActivityTicker` — supplementary sections
- `ProductPanel` — mock browser panel visual

### Layout Components (`src/components/layout/`)
- `Navbar` — sticky white nav with dropdown (desktop + mobile)
- `Footer` — dark navy footer with link columns
- `AnnouncementBanner` — top announcement bar

### Design Tokens (`globals.css`)
- Fonts: Plus Jakarta Sans (display), Inter (body)
- Colors: Navy `#181d26`, Blue `#1b61c9`, Surface `#f8fafc`, Page `#eef0f4`
- Radii: section `1.125rem`, card `1rem`, button `0.75rem`
- Shadows: card, card-hover, blue, section
- Fluid type scale: hero → display → heading → subheading → body-lg → body → caption

---

## Navigation Status

### Desktop Nav Links (current)
1. What Is Aurum → `/products` ✅
2. Calculator → `/calculator` ✅
3. University → `/university` ✅
4. Blog → `/blog` ✅
5. FAQs → `/faqs` ✅
6. Media → `/media` ✅

### Needed Additions
- **Start Here** → `/start` (add to nav)

### CTA Button
- Start Here → `/signup` ✅

### Navbar Exclusions (intentional)
- Hides on: `/dashboard`, `/admin`, `/orientation`, `/login`, `/signup`
- These are immersive flow pages that show their own chrome

### Footer Links
- Platform: What Is Aurum, University, Calculator, Media ✅
- Support: FAQs, Blog, Onboarding, Partner Tools ✅
- Legal: Privacy, Terms, Disclaimer ✅

### Mobile Nav
- Hamburger menu with all public links ✅
- Auth section with login/signup CTAs ✅

---

## Signup → Orientation → Waiting Room Flow

| Step | Route | Status | Action |
|------|-------|--------|--------|
| 1. Lead capture | `/signup` | ✅ Working | Minor visual polish to match DS |
| 2. Readiness assessment | `/orientation` | ✅ Working | Restyle wrapper from `page-bg` to approved pattern |
| 3. Learning center | `/waiting-room` | ✅ Working | Already uses approved DS — no changes needed |

Flow logic:
- Signup → saves lead to localStorage + API → redirects to `/orientation`
- Orientation → readiness quiz → saves score → notifies partner API → redirects to `/waiting-room`
- Returning users → auto-redirect from `/signup` to `/waiting-room`

---

## ThriveDesk Integration

### Current State
- Widget script already loaded in `layout.tsx` via `NEXT_PUBLIC_THRIVEDESK_WIDGET_ID` env var
- Loads only if env var exists and is not `'placeholder'`

### Missing
- `src/lib/integrations/thrivedesk.ts` — adapter for sending signup/orientation data
- `docs/THRIVEDESK_INTEGRATION.md` — documentation

---

## Priority Actions

### P0 — Must ship
1. ~~Create FRONTEND_BRING_FORWARD_CHECKLIST.md~~ ✅
2. Add `/start` to navbar public links
3. Restyle `/privacy` to use PageShell/SectionBox
4. Restyle `/terms` to use PageShell/SectionBox
5. Restyle `/disclaimer` to use PageShell/SectionBox
6. Restyle `/orientation` wrapper to match approved DS
7. Minor `/signup` visual polish
8. Create ThriveDesk adapter + docs
9. Verify nav links all work
10. Final build check

### P1 — Should ship
11. Review `/blog` rendering
12. Update footer "Onboarding" link to point to `/start` instead of `/onboarding`

### P2 — Later
13. Create `/contact` support page
14. Build partner backend
15. Build community/forum system
16. Build admin/change desk
