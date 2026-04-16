# DESIGN.md — AutopilotROI Design System

> **Color palette**: Airtable — White canvas, deep navy text, Airtable Blue primary, multi-color semantic accents  
> **Structure & layout**: ThriveDesk — Friendly SaaS, clean whitespace, Instrument Sans, rounded product UI, marketing-forward  
> **Product**: AutopilotROI — B2B SaaS ROI automation platform for marketers and growth teams

---

## 1. Visual Theme & Atmosphere

AutopilotROI uses a **bright, structured SaaS aesthetic** — a white canvas with deep navy text and Airtable Blue as the primary interactive color. The design is warm and approachable (ThriveDesk influence) rather than cold and technical. Instrument Sans provides the humanist geometric personality. Cards and components feel friendly and well-spaced, not dense or overwrought. Product UI screenshots appear directly in hero sections, grounding the marketing narrative in real software.

**Key Characteristics:**
- White (`#ffffff`) primary surface, off-white (`#f8fafc`) subtle surfaces
- Deep Navy (`#181d26`) primary text — exactly Airtable's text color
- Airtable Blue (`#1b61c9`) for all primary CTAs, links, and interactive states
- Instrument Sans for all text (warm, geometric, ThriveDesk-style approachability)
- Positive letter-spacing throughout (0.08px–0.28px, from Airtable)
- 12px radius buttons, 16px–20px for cards (ThriveDesk's rounder feel)
- Blue-tinted multi-layer shadows from Airtable
- Generous whitespace and section breathing room from ThriveDesk

---

## 2. Color Palette & Roles

### Primary (Airtable)
| Token | Value | Role |
|-------|-------|------|
| `--color-navy` | `#181d26` | Primary text, headings |
| `--color-blue` | `#1b61c9` | CTA buttons, links, focus rings |
| `--color-blue-dark` | `#254fad` | Hover state, accent variant |
| `--color-white` | `#ffffff` | Primary surface, card backgrounds |
| `--color-surface` | `#f8fafc` | Subtle section backgrounds |
| `--color-spotlight` | `rgba(249,252,255,0.97)` | Overlay / highlighted button text |

### Semantic Accents (Airtable multi-color identity)
| Token | Value | Role |
|-------|-------|------|
| `--color-success` | `#006400` | Success states, positive ROI indicators |
| `--color-success-bg` | `#edf7ed` | Success badge backgrounds |
| `--color-warning` | `#c4621f` | Warning states |
| `--color-warning-bg` | `#fef3e8` | Warning badge backgrounds |
| `--color-error` | `#cc0000` | Error states |
| `--color-error-bg` | `#fdecea` | Error badge backgrounds |
| `--color-purple` | `#6e3fff` | Premium / AI feature callouts |
| `--color-purple-bg` | `#f0ebff` | Purple badge backgrounds |
| `--color-teal` | `#007a8a` | Secondary data visualization accent |

### Neutrals (Airtable borders + ThriveDesk warmth)
| Token | Value | Role |
|-------|-------|------|
| `--color-text-weak` | `rgba(4,14,32,0.69)` | Secondary text, captions |
| `--color-text-muted` | `#6b7280` | Placeholder, tertiary text |
| `--color-border` | `#e0e2e6` | Card borders, dividers |
| `--color-border-light` | `#f0f1f3` | Subtle separators |
| `--color-navy-light` | `#333333` | Secondary headings |

### Shadows (Airtable blue-tinted system)
```css
--shadow-card: rgba(0,0,0,0.32) 0px 0px 1px,
               rgba(0,0,0,0.08) 0px 0px 2px,
               rgba(45,127,249,0.28) 0px 1px 3px,
               rgba(0,0,0,0.06) 0px 0px 0px 0.5px inset;

--shadow-soft: rgba(15,48,106,0.05) 0px 0px 20px;

--shadow-hover: rgba(0,0,0,0.12) 0px 4px 16px,
                rgba(45,127,249,0.18) 0px 2px 8px;
```

---

## 3. Typography Rules

### Font
- **Primary**: `'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Load from Google Fonts: `https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap`
- No separate display font — Instrument Sans handles all weights (ThriveDesk approach)

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Hero Headline | 48–56px | 700 | 1.10 | -0.02em |
| Section Heading | 36–40px | 700 | 1.15 | -0.01em |
| Sub-heading | 28–32px | 600 | 1.20 | normal |
| Card Title | 20–24px | 600 | 1.25 | 0.08px |
| Feature Label | 18px | 500 | 1.35 | 0.10px |
| Body | 16–18px | 400 | 1.55 | 0.08px |
| Button | 15–16px | 600 | 1.25 | 0.08px |
| Caption / Badge | 12–14px | 500 | 1.30 | 0.28px |
| Nav Link | 14–15px | 500 | 1.25 | 0.07px |

> **Airtable rule**: Always apply positive letter-spacing (0.07px–0.28px) on body, captions, and buttons.  
> **ThriveDesk rule**: Use tight negative tracking on large display text only (-0.01em to -0.02em).

---

## 4. Component Stylings

### Buttons

**Primary (Airtable Blue)**
```css
background: #1b61c9;
color: #ffffff;
padding: 10px 20px;
border-radius: 12px;
font-weight: 600;
font-size: 15px;
letter-spacing: 0.08px;
transition: background 150ms ease, box-shadow 150ms ease;

/* Hover */
background: #254fad;
box-shadow: rgba(45,127,249,0.28) 0px 4px 12px;
```

**Secondary / Outline**
```css
background: #ffffff;
color: #181d26;
border: 1.5px solid #e0e2e6;
padding: 10px 20px;
border-radius: 12px;
font-weight: 600;

/* Hover */
border-color: #1b61c9;
color: #1b61c9;
```

**Ghost / Text Button**
```css
background: transparent;
color: #1b61c9;
padding: 8px 12px;
border-radius: 8px;
font-weight: 500;

/* Hover */
background: rgba(27,97,201,0.06);
```

### Cards
```css
background: #ffffff;
border: 1px solid #e0e2e6;
border-radius: 16px;
padding: 24px;
box-shadow: var(--shadow-card);
transition: box-shadow 200ms ease, transform 200ms ease;

/* Hover */
box-shadow: var(--shadow-hover);
transform: translateY(-2px);
```

### Badges / Chips
```css
border-radius: 6px;
padding: 3px 10px;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.28px;
/* Use semantic color pairs: --color-success + --color-success-bg, etc. */
```

### Inputs
```css
background: #ffffff;
border: 1.5px solid #e0e2e6;
border-radius: 10px;
padding: 10px 14px;
font-size: 15px;
color: #181d26;
transition: border-color 150ms ease, box-shadow 150ms ease;

/* Focus */
border-color: #1b61c9;
box-shadow: 0 0 0 3px rgba(27,97,201,0.12);
outline: none;
```

### Navigation (ThriveDesk style)
```css
/* Top nav: white bg, border-bottom: 1px solid #e0e2e6, sticky */
/* Logo left, links center, CTAs right */
/* Nav links: 14px, weight 500, color rgba(4,14,32,0.69), hover: #181d26 */
/* Primary CTA in nav: Airtable Blue button */
```

### Hero Section (ThriveDesk layout)
- Full-width, white background
- Headline left-aligned or centered, max-width 720px
- Sub-headline in `--color-text-weak`
- 2 CTAs: Primary (Blue) + Secondary (Outline)
- Social proof line below CTAs (e.g., "7-day free trial · No credit card")
- Product UI screenshot / mockup below, rounded (24px radius), with `--shadow-hover`

### Feature Sections
- Alternating layout: image left / text right, then flip (ThriveDesk pattern)
- Section backgrounds alternate: white ↔ `#f8fafc`
- Section padding: 80px–120px vertical (generous ThriveDesk whitespace)
- Feature labels use colored badges (`--color-purple-bg` + `--color-purple` for AI features)

---

## 5. Layout & Spacing

### Spacing Scale (8px base)
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 120px
```

### Border Radius
| Use | Value |
|-----|-------|
| Sharp (badge, tag) | 6px |
| Input, small card | 10px |
| Button | 12px |
| Card, panel | 16px |
| Large card, hero mockup | 20–24px |
| Avatar, icon pill | 50% |

### Max Widths
```
Content: 1200px
Text column: 680px
Card grid: 1100px
```

### Grid
- Marketing pages: 12-column, 24px gutter
- Feature grid: 2–3 columns on desktop, 1 on mobile
- Card grid: `repeat(auto-fill, minmax(300px, 1fr))`

---

## 6. Iconography & Illustration
- Prefer outline-style icons (Lucide, Heroicons) at 20–24px
- Use `#1b61c9` tint for feature icons against `rgba(27,97,201,0.08)` circle backgrounds
- Use semantic colors for status icons (success green, warning amber, error red, purple for AI)
- Illustration style: flat, colorful, Airtable-adjacent (geometric shapes, multi-color accents)

---

## 7. Motion & Interaction
- All transitions: `150ms–200ms ease`
- Card hover: `translateY(-2px)` + enhanced shadow
- Button hover: background shift + blue shadow glow
- Fade-in on scroll: `opacity 0→1, translateY(12px→0)` at `animation-delay` stagger
- No jarring or complex animations — subtle and purposeful (ThriveDesk restraint)

---

## 8. Do's and Don'ts

### ✅ Do
- Use Airtable Blue (`#1b61c9`) for ALL primary CTAs
- Use Deep Navy (`#181d26`) for all headings and key text
- Apply positive letter-spacing (0.07px–0.28px) to body, captions, buttons
- Use multi-color semantic badges for feature callouts (purple for AI, teal for analytics)
- Give sections generous vertical breathing room (80px+)
- Show real product UI in hero and feature sections
- Use white cards on white pages with blue-tinted shadow for depth

### ❌ Don't
- Don't use dark backgrounds or dark mode (this is a light-only system)
- Don't use heavy box shadows (keep it blue-tinted and soft)
- Don't use fonts other than Instrument Sans
- Don't compress spacing — this design breathes
- Don't use purple-on-white gradients (generic AI aesthetic)
- Don't skip the border on cards (`#e0e2e6` always present)

---

## 9. CSS Variables (Root)

```css
:root {
  /* Colors */
  --color-navy: #181d26;
  --color-blue: #1b61c9;
  --color-blue-dark: #254fad;
  --color-blue-hover-bg: rgba(27, 97, 201, 0.06);
  --color-white: #ffffff;
  --color-surface: #f8fafc;
  --color-text-weak: rgba(4, 14, 32, 0.69);
  --color-text-muted: #6b7280;
  --color-border: #e0e2e6;
  --color-border-light: #f0f1f3;

  /* Semantic */
  --color-success: #006400;
  --color-success-bg: #edf7ed;
  --color-warning: #c4621f;
  --color-warning-bg: #fef3e8;
  --color-error: #cc0000;
  --color-error-bg: #fdecea;
  --color-purple: #6e3fff;
  --color-purple-bg: #f0ebff;
  --color-teal: #007a8a;
  --color-teal-bg: #e6f4f6;

  /* Typography */
  --font-sans: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Shadows */
  --shadow-card: rgba(0,0,0,0.32) 0px 0px 1px,
                 rgba(0,0,0,0.08) 0px 0px 2px,
                 rgba(45,127,249,0.28) 0px 1px 3px,
                 rgba(0,0,0,0.06) 0px 0px 0px 0.5px inset;
  --shadow-soft: rgba(15,48,106,0.05) 0px 0px 20px;
  --shadow-hover: rgba(0,0,0,0.12) 0px 4px 16px,
                  rgba(45,127,249,0.18) 0px 2px 8px;

  /* Radius */
  --radius-sm: 6px;
  --radius-input: 10px;
  --radius-btn: 12px;
  --radius-card: 16px;
  --radius-lg: 24px;

  /* Spacing */
  --space-section: 96px;
  --space-section-sm: 64px;
}
```

---

## 10. Agent Prompt Guide

When generating any UI for AutopilotROI, use:

- **Primary CTA color**: `#1b61c9` (Airtable Blue)
- **Text**: `#181d26` (Airtable Deep Navy)
- **Background**: `#ffffff` white, sections alternate with `#f8fafc`
- **Font**: `'Instrument Sans'` — load from Google Fonts
- **Border**: `1px solid #e0e2e6` on all cards and inputs
- **Cards**: 16px radius, blue-tinted shadow, hover lifts 2px
- **Buttons**: 12px radius, 600 weight, Airtable Blue primary
- **Letter spacing**: Always apply 0.08px–0.28px on body/captions/buttons
- **Spacing**: Generous — 80–120px section padding
- **Layout inspiration**: ThriveDesk (https://thrivedesk.com) — hero with product mockup, alternating feature sections, clean nav
- **Color accent inspiration**: Airtable (https://airtable.com) — blue primary, multi-color semantic badges
