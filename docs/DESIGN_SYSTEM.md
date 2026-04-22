# AutopilotROI — Design System Standard
> **Version 2.0** — Established April 2026. All new pages and redesigns must follow this spec.

---

## 1. Visual Philosophy

**"Institutional AI"** — clean, confident, premium. Not generic, not startup-y, not crypto-bro.

### ✅ Do
- Use depth through subtle shadows and layered backgrounds, not gradients on every element
- Use white space generously — sections breathe
- Use real product imagery over illustrations or AI icons
- Use CSS variables for all colors, spacing, and radii — never hardcode raw hex values in components unless deriving from a variable
- Use `icon-circle-accent` with per-feature color accents to differentiate cards
- Use gradient monogram avatars for all person/testimonial references until real photos are available

### ❌ Don't
- No circuit-board SVG overlays or dot-grid patterns in hero backgrounds
- No multiple stacked radial gradient orbs (max 2 subtle glows in a hero)
- No generic emoji as primary visual anchors in CTAs
- No raw Tailwind classes mixed with inline styles — pick one approach per component
- No hardcoded font sizes below `0.875rem` for user-facing text
- No descriptions or body text smaller than `var(--text-body)` (15–17px fluid)
- No links to `aurum.foundation` in the frontend

---

## 2. Color System

All colors are locked. Do not introduce new hues. Use existing tokens only.

```css
/* Brand */
--color-navy:         #181d26   /* headings, dark text */
--color-blue:         #1b61c9   /* primary brand blue, CTAs */
--color-blue-dark:    #1550aa   /* hover state for blue */
--color-blue-light:   #2d7ff9   /* gradient start on buttons */
--color-blue-pale:    #e8f0fd   /* blue badge backgrounds */

/* Surfaces */
--color-white:        #ffffff   /* cards */
--color-surface:      #f8fafc   /* section-box-surface */
--color-page:         #eef0f4   /* page-bg, .sections-stack wrapper */

/* Text */
--color-text:         #181d26
--color-text-weak:    rgba(24,29,38,0.65)
--color-text-muted:   rgba(24,29,38,0.42)

/* Borders */
--color-border:       #e0e2e6
--color-border-light: #eef0f4

/* Semantic accent colors (for icon-circle-accent only) */
--color-blue:    #1b61c9   EX-AI Bot, Onboarding
--color-purple:  #7c3aed   Visa Card, Zeus Bot
--color-teal:    #0891b2   NeoBank, Web3
--color-success: #059669   Exchange, growth
--color-warning: #d97706   Partner Program, amber
```

### Hero backgrounds — Approved approaches
```css
/* Solid dark — main hero */
background: linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%);

/* Blue brand — section accent */
background: #1b61c9;

/* Navy — dark CTAs */
background: #181d26;

/* Light surface — secondary sections */
background: #f4f6fb;
```

---

## 3. Typography

### Fonts
- **Display (headings):** `Plus Jakarta Sans` — `var(--font-display)`
- **Body:** `Inter` — `var(--font-body)`

### Type Scale
| Token | Size | Use |
|---|---|---|
| `var(--text-hero)` | 48–88px fluid | Hero H1 only |
| `var(--text-display)` | 36–64px fluid | Page titles |
| `var(--text-heading)` | 28–48px fluid | Section headings (H2) |
| `var(--text-subheading)` | 20–30px fluid | Card titles, H3 |
| `var(--text-body-lg)` | 17–20px fluid | Lead paragraphs, descriptions |
| `var(--text-body)` | 15–17px fluid | **Minimum for all body text** |
| `var(--text-caption)` | 12–14px fluid | Labels, badges, metadata only |

> **Rule:** Never use text smaller than `var(--text-caption)` for anything the user needs to read. Video titles minimum `var(--text-body)`. Video descriptions minimum `var(--text-body)`.

### CSS Typography Classes
```css
.text-hero        /* H1 hero */
.text-display     /* H1 page title */
.text-heading     /* H2 section */
.text-subheading  /* H3 card */
.text-body-lg     /* lead text */
.text-label       /* badge/label caps */
```

---

## 4. Layout System

### Page Structure
Every page follows this exact shell:
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
| `.section-box-blue` | Blue gradient | Brand accent sections |
| `.section-box-navy` | `#181d26` | Dark CTAs, footers |

> Always use inline `style={{ background: '#1b61c9' }}` for solid blue hero sections (not `.section-box-blue` gradient).

### Section Padding
```css
.section-padding     /* 7rem top/bottom — standard */
.section-padding-lg  /* 9rem top/bottom — hero sections */
```

### Content Container
```css
.container-xl  /* max-width: 1280px, centered, fluid horizontal padding */
```

### Sections Stack
```css
.sections-stack  /* 1.25rem gap between sections, max 1440px centered */
```

---

## 5. Component Library

### Cards
```css
.card  /* white bg, radius-card (16px), shadow-card, border */
```
- Always use `.shimmer-hover` on interactive cards
- Hover: use JS `onMouseEnter/Leave` to apply `--shadow-card-hover` and `translateY(-2px)`

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
.btn               /* base — always pair with a variant */
.btn-primary       /* filled blue — primary actions */
.btn-primary-lg    /* larger primary */
.btn-outline       /* outlined — secondary actions */
.btn-ghost         /* text-only — tertiary */
```

Always use `.shimmer-hover` on primary buttons.

```tsx
<Link href="/signup" className="btn btn-primary shimmer-hover">
  Get Started →
</Link>
```

### Badges
```css
.badge           /* base badge */
.badge-blue      /* blue variant */
.badge-green     /* green variant */
```

For section eyebrow labels:
```tsx
<span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
  Section Label
</span>
```

### Icon Containers

**Standard (single color):**
```css
.icon-circle       /* 3.5rem circle, blue */
.icon-circle-lg    /* 4rem rounded square, blue */
```

**Per-feature accent (use this on feature cards):**
```css
.icon-circle-accent  /* reads CSS variables for color */
```
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
  <YourIcon />
</div>
```

**Accent color presets:**
| Feature | `--icon-color` | `--icon-bg` |
|---|---|---|
| EX-AI Bot / Onboarding | `#1b61c9` | `rgba(27,97,201,0.10)` |
| Visa Card / Zeus | `#7c3aed` | `rgba(124,58,237,0.10)` |
| NeoBank / Web3 | `#0891b2` | `rgba(8,145,178,0.10)` |
| Exchange / Growth | `#059669` | `rgba(5,150,105,0.10)` |
| Partner / Amber | `#d97706` | `rgba(217,119,6,0.10)` |

### Testimonial / Person Avatars

Always use `.avatar-monogram` — never flat letter circles:
```tsx
<div
  className="avatar-monogram"
  style={{
    '--avatar-from': '#1b61c9',
    '--avatar-to':   '#0c1f6e',
  } as React.CSSProperties}
>
  M
</div>
```

**Avatar color pairs:**
| Person slot | `--avatar-from` | `--avatar-to` |
|---|---|---|
| 1st | `#1b61c9` | `#0c1f6e` |
| 2nd | `#7c3aed` | `#4c1d95` |
| 3rd | `#0891b2` | `#164e63` |
| 4th | `#059669` | `#064e3b` |

---

## 6. Hero Section Standard

### Structure
```tsx
<section style={{
  background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 35%, #0e2880 65%, #091947 100%)',
  borderRadius: 'var(--radius-section)',
  overflow: 'hidden',
  position: 'relative',
}}>
  {/* Background atmosphere */}
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {/* Right glow */}
    <div style={{
      position: 'absolute', right: '-5%', top: '-10%',
      width: '60vmax', height: '60vmax', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(27,97,201,0.42) 0%, rgba(27,97,201,0.08) 45%, transparent 65%)',
    }} />
    {/* Left ambient (optional) */}
    <div style={{
      position: 'absolute', left: '-10%', bottom: '-15%',
      width: '50vmax', height: '50vmax', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 55%)',
    }} />
    {/* Data ribbon lines */}
    <div className="hero-ribbon-line" style={{ top: '28%', animationDelay: '0s' }} />
    <div className="hero-ribbon-line" style={{ top: '52%', animationDelay: '2s' }} />
    <div className="hero-ribbon-line" style={{ top: '74%', animationDelay: '4s' }} />
  </div>

  {/* Content */}
  <div className="container-xl section-padding-lg" style={{ position: 'relative', zIndex: 1 }}>
    <span className="badge badge-blue reveal" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
      Section Eyebrow Label
    </span>
    <h1 className="text-hero reveal reveal-delay-1" style={{ color: '#ffffff', maxWidth: '16ch' }}>
      Your hero headline here
    </h1>
    <p className="text-body-lg reveal reveal-delay-2" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '42rem', marginTop: '1.25rem' }}>
      Supporting description text here.
    </p>
    <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginTop: '2rem' }}>
      <Link href="/signup" className="btn btn-primary-lg shimmer-hover">Primary CTA →</Link>
      <Link href="/learn" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Secondary CTA</Link>
    </div>
  </div>
</section>
```

### Rules
- Maximum 2 glow orbs in a hero background
- Always add data-ribbon lines (3 is standard)
- Badge → H1 → Description → CTAs — this order always
- H1 max-width: `16ch` to force tight line breaks
- Description max-width: `42rem`

---

## 7. Section Content Standard

### Section with heading + grid
```tsx
<section className="section-box">
  <div className="container-xl section-padding">

    {/* Section heading block */}
    <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 4rem' }}>
      <span className="badge badge-blue reveal" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
        Eyebrow
      </span>
      <h2 className="text-display reveal reveal-delay-1" style={{ color: '#181d26', marginBottom: '1rem' }}>
        Section heading
      </h2>
      <p className="text-body-lg reveal reveal-delay-2" style={{ color: 'var(--color-text-weak)' }}>
        Description sentence.
      </p>
    </div>

    {/* Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
      gap: '1.25rem',
    }}>
      {/* cards */}
    </div>

  </div>
</section>
```

### Two-column split (text + visual)
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
  gap: '4rem',
  alignItems: 'center',
}}>
  <div>{/* text content */}</div>
  <div>{/* image / dashboard / visual */}</div>
</div>
```

---

## 8. Scroll Reveal Animations

Use the `.reveal` class + delay variants. The `useScrollReveal()` hook must be called in the page component.

```tsx
// In page.tsx
useScrollReveal()

// In JSX
<div className="reveal">...</div>
<div className="reveal reveal-delay-1">...</div>  // 80ms
<div className="reveal reveal-delay-2">...</div>  // 160ms
<div className="reveal reveal-delay-3">...</div>  // 240ms
<div className="reveal reveal-delay-4">...</div>  // 320ms
<div className="reveal reveal-delay-5">...</div>  // 400ms
```

For `framer-motion` sections (products page, etc.) use this variant:
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}
// Usage:
<motion.div variants={fadeUp} initial="hidden" animate="show">
```

---

## 9. Product Screenshot Panels

For any section showing a product dashboard or UI:
```tsx
<div style={{
  background: '#181d26',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04)',
}}>
  {/* Browser chrome bar */}
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0.6rem 1rem',
    display: 'flex', alignItems: 'center', gap: '0.4rem',
  }}>
    {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
      <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
    ))}
    <span style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginLeft: '-1.25rem' }}>
      app.url.here
    </span>
  </div>
  {/* Screenshot */}
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

## 10. Page Audit Checklist

Run this against every page before shipping:

- [ ] Uses `page-bg` → `sections-stack` → `section-box` shell
- [ ] Hero has: badge → H1 (`.text-hero` or `.text-display`) → description → CTAs
- [ ] No text smaller than `var(--text-body)` for readable content
- [ ] Descriptions use `var(--text-body)` or `var(--text-body-lg)` — never `text-xs` or `text-sm` raw Tailwind
- [ ] Feature cards use `.icon-circle-accent` with per-feature color variables
- [ ] Person avatars use `.avatar-monogram` with gradient pairs
- [ ] Interactive cards have `.shimmer-hover` and hover shadow/translate
- [ ] Buttons use `.btn .btn-primary` (not raw inline button styles)
- [ ] All sections use `.container-xl` + `.section-padding` or `.section-padding-lg`
- [ ] Scroll reveal: `.reveal` classes applied to headings and cards
- [ ] No links to `aurum.foundation`
- [ ] No Tailwind utility classes mixed with inline styles in the same element
- [ ] Build passes: `npm run build` exits 0

---

## 11. Pages — Completion Status

| Page | Status | Notes |
|---|---|---|
| `/` (Home) | ✅ Done | Hero, features, testimonials, bot screenshot |
| `/products` | ✅ Done | Product images wired, motion.div bug fixed |
| `/university` | ⚠️ Needs overhaul | Header wonky, text too small, see next task |
| `/evaluate` | ⚠️ Needs review | |
| `/onboarding` | ⚠️ Needs review | |
| `/calculator` | ⚠️ Needs review | |
| `/resources` | ⚠️ Needs review | |
| `/trust` | ⚠️ Needs review | Content moved to /products |
| `/signup` | ⚠️ Needs review | |
| `/partner-tools` | ⚠️ Needs review | |

---

## 12. Tech Constraints (Always)

- **Next.js 16** — read `node_modules/next/dist/docs/` before using any new API
- **Tailwind v4** — `@theme` directive in `globals.css`, NOT `tailwind.config.js`
- **No dark mode** — light only
- **Fonts** — loaded via `next/font` in `layout.tsx`, available as CSS vars
- **Images** — use `<img>` with `eslint-disable @next/next/no-img-element` for public assets; use `next/image` for optimized external images
- **Branch** — always work on `visual-skin-upgrade`, push before merging to `main`
