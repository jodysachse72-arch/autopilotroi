# AutoPilotROI — Working Workflow

The operating manual for getting changes into the site without architecture chaos. Source of truth is the **real frontend code in Git**. Implementation happens in **Claude-in-Antigravity** (git + Supabase access). Review happens on **Vercel preview deployments via Vercel Comments**. There is no CMS, no visual builder, no Stitch in this loop.

## The roles

- **Code (Git):** the single source of truth. The approved frontend lives here and is treated as a fixed, high-value asset — not something to "rebuild."
- **Antigravity (Claude):** where approved changes get implemented in code, and where Supabase (your backend/DB) is wired in. This is your build environment.
- **Vercel:** auto-deploys a preview URL for every branch/PR. Hosts the live comment threads.
- **Barry:** reviews on the preview and leaves comments. Never touches code.
- **You (Jody):** triage comments, direct the implementation in Antigravity, approve, promote to production.

## The loop (memorize this)

1. **Request** — Barry (or you) leaves a comment on the preview, pinned to the exact element.
2. **Branch** — create a short-lived branch for that change (e.g. `nav-dropdown`, `hero-copy`).
3. **Implement** — in Antigravity, make a **scoped, diff-level** change. Edit the specific component/file. Do not regenerate pages or "improve" surrounding code.
4. **Preview** — push the branch. Vercel builds a fresh preview URL automatically.
5. **Review** — send Barry the new URL. He resolves the comment or replies.
6. **Merge** — when approved, merge to `main` and promote to production.

One comment → one branch → one small diff → one preview. Keep changes small and the loop stays fast and predictable.

## Branch & protection setup (one-time)

- **`main` is protected and is production.** No direct pushes. Changes arrive only via merged branches/PRs. (GitHub: Settings → Branches → add a protection rule on `main` requiring a PR before merge.)
- **Every branch gets an automatic preview** — Vercel does this by default once the repo is connected. Confirm "Preview Deployments" is on in the Vercel project settings.
- **Turn on Vercel Comments** for preview deployments (Vercel project → Settings → look for Comments/Toolbar; it's on by default for previews). Give Barry access to the project so he can comment.
- **Branch naming:** short and descriptive — `hero-copy`, `nav-dropdown`, `pricing-section`. One concern per branch.

## Where Supabase fits (the architecture boundary)

Keep four concerns separated by hard edges. Build them in this order; do not build the later ones until you need them.

1. **Public frontend** — what's approved and nearly ready. Static/SSR on Vercel. No auth. **Ship this first.**
2. **Onboarding flows** — the signup/KYC funnel. Frontend renders the steps; **Supabase owns the state, validation, and data.** The frontend talks to Supabase only through its client/API — never embeds business logic in the UI.
3. **Partner/backend** — anything beyond onboarding lives behind the same API boundary (Supabase functions/tables). The frontend knows it only through a documented contract.
4. **Admin systems** — a **separate app behind auth.** Do not bolt dashboards into the public frontend. Defer until after launch.

The one rule that prevents future chaos: **the public frontend talks to everything else only through APIs (Supabase), never through shared rendering or shared components.**

## Guardrails — how to stop AI redesigning approved work

This is the discipline that fixes what went wrong before. In Antigravity:

- **Never say "rebuild," "redesign," or "improve the page."** Those words invite reinterpretation. Say "change this specific thing in this specific file."
- **Scope every task to one approved comment.** "Barry's comment says the CTA should be teal — change the CTA colour token in `Button.tsx`." Nothing broader.
- **Review the diff before merge.** If the diff touches files it shouldn't, reject it. Approved components don't change unless a comment asked them to.
- **Treat the frontend as finished.** It is not a thing to keep re-solving. Visual design (colours, gradients, typography, card style) is locked.
- **No regenerating from the live site.** Anchor every task to the existing repo, never to a fresh interpretation of the deployed site.

## First two exercises (to build the muscle this week)

1. **Content/copy pass** — Barry comments on wording across the site. Each comment → tiny text-only diff → preview → resolve. Lowest risk, fastest reps. Great for getting up to speed.
2. **Navigation dropdown** — Barry comments where he wants it and what's in it. This is your first *structural* change through the full loop: branch `nav-dropdown` → implement in Antigravity → preview → review → merge. If this loop feels clean, your whole process works.

## What you've stopped doing

No Puck, no custom CMS, no inline editing, no Stitch-as-editor, no visual builders, no asking AI to reinterpret approved work, no admin dashboards before launch. The bottleneck was a review surface, and you now have one.

## Definition of "ready to launch"

Frontend frozen and approved · review loop run successfully on at least one real change · onboarding flow wired to Supabase and functional · `main` protected · previews + comments working for Barry. Admin and anything CMS-shaped come after.
