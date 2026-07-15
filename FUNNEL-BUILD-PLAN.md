# Funnel Build Plan — Signup → Assessment → Waiting Room → Onboarding

> **Historical plan.** This records the assumptions used during the earlier funnel build and is not a current execution checklist. Several “Currently” statements are now stale, and all Antigravity/LOCKED-zone instructions below are retired. Use `PROJECT-CURRENT-STATE.md`, inspect the live code and Supabase state, and follow `WORKFLOW.md` before planning new funnel work.

The funnel is the conversion spine of AutoPilotROI: prospect lands, gives Name + Email, takes a short readiness assessment, lands in a waiting room with Aurum Foundation context videos, and waits for a partner to push them into onboarding via ThriveDesk. This document is the build path.

## The intended funnel

| Step | Page | Currently | Target |
|------|------|-----------|--------|
| 1 | `/signup` | Unstyled "Create Your Free Account" with Name + Email | Styled to approved design system. Submit stubbed for ThriveDesk. On success, redirect to step 2. |
| 2 | `/readiness-assessment` (or similar) | Possibly stub or missing | 2-minute questionnaire. On completion, redirect to step 3. ThriveDesk receives assessment payload (stubbed for now). |
| 3 | `/waiting-room` (or `/media`) | Exists as a page; user thinks it's currently `/media` | Styled waiting room with Aurum Foundation videos plus a message: "A partner will be in touch shortly to begin your onboarding." |
| 4 | `/onboarding` | **Currently exposed in the public frontend** | Hidden from public navigation. Only accessible via authenticated/tokenized partner link routed through ThriveDesk. |

## LOCKED-zone reframe for construction work

The LOCKED rule that protects approved pages (homepage, etc.) does NOT apply the same way to under-construction pages. These pages aren't yet in the approved set — they're being brought INTO compliance with the approved design system. The Antigravity prompts for funnel work shift from:

- ❌ "Don't touch spacing, gaps, padding, layout" (the approved-page rule)

to:

- ✅ "Match the approved design system from the homepage. Reuse existing design tokens, components, gradients, typography, card containment. The page being built is new construction — substantive changes are expected — but they must be coherent with what's already shipped."

A page graduates into the LOCKED set once Jody marks it as approved (e.g., after Barry signs off on content + Jody approves the visual). After that, the standard LOCKED-zone rule and override mechanism apply.

## The phases

### Phase 0 — Audit (read-only, no changes)

Before building anything: have Antigravity map the current funnel state. What pages exist, what's wired to Supabase or any backend, where the dead ends are, whether `/media` or `/waiting-room` (or both) is the active waiting-room route, what's in `/onboarding` today and what's linking to it from the public nav. Output: a clear current-state report so we don't build on top of broken assumptions.

### Phase 1 — Hide `/onboarding` from public access

Immediate small fix. Onboarding shouldn't be reachable from the public navigation today. Two scoped changes:

1. Remove any navigation link to `/onboarding` from the public nav and footer.
2. Add a minimal guard to `/onboarding` (auth check, redirect to home if not authenticated, or a feature-flag gate). Page file stays — just unreachable from the public site.

### Phase 2 — Style the signup form

The form structure stays (Name + Email + Continue + Log in link + reassurance line). The visual gets rebuilt to match the approved design system:

- Dark/light section rhythm consistent with homepage.
- Premium card containment, cinematic gradient on background.
- Typography hierarchy from the existing design tokens.
- Button copy: "Start your readiness assessment →" (per the user's intent).
- Reassurance microcopy: "No credit card required · Free to get started · Takes 2 minutes" — styled as a row of small ticks under the CTA.
- The form submit handler is stubbed for ThriveDesk: validates inputs, captures Name + Email, calls a placeholder `submitToThriveDesk()` function with a `TODO` comment, redirects to `/readiness-assessment`.

### Phase 3 — Readiness assessment page

Build (or align) `/readiness-assessment`. Short questionnaire, 4–6 questions, optimized for under-2-minute completion. Multiple choice or scale answers (not open text — keeps it fast). On submit, stub the ThriveDesk payload (assessment answers + Name + Email from signup), redirect to the waiting room.

Specific question set is content Barry can review later via the comment loop. Initial version uses placeholder questions that Antigravity will mark with `TODO: replace with finalized question set`.

### Phase 4 — Waiting room

Confirm whether the waiting room is `/media` or `/waiting-room` (Phase 0 audit answers this). Whichever it is, do these:

- Add the "A partner will be in touch" message prominently.
- Keep / surface the Aurum Foundation videos as the dwell content.
- Style to match the approved system.
- Make sure the post-assessment redirect lands here.

If both routes exist and only one is active, consolidate (one stays as the canonical waiting room, the other deletes or 301s).

### Phase 5 — ThriveDesk wiring

Deferred. All previous phases stub ThriveDesk so the front-end flow is complete without it. When ready to wire:

- ThriveDesk SDK or HTTP integration to create contact + assessment payload.
- Replace stubbed `submitToThriveDesk()` with real call.
- Partner routing logic (manual initially — partners pull leads from ThriveDesk and push them to onboarding via a generated link).

## How to drive this with Antigravity

Each phase is one prompt. The prompts should:

1. Reference the approved design system (homepage) as the visual benchmark.
2. Name the specific files to investigate first, then implement.
3. Use the same restate-and-confirm gate the Barry loop uses.
4. Push to a branch named after the phase (e.g., `funnel-hide-onboarding`, `funnel-signup-redesign`).
5. Open + merge a PR via `gh` CLI.

The orchestrator (Cowork) generates each phase's prompt when you're ready. You verify on preview before merge.

## Order of operations (recommended)

1. **Phase 0 audit first.** Five minutes of investigation, zero code changes. We refine the rest of the plan based on what Antigravity finds.
2. **Phase 1 (hide onboarding) second.** Smallest scope, highest urgency — exposed onboarding is a real concern.
3. **Phase 2 (signup styling) third.** This is the biggest single visual change; it shows you whether the construction-mode prompt works as intended before scaling to more pages.
4. **Phases 3–4 in either order**, depending on which content/page is more ready.
5. **Phase 5 (ThriveDesk) when the funnel flows correctly end to end without it.** Don't wire backend until the frontend journey is right.

## What's NOT in this plan

- Admin / partner dashboard. Deferred per architecture.
- The actual ThriveDesk credentials, webhook URLs, or partner routing logic — those come later.
- Barry's content review on funnel pages. He's working in parallel on the public marketing pages; funnel pages aren't in his "open for review" list until Phase 2+ are visually complete.
- The "shareable production preview" the funnel produces for partner demos. Comes after the funnel works.

## Done means

You can land on `/signup` styled to match the homepage, submit Name + Email, take the readiness assessment, land in the waiting room with the partner-will-be-in-touch message and the Aurum videos, and `/onboarding` is invisible from the public site. The flow works without ThriveDesk being live. That's the completion gate before public launch.
