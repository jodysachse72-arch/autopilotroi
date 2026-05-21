# AutopilotROI — CMS Developer Operations

> **Who this is for:** Developers maintaining the AutopilotROI CMS stack.
> **Branch:** `feature/frontend-pages`
> **Last updated:** 2026-05-20

---

## Architecture Overview

```
Browser → /admin/edit  →  Puck visual editor (client-side React)
                                ↓  on Publish
                         POST /api/puck  (write-secret guarded)
                                ↓
                         Supabase puck_pages table  (JSONB)
                                ↓
                    GET /api/puck  (public read, used by page renderer)
                                ↓
                  Next.js page.tsx  →  PuckRenderer → live site
```

**Key files:**

| File | Role |
|---|---|
| `src/app/admin/edit/[[...path]]/page.tsx` | Puck editor UI — all overrides, publish logic, UX signals, template selector |
| `src/puck.config.tsx` | Component registry — all editable block definitions |
| `src/app/api/puck/route.ts` | GET (read) + POST (write) + DELETE API |
| `src/app/api/puck/seed/route.ts` | Seed API — template-aware, overwrite-protected |
| `src/lib/puck-templates/index.ts` | Template registry — 3 governed pre-approved layouts |
| `src/app/(site)/[[...path]]/page.tsx` | Public page renderer — reads from Supabase, passes to PuckRenderer |
| `scripts/puck-backup.js` | Export all puck_pages rows to JSON |
| `scripts/puck-restore.js` | Restore pages from backup with dry-run protection |
| `scripts/migrate-section-names.js` | One-time migration — adds sectionName to SectionBox instances |

---

## Environment Variables

### Required — Production

| Variable | Purpose | Where set |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Vercel + `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public read key | Vercel + `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Write/admin key (server-only) | Vercel + `.env.local` |
| `NEXT_PUBLIC_PUCK_WRITE_SECRET` | CMS write auth token | Vercel + `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Vercel + `.env.local` |

### Optional / Partial

| Variable | Purpose | Status |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Bot protection on /signup | Empty — bot protection disabled |

### Verification Checklist (pre-deploy)

```bash
# All of these must return non-empty values:
grep NEXT_PUBLIC_SUPABASE_URL .env.local
grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local
grep SUPABASE_SERVICE_ROLE_KEY .env.local
grep NEXT_PUBLIC_PUCK_WRITE_SECRET .env.local
grep NEXT_PUBLIC_SITE_URL .env.local

# NEXT_PUBLIC_PUCK_WRITE_SECRET must NOT be the placeholder:
grep NEXT_PUBLIC_PUCK_WRITE_SECRET .env.local | grep -v "replace-with"
```

Also verify in Vercel dashboard → Project → Settings → Environment Variables.

---

## Backup Workflow

### Run a backup

```bash
npm run puck:backup
# Output: backups/puck/puck-backup-YYYY-MM-DD-HHMM.json
# Reads live data from Supabase via NEXT_PUBLIC_SUPABASE_URL + anon key
# Safe: read-only, never modifies database
```

### When to run backups

- **Before every production deployment** that modifies `puck.config.tsx`
- **Before any migration script** that touches puck_pages data
- **Before any large editing session** by the operator
- **After successfully deploying** a new version (baseline snapshot)

### Backup storage

Backup files are excluded from git (`backups/puck/*.json` in `.gitignore`).
The `backups/puck/` directory is tracked via `.gitkeep`.

Store critical backups in a secondary location (email, cloud storage) if needed.

---

## Restore Workflow

### Step 1 — List available backups

```bash
ls backups/puck/
# e.g. puck-backup-20260520-0013.json
```

### Step 2 — Dry-run (always do this first)

```bash
# Restore single page:
node scripts/puck-restore.js --backup backups/puck/<filename>.json --path /

# Restore all pages:
node scripts/puck-restore.js --backup backups/puck/<filename>.json --all
```

The dry-run shows exactly what would be written. No data is touched.

### Step 3 — Execute restore

```bash
# Add --confirm to actually write:
node scripts/puck-restore.js --backup backups/puck/<filename>.json --path / --confirm

# OR restore all pages:
node scripts/puck-restore.js --backup backups/puck/<filename>.json --all --confirm
```

### Step 4 — Verify

```bash
# Wait 30–60s for Vercel edge cache to refresh, then:
curl -s https://autopilotroi.vercel.app/api/puck?path=/ | jq '.data.content | length'
# Should return the expected component count
```

---

## Deploy Workflow

### Pre-deploy checklist

```bash
git branch --show-current        # must be feature/frontend-pages
git status                       # must be clean
npx tsc --noEmit                 # must be 0 errors
npm run build                    # must exit 0, 64 pages
```

### Verify required commits are present

```bash
git log --oneline | head -10
# Check for expected sprint commits
```

### Deploy

```bash
npx vercel deploy --prod
```

Expected output:
```
✓ Compiled successfully in ~12s
✓ Generating static pages (64/64)
✓ Build Completed in /vercel/output [~26s]
Aliased: https://autopilotroi.vercel.app
```

### Post-deploy verification

1. Open https://autopilotroi.vercel.app — homepage should render correctly
2. Open https://autopilotroi.vercel.app/admin/edit — editor must load
3. Click a Content Section in outline — verify right panel shows Section Name field
4. Check status indicators: amber `● Unpublished` on load, green after publish
5. Check browser console: no CSP errors, no hydration errors
6. Check `● All changes published` after a test publish

---

## Production Verification Checklist

Run after every deploy:

```
□ Homepage renders at https://autopilotroi.vercel.app
□ Editor loads at /admin/edit
□ Hero (Dark) section visible in Puck canvas
□ Outline shows: Hero (Dark), 5× Content Section, Call-to-Action Banner
□ Outline tip "💡 Click any section..." is visible
□ Click first Content Section → right panel shows "Section Name (for your reference)"
□ Section Name value is pre-populated (e.g. "Stats Bar (12,000+ Members etc.)")
□ Background Color field shows dropdown (not hex input)
□ Vertical Spacing field shows dropdown
□ Status bar shows amber "● Unpublished changes" on load
□ Click Publish → green "✓ Published [timestamp]" appears in header
□ Status bar transitions to green "● All changes published"
□ + New Page → path input + template dropdown visible
□ Create new page with campaign-landing template → loads with template content
□ Console: 0 hydration errors
□ Console: 0 CSP errors
□ Console: 0 runtime crashes
□ Wait 60s → verify live site reflects published state
```

---

## Rollback Steps

### Option A — Content rollback (operator made bad edit)

```bash
# 1. Run backup of current state first (document the bad state):
npm run puck:backup

# 2. Find the last known good backup:
ls backups/puck/ | sort | tail -5

# 3. Dry-run restore:
node scripts/puck-restore.js --backup backups/puck/<good-backup>.json --path / 

# 4. Execute restore:
node scripts/puck-restore.js --backup backups/puck/<good-backup>.json --path / --confirm

# 5. Verify live site (allow 60s cache flush)
```

### Option B — Code rollback (bad deploy)

```bash
# 1. Identify last known good deployment:
npx vercel ls autopilotroi

# 2. Promote previous deployment to production:
npx vercel promote <previous-deployment-url> --scope autopilot-roi

# 3. Verify:
curl -I https://autopilotroi.vercel.app | grep x-vercel-id
```

### Option C — Full nuclear reset (content + code)

```bash
# 1. Restore code via git:
git log --oneline | head -10      # identify last known good commit
git checkout <good-commit>        # detached HEAD
npx vercel deploy --prod          # deploys that code

# 2. Restore content:
node scripts/puck-restore.js --backup backups/puck/<good-backup>.json --all --confirm

# 3. Return to branch tip:
git checkout feature/frontend-pages
```

---

## Page Template System

### Overview

Three governed page templates live in `src/lib/puck-templates/index.ts`.
They are pure Puck JSON — no new components, no new routes.

| Template key | Layout | Use case |
|---|---|---|
| `homepage-standard` | Hero → Stats → Features → Steps → Testimonials → CTA | Homepage-style landing pages |
| `product-page` | HeroBlue → Stats → Product Cards → Pricing → FAQ → CTA | Product/offer pages |
| `campaign-landing` | HeroDark → Video → Benefits → Social Proof → Pricing → CTA | Campaign / lead-gen pages |

### Seeding a page from a template

```bash
# Via curl (requires write secret):
curl -X POST \
  -H "x-puck-write-secret: <PUCK_WRITE_SECRET>" \
  "https://autopilotroi.vercel.app/api/puck/seed?path=/campaign&template=campaign-landing"

# Force-overwrite existing content (USE WITH CAUTION):
curl -X POST \
  -H "x-puck-write-secret: <PUCK_WRITE_SECRET>" \
  "https://autopilotroi.vercel.app/api/puck/seed?path=/&template=homepage-standard&force=true"
```

### Safety protections

- **No overwrite by default** — if a page already has content, seed returns `{ ok: false, existingContent: true }` with HTTP 200
- **`?force=true` required** to overwrite existing content — never sent by the editor UI
- **Unknown template names** return HTTP 400 with a list of valid templates
- **Write secret required** on all seed operations — same protection as publish
- **Auto-seed from editor** fires only on empty pages (no content), so it cannot race against templates

### List available templates

```bash
curl -H "x-puck-write-secret: <PUCK_WRITE_SECRET>" \
  "https://autopilotroi.vercel.app/api/puck/seed"
```

### Editor UX

In `/admin/edit`, the **+ New Page** flow shows:
- Path input (e.g. `/campaign-may`)
- Template selector: ⬜ Blank / 🏠 Homepage / 📦 Product / 🎯 Campaign

The editor seeds the template BEFORE navigating to the new page.
No `?force=true` is ever used from the editor — only new pages (no existing content) go through this path.

### Adding a new template

1. Add the template data object to `src/lib/puck-templates/index.ts`
2. Add entry to `TEMPLATE_REGISTRY` with key, label, description, data
3. Add `<option>` to the selector in `src/app/admin/edit/[[...path]]/page.tsx` (headerActions section)
4. Run `npx tsc --noEmit` and `npm run build` before committing
5. Do NOT add components that aren't already in `src/puck.config.tsx`

---

## Migration Scripts

### migrate-section-names.js

**Purpose:** One-time migration that adds `sectionName` to existing SectionBox instances in the live database.

**Safe to re-run:** Yes — never overwrites a non-empty existing value.

```bash
node scripts/migrate-section-names.js
```

Expected output:
```
Found 6 page(s)
  [/] stats-section → "Stats Bar (12,000+ Members etc.)"
  [/] features-section → "Features / Benefits"
  ...
  ✅  Updated /
Migration complete — 2 page(s) updated
```

**When to update this script:** When new SectionBox instances are added to pages. Add their IDs and friendly names to the `SECTION_NAME_MAP` object.

---

## Supabase Schema

```sql
-- Table: puck_pages
CREATE TABLE IF NOT EXISTS public.puck_pages (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path       TEXT UNIQUE NOT NULL,
  data       JSONB NOT NULL,
  updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security:
-- anon: SELECT only (public reads)
-- service_role: all operations
ALTER TABLE public.puck_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.puck_pages
  FOR SELECT USING (true);
```

Migration file: `supabase/migrations/20260519_puck_pages.sql`

---

## Write Protection

The CMS write API uses a shared-secret guard (temporary — see known risks).

- Header required on write operations: `x-puck-write-secret: <value>`
- Value must match `NEXT_PUBLIC_PUCK_WRITE_SECRET` env var (set identically in Vercel + `.env.local`)
- If env var is unset, API returns 500 (fail-closed)
- If header is missing/wrong, API returns 401

To rotate the secret:
1. Generate a new secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Update `.env.local`
3. Update Vercel environment variable
4. Redeploy

---

## Known Risks

| Risk | Severity | Notes |
|---|---|---|
| Write secret is shared (not session-based) | Medium | Adequate for now. Real auth is `feature/api-layer` sprint. |
| `feature/frontend-pages` not merged to `main` | Medium | Production is deployed from this branch directly. `main` is contaminated — do not merge. |
| DropZone API deprecated by Puck | Low | Functionality unchanged. Migration to slot fields is a future sprint. Console warning only. |
| Puck outline rows show type label only | Low | Per-instance names visible in field panel (by design constraint). |
| No automated test for editor publish flow | Low | Manual verification checklist used instead. |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY empty | Low | Bot protection on /signup silently disabled. Needs Cloudflare key. |
| puck_pages RLS: public reads unreviewed | Low | Intentional for now. Review if content becomes sensitive. |

---

## Puck Architecture Constraints

### What Puck can do (in this implementation)

- Edit text fields (plain and rich text)
- Change select options (Background Color, Vertical Spacing)
- Reorder blocks within zones (with caution)
- Add new blocks from the registered component list
- Delete blocks

### What Puck cannot do (by design)

- Per-instance outline labels — labels come from `config.components[type].label` globally
- Custom CSS per component instance
- Dynamic data sources without custom resolver setup
- Nested DropZones beyond depth 2 (performance constraint)

### How to add a new editable component

See `docs/SAFE_COMPONENT_EXPANSION_GUIDE.md` — run that checklist before writing any code.

---

## Production Branch Strategy

| Branch | Role | Deploy Target |
|---|---|---|
| `feature/frontend-pages` | **PRODUCTION** | `vercel deploy --prod` |
| `main` | Contaminated | **Do not use** |
| `feature/api-layer` | Auth hardening | Preview only until certified |
| `feature/admin-backend` | Admin panel | Preview only |
| `feature/partner-dashboard` | Partner portal | Preview only |

**Rule:** Never `git push` to `main`. All production deployments are via `npx vercel deploy --prod` from `feature/frontend-pages`.

---

## Session Startup Checklist

```bash
git branch --show-current   # must be feature/frontend-pages
git status                  # must be clean
git log --oneline -5        # verify you're at expected commit
npx tsc --noEmit            # must be 0 errors BEFORE any changes
npm run puck:backup         # take a snapshot before editing session
```

## Session Shutdown Checklist

```bash
npx tsc --noEmit            # must be 0 errors AFTER your changes
npm run build               # must exit 0, 64 pages
git add -A && git commit -m "..."
git push origin feature/frontend-pages
# Update STATUS.md with new state and "Last verified" timestamp
```
