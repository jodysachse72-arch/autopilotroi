# Vercel Preview + Comment Flow — Setup Prompt

Paste this into Claude in Antigravity FIRST, before any editing work. It sets up and verifies the preview + comment review loop end to end. It does what it can via git/CLI and hands you exact dashboard click-paths for the UI-only parts, then validates the whole loop with a throwaway test change.

```
GOAL: Set up the Vercel preview + comment review flow for the AutoPilotROI frontend repo, end to end, and verify it works. Do NOT make any product/design changes — this is workflow setup only.

Work through these steps. For anything you can do via git, the gh CLI, the vercel CLI, or repo config files, do it. For anything that requires the Vercel or GitHub web dashboard, give me the exact menu path to click and wait for me to confirm before continuing.

1. CONFIRM THE REPO IS CONNECTED TO VERCEL
   - Check whether this repo has a Vercel project linked (vercel CLI / vercel.json). If not, tell me exactly how to connect it in the Vercel dashboard.

2. ENABLE PREVIEW DEPLOYMENTS
   - Confirm Vercel auto-deploys a unique preview URL for every branch/PR. This is on by default — tell me where to verify it (Vercel project → Settings → Git) and what the setting should read.

3. ENABLE VERCEL COMMENTS ON PREVIEWS
   - Confirm Vercel Comments / the Toolbar is enabled for preview deployments. Tell me the exact path to check it (Vercel project → Settings → Comments / Toolbar) and what it should be set to.

4. PROTECT MAIN
   - main must be production and protected: no direct pushes, changes only via PR. If you can set branch protection via the gh CLI, do it (require a pull request before merging to main). If not, give me the exact GitHub path: Settings → Branches → Add branch protection rule on main → require a PR before merging. Confirm when done.

5. GIVE BARRY ACCESS
   - Tell me exactly how to add Barry to the Vercel project so he can view previews and leave comments (Vercel project → Settings → Members, or the team invite flow). List what role/permission he needs to comment.

6. VALIDATE THE FULL LOOP WITH A TEST
   - Create a throwaway branch named test-preview-flow.
   - Make one tiny, reversible, non-visible change (e.g. a code comment or a single harmless text tweak) just to trigger a deploy.
   - Push the branch and get the Vercel preview URL.
   - Give me that preview URL and tell me to open it, turn on comment mode, and leave a test comment, so we confirm commenting works.
   - Once I confirm, delete the test branch (do not merge it).

7. REPORT
   - Summarize the final state: repo connected (yes/no), previews on, comments on, main protected, Barry added, test loop passed. Flag anything still outstanding.

Restate this plan in one or two lines first, then start at step 1. Pause for my confirmation on any dashboard step before moving on.
```

## What to expect
- The click-only parts are usually: enabling Comments, adding Barry, and branch protection. Claude hands you the paths rather than clicking them.
- Step 6 is the important bit — it proves the loop works on a disposable change, so your first real change (the content pass) isn't also the first time you discover a broken setting.
- Once this passes, switch to ANTIGRAVITY-PROMPT.md (Part 1 rules + Part 2 per-change template) for actual edits.
```
