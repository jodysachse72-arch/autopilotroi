# AutopilotROI — Operational Status

> **This file is the single source of session truth.**
> Update it at the END of every session. Read it at the START of every session.
> Last verified: 2026-05-19 20:39 UTC

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
94931e9  chore: add graphify-out/ and PUCK_PLAN.md to .gitignore
489edf3  fix(puck): resolve all SlotComponent type errors
84b0862  fix: install @puckeditor/core 0.21.2 — was empty, now real
abb9033  feat: puck-editor branch — clean UI + Puck infra transplanted
5be7171  fix(globals.css): restore truncated box-drawing char
```

---

## BUILD STATUS (verified 2026-05-19)
```
npm run build  →  ✅ EXIT 0
  ✓ Compiled in 5.6s
  ✓ TypeScript passed in 7.5s
  ✓ 64 static pages generated
  ⚠ ONE WARNING: "middleware" file deprecated — must rename to "proxy"
```

## TYPESCRIPT STATUS (verified 2026-05-19)
```
npx tsc --noEmit  →  ✅ EXIT 0  (0 errors, 0 warnings)
```

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

### P2 🔴 Puck editor has a race condition (pathResolved fix missing)
- The `useEffect` that fetches page data depends on `[pagePath]`
- `pagePath` initializes to `'/'` before params resolve
- Result: editor may load homepage data when switching to other pages
- Fix is in `src/app/admin/edit/[[...path]]/page.tsx`
- Add `const [pathResolved, setPathResolved] = useState(false)` and gate the fetch effect
- **This IS on the allowed list. This is the first implementation target.**

### P3 🔴 puck_pages Supabase table — existence UNVERIFIED
- The Puck API reads/writes `puck_pages` table
- Table existence against live Supabase has not been confirmed
- If the table doesn't exist, all saves fail silently
- Must verify before testing editor end-to-end

### P4 🔴 /api/puck has no write auth
- POST to /api/puck is publicly accessible, no session check
- Anyone can overwrite any page's content
- Fix belongs on `feature/api-layer`

### P5 🟡 Turnstile site key is empty
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is empty in .env.local
- Bot protection on /signup is silently disabled
- Config-only fix — needs Cloudflare key
- Does NOT affect this sprint

---

## TODAY'S FIRST IMPLEMENTATION TARGET

**Apply the pathResolved race condition fix to the Puck editor**

File: `src/app/admin/edit/[[...path]]/page.tsx`

What to do:
1. Add `const [pathResolved, setPathResolved] = useState(false)`
2. In the params-resolution `useEffect`, call `setPathResolved(true)` after `setPagePath()`
3. In the data-fetch `useEffect`, add guard: `if (!pagePath || !pathResolved) return`
4. Dependency array becomes `[pagePath, pathResolved]`

After the fix: run `npx tsc --noEmit` and `npm run build`. Both must exit 0.
Then: manually test the editor by switching routes in the dropdown and verifying the correct page data loads.

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
| `feature/puck-editor` | ✅ Clean, has P2 race condition | Puck CMS editor |
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
