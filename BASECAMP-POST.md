# From Puck to production — a quick recalibration story

For the last two months I've been trying to build a way for our non-technical teammates to edit AutoPilotROI without breaking anything. I tried three different visual editors and a custom CMS on top of our bespoke frontend. None of it stuck. The frontend kept degrading, AI agents kept reinterpreting approved work, and by the end I was spending more time keeping the editor system alive than actually editing anything.

Last week, Google shipped a major Antigravity update that changed how AI agents read, scope, and edit code. That was the straw that broke the camel's back of the visual-CMS approach. I stepped back, threw out the editor stack we'd been layering together, and rebuilt the editing flow from scratch around a completely different idea.

**The realization in one sentence:** Barry didn't need a visual CMS. He needed a *review surface*.

The new loop uses the frontend code as the single source of truth, Vercel Comments on live previews as the review surface (Barry clicks on the page, types what to change, hits send), and Claude as the implementer — with explicit "locked-zone" discipline that prevents AI from silently regressing approved work the way it kept doing before. There's also an override mechanism for when we actually want to change something locked, so legitimate design changes still happen — they just can't happen by accident.

**What's already real:**

Today I shipped two changes end to end through the new loop:
- The hero badge now reads "✦ AI MANAGED FINANCE" (the basecamp request from earlier this week)
- More visible breathing room between section cards on the homepage

Both production-live. Zero regressions. The whole loop — comment → orchestrator → Antigravity → preview → ship — ran in under fifteen minutes per change.

**What's next:**

- A short video walkthrough is coming so you can see the actual flow in motion
- Tomorrow Barry gets the review guide plus the list of pages he can start commenting on (homepage, FAQs, terms, privacy, etc.)
- While he reviews, I'm focused on shipping the signup → waiting room → onboarding funnel
- Same loop handles every change going forward, regardless of who's reviewing or what's being changed

The Puck detour was expensive but it taught us what we don't need. The new flow is simpler, more durable, and works with any future AI tool — because the code is the truth, not a CMS data format we'd be locked into.
