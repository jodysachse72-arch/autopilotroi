# Self-Test Playbook — Validate the Loop Before Barry

You are testing the review loop alone, acting as fake-Barry, before inviting the real Barry. The goal is to prove the full loop works on real changes without you having to coach it in real time. When the loop feels boring and predictable, Barry can come in.

## What you're actually testing

The full round-trip: **comment → Copy for Agent → Antigravity → diff → preview → resolve → merge.** Not "does Antigravity write code." That's already proven. You're testing whether the *process* protects the approved frontend.

You're also testing the guardrails: the Part 1 rules prompt, the per-change template, the containment lock, and the anti-gaslighting tactic. If any of these silently fail, you find out now — not while Barry is watching.

## Prereqs (don't start until all green)

1. Production deploys cleanly from `main` (no Puck build errors).
2. Latest preview URL is live and the Vercel toolbar/comment widget is visible at the bottom of the page.
3. Antigravity is open, ready for a fresh session.
4. `ANTIGRAVITY-PROMPT.md` Part 1 rules are pasted at the start of every test session (don't skip this).
5. You can recall the `main` HEAD SHA from `git log -1 --oneline` for use as the reference when needed.

## Test 1 — Smallest possible content round-trip

Goal: one fake-Barry comment, one tiny copy change, one diff, one preview, resolve. End-to-end.

1. Open the latest preview URL.
2. Click the comment icon, click on a specific piece of body copy (a headline, subheading, or paragraph — not a button or structural element).
3. Type a Barry-style comment in plain English. Be specific:
   - Good: "Change this headline to 'Built for fintech operators who hate spreadsheets.'"
   - Bad: "Make this better."
4. Submit. Click "Copy for Agent" on the resolved thread.
5. In Antigravity (Opus or Sonnet 4.6), in a fresh session:
   - Paste the Part 1 rules prompt first.
   - Then paste the Part 2 per-change template, fill in the change request with what you just copied, and set the branch name to something like `content-headline-fix`.
6. Watch for the restate-and-confirm step. It must:
   - Restate the change in one sentence.
   - Name the file(s) it will edit.
   - Wait for your "go" before coding.
   If it skips this, that's a Part 1 rules failure — stop, repaste Part 1, try again.
7. Approve. Let it implement.
8. Review the diff. It must touch only the file(s) it named. If it touches anything else (other components, globals.css, layout files), reject — don't merge.
9. Push the branch. Get the new Vercel preview URL.
10. Open the new preview. Verify the copy change. Verify nothing else moved.
11. In Vercel, resolve the comment thread.
12. Merge the branch into `main` via PR. Delete the branch.

**Pass criteria:** the change landed exactly as requested, no unrelated diff, no preview regressions, comment resolved cleanly. Total round-trip should feel like 5–15 minutes including the implementation wait.

If anything failed, that's your first finding. Tighten the prompt before retrying.

## Test 2 — Adversarial scope-creep test

Goal: prove the rules prompt catches an over-broad request.

1. Pick a piece of copy. Leave a Barry-style comment that's *slightly* over-broad on purpose:
   - "Make this section feel more premium."
2. Copy for Agent, paste into a fresh Antigravity session (Part 1 + Part 2 template again).
3. Antigravity SHOULD stop and ask you to scope it. If it instead proposes touching multiple files, restyling cards, or "improving" anything, the rules prompt is too soft — strengthen Part 1 and re-test.
4. Once it asks for scope, give it a tightly scoped reply: "Change this headline to X. Don't touch anything else."
5. Continue as in Test 1.

**Pass criteria:** Antigravity refused to act on the vague request and waited for a scoped one.

## Test 3 — Verify the in-flight dropdown + mobile menu work survived the cleanup

The dropdown and light mobile menu were built during the comment-flow validation earlier this week. They're now part of `main`. You haven't formally walked them through the loop with a fresh review.

1. Open the production URL.
2. Open the desktop nav dropdown — Start and Resources should both expand on hover with the items you specified.
3. On mobile (or browser at narrow viewport), open the hamburger — white background, electric blue accents, accordion behavior.
4. Compare against `archive/visual-skin-upgrade` if you want a visual sanity check on containment (use the anti-gaslighting tactic from WORKFLOW.md: same viewport, same scroll position, identify any delta).
5. If anything is off, leave a Vercel comment, run it through Tests 1 / 2 flow.

**Pass criteria:** dropdown and mobile menu behave as designed, containment matches the archived reference, no regressions from the cleanup commit.

## Test 4 — Anti-gaslighting drill (do this once, even if everything looks fine)

Goal: practice the move so you don't have to invent it under pressure later.

1. In Antigravity, ask it to compare the production URL against the previous preview at the same viewport width. Tell it explicitly: "Open both, compare section widths, padding, gaps, and wrapper structure. Do not tell me it's fine — show me a structural side-by-side."
2. Read what it produces. Ask yourself: would this catch a silent containment regression? If not, refine the wording in WORKFLOW.md.

**Pass criteria:** you have a re-usable, copy-pasteable wording for the anti-gaslighting move that produces useful output.

## When Barry can come in

Don't invite him until ALL of these are true:

- You've done at least 3 content round-trips through Test 1 and each one finished without you stepping in mid-implementation.
- Test 2 caught a vague request on first try.
- Test 3 confirmed no regressions from the cleanup.
- You know exactly what to say when the agent says "it's fine" but you don't believe it.

When that's true, send Barry `REVIEW-GUIDE-for-Barry.md` and the production URL. He starts on the content/copy pass — the gentlest first exercise.

## Stop conditions during testing

If any of these happen, pause and address before continuing:

- The diff touches files outside the named scope.
- The agent makes a containment, width, or wrapper change you didn't ask for.
- The agent asserts something is correct that you can see is wrong.
- A preview deployment breaks the build or visibly regresses.
- You catch yourself thinking "I'll just let this one slide."

Each of these is a process bug, not a code bug. Fix the process, then resume.
