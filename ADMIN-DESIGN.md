# ADMIN-DESIGN.md — AutopilotROI Backend Design System

> **Scope:** `src/app/admin/`, `src/app/dashboard/`, `src/app/(auth)/`, `src/components/admin/`
> **This is the ONLY design reference for all backend pages.**
> Do not consult `DESIGN.md` or `frontend-design.md` for backend work.

---

## 1. Philosophy

The backend is a **professional operations tool**, not a marketing surface.
The design goal is **clarity, speed, and consistency** — not memorability or boldness.
Every page should feel like it belongs to the same app.

**Golden rule:** When in doubt, make it simpler and more consistent, not more creative.

---

## 2. Technology Stack (Backend Only)

| Layer | Choice | Reason |
|-------|--------|--------|
| Stylesheet | `src/app/admin/admin.css` only | No Tailwind utilities, no shadcn tokens |
| Components | `src/components/admin/` | No shadcn `<Sidebar>`, `<Card>`, etc. |
| Icons | `lucide-react` | Already installed, consistent style |
| Font | `Inter` | Already loaded, no Google Fonts call needed |
| Sidebar | Hand-coded HTML + CSS | No shadcn `SidebarProvider` complexity |

> [!CAUTION]
> Do NOT import from `@/components/ui/sidebar`, `@/components/ui/card`, or any shadcn
> primitives in backend pages. Use `@/components/admin` exclusively.

---

## 3. Color Palette

| Role | Value | Usage |
|------|-------|-------|
| **Sidebar bg** | `#0f172a` | Left nav rail |
| **Sidebar text** | `#94a3b8` | Inactive nav links |
| **Sidebar active text** | `#ffffff` | Active nav link |
| **Sidebar active bg** | `rgba(255,255,255,0.10)` | Active nav item |
| **Sidebar active accent** | `#1b61c9` (left border 3px) | Active indicator |
| **Topbar bg** | `#ffffff` | Top header bar |
| **Topbar border** | `#e2e8f0` | Bottom border of topbar |
| **Page bg** | `#f8fafc` | Main content area background |
| **Card bg** | `#ffffff` | All cards and panels |
| **Card border** | `#e2e8f0` | 1px card border |
| **Primary action** | `#1b61c9` | Buttons, links, focus rings |
| **Primary hover** | `#1550aa` | Button hover state |
| **Primary text** | `#0f172a` | All headings |
| **Body text** | `#334155` | All body copy |
| **Muted text** | `#94a3b8` | Labels, hints, secondary |
| **Success** | `#16a34a` / bg `#f0fdf4` | Status badges |
| **Warning** | `#ca8a04` / bg `#fefce8` | Status badges |
| **Error** | `#dc2626` / bg `#fef2f2` | Error states, danger buttons |
| **Purple** | `#7c3aed` / bg `#f5f3ff` | Premium/AI features |

---

## 4. Typography

**Font family:** `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

| Role | Size | Weight | Color |
|------|------|--------|-------|
| Page title (H1) | `1.5rem` (24px) | `700` | `#0f172a` |
| Section heading (H2) | `1.125rem` (18px) | `600` | `#0f172a` |
| Card title | `0.9375rem` (15px) | `600` | `#0f172a` |
| Body / table cell | `0.875rem` (14px) | `400` | `#334155` |
| Label / hint | `0.8125rem` (13px) | `500` | `#94a3b8` |
| Stat value | `1.75rem` (28px) | `700` | `#0f172a` |
| Nav link | `0.875rem` (14px) | `500` | `#94a3b8` |
| Table header | `0.75rem` (12px) | `600` uppercase | `#94a3b8` |
| Badge | `0.6875rem` (11px) | `600` | varies |

---

## 5. Layout

### Sidebar
- **Width:** 240px expanded / 64px collapsed
- **Position:** Fixed, full height left rail
- **Logo area:** 56px tall, brand mark + "AutopilotROI" text
- **Nav section label:** 11px uppercase, `#64748b`, `letter-spacing: 0.08em`
- **Nav item:** 36px tall, 8px left/right padding, 6px border-radius
- **Active indicator:** 3px left border in `#1b61c9`, bg `rgba(255,255,255,0.10)`
- **Footer:** User avatar + name + email, dropdown menu

### Topbar
- **Height:** 56px
- **Background:** `#ffffff`
- **Border bottom:** `1px solid #e2e8f0`
- **Contents left:** Collapse toggle button + page breadcrumb
- **Contents right:** Search shortcut + role badge

### Content Area
- **Background:** `#f8fafc`
- **Padding:** `24px` desktop / `16px` mobile
- **Max-width:** None (full width inside sidebar)

### Page Layout Pattern
```
<page-header>        ← Title + subtitle + action buttons
<stat-grid>          ← 2–4 stat cards (if applicable)
<main-card>          ← Primary table, list, or form
```

---

## 6. Components

### Cards
```css
background: #ffffff;
border: 1px solid #e2e8f0;
border-radius: 12px;
padding: 20px;
box-shadow: 0 1px 3px rgba(0,0,0,0.04);
```

### Stat Cards
- Icon circle: 40px, `border-radius: 10px`, colored bg at 10% opacity
- Label: 11px uppercase muted
- Value: 28px bold `#0f172a`
- Delta: 12px, green if positive, red if negative

### Buttons
```css
/* Primary */
background: #1b61c9; color: #fff;
padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;
/* Ghost */
background: #fff; color: #334155; border: 1px solid #e2e8f0;
/* Danger */
background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
```

### Inputs
```css
border: 1px solid #e2e8f0; border-radius: 8px;
padding: 8px 12px; font-size: 14px; color: #0f172a;
focus: border-color #1b61c9; box-shadow: 0 0 0 3px rgba(27,97,201,0.12);
```

### Tables
- Header row: `#f8fafc` bg, 12px uppercase, `#94a3b8`
- Data rows: white, 14px, `#334155`
- Row hover: `#f8fafc`
- Border: `1px solid #e2e8f0` wrapping the whole table

### Status Badges (Pills)
- `border-radius: 999px`; `padding: 2px 8px`; `11px font`, `600 weight`
- Green: bg `#f0fdf4`, text `#16a34a`
- Amber: bg `#fefce8`, text `#ca8a04`
- Red: bg `#fef2f2`, text `#dc2626`
- Blue: bg `rgba(27,97,201,0.08)`, text `#1b61c9`
- Purple: bg `#f5f3ff`, text `#7c3aed`
- Gray: bg `#f1f5f9`, text `#64748b`

---

## 7. CSS Class Naming Convention

All backend CSS classes use the `.adm-` prefix to prevent collisions with frontend classes.

| Class | Purpose |
|-------|---------|
| `.adm-sidebar` | Sidebar rail |
| `.adm-nav-link` | Sidebar nav item |
| `.adm-nav-link--active` | Active nav item |
| `.adm-topbar` | Top header |
| `.adm-content` | Main scrollable area |
| `.adm-page` | Page wrapper inside content |
| `.adm-card` | Standard card |
| `.adm-card--stat` | Stat card variant |
| `.adm-card--flush` | Card with no padding |
| `.adm-btn` | Button base |
| `.adm-btn--primary` | Blue primary button |
| `.adm-btn--ghost` | Outline ghost button |
| `.adm-btn--danger` | Red danger button |
| `.adm-btn--sm` | Small size modifier |
| `.adm-input` | Text input |
| `.adm-select` | Select dropdown |
| `.adm-textarea` | Textarea |
| `.adm-table-wrap` | Table outer wrapper |
| `.adm-table` | Table element |
| `.adm-pill` | Status badge |
| `.adm-pill--green` | Success pill |
| `.adm-pill--amber` | Warning pill |
| `.adm-pill--red` | Error pill |
| `.adm-pill--blue` | Info pill |
| `.adm-pill--purple` | Premium pill |
| `.adm-filter` | Filter tab button |
| `.adm-filter--active` | Active filter tab |
| `.adm-label` | Form label |
| `.adm-help` | Form hint text |
| `.adm-empty` | Empty state container |
| `.adm-divider` | Horizontal rule |
| `.adm-grid-2` | 2-column card grid |
| `.adm-grid-3` | 3-column card grid |
| `.adm-grid-4` | 4-column stat grid |

---

## 8. Do's and Don'ts

### ✅ Do
- Use `.adm-*` CSS classes exclusively in backend pages
- Import components only from `@/components/admin`
- Keep the sidebar nav sorted as: primary tools → secondary tools → settings
- Use Inter at the weights specified in the type scale
- Keep stat cards to 2–4 per page
- Show real data counts in filter tabs when available
- Use color-coded pills for all status fields

### ❌ Don't
- Don't import `@/components/ui/sidebar`, `@/components/ui/card`, or any other shadcn component
- Don't use Tailwind utility classes (`bg-primary`, `text-foreground`, etc.)
- Don't use dark mode or dark backgrounds inside the content area
- Don't use animations or transitions longer than 200ms
- Don't use gradients anywhere except the sidebar bg (which is a subtle dark-to-dark gradient)
- Don't import from `@/components/backend` (deprecated — being deleted)
- Don't reference `DESIGN.md` for backend work
