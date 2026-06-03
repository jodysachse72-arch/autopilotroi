# Partner Area & Admin Backend — Roadmap & Plan of Action

*Next major phase after the funnel restyle. Sequenced per Jody: **Admin backend → Data/Referral/ThriveDesk → Blog → Forum.** Blog and Forum build approaches are intentionally left open — options laid out at the end for decision before those phases begin.*

---

## Where we are (grounded in the current codebase)

More is built than "mostly" — the gap is finishing, hardening, and wiring, not greenfield (except the forum).

| Area | State |
|---|---|
| Public funnel (signup → orientation → waiting-room → onboarding) | ✅ Done, premium light, on Barry's preview |
| Supabase backend | ✅ Exists — migrations for `leads`, `partners`, partner profile fields, CMS content, Puck pages/drafts/media |
| Data collection | ✅ Live — lead flow writes to Supabase `leads` via `/api/leads/assess` |
| Referral link generator | ✅ Built — `/dashboard/links` |
| Partner dashboard | ✅ Extensive — links, prospects, performance, leaderboard, videos, resources, settings |
| Admin area | ✅ Extensive — cms, partners, prospects, emails, features, roadmap, audit, changelog, checklist, guide, resources, settings |
| Puck visual page builder | ✅ Wired to Supabase |
| ThriveDesk | 🟡 Adapter built; stub wired into signup; needs key + dual-write + test |
| Referral attribution (`ref` end-to-end) | 🟡 Partially wired; `ref` not threaded through onboarding → Aurum link (broke during restyle) |
| Blog | 🟡 Front end exists at `/blog`; NOT connected to any authoring backend |
| Partner forum | 🔴 Not built — greenfield |
| Partner auth / gating | ⚠️ Needs confirmation — required for forum + gated resources |

---

## Cross-cutting prerequisite: partner authentication & gating

Before the forum (and any "partner-gated resources/dashboard") can be real, we need confirmed partner **auth and gating** — who is a logged-in partner, and how gated routes enforce it. There are `(auth)` routes (login, forgot/reset password) in the app already. **Action:** audit auth state early (folded into Phase A) so later phases aren't blocked.

---

## PHASE A — Admin Backend (audit + harden)

*Goal: a solid, trustworthy admin. History shows the admin back end has been the fragile part, so we start by finding out exactly what works.*

- **A0 — Admin audit (read-only).** Walk every admin route (cms, partners, prospects, emails, features, roadmap, audit, changelog, checklist, guide, resources, settings). For each: working / stubbed / broken, what data source it uses (Supabase table? mock? hardcoded?), and whether it's gated behind admin auth. Confirm partner/admin auth model. Output: an inventory doc like the onboarding walkthrough.
- **A1 — Auth & gating hardening.** Make sure admin routes are properly protected and the partner/admin distinction is enforced server-side, not just hidden in the UI.
- **A2 — Data wiring fixes.** Connect any admin screens still on mock/hardcoded data to their real Supabase tables (partners, leads, etc.).
- **A3 — Per-route fixes.** Address the broken/stubbed items the A0 audit surfaces, prioritized.

*Deliverable: admin you can run the business from without surprises.*

---

## PHASE B — Data, Referral & ThriveDesk

*Goal: every signup is attributed to the right partner and captured in both ThriveDesk and our backend.*

- **B0 — Referral attribution end-to-end.** Rebuild the `ref` thread that broke during the restyle: referral code captured at entry → persisted through signup/orientation/waiting-room → injected into the onboarding "Create Aurum Account" link so the partner gets credit. Verify the link generator (`/dashboard/links`) produces codes that round-trip correctly.
- **B1 — Dual-write on submit.** On signup/orientation submit, fire BOTH: (a) the Supabase `leads` write (already happening) and (b) the ThriveDesk contact/conversation create. Make them independent and fail-safe — if one fails, the other still succeeds and the user flow never blocks.
- **B2 — ThriveDesk activation.** Add the `THRIVEDESK_API_KEY` (+ inbox ID) to env/Vercel, verify the API contract against current ThriveDesk docs, run a real end-to-end test (live signup → contact in ThriveDesk + lead in Supabase).
- **B3 — Contact Us form.** Build the public Contact form, feeding the same dual pipeline (Supabase + ThriveDesk).
- **B4 — Data collection review.** Confirm what fields we capture, where they land, and that the partner dashboard (prospects, performance) reads from real data.

*Deliverable: trustworthy attribution + lead capture in both systems, plus a working Contact form.*

---

## PHASE C — Blog / CMS

*Goal: author blog posts in admin, surface them at `/blog`. Front end exists; needs an authoring backend. **Approach TBD — see Decision C below.***

- **C0 — Decide approach** (options below).
- **C1 — Authoring backend.** Posts store (Supabase table or Puck), admin authoring UI (title, body, slug, publish state, featured image, SEO fields).
- **C2 — Surface at /blog.** Wire the existing `/blog` front end + `[slug]` pages to the live store; published posts render, drafts don't.
- **C3 — Polish.** Categories/tags, ordering, preview, basic SEO.

---

## PHASE D — Partner Forum (greenfield)

*Goal: the most-anticipated feature — a gated forum for partners. **Approach TBD — see Decision D below.*** Depends on Phase A auth/gating.

- **D0 — Decide approach** (options below).
- **D1 — Core model.** Categories → threads → posts; partner identity; gating behind partner auth.
- **D2 — Read/write UI.** Browse, post, reply; basic moderation (admin pin/lock/delete).
- **D3 — Notifications & polish.** New-reply notifications (could ride the existing email/notify infra), search, member presence.

---

## Open decisions (need answers before Phases C & D start)

### Decision C — Blog/CMS approach
- **Option 1 — Reuse the existing Puck builder.** You already have Puck on Supabase. Extend it to author posts and render at `/blog`. *Pro:* leverages built infrastructure, visual editing. *Con:* Puck is page-oriented; articles may feel heavier than needed, and `/blog` list/feed still needs custom wiring.
- **Option 2 — Custom Supabase blog CMS.** Dedicated `posts` table + a simple admin authoring screen (title/body/slug/publish). *Pro:* purpose-built, lighter, easy feed/list/SEO. *Con:* new UI to build (though small).
- *Recommendation leaning:* Option 2 for articles unless you want the visual drag-and-drop of Puck for rich posts.

### Decision D — Forum approach
- **Option 1 — Custom on Supabase.** Native categories/threads/posts on your stack, gated by partner auth. *Pro:* full control, single system, consistent UX/branding, owns the data. *Con:* most build effort; moderation/notifications/search are all on us.
- **Option 2 — Embed third-party (e.g. Discourse).** Stand up a hosted forum, SSO/gate it behind partner login. *Pro:* fastest to a feature-rich forum (search, moderation, notifications out of the box). *Con:* another system to run/pay for, weaker branding integration, data lives elsewhere.
- *Trade-off summary:* custom = control + effort; embed = speed + a second system. Decide based on how central the forum is long-term and appetite for maintaining it.

---

## Recommended immediate next step

Start **Phase A0 — the admin audit** (read-only inventory, same approach that worked for onboarding). It's low-risk, needs no decisions, and tells us exactly what "harden the admin" actually means before we touch anything. I'll produce the admin walkthrough/inventory doc, then we scope A1–A3 from real findings.

*Parked behind this roadmap: nothing critical — this IS the next phase. ThriveDesk and referral rebuild are now folded into Phase B.*
