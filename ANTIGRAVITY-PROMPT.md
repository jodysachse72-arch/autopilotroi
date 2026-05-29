# ANTIGRAVITY-PROMPT.md — Archived (May 28, 2026)

This file previously held a Part 1 "non-negotiable rules" prompt and a Part 2 per-change template intended to be pasted into Antigravity manually for each change.

**It is no longer used.**

The operating model changed on May 28, 2026 after Test 1 + Test 2 of the review loop validated a better flow. Per-comment prompts are now generated fresh by the orchestrating Claude session, with the current strengthened rules — including the LOCKED-zone hard refusal and the explicit override phrase `override LOCKED for this change` — baked in every time. There is no template to maintain, paste, or keep in sync.

## Current operating model

1. Leave a comment on a Vercel preview using the toolbar.
2. Click "Copy for Agent."
3. Paste the comment + framework context to the orchestrating Claude session.
4. Claude generates a complete, paste-ready Antigravity prompt with the latest rules.
5. Paste the prompt into a fresh Antigravity Sonnet 4.6 session.
6. Approve or reject Antigravity's restate-and-confirm.
7. Antigravity commits and pushes from its own environment, opens the PR, and merges on `ship it`.

The mechanism, the LOCKED zone, and the override phrase live in [WORKFLOW.md](./WORKFLOW.md).

## If you ever need the old template

The original Part 1 / Part 2 content is preserved in git history:

```
git log --all --oneline -- ANTIGRAVITY-PROMPT.md
git show <pre-archive-SHA>:ANTIGRAVITY-PROMPT.md
```

But you almost certainly don't need it. The current per-comment prompt is stricter and more current than the old template was.
