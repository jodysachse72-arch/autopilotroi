# AI-CONFLICT-CHECK.md — Read This Before Every Session

> **For the AI:** At the start of every session on this repo, run through this
> checklist BEFORE writing any code. If any item conflicts with what the user
> is asking, say so explicitly.

---

## Document Map (What Each File Controls)

| File | Controls | Applies To |
|------|---------|------------|
| `DESIGN.md` | Marketing frontend colors, fonts, components | `src/app/page.tsx`, sections, navbar, footer, public pages |
| `ADMIN-DESIGN.md` | Backend colors, fonts, components, CSS classes | `src/app/admin/`, `src/app/dashboard/`, `src/app/(auth)/`, `src/components/admin/` |
| `frontend-design.md` | Aesthetic direction skill (creative latitude) | Marketing frontend ONLY — has a hard backend exception |
| `DOCS.md` | Technical architecture, DB schema, env vars | Reference only |
| `AGENTS.md` | Next.js version rules | All code |

---

## Conflict Detection Checklist

Before starting ANY task, ask:

### 1. Which area of the app is this request about?
- **Marketing/public pages** → use `DESIGN.md`, follow `frontend-design.md` skill
- **Admin / Dashboard / Auth** → use `ADMIN-DESIGN.md` ONLY, ignore `frontend-design.md`

### 2. Does any open doc conflict with what the user just asked?
Common conflicts to watch for:
- User asks to "make it creative/bold" on a backend page → `ADMIN-DESIGN.md` says NO. Tell the user.
- User asks to "match the frontend style" on an admin page → These are intentionally different. Tell the user.
- `DESIGN.md` specifies a font/color that differs from what's in `globals.css` → Codebase wins, flag the doc drift.

### 3. Is there a doc that explicitly prohibits what I'm about to do?
Examples:
- `ADMIN-DESIGN.md` Section 8 "Don'ts" — check before adding shadcn imports to backend pages
- `frontend-design.md` backend exception block — check before applying creative aesthetics to admin
- `AGENTS.md` — always read the Next.js docs note before writing Next.js routing code

---

## How to Flag a Conflict to the User

If a conflict is detected, say this at the start of your response:

> ⚠️ **Doc Conflict Detected**
> I'm about to work on `[area]`. I noticed `[doc name]` says `[X]` but your request
> implies `[Y]`. Before I start: should I follow the doc, follow your request,
> or update the doc to reflect the new direction?

---

## Frequently Drifted Specs (Known Historical Issues)

| Issue | Correct Answer |
|-------|---------------|
| Font for backend pages | `Inter` — NOT Instrument Sans, NOT Plus Jakarta Sans |
| Font for marketing pages | `Plus Jakarta Sans` (display) + `Inter` (body) |
| shadcn Sidebar in admin | ❌ Do NOT use — replaced with hand-coded HTML sidebar |
| shadcn `<Card>` in admin | ❌ Do NOT use — use `.adm-card` CSS class |
| Tailwind utilities in admin | ❌ Do NOT use — all styling from `admin.css` |
| Backend component import path | `@/components/admin` — NOT `@/components/backend` (deleted) |
| Admin CSS file location | `src/app/admin/admin.css` — imported in `admin/layout.tsx` only |

---

## Branch Guide

| Branch | Purpose |
|--------|---------|
| `main` | Production — marketing frontend is stable here |
| `backend-rebuild` | Active development — full backend clean-slate rebuild |
| `frontend-rebuild` | Previous frontend work |
| `visual-skin-upgrade` | Previous visual upgrade work |

> When the user mentions "the backend" or "admin" or "dashboard", always
> confirm you are on the `backend-rebuild` branch before making changes.
