# AutoPilotROI — Full Project Scope Report

> **Historical report (May 2026).** This document preserves the project's earlier state and decisions; its “today,” workflow, architecture status, and next-step claims are not current instructions. The Antigravity/LOCKED-zone model described below has been retired. Use `PROJECT-CURRENT-STATE.md` and `WORKFLOW.md` for current work.

This document is self-contained context for anyone (or any AI) coming in cold to AutoPilotROI. It covers what the product is, the journey it took to get here, what's true today, where it's going, and at the bottom a specific image brief for visualizing the story.

---

## 1. The product

**AutoPilotROI** is a fintech onboarding platform that guides non-technical people into the **Aurum ecosystem** — an AI trading bot, a Visa crypto card, an exchange, and a Web3 neobank — starting from a $100 USDT entry point. The promise is that someone with zero crypto experience can sign up, get their setup complete in about three days, and have an AI trading bot running their portfolio 24/7 while they sleep.

The site itself is a premium fintech experience: dark/light section rhythm, cinematic gradients, strong card containment, large typography, trust-focused onboarding UX. Design inspiration: OnePay and the best modern fintech SaaS sites. Stack: Next.js (App Router), Supabase (backend/auth/data), Vercel (hosting + previews + Comments), Tailwind plus vanilla CSS for the visual system.

The current public surface includes the homepage, FAQs, products, resources, contact, legal pages (terms / privacy / disclaimer), and a few orientation pages. The conversion funnel — signup → waiting room → onboarding — is in active development. Admin and partner-dashboard surfaces exist as separate apps and are deferred until after public launch.

---

## 2. The journey — three chapters

### Chapter 1: The Puck era (March to May 2026)

The original instinct was Thrive Themes for our custom frontend: a visual editor that would let a non-technical collaborator (Barry) edit pages by clicking and typing, without ever touching code. We picked **Puck**, the modern open-source visual CMS, and spent roughly six weeks bolting it onto the bespoke frontend, writing a custom CMS layer, building an admin editor, and trying to make inline editing work on components that were never designed for it.

Three problems compounded:

1. **Architecture drift.** Puck wants to own the rendering pipeline; our frontend is hand-crafted. Every integration point bent in a different direction.
2. **AI agents reinterpreting approved work.** Every small change request triggered Claude (or another AI) to "improve" things it wasn't asked to touch. Frontend quality kept degrading. After one particularly bad regression on May 28 — the containment system silently rewritten from `gap: 1.25rem` to a static 896px container that broke the entire layout — confidence in the process collapsed.
3. **Editing abstractions on top of editing abstractions.** By the end, there was a CMS for the CMS for the components. Nobody could remember how it fit together. More time was spent maintaining the editor system than editing anything.

### Chapter 2: The inflection point (last week)

Last week, Google shipped a major **Antigravity** update that changed how AI agents read, scope, and edit code in a real IDE context. That update was the straw that broke the camel's back of the visual-CMS approach. With AI tooling now capable enough to make precise, scoped code changes directly — guided by structured prompts and a strict review surface — the entire premise of building a visual CMS as the editing layer became obsolete. Why translate edits into a CMS data format when the AI can edit the source code directly with discipline?

That triggered a full step back. The realization, once it landed, was simple in retrospect:

> **Barry didn't need a visual CMS. He needed a *review surface*.**

The frontend itself was good. The premium design existed and was approved. What was missing wasn't an editor — it was a clean, shared way for non-technical reviewers to point at things on the live site and say "change this," and for those requests to flow into precise, scoped code changes without anyone reinterpreting the frontend.

### Chapter 3: The new operating model (this week)

The CMS stack came out. Every dead branch was retired into archive tags. The repo went from 15+ chaotic branches with dangling Puck imports to a single living `main` and a clean working tree. In its place, a new loop was wired up and validated end-to-end.

The new loop has four actors:

- **Reviewer** (Jody, Barry, or anyone with project access) — leaves comments on live Vercel preview deployments by clicking on elements and typing in plain English.
- **Orchestrator** (Claude in Cowork) — receives the comment + the element/framework context Vercel auto-captures, and generates a complete, paste-ready prompt for the implementer with all the project-specific rules baked in.
- **Implementer** (Claude in Antigravity) — receives the prompt in a fresh IDE session, restates the change, names the file(s) it will edit, waits for explicit "go," makes the scoped diff, commits, pushes, and opens / merges the PR via `gh` CLI.
- **Production** — Vercel auto-deploys preview branches and redeploys main on every merge.

The discipline that makes this work — and that prevents the May 28 disaster from recurring — is a strict **LOCKED-zone rule**. Colors, gradients, typography, spacing, gaps, padding, margins, max-widths, the `.sections-stack` wrapper, section layouts, wrapper structure, and anything affecting positioning or sizing are hard-blocked. The implementer must refuse at step 1 to propose, scope, or name files for any change touching these zones, unless the request contains the literal phrase `override LOCKED for this change` plus specific property/value pairs. This was tested twice today: once with a vague spacing request (refused cleanly) and once with the same request plus the override phrase and a specific value (implemented precisely and shipped to production).

---

## 3. What got shipped today

- The full repo cleanup: 14 archive tags created, ~12 dead branches retired local + remote, Puck source + admin/edit + admin/preview + all dangling consumers removed, deployment chain cleared.
- The strengthened LOCKED-zone discipline, documented and validated.
- The hero badge text on the homepage — changed from "POWERED BY AURUM ECOSYSTEM" to "AI MANAGED FINANCE" (an actual basecamp request shipped through the new loop in about ten minutes end to end).
- More breathing room between section cards on the homepage — `.sections-stack` gap changed from effectively zero to `1.5rem` via the LOCKED-override mechanism, a deliberate authorized layout change.
- Operating-model documentation: workflow, review guide for non-technical reviewers, parallel-work plan, self-test playbook, ScreenPal video outline. All committed to main.

Two real production changes, zero regressions, a clean repo state, validated loop.

---

## 4. Architecture

Four layers, hard-edged, built in this order:

1. **Public frontend** — what's nearly live. Next.js + Tailwind + vanilla CSS, hosted on Vercel, deployed from `main`. Pure presentation, no business logic. Preview branches auto-deploy.
2. **Onboarding flows** — the signup → waiting room → onboarding funnel. Frontend renders the steps; Supabase owns state, validation, auth, and data. The frontend talks to Supabase only through its client/API.
3. **Partner / backend systems** — Supabase functions and tables. The frontend knows them only through a documented API contract.
4. **Admin systems** — a separate app behind auth. Not bolted into the public frontend. Deferred until after public launch.

The architectural rule that prevents future chaos: **the public frontend talks to everything else only through APIs, never through shared rendering or shared components.**

The Git workflow: `main` is protected and is production. Every change arrives via a short-lived branch off `main` with one concern per branch. Vercel auto-deploys a preview per branch. Branches merge via PR (`gh pr merge`) and are deleted after merge. No direct pushes to `main` (a remaining open question: tightening branch protection to disallow admin bypass before more reviewers join).

---

## 5. What's next

**Immediate (this week / next):**

- Finish the signup → waiting room → onboarding funnel and wire it to Supabase.
- Onboard Barry: invite him to the Vercel project with comment access, hand him the review guide, give him the pinned list of pages he can comment on, let him start the content/copy pass on the public pages in parallel.
- Process Barry's comments in batches via the new loop.

**Short-term (next few weeks):**

- Ship the public launch: homepage + funnel + all stable public pages content-passed and live.
- Open the loop to additional reviewers (founders, designers) — same flow.
- Decide on stricter main protection (no admin bypass) before scaling reviewers.

**Vision (the medium-term reach):**

- The same loop accepts ScreenPal-style video commentary instead of typed comments. The orchestrator transcribes the video, extracts the change requests, and runs the same precise implementation flow. Lower friction for non-technical reviewers, same downstream discipline.
- Voice notes from sales calls or stakeholder conversations become precise UI changes shipped the same day, all with the LOCKED-zone discipline preventing the kind of architectural drift Puck produced.
- The orchestration layer becomes the institutional knowledge: each new AI tool that emerges plugs into the same loop without rewriting the discipline. Code stays the source of truth; the editing layer becomes interchangeable.

---

## 6. What this isn't

For honesty:

- It's not a CMS. There's no separate content database, no editor app, no draft/publish workflow. The code is the content.
- It's not a no-code platform. The orchestration layer requires Claude. Reviewers don't write code, but the orchestrator does.
- It's not a project management framework. There's no Jira, no Notion board for tasks, no sprints. The pinned page list and the Vercel comment threads are the entire coordination system.
- It's not locked into any single AI tool. Both the orchestrator and the implementer are Claude today; either could be swapped out without rewriting the loop. Code-first means tool-agnostic.

---

## 7. Image generation brief

For a single hero visual that captures this story in one frame.

**Concept:** The journey from chaos to clarity. Three visual states arranged left-to-right (or top-to-bottom) with a clear progression:

1. **Left/top — chaos:** a tangle of overlapping editor windows, CMS panels, and floating UI rectangles in muted reds and corals, suggesting many systems half-built and conflicting. Subtle architectural-drift visual: layers of editor abstractions stacked on top of each other, slightly askew.
2. **Center/middle — the pivot:** a single clean inflection point. Empty space, or one bold line / arc transitioning the color palette from warm chaos to cool clarity. Suggests "the realization."
3. **Right/bottom — clarity:** a single elegant loop diagram. Four nodes labeled (small but readable): Reviewer → Orchestrator → Implementer → Production, with a feedback arrow returning from Production back to Reviewer. Color: teal and dark navy gradient, premium fintech feel matching the AutoPilotROI brand (dark backgrounds, cinematic gradients, strong card containment).

**Style notes:**

- Premium fintech SaaS aesthetic. Think OnePay, Linear, modern Stripe pages. NOT corporate-stock-photo style.
- Dark mode primary, with selective glow / gradient accents.
- Sans-serif typography only. Sentence case (never ALL CAPS in display text).
- Minimal but present text labels — enough to anchor the meaning, not so much that the image is a wall of words.
- Aspect ratio: 16:9 or 3:2 wide for a social/post hero image.
- No emoji. No clip art. No literal screen mockups (no fake "code in IDE" or "comment popups" — the visual is more conceptual).

**Optional tagline at the bottom of the image:** "From visual CMS to code-first review loop." (Sentence case, small, secondary text.)

**What to avoid:**

- Don't show a literal Puck logo or any specific tool branding (Vercel, Google, etc.).
- Don't make it look like a tech-vendor explainer slide.
- Don't include human figures — the story is about the system, not the people.
- Don't make it overly busy. The chaos side should feel chaotic; the clarity side should feel clean and confident.

The image should work as a Basecamp post header, a video thumbnail, or a landing/about-page illustration without modification.
