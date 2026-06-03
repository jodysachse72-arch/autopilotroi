# CMS Cleanup + Blog Authoring — Plan (T2–T4)

*Source of truth. Executed by Antigravity in gated prompts. T1 (Puck removal) is DONE — main at c246038, Puck archived to a `puck-archive` branch + `supabase/_archive/`, `puck_pages`/`puck_page_revisions` dropped.*

## Keep (the working content path)
- `cms_posts` table (3 blog + 4 faq, published) + `src/lib/cms/supabase-adapter.ts` → serves `/blog`, `/blog/[slug]`, `/faqs`. Do not touch the data or rendering.

## T2 — Remove dead CMS attempts + TipTap
- Remove `src/lib/cms/payload-adapter.ts`, `server-adapter.ts` (only if unused by the live supabase path — confirm via `service.ts`), `/api/admin/migrate-cms`, `RichEditor.tsx` (if no live consumer), and all `@tiptap/*` deps in package.json.
- DB: archive then drop `cms_content` + `cms_revisions` (both 0 rows). Also check/remove the orphaned `puck-media` storage bucket.
- Keep whatever `supabase-adapter.ts` depends on (likely `service.ts` + `types.ts`). Blog/faqs must still render. Build green; grep tiptap/payload = 0.

## T3 — Blog/FAQ authoring UI (replaces /admin/cms stub)
- Real admin screen on `cms_posts`: list (filter by type), create/edit (type blog|faq, title, slug, body_html, meta, status, sort_order), publish toggle. Writes via server route w/ service-role client.
- Editor: lightweight markdown or HTML textarea + preview (no heavy rich-text dep — TipTap is gone).
- Point sidebar "Content Editor" at this screen.
- NOTE: this content manager is also the future substrate for the partner Command Center KB (resources/scripts/known-issues via the same type+meta pattern) and the partner AI agent's corpus. Build it generic enough to add types later.

## T4 — Verify + sweep
- Grep repo for puck/tiptap/payload stragglers; confirm package.json clean; npm install + build green; walk /blog, /blog/[slug], /faqs, /admin/cms.

## Still ahead (not this track)
- A1 admin auth (security gate, before partners are live).
- Phase B: referral persistence (`referral_links` empty) + dual-write capture + ThriveDesk.
- Partner Command Center: lean curated KB + compliance-guardrailed partner agent (Supabase pgvector + Vercel AI Gateway) + ThriveDesk escalation. Two humans + one bot, minimal admin.
