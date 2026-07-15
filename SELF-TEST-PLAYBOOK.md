# Self-Test Playbook — Retired

The Antigravity and Vercel Comments certification procedure formerly stored here is retired. It tested restrictions that no longer belong to the AutoPilotROI workflow, including the LOCKED zone, special prompt templates, deliberate refusal of broad requests, and a one-comment/one-diff loop.

## Current certification exercise

Use one genuine, low-risk change Barry actually wants:

1. Barry describes the change naturally in the shared AutoPilotROI ChatGPT project.
2. ChatGPT inspects the relevant implementation and makes the complete change on a focused branch.
3. ChatGPT runs checks appropriate to the change and provides a Vercel preview.
4. Barry reviews it and responds naturally with approval or refinement.
5. ChatGPT incorporates any refinement, verifies again, and merges through a pull request after approval.

The exercise passes when Barry can complete that loop without technical prompting or a second collaboration tool, the requested outcome works, and unrelated behavior remains intact.

See `WORKFLOW.md` for the current operating model.
