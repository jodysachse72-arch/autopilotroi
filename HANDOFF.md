# AutopilotROI — Session Handoff

## Active Branch
`visual-skin-upgrade` — pushed to GitHub. Build passes (exit 0).

## What Was Completed This Session
1. **Hero background** — replaced circuit SVG noise with dual-glow + 3 CSS data-ribbon pulse lines + grain texture
2. **Feature cards** — `icon-circle-accent` with per-color CSS variables (glow/border): blue, purple, teal, emerald, amber
3. **Testimonials** — gradient monogram avatars (`avatar-monogram`) replacing flat letter circles
4. **How It Works panel** — dark navy card with real Aurum bot dashboard screenshot + browser chrome + live status bar
5. **Products page** — product-bots/exchange/neobank/card images wired into product cards (16:9 above icon+text)
6. **globals.css** — added `.icon-circle-accent`, `.avatar-monogram`, `.hero-ribbon-line`, `@keyframes ribbon-pulse`
7. **Fixed pre-existing bug** — unclosed `</motion.div>` in products hero section

## Next Task: University Page Overhaul
File: `src/components/UniversityContent.tsx` (420 lines)

### Problems to Fix
- Hero mixes Tailwind classes with inline styles inconsistently
- H1 redundant ("Aurum University" in both badge and heading)
- VideoCard title is `text-sm` — too small
- VideoCard description is `text-xs` — way too small
- Card padding is tight (`p-4`)
- Category filters have no visual weight on active state
- Featured section looks identical to regular grid
- Section breaks need more breathing room
- CTA uses a plain emoji as anchor

### Design Goals
- Bigger video titles (at least `1rem` / `text-base`)
- Bigger descriptions (`0.875rem` / `text-sm`)
- More card padding (`p-5` or `p-6`)
- Hero: remove redundant heading, add a subtitle about the learning path
- Category pills: larger, stronger active state
- Featured cards: distinct visual treatment (border-left accent or banner)
- Keep all existing data, logic, Supabase fetch, and watched/progress tracking intact

## Key Constraints (Always)
- No layout, typography system, or color palette changes
- Tailwind v4 (`@theme` directive in globals.css)
- Next.js 16 — check `node_modules/next/dist/docs/` before using new APIs
- Site uses `--font-display`, `--color-border`, `--radius-card`, etc. from globals.css
- No links to aurum.foundation in the frontend

## Project Location
`c:\Users\Jody\Documents\autopilotroi`

## Git Remote
`https://github.com/jodysachse72-arch/autopilotroi`
