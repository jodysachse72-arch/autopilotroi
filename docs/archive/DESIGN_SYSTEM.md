# AutopilotROI — Design System Standard
> **Version 2.0** — Established April 2026.
> All new pages and redesigns must follow this spec. Content always stays the same — only visual presentation changes.

---

## Project History & Branch Map

```
main
 └── frontend-rebuild        ← Phase 1 & 2: Full structural redesign
      └── visual-skin-upgrade ← Phase 3: Visual skin layer (current active branch)
```

### Phase 1 — `frontend-rebuild` (Structural Redesign)
What was rebuilt — content preserved, only visual presentation changed:

| Commit | What Changed |
|---|---|
| Light-mode design system | Full site migrated from dark-mode vars to `#1b61c9` Airtable Blue token system |
| Navbar | Light-themed, white mobile menu, auth dropdown, route exclusions |
| Homepage | Phase 1 rebuild — OnePay-style: fluid type, scroll-box sections, hero/stats/features/steps/ecosystem/testimonials/CTA |
| Layout system | `page-bg` → `sections-stack` → `section-box` shell, `container-xl`, `section-padding` |
| 4K scaling | `sections-stack` capped at 1440px centered, `page-bg` visible sides |
| Calculator | Right-column order fixed — Investment Breakdown first, tiers below |
| Phase 2 | Products, FAQs, Blog, Media, Calculator, University, Footer all on design system |
| Phase 3 | Blog detail, Join, Partner Tools, Disclaimer, Privacy, Terms all ported |
| Onboarding funnel | start / waiting-room / summary / onboarding all light-mode |
| Products page | Rebuilt as "What Is Aurum" — trust section, Aurum overview, nav label updated |
| Aurum links | All `aurum.foundation` external links removed from frontend |

### Phase 2 — `visual-skin-upgrade` (Visual Skin Layer)
Branches from `frontend-rebuild`. No structural or content changes — visual assets only:

| Commit | What Changed |
|---|---|
| Hero background | Replaced circuit SVG noise + dot grids + multi-orb stacks with clean dual-glow + 3 CSS data-ribbon pulse lines + CSS grain texture |
| Feature cards | `icon-circle-accent` with per-feature color CSS variables — glow, border, and icon color all derive from one color per feature |
| Testimonials | Gradient monogram avatars (`avatar-monogram`) replacing flat letter-initial circles |
| How It Works panel | Dark navy card housing real Aurum bot dashboard screenshot + browser chrome + green live status dot |
| Products page | `product-bots.png`, `product-exchange.png`, `product-neobank.png`, `product-card.png` wired into product cards (16:9 image above icon+text) |
| `globals.css` | Added `.icon-circle-accent`, `.avatar-monogram`, `.hero-ribbon-line`, `@keyframes ribbon-pulse` |
| University page | Full overhaul: H1 redundancy removed, card titles/descriptions larger, filter pills stronger, featured cards left-accent treatment, CTA upgraded |

---

## Core Rule: Content vs. Presentation

> **Content is frozen. Presentation is what we change.**
>
> - ✅ Change: background styles, icon containers, avatar styles, font sizes, spacing, shadows, animations
> - ❌ Never change: page copy, data, navigation structure, URLs, Supabase queries, component logic

---

## 1. Visual Philosophy

**"Institutional AI"** — clean, confident, premium. Not generic, not startup-y, not crypto-bro.

### ✅ Do
- Use depth through subtle shadows and layered backgrounds — not gradients on every element
- Use white space generously — sections breathe
- Use real product imagery over illustrations or AI-generated icons
- Use CSS variables for all colors, spacing, and radii — never hardcode raw hex in components
- Use `icon-circle-accent` with per-feature color accents to differentiate feature cards
- Use gradient monogram avatars for all person/testimonial references until real photos are available
- Keep inline styles consistent within a component — don't mix Tailwind utilities and inline styles on the same element

### ❌ Don't
- No circuit-board SVG overlays or dot-grid patterns in hero backgrounds
- No more than 2 glow orbs in any hero section
- No generic emoji as the primary visual anchor in CTAs
- No raw Tailwind classes mixed with inline styles in the same element
- No text smaller than `var(--text-body)` for any user-facing readable content
- No links to `aurum.foundation` anywhere in the frontend
- No dark mode — site is light-only

---

## 2. Color System

All colors are locked. Do not introduce new hues.

```
Brand
  --color-navy:         #181d26   headings, dark text, dark sections
  --color-blue:         #1b61c9   primary brand, CTAs, active states
  --color-blue-dark:    #1550aa   hover state
  --color-blue-light:   #2d7ff9   gradient top on buttons
  --color-blue-pale:    #e8f0fd   blue badge backgrounds

Surfaces
  --color-white:        #ffffff   card backgrounds
  --color-surface:      #f8fafc   section-box-surface, alternating sections
  --color-page:         #eef0f4   page-bg wrapper

Text
  --color-text:         #181d26
  --color-text-weak:    rgba(24,29,38,0.65)   subtitles, descriptions
  --color-text-muted:   rgba(24,29,38,0.42)   captions, metadata

Borders
  --color-border:       #e0e2e6
  --color-border-light: #eef0f4

Semantic / Accent (icon accents only)
  --color-success:      #059669   exchange, growth, confirmed
  --color-warning:      #d97706   partner program, amber
  --color-purple:       #7c3aed   visa card, zeus bot
  --color-teal:         #0891b2   neobank, web3
```

### Approved Hero Backgrounds

```css
/* Dark navy gradient — main hero */
background: linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%);

/* Solid blue — section accent hero (university, etc.) */
background: #1b61c9;

/* Navy — dark CTAs, bottom sections */
background: #181d26;

/* Light surface — alternating content sections */
background: #f4f6fb;
```

---

## 3. Typography

### Fonts
- **Display (headings, buttons):** `Plus Jakarta Sans` via `var(--font-display)`
- **Body:** `Inter` via `var(--font-body)`

### Type Scale

| Token | Fluid Size | Use |
|---|---|---|
| `var(--text-hero)` | 48–88px | Hero H1 only |
| `var(--text-display)` | 36–64px | Page titles |
| `var(--text-heading)` | 28–48px | Section H2 headings |
| `var(--text-subheading)` | 20–30px | Card H3 titles |
| `var(--text-body-lg)` | 17–20px | Lead paragraphs, descriptions |
| `var(--text-body)` | 15–17px | **Minimum for all body text** |
| `var(--text-caption)` | 12–14px | Badges, labels, metadata only |

> **Hard rule:** Never use text smaller than `var(--text-caption)` for anything the user reads. Video titles and card descriptions must use at minimum `var(--text-body)`.

### CSS Typography Classes (use these, don't reinvent)
```css
.text-hero        /* H1 hero */
.text-display     /* page title */
.text-heading     /* section H2 */
.text-subheading  /* card H3 */
.text-body-lg     /* lead/description text */
.text-label       /* badge/eyebrow caps */
```

---

## 4. Layout System

### Page Shell — Every Page
```tsx
<div className="page-bg">
  <div className="sections-stack">
    <section className="section-box"> ... </section>
    <section className="section-box-surface"> ... </section>
    <section className="section-box-navy"> ... </section>
  </div>
</div>
```

### Section Types
| Class | Background | Use |
|---|---|---|
| `.section-box` | `#ffffff` | Primary content sections |
| `.section-box-surface` | `#f8fafc` | Alternating sections |
| `.section-box-blue` | Blue gradient | Brand accent (use sparingly) |
| `.section-box-navy` | `#181d26` | Dark CTAs, bottom sections |

For solid blue hero sections use inline style, not `.section-box-blue`:
```tsx
<section style={{ background: '#1b61c9', borderRadius: 'var(--radius-section)' }}>
```

### Padding
```css
.section-padding     /* 7rem top/bottom — all standard sections */
.section-padding-lg  /* 9rem top/bottom — hero sections */
```

### Container
```css
.container-xl  /* max-width 1280px, centered, fluid horizontal padding */
```

### Stack
```css
.sections-stack  /* 1.25rem gap, 1.25rem outer padding, max 1440px centered */
```

---

## 5. Component Library

### Cards
```css
.card           /* white, radius-card (16px), shadow-card, border */
.shimmer-hover  /* always add to interactive cards */
```

Hover pattern — always JS, not CSS-only:
```tsx
<div
  className="card shimmer-hover"
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
    e.currentTarget.style.transform = 'translateY(-2px)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = ''
    e.currentTarget.style.transform = 'translateY(0)'
  }}
>
```

### Buttons
```css
.btn            /* base — always pair with a variant */
.btn-primary    /* filled blue — primary CTA */
.btn-primary-lg /* large primary */
.btn-outline    /* outlined — secondary */
.btn-ghost      /* text-only — tertiary */
```

Always pair primary buttons with `.shimmer-hover`:
```tsx
<Link href="/signup" className="btn btn-primary shimmer-hover">Get Started →</Link>
```

For dark-section buttons, override border/color inline:
```tsx
<Link href="/learn" className="btn btn-outline"
  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}>
  Learn More
</Link>
```

### Badges / Eyebrow Labels
```tsx
<span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
  Section Label
</span>
```

### Icon Containers

**Standard blue (non-feature contexts):**
```css
.icon-circle     /* 3.5rem circle */
.icon-circle-lg  /* 4rem rounded square */
```

**Per-feature accent — use on all feature/product cards:**
```tsx
<div
  className="icon-circle-accent"
  style={{
    '--icon-bg':     'rgba(27,97,201,0.10)',
    '--icon-color':  '#1b61c9',
    '--icon-border': 'rgba(27,97,201,0.22)',
    '--icon-glow':   'rgba(27,97,201,0.18)',
  } as React.CSSProperties}
>
  <Icon />
</div>
```

**Color presets per feature:**
| Feature | `--icon-color` | `--icon-bg` |
|---|---|---|
| EX-AI Bot / Onboarding / Primary | `#1b61c9` | `rgba(27,97,201,0.10)` |
| Visa Card / Zeus Bot | `#7c3aed` | `rgba(124,58,237,0.10)` |
| NeoBank / Web3 | `#0891b2` | `rgba(8,145,178,0.10)` |
| Exchange / Growth | `#059669` | `rgba(5,150,105,0.10)` |
| Partner Program / Amber | `#d97706` | `rgba(217,119,6,0.10)` |

### Testimonial / Person Avatars

Use `.avatar-monogram` — never flat letter circles:
```tsx
<div
  className="avatar-monogram"
  style={{ '--avatar-from': '#1b61c9', '--avatar-to': '#0c1f6e' } as React.CSSProperties}
>
  M
</div>
```

**Gradient pairs (cycle through for multiple avatars):**
| Slot | `--avatar-from` | `--avatar-to` |
|---|---|---|
| 1st | `#1b61c9` | `#0c1f6e` |
| 2nd | `#7c3aed` | `#4c1d95` |
| 3rd | `#0891b2` | `#164e63` |
| 4th | `#059669` | `#064e3b` |

---

## 6. Hero Section Template

```tsx
<section style={{
  background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%)',
  borderRadius: 'var(--radius-section)',
  overflow: 'hidden',
  position: 'relative',
}}>
  {/* Atmosphere — max 2 orbs + ribbon lines */}
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div style={{
      position: 'absolute', right: '-5%', top: '-10%',
      width: '60vmax', height: '60vmax', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(27,97,201,0.42) 0%, rgba(27,97,201,0.08) 45%, transparent 65%)',
    }} />
    <div style={{
      position: 'absolute', left: '-10%', bottom: '-15%',
      width: '50vmax', height: '50vmax', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 55%)',
    }} />
    <div className="hero-ribbon-line" style={{ top: '28%', animationDelay: '0s' }} />
    <div className="hero-ribbon-line" style={{ top: '52%', animationDelay: '2s' }} />
    <div className="hero-ribbon-line" style={{ top: '74%', animationDelay: '4s' }} />
  </div>

  {/* Content */}
  <div className="container-xl section-padding-lg" style={{ position: 'relative', zIndex: 1 }}>
    <span className="badge badge-blue reveal" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
      Eyebrow Label
    </span>
    <h1 className="text-hero reveal reveal-delay-1" style={{ color: '#ffffff', maxWidth: '16ch' }}>
      Hero Headline
    </h1>
    <p className="text-body-lg reveal reveal-delay-2"
      style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '42rem', marginTop: '1.25rem' }}>
      Supporting description.
    </p>
    <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginTop: '2rem' }}>
      <Link href="/signup" className="btn btn-primary-lg shimmer-hover">Primary CTA →</Link>
      <Link href="/learn" className="btn btn-outline"
        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}>
        Secondary CTA
      </Link>
    </div>
  </div>
</section>
```

**Hero rules:**
- Badge → H1 → Description → CTAs — always in this order
- H1 `maxWidth: '16ch'` forces good line breaks
- Description `maxWidth: '42rem'`
- Max 2 atmosphere orbs. Always use 3 ribbon lines.

---

## 7. Section Content Template

```tsx
<section className="section-box">
  <div className="container-xl section-padding">
    {/* Section header — always centered */}
    <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 4rem' }}>
      <span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Eyebrow</span>
      <h2 className="text-display reveal reveal-delay-1" style={{ color: '#181d26', marginBottom: '1rem' }}>Section Heading</h2>
      <p className="text-body-lg reveal reveal-delay-2" style={{ color: 'var(--color-text-weak)' }}>Description.</p>
    </div>

    {/* Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
      {/* cards here */}
    </div>
  </div>
</section>
```

**Two-column split:**
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
  gap: '4rem', alignItems: 'center',
}}>
  <div>{/* text */}</div>
  <div>{/* visual / screenshot */}</div>
</div>
```

---

## 8. Product Dashboard Panel

For any section showing a real product UI:
```tsx
<div style={{
  background: '#181d26', borderRadius: '1.5rem', overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04)',
}}>
  {/* Browser chrome */}
  <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
    {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
      <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
    ))}
    <span style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginLeft: '-1.25rem' }}>
      app.yourproduct.com
    </span>
  </div>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src="/your-screenshot.png" alt="Product dashboard" style={{ width: '100%', display: 'block' }} />
  {/* Status bar */}
  <div style={{ padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.7)' }} />
    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.50)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
      Product Name · Live
    </span>
  </div>
</div>
```

---

## 9. Scroll Reveal Animations

```tsx
// 1. Call at top of page component
useScrollReveal()

// 2. Apply to elements
<div className="reveal">...</div>
<div className="reveal reveal-delay-1">...</div>   // 80ms
<div className="reveal reveal-delay-2">...</div>   // 160ms
<div className="reveal reveal-delay-3">...</div>   // 240ms
```

For framer-motion pages:
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}
<motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
```

---

## 10. Page Audit Checklist

Run before every commit:
- [ ] `page-bg` → `sections-stack` → `section-box` shell used
- [ ] Hero order: badge → H1 → description → CTAs
- [ ] No text below `var(--text-body)` for any readable content
- [ ] Feature cards use `.icon-circle-accent` with per-feature color variables
- [ ] Person/testimonial avatars use `.avatar-monogram` with gradient pairs
- [ ] Interactive cards have `.shimmer-hover` + JS hover shadow/translate
- [ ] Buttons use `.btn .btn-primary` — not raw inline button styles
- [ ] Sections use `.container-xl` + `.section-padding`
- [ ] Scroll reveal `.reveal` classes on headings and cards
- [ ] No links to `aurum.foundation`
- [ ] No Tailwind utilities mixed with inline styles on same element
- [ ] `npm run build` exits 0

---

## 11. Page Status

| Page | Branch | Status | Notes |
|---|---|---|---|
| Home `/` | visual-skin-upgrade | ✅ Done | Hero, features, testimonials, bot screenshot |
| Products `/products` | visual-skin-upgrade | ✅ Done | Product images wired, motion.div bug fixed |
| University `/university` | visual-skin-upgrade | ✅ Done | Typography, filters, featured, CTA overhauled |
| Evaluate `/evaluate` | frontend-rebuild | ⚠️ Needs visual skin | Apply icon-accent, avatars, hero standard |
| Onboarding `/onboarding` | frontend-rebuild | ⚠️ Needs visual skin | |
| Calculator `/calculator` | frontend-rebuild | ⚠️ Needs visual skin | |
| Resources `/resources` | frontend-rebuild | ⚠️ Needs visual skin | |
| Blog list `/blog` | frontend-rebuild | ⚠️ Needs visual skin | |
| Blog detail `/blog/[slug]` | frontend-rebuild | ⚠️ Needs visual skin | |
| FAQs `/faqs` | frontend-rebuild | ⚠️ Needs visual skin | |
| Media `/media` | frontend-rebuild | ⚠️ Needs visual skin | |
| Join `/join` | frontend-rebuild | ⚠️ Needs visual skin | |
| Partner Tools `/partner-tools` | frontend-rebuild | ⚠️ Needs visual skin | |
| Sign Up `/signup` | frontend-rebuild | ⚠️ Needs visual skin | |
| Start `/start` | frontend-rebuild | ⚠️ Needs visual skin | |
| Onboarding Setup `/onboarding/setup` | frontend-rebuild | ⚠️ Needs visual skin | |
| Trust (merged → products) | — | ✅ Done | Content moved to /products |

---

## 12. Tech Constraints

- **Next.js 16** — read `node_modules/next/dist/docs/` before using any new API. Breaking changes exist vs. training data.
- **Tailwind v4** — uses `@theme` directive in `globals.css`. No `tailwind.config.js` for theme tokens.
- **No dark mode** — light-only site.
- **Images** — use `<img>` with `{/* eslint-disable-next-line @next/next/no-img-element */}` for `/public` assets. Use `next/image` for external/optimized images.
- **Active branch** — `visual-skin-upgrade`. Push here, merge to `main` when page group is done.
- **Fonts** — loaded via `next/font` in `layout.tsx`, exposed as CSS vars. Do not load fonts elsewhere.
- **Supabase** — use `createClient()` from `@/lib/supabase/client`. Never expose service key to frontend.
