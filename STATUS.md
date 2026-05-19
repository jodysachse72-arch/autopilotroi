# AutopilotROI — Operational Status

> **This file is the single source of session truth.**
> Update it at the END of every session. Read it at the START of every session.
> Last verified: 2026-05-19 20:56 UTC

---

## CURRENT BRANCH
```
feature/puck-editor
```
Working tree: **CLEAN** (nothing to commit)
Synced with: `origin/feature/puck-editor` — up to date

---

## LAST 5 COMMITS (verified)
```
3968164  fix(puck): add temporary write protection to /api/puck and /api/puck/seed
85b19ae  chore: update STATUS.md — P3 resolved, commit hash corrected
f073716  docs(puck): add retroactive migration for puck_pages table
3ae0d38  chore: update STATUS.md — P2 resolved, P3 is next target
fdbffe5  fix(puck-editor): apply pathResolved guard — race condition fixed
```

---

## BUILD STATUS (verified 2026-05-19)
```
npm run build  →  ✅ EXIT 0 (post-P4, verified 2026-05-19 20:56 UTC)
  ✓ TypeScript: 0 errors
  ✓ 64 static pages generated
  ⚠ ONE WARNING: "middleware" file deprecated — must rename to "proxy"
```

## TYPESCRIPT STATUS (verified 2026-05-19)
```
npx tsc --noEmit  →  ✅ EXIT 0  (0 errors, 0 warnings)
```

---

## BUILD & TS VERIFIED (2026-05-19 20:43 UTC)
Post-fix verification — both passed after `pathResolved` change.

---

## STASH WARNING
```
stash@{0}: On main: wip: main branch state before puck-editor branch creation
stash@{1}: WIP on main: aa746ba restore admin files
```
> ⚠️ DO NOT POP THESE STASHES. They exist on `main` (contaminated branch).
> Leave them. They are labeled in case forensic review is ever needed.

---

## CURRENT SPRINT
**Sprint: Stabilize `feature/puck-editor` as a functional CMS editing environment**

Sprint goal: Puck editor correctly loads/saves the right page data for each route.
No visual redesign work until sprint is complete.

---

## ACTIVE ROLE FOR NEXT SESSION
**CMS Dev** — working on `feature/puck-editor` only

---

## ALLOWED FILES FOR NEXT SESSION
```
src/app/admin/edit/[[...path]]/page.tsx   ← fix pathResolved race condition
src/app/api/puck/route.ts                 ← add write auth (P5)
src/app/api/puck/seed/route.ts            ← verify/fix seed logic
src/puck.config.tsx                       ← if needed for editor fixes
src/puck/**                               ← Puck component updates only
STATUS.md                                 ← update at end of session
```

---

## FORBIDDEN FILES FOR THIS BRANCH
```
src/app/page.tsx                          ← marketing homepage, not this branch
src/app/calculator/page.tsx              ← marketing, not this branch
src/app/products/page.tsx                ← marketing, not this branch
src/app/faqs/page.tsx                    ← marketing, not this branch
src/app/start/page.tsx                   ← marketing, not this branch
src/app/globals.css                      ← design system, not this branch
src/components/sections/**               ← marketing components
src/components/ui/**                     ← shared marketing UI
src/app/admin/page.tsx                   ← admin UI, belongs to feature/admin-backend
src/app/dashboard/**                     ← partner UI, belongs to feature/partner-dashboard
src/middleware.ts                        ← belongs to feature/api-layer
```

---

## IMMEDIATE BLOCKERS (ordered by priority)

### P1 🔴 middleware.ts must be renamed to proxy.ts
- Every build emits a deprecation warning
- Belongs on: `feature/api-layer` (NOT current branch)
- Do NOT fix on this branch — flag for api-layer sprint

### P2 ✅ RESOLVED — Puck editor race condition (pathResolved fix applied)
- Commit: `fdbffe5`
- `pathResolved` state flag added
- Data-fetch effect now gated on `pathResolved === true`
- Dependency array updated to `[pagePath, pathResolved]`
- TypeScript: 0 errors. Build: exit 0.

### P3 ✅ RESOLVED — puck_pages table verified (2026-05-19)
- Table EXISTS in production Supabase with 6 live rows
- Schema matches API expectations exactly (see gap analysis below)
- RLS: anon read ✅, anon write ❌ (service_role required) ✅
- Gap found: no migration file existed — created `supabase/migrations/20260519_puck_pages.sql`
- Commit: TBD (pending build)

**P3 Schema verified:**
```
table: puck_pages
  id         uuid, PK, auto
  path       text, UNIQUE (upsert conflict target)
  data       jsonb ({ root, content, zones })
  updated_at timestamptz (written by API)
  created_at timestamptz (auto)
```

### P4 ✅ RESOLVED — Temporary write protection added (2026-05-19)
- `POST /api/puck` → requires `x-puck-write-secret` header or returns 401
- `DELETE /api/puck` → same guard
- `POST /api/puck/seed` → same guard
- `GET /api/puck` → untouched, reads remain public
- If `NEXT_PUBLIC_PUCK_WRITE_SECRET` env var is unset → returns 500 (fail closed)
- Editor page updated: all 3 write fetches send the header
- `.env.example` created documenting the var
- Commit: `3968164`
- TypeScript: 0 errors. Build: exit 0.

> ⚠️ **ACTION REQUIRED before testing:** Set a real value for `NEXT_PUBLIC_PUCK_WRITE_SECRET`
> in `.env.local` AND in Vercel environment variables.
> Current `.env.local` value is the placeholder `replace-with-a-secure-random-string`.

### P5 🟡 Turnstile site key is empty
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is empty in .env.local
- Bot protection on /signup is silently disabled
- Config-only fix — needs Cloudflare key
- Does NOT affect this sprint

---

## TODAY'S FIRST IMPLEMENTATION TARGET

**P4 ✅ COMPLETE** — temporary write protection committed as `3968164`.

> ⚠️ **Before testing the editor:** Set `NEXT_PUBLIC_PUCK_WRITE_SECRET` to a real random
> string in `.env.local` (replace the placeholder) and in Vercel dashboard env vars.
> Generate one with: `openssl rand -hex 32`

**Next target: P5 — Set Turnstile key** (config only, no code change)

Or begin the next sprint: `feature/frontend-pages` — homepage hero overhaul.

---

## NOT-NOW LIST
These are real priorities that are explicitly deferred until the sprint is complete:

| Item | Reason Deferred |
|------|----------------|
| Homepage hero redesign | Belongs on `feature/frontend-pages`, different sprint |
| /roadmap visual timeline | `feature/frontend-pages`, different sprint |
| Admin CSS reconciliation (adm-* vs Tailwind) | `feature/admin-backend`, different sprint |
| Auth middleware rename | `feature/api-layer`, different sprint |
| Partner dashboard divergence | `feature/partner-dashboard`, different sprint |
| Delete dead code (PuckRenderer, puck-metadata, content-store, payload-adapter) | Not urgent, no current harm |
| Signup bot protection (Turnstile) | Config task, not a build issue |

---

## BRANCH MAP QUICK REFERENCE

| Branch | Status | Source of Truth For |
|--------|--------|---------------------|
| `feature/frontend-pages` | ✅ Clean, identical to visual-skin-upgrade | Marketing pages |
| `feature/puck-editor` | ✅ Clean, P2+P3 resolved | Puck CMS editor |
| `feature/admin-backend` | ✅ Clean | Admin panel (adm-* CSS) |
| `feature/partner-dashboard` | ⚠️ Identical to admin-backend | Partner portal (not diverged yet) |
| `feature/api-layer` | ✅ Clean, identical to visual-skin-upgrade | API routes, middleware |
| `visual-skin-upgrade` | ✅ Gold UI source | Do not commit to directly |
| `backend-rebuild` | ✅ Gold backend source | Do not commit to directly |
| `main` | 🚫 Contaminated | Do not use |
| `puck-editor` | ⚠️ Ahead of origin by 1 | Superseded by feature/puck-editor |

---

## SESSION STARTUP CHECKLIST
```
□ git branch --show-current      → must be the correct feature branch
□ git status                      → must be clean
□ git log --oneline -3            → confirm you're at expected commit
□ npx tsc --noEmit                → must be 0 errors BEFORE you touch anything
□ Read the ALLOWED FILES list above
□ State your role and domain out loud before writing a single line
```

## SESSION SHUTDOWN CHECKLIST
```
□ git status                      → confirm no uncommitted work
□ git add -A && git commit -m "..."
□ git push origin <branch>
□ npx tsc --noEmit                → must still be 0 errors after your changes
□ npm run build                   → must still exit 0
□ Update STATUS.md with new state
□ Update "Last verified" timestamp above
```
