# Admin Backend Audit (Phase A0)

*Read-only inventory of every admin route: what's real, what's fake, what's a stub, and the auth/gating state. Goal: make the keep-vs-rebuild call per area from facts, not hunches.*

---

## 🔴 CRITICAL FINDING — Admin is not access-controlled

**There is no authentication gate on the admin area.** No `middleware.ts` exists, and `src/app/admin/layout.tsx` performs no session/role check. The red "Admin" badge in the top bar is cosmetic. As far as I can tell from the code, **anyone who navigates to `/admin` (or any `/admin/*` route) can see and use it**, including the partner-management screens.

This is the single most important thing to fix and it should come before any rebuild work. Whatever we keep or rebuild, it must sit behind a real server-enforced admin auth check. (There are `(auth)` routes — login/forgot/reset — so an auth system exists; it's just not protecting admin.)

---

## Route-by-route inventory

Legend: 🟢 live (real data/working) · 🟡 partial · 🔵 static content (legitimately static) · 🟠 mock data shown as real · 🔴 stub/empty

| Route | State | Data source | Notes |
|---|---|---|---|
| `/admin` (dashboard) | 🟡 | mixed | Overview shell; verify its KPIs read real data vs. hardcoded. |
| `/admin/partners` | 🟢 | **live** — `GET`/`POST /api/admin/partners` | Real partner CRUD against the backend. Keep. |
| `/admin/prospects` | 🟠 | **mock** — hardcoded `allProspects[]` array | Shows fake prospects. Should read the real Supabase `leads` table. Rewire, don't rebuild. |
| `/admin/cms` (Content Editor) | 🔴 | **stub** | Literally a "Admin CMS — Coming in Phase 2" placeholder (11 lines). The sidebar "Content Editor" link points here. Meanwhile a real Puck editor exists at `/admin/edit` (bypassed in layout) + a `cms_content` Supabase table. Content editing is fragmented — see below. |
| `/admin/emails` | 🟠 | **mock** — hardcoded `templates[]` + `timelineSteps[]` | Email templates/drip timeline are static. Drip infra exists (`lib/drip-emails.ts`, `/api/cron/re-engage`) — needs wiring to real templates. |
| `/admin/features` (Feature Flags) | 🟢/🟡 | `useEffect` load | Reads feature flags (`lib/feature-flags`). Likely functional; confirm it persists changes. |
| `/admin/roadmap` | 🔵 | hardcoded `phases[]` / `scorecard[]` | Internal planning content. Fine as static, or move to a doc. |
| `/admin/changelog` | 🔵 | hardcoded `changelog[]` | Static release notes. Fine as static. |
| `/admin/checklist` | 🟡 | hardcoded `sections[]` + supabase/persist refs | Launch checklist; appears to persist check state. Keep. |
| `/admin/guide` (Platform Guide) | 🔵 | hardcoded `guides[]` | Internal documentation content. Fine as static. |
| `/admin/resources` | 🔵 | static | Resource links/content. Fine as static. |
| `/admin/audit` (Audit Log) | 🟠 | **mock** — `DEMO_EVENTS[]` | The audit log is fake demo data. Either wire it to a real audit/event table or label it clearly. Ironically, a real audit log matters most given the auth gap above. |
| `/admin/settings` (Integrations) | 🔵/🟡 | hardcoded `INTEGRATIONS[]` | Integration status/config display (Supabase, ThriveDesk, etc.). Mostly a static status board; confirm any toggles actually do something. |

---

## The content-editing tangle (worth a decision)

There are **three** overlapping content systems:
1. `/admin/cms` — an empty "coming in Phase 2" stub, but it's the link in the sidebar labeled "Content Editor."
2. `/admin/edit` — a **real Puck visual page builder** (gets full-screen treatment in the layout), backed by `puck_pages` / `puck_drafts_revisions` / `puck_media` tables.
3. A `cms_content` Supabase table (migration `20260413_cms_content.sql`) + `lib/cms` — a separate content store.

So the sidebar points users at a dead stub while a working builder lives elsewhere, and there are two content data models. This needs untangling — likely: delete the stub, point "Content Editor" at the real Puck editor (or the blog CMS when we build it in Phase C), and decide whether `cms_content` or Puck is the source of truth.

---

## Keep vs. rebuild — recommendation

**Keep (working, just protect/verify):** partners, features, checklist, the Puck editor. The Supabase schema (partners, leads, CMS, Puck) is sound — **do not rebuild the data layer.**

**Rewire (good shell, fake data):** prospects → real `leads`; emails → real template store + drip infra; audit → real event log. These are UI-complete; they need to be connected, not rebuilt.

**Untangle:** the three content systems (cms stub vs Puck vs cms_content).

**Leave as static (fine):** roadmap, changelog, guide, resources, settings — internal content/status pages.

**Net:** this is **not** a from-scratch rebuild. It's (1) add admin auth, (2) rewire ~3 screens from mock to real data, (3) untangle content editing. The bones and the database are good.

---

## Proposed Phase A plan (revised from findings)

- **A1 — Admin auth gate (DO FIRST).** Add server-enforced admin authentication (middleware or layout-level session+role check) so `/admin/*` is protected. Confirm the partner/admin role model.
- **A2 — Rewire prospects → real `leads` data.** Replace the hardcoded array with the Supabase query (same source the partner dashboard prospects use).
- **A3 — Untangle content editing.** Remove the `/admin/cms` stub, point "Content Editor" at the real editor, decide Puck vs `cms_content` as source of truth (sets up Phase C blog).
- **A4 — Emails + audit wiring.** Connect email templates to real storage + drip infra; make the audit log real (or clearly label it).
- **A5 — Dashboard/KPIs + settings verification.** Confirm `/admin` overview and integration toggles read/do real things.

*Verification note: live Supabase read access would let me confirm which tables are actually populated (are leads flowing? are partners real?) and validate the rewire targets in A2/A4. Not required to start A1.*
