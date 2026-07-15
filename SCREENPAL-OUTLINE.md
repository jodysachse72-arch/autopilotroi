# ScreenPal Video Outline — AutoPilotROI Production Flow

> **Historical outline.** Do not use this to train Barry on the current process. It demonstrates the retired Antigravity/LOCKED-zone workflow. Use `REVIEW-GUIDE-for-Barry.md` instead.

Total target length: 6–8 minutes. Conversational, not scripted. Use these as talking points to riff from, not lines to read.

## 1. Cold open — the punchline first (~30 sec)

Set the stake immediately.

> "For the last two months I've been trying to build a way for non-technical people on our team to edit our site without breaking it. I tried three different visual editors. None of them worked. Today I'm going to show you what does — and why this is the foundation we're building the rest of AutoPilotROI on top of."

Show: live production homepage. Just the page, no UI.

## 2. The Puck story — what we tried, briefly (~1 min)

The honest version. Don't dwell — name it, explain why we did it, explain why it broke.

- We wanted a Thrive Themes-style visual editor so Barry could edit pages without code.
- We picked Puck because it's the modern open-source visual CMS.
- We bolted Puck onto our custom frontend, wrote our own CMS layer, built an admin editor.
- Three problems compounded:
  1. **Architecture drift** — Puck wants to own the rendering pipeline, our frontend is bespoke. The bolt-on points kept breaking.
  2. **AI agents reinterpreting approved work** — every time we asked Claude or another AI to make a small change, it would "improve" things we didn't ask it to touch. The frontend quality kept degrading.
  3. **Editing abstractions on top of editing abstractions** — by week six we had a CMS for the CMS for the components. Nobody could remember how it all fit together.

The killer moment: I realized I'd spent more time keeping the editor system alive than actually editing anything.

Show (briefly): screenshot of the deleted `puck.config.tsx` file (106 KB). Or just the commit message `chore: remove dangling Puck consumers`.

## 3. The realization (~30 sec)

The pivot point. This is the insight worth lingering on.

> "Barry didn't need a visual CMS. He needed a review surface. A way to point at something on the live site and say 'change this.' That's it. The whole visual editor was the wrong problem."

The frontend itself is good — premium fintech design, dark/light rhythm, cinematic gradients, strong containment. Nothing wrong with it. We just needed a way for Barry to tell us what he wants changed.

## 4. The new model — show the whole loop live (~2–3 min)

This is the meat. Walk through one real round-trip in the video. Use the badge change from today as the example.

Steps to demo:

1. **Open the production preview.** Show the page. Click the Vercel comment toolbar at the bottom — point at it.
2. **Click on the hero badge.** Type a comment: "Change this to AI MANAGED FINANCE."
3. **Click Copy for Agent.** Switch tabs.
4. **Paste into Claude (the orchestrator).** Show Claude's response — the full prompt with rules, change request, restate-and-confirm process.
5. **Paste the prompt into Antigravity.** Show the restate step — Antigravity tells you exactly what file it'll touch before any code is written.
6. **Type "go".** Watch Antigravity make the change, show the diff (one line, one file).
7. **Approve. Antigravity pushes.** Vercel auto-deploys a new preview.
8. **Open the new preview, verify the change.** Toggle between preview and production at the same viewport.
9. **Say "ship it."** Antigravity merges to main, production redeploys.

Narrate as you go. Key callouts during the demo:

- **The restate-and-confirm step.** "This is the most important part — the agent has to tell me exactly what it's going to do before it writes any code. If I don't like the restate, it doesn't proceed."
- **The scoped diff.** "One file, one line. Not 'while I'm here let me also restructure these other components.' This is the discipline that protects the approved frontend."
- **The LOCKED zone.** "Spacing, padding, layout — anything that affects how the page is composed — is locked by default. The agent literally cannot change it without me providing an explicit override phrase."

## 5. Why this is future-proof (~1 min)

The strategic part — why this isn't just a workaround, it's the right foundation.

- **Code-first means we own the truth.** No CMS vendor lock-in. No editor data format. Just files in Git. Works with any AI agent today and any one that exists tomorrow.
- **Vercel Comments is mature, shared infrastructure.** Real engineering teams use it. Not a vibe-coded chrome extension that goes away in six months.
- **The LOCKED-zone discipline is enforced in the prompt itself.** We don't rely on the agent remembering rules — we generate the rules fresh every change, with the override mechanism for intentional design updates.
- **The orchestration layer is where the discipline lives.** Barry doesn't need to learn how to prompt AI. The AI doesn't need to understand what's important about our specific frontend. The middle layer (Claude in Cowork) holds the institutional knowledge.
- **Scales horizontally.** Adding a third reviewer is the same as adding a second — they leave Vercel comments, same loop runs.

## 6. What this enables, and where it's going (~30–45 sec)

Close on the forward vision.

- **Immediate:** Barry can start reviewing content on the homepage, FAQs, and other public pages today. I focus on the signup → waiting room → onboarding funnel without anyone stepping on anyone.
- **Soon:** Same loop, but instead of typing comments, share short ScreenPal videos describing what should change. The orchestrator transcribes and runs the same precise implementation flow. Lower friction for non-technical reviewers, same discipline downstream.
- **Eventually:** Whole sections of the product evolved this way — voice notes from sales calls become precise UI changes shipped the same day, all with the same containment discipline preventing the kind of architectural drift that burned us with Puck.

## 7. Hard cut to the production homepage (~5–10 sec)

End on the artifact. Let the page speak for itself.

> "This is what we're shipping on now. Here's the part where you stop hearing about it and start using it."

End.

---

## Notes for the recording

- **Talk over the demo, don't pause to narrate every click.** Keep momentum.
- **Don't apologize for the Puck detour.** Frame it as the learning that made the new model possible. It WAS the learning that made the new model possible.
- **The single most important sentence in the whole video:** "Barry didn't need a visual CMS. He needed a review surface." Land on that. Pause after it.
- **If you blank on technical details mid-demo,** just say "the code change happens here, takes about a minute" and move on. The audience cares about the loop, not the syntax.
- **Don't show the Antigravity prompt content in full.** Just say "the orchestrator generates a prompt with all the discipline baked in." Showing the prompt makes it look complicated; describing it makes it look elegant.
