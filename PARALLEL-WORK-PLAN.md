# Parallel Work Plan — Jody on Funnel, Barry on Pages

The goal: ship the signup → waiting room → onboarding funnel without waiting on Barry, while Barry does content/copy passes on the public pages without waiting on Jody. Neither blocks the other; both build velocity in parallel.

## The split

### Jody owns (active development — DO NOT review yet)

These are the conversion-funnel pages. Jody is wiring them to Supabase, finalizing flow logic, and making them actually work. They are not visually stable enough for content review.

- `/signup` — signup form, validation, Supabase auth wiring
- `/waiting-room` — post-signup holding state, status communication
- `/onboarding` — multi-step onboarding flow into the Aurum ecosystem

**Status marker:** any page on this list is "in progress, do not comment."

### Barry can start now (content/copy pass — ready for review)

These are the public-facing pages that are visually stable. Barry's first job is a content/copy pass: read every line, click every CTA, request changes via Vercel comments where copy is off, vague, or misses the brand voice.

Likely candidates (confirm which actually exist and are stable in the repo before sending to Barry):

- `/` — homepage (Hero, Stats, Features, HowItWorks, Ecosystem, Testimonials, Pricing, CTA band)
- `/faqs` — FAQ content
- `/products` — product overview
- `/resources` — resources / docs landing
- `/contact` — contact info / form
- `/terms`, `/privacy`, `/disclaimer` — legal copy (especially needs Barry's eye for accuracy)
- `/blog` — blog index, if stable
- `/start` — entry / orientation (if separate from funnel)

**Status marker:** any page on this list is "open for review, Vercel comments welcome."

### Deferred (post-launch)

These exist in the repo but are not part of the launch surface. Nobody touches them this phase.

- `/admin` — admin app, deferred per architecture
- `/dashboard` — partner dashboard, deferred
- Any other route that doesn't appear on the navigation

## The "ready for review" pattern

Without a marker, Barry doesn't know what's safe to comment on, and you waste effort processing comments on pages still in flux. Simple solution:

**Maintain a short pinned message** (Slack, Notion, email, whatever you both use). Two sections:

```
OPEN FOR REVIEW (comment freely):
- /
- /faqs
- /terms
- /privacy
- /disclaimer
- /products
- /resources
- /contact

IN PROGRESS (don't comment yet):
- /signup
- /waiting-room
- /onboarding
```

Update this list as you finish funnel pages and as Barry finishes pages. When `/signup` is ready, move it from "in progress" to "open for review" in that pinned message. When Barry has done a full pass on a page and is happy, mark it ✅ next to the URL.

That's the entire coordination system. No Jira board, no project management tool, no tickets. The list is the system.

## Barry's review process (from REVIEW-GUIDE-for-Barry.md)

Briefly, so you know what you're enabling on his side:

1. Open the production URL.
2. Open the Vercel comment toolbar (bottom of page).
3. Click on an element, type a specific change in plain English.
4. Submit. Repeat as many times as he wants in a session.

He doesn't need to install anything, talk to an AI, or know what a branch is. He clicks, types, submits. The orchestration layer (Claude in Cowork → Antigravity) handles the rest.

## Your processing cadence

Don't try to process Barry's comments in real time — that pulls you out of funnel work constantly. Better cadence:

- **Batch process** Barry's comments once or twice a day. Open the Vercel comment threads, work through them top to bottom, send each to me for prompt generation, paste into Antigravity, ship.
- **Each comment is ~5–10 minutes** end to end through the loop (now that the friction is gone).
- **Keep the funnel work primary.** Barry comments are background work; signup → onboarding shipping is foreground.

If Barry's pace exceeds your processing pace, that's good — it means he's productive and you have a backlog. Process it in batches, no urgency.

## What Barry needs from you to start

A small one-time setup:

1. **Vercel access.** Add him to the AutoPilotROI project on Vercel with comment permission. (Settings → Members → invite by email.)
2. **The REVIEW-GUIDE-for-Barry.md** — the short non-technical doc explaining the loop from his side. Already in this folder.
3. **The production URL** — the live site.
4. **The pinned "open for review" list** above, populated with the actual pages you've confirmed are stable.

That's it. Once he can comment, he can work.

## When the funnel ships

You stop being a bottleneck. At that point you can either:

- **Take a content pass too** on the pages Barry has been reviewing — second pair of eyes before launch.
- **Move to admin / dashboard / partner systems** — the post-launch work.
- **Open the loop to more reviewers** if anyone else needs to weigh in (founder feedback, designer feedback, etc.).

The same loop runs for any reviewer. Adding a third or fourth person costs nothing — they leave Vercel comments, you process them the same way.

## What this plan is NOT

- It's not a project management framework. It's two lists and a comment thread.
- It's not a SLA. Barry comments when he wants; you process when you want.
- It's not gated by approval chains. Once a comment is processed and the preview looks right, it ships. Barry doesn't approve a separate PR — his comment resolved = his approval.

The simplest thing that works.
