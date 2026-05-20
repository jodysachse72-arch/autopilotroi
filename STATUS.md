# AutopilotROI — Operational Status

> **This file is the single source of session truth.**
> Update it at the END of every session. Read it at the START of every session.
> Last verified: 2026-05-20 20:38 UTC

---

## CURRENT BRANCH
```
feature/frontend-pages
```
Working tree: **CLEAN** (nothing to commit after commit)
Synced with: `origin/feature/frontend-pages` — up to date (commit pending)
**Preview URL:** https://autopilotroi-5nwuph31k-autopilot-roi.vercel.app
**Production URL:** https://autopilotroi.vercel.app (✅ LIVE)
**Prod Deployment ID:** `dpl_GrWajpPzE6ZriRv6ZzjMGfRV5Wdp`
**Vercel Inspect:** https://vercel.com/autopilot-roi/autopilotroi/GrWajpPzE6ZriRv6ZzjMGfRV5Wdp

---

## LAST 5 COMMITS (verified)
```
2994568  merge: integrate puck-editor CMS infrastructure into frontend-pages
1c37992  feat(hero): improve copy, add ghost CTA, sharpen bullets
43128d7  chore: update STATUS.md — HeroDark Puck sync complete
b876b87  feat(puck): sync HeroDark config with frontend-pages baseline
63324e0  refactor(puck): remove unsafe blocks and constrain dropzones
```

---

## BUILD STATUS (verified 2026-05-19)
```
npm run build  →  ✅ EXIT 0 (cleanup sprint, verified 2026-05-19 21:05 UTC)
  ✓ TypeScript: 0 errors
  ✓ 64 static pages generated
  ✓ NO deprecation warnings (middleware renamed to proxy)
```

## TYPESCRIPT STATUS (verified 2026-05-19 21:05 UTC)
```
npx tsc --noEmit  →  ✅ EXIT 0  (0 errors, 0 warnings)
```

---

## BUILD & TS VERIFIED (2026-05-20 03:36 UTC)
**PRODUCTION CERTIFIED + BACKUP VERIFIED ✅**
`npx tsc --noEmit` 0 errors, `npm run build` exit 0, 64 pages.
Backup script verified: 30.7 KB, 6 pages from production Supabase. Restore dry-run verified.

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
**Sprint: COMPLETE — CMS Reliability + Backup/Restore**

### Files added
| File | Purpose |
|---|---|
| `scripts/puck-backup.js` | Exports all puck_pages rows to `backups/puck/puck-backup-YYYY-MM-DD-HHMM.json` |
| `scripts/puck-restore.js` | Restores page(s) from backup with mandatory dry-run and `--confirm` flag |
| `backups/puck/.gitkeep` | Tracks backup directory in git (JSON files excluded) |

### Files modified
| File | Change |
|---|---|
| `package.json` | Added `puck:backup` and `puck:restore` npm scripts |
| `.gitignore` | Added `backups/puck/*.json` (backup data excluded from git) |

### Verification
- Backup: 6 pages, 30.7 KB from production Supabase ✅
- Restore dry-run (single page `/`): ✅ shows plan, writes nothing
- Restore dry-run (all pages): ✅ shows all 6 pages, writes nothing
- TypeScript: 0 errors ✅
- Build: exit 0, 64 pages ✅

---

## CMS RECOVERY WORKFLOW

### Backup Command
```bash
npm run puck:backup
# Output: backups/puck/puck-backup-YYYY-MM-DD-HHMM.json
# Reads from .env.local automatically
# Safe to run at any time — read-only, no writes to Supabase
```

### Restore Command (dry-run first — always)
```bash
# 1. List available backups:
ls backups/puck/

# 2. Dry-run (always do this first):
node scripts/puck-restore.js --backup backups/puck/<filename>.json --path /
# OR restore all:
node scripts/puck-restore.js --backup backups/puck/<filename>.json --all

# 3. Execute restore (single page):
node scripts/puck-restore.js --backup backups/puck/<filename>.json --path / --confirm

# 4. Execute restore (all pages):
node scripts/puck-restore.js --backup backups/puck/<filename>.json --all --confirm
```

### Rollback Process
```
1. Run backup BEFORE any risky change:  npm run puck:backup
2. Make your change in the Puck editor
3. If change is wrong, run dry-run to see restore plan
4. Add --confirm to execute restore
5. Reload https://autopilotroi.vercel.app/ to verify
```

### Production Safety Notes
- Backup JSON files are excluded from git (`.gitignore`) — store copies offsite if needed
- `backups/puck/` directory is tracked via `.gitkeep`
- Restore requires explicit `--confirm` flag — dry-run is always the default
- Backup reads via anon key (public read) — safe, no auth risk
- Restore writes via `SUPABASE_SERVICE_ROLE_KEY` — keep `.env.local` secure
- **Take a backup before every major content editing session**
- **Take a backup before any code deployment that touches puck config or components**

**ACTIVE BRANCH:** `feature/frontend-pages`
**PRODUCTION URL:** https://autopilotroi.vercel.app
**RELIABILITY SPRINT COMPLETE:** ✅ 2026-05-20 03:36 UTC
Role: CMS Reliability Dev | Branch: `feature/frontend-pages`

---

## ACTIVE ROLE FOR NEXT SESSION
**CMS Validation Dev** — working on `feature/frontend-pages` (unified)

Next task: live Puck editor session test.

---

## ALLOWED FILES FOR NEXT SESSION (feature/frontend-pages)
```
src/app/page.tsx                          ← homepage hero section
src/app/globals.css                      ← if design tokens needed
src/components/sections/**               ← hero components
src/components/ui/**                     ← shared UI primitives
STATUS.md                                ← update at end of session
```

---

## FORBIDDEN FILES FOR NEXT SESSION (feature/frontend-pages)
```
src/app/admin/**                          ← admin backend, wrong branch
src/app/dashboard/**                     ← partner portal, wrong branch
src/app/api/puck/**                      ← CMS API, wrong branch
src/proxy.ts                             ← proxy layer, feature/api-layer only
src/middleware.ts                        ← DELETED — do not recreate
```

---

## IMMEDIATE BLOCKERS (ordered by priority)

### P1 ✅ RESOLVED — middleware renamed to proxy.ts (2026-05-19)
- `src/middleware.ts` → `src/proxy.ts`
- Function export renamed from `middleware` to `proxy`
- Deprecation warning GONE from build output
- Behavior preserved exactly (pure pass-through)
- TypeScript: 0 errors. Build: exit 0.

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
- Commit: `f073716`

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

## CLEANUP SPRINT SUMMARY (2026-05-19)

### Files Deleted (dead systems)
- `src/middleware.ts` — renamed to `src/proxy.ts` (NOT deleted, renamed)
- `src/lib/content-store.ts` — DELETED (zero imports confirmed)
- `src/lib/puck-metadata.ts` — DELETED (zero imports confirmed)
- `src/components/builder/PuckRenderer.tsx` — DELETED (zero imports confirmed)
- `CLAUDE.md` — DELETED (stale governance doc)
- `HANDOFF.md` — DELETED (stale handoff doc)

### Files Archived to docs/archive/
- `docs/DESIGN_SYSTEM.md`
- `DOCS.md`
- `frontend-design.md`
- `LAUNCH_CHECKLIST.md`
- `COMPETITIVE_ANALYSIS.md`
- `marketing-skills.md`

### Known Risks Remaining
- `NEXT_PUBLIC_PUCK_WRITE_SECRET` placeholder in `.env.local` — must be replaced before editor testing
- `NEXT_PUBLIC_PUCK_WRITE_SECRET` must be set in Vercel dashboard env vars
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` still empty — signup bot protection disabled
- `puck_pages` RLS: public reads are intentional but unreviewed for production
- `feature/api-layer` still needs real session-based auth to replace P4 temp guard

---

## TODAY'S FIRST IMPLEMENTATION TARGET

**Cleanup sprint COMPLETE.** Switch to `feature/frontend-pages`.

> ⚠️ **Before switching branches:** Set `NEXT_PUBLIC_PUCK_WRITE_SECRET` to a real value
> in `.env.local` and Vercel. `openssl rand -hex 32`

**Next sprint target:** Homepage hero section on `feature/frontend-pages`.
1. `git checkout feature/frontend-pages`
2. Audit current homepage hero state vs. reference URL
3. Implement/refine hero section only

---

## NOT-NOW LIST
These are real priorities that are explicitly deferred until the sprint is complete:

| Item | Status |
|------|--------|
| Homepage hero redesign | 🟡 **UP NEXT** — `feature/frontend-pages` |
| /roadmap visual timeline | Deferred — `feature/frontend-pages`, after hero |
| Admin CSS reconciliation (adm-* vs Tailwind) | Deferred — `feature/admin-backend` |
| Partner dashboard divergence | Deferred — `feature/partner-dashboard` |
| Signup bot protection (Turnstile) | Config task — needs Cloudflare key |
| Real session auth for /api/puck | Deferred — `feature/api-layer` sprint |

---

## BRANCH MAP QUICK REFERENCE

| Branch | Status | Source of Truth For |
|--------|--------|---------------------|
| `feature/frontend-pages` | 🟡 NEXT SPRINT | Marketing pages |
| `feature/puck-editor` | ✅ SPRINT CLOSED — P1–P4 resolved | Puck CMS editor |
| `feature/admin-backend` | ✅ Clean | Admin panel (adm-* CSS) |
| `feature/partner-dashboard` | ⚠️ Identical to admin-backend | Partner portal (not diverged yet) |
| `feature/api-layer` | ✅ Clean | API routes, real session auth |
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
