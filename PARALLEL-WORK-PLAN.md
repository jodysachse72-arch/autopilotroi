# Shared Collaboration Plan — Jody and Barry

Jody and Barry can work in parallel inside the shared AutoPilotROI ChatGPT project. ChatGPT is responsible for keeping each conversation grounded in the current repository and for preventing overlapping work from being merged blindly.

## How to split work

- Start a conversation around a page, flow, or coherent outcome.
- Say what you want in ordinary language; group related observations when that is easier.
- ChatGPT checks current code and open work before editing.
- Each implementation gets a focused branch and a Vercel preview when review is useful.
- The reviewer responds in the same conversation until the result is approved.
- Approved work merges to protected `main` through a pull request.

Jody and Barry do not need to coordinate file ownership. If two requests overlap technically, ChatGPT should flag the overlap, preserve both intentions, and sequence or reconcile the changes before merge.

## Review status

Keep a short current list in the shared project with three states:

- **Ready to review** — stable enough for feedback.
- **In progress** — actively changing; feedback is welcome, but expect movement.
- **Approved** — reviewed for the current milestone.

This status is guidance, not a permission system. Any part of the Vercel application can be discussed and changed when Jody or Barry requests it.

## Useful first exercise

Choose one visible, low-risk change that Barry genuinely wants—preferably copy, an image, or a contained layout adjustment. Have Barry request it in ChatGPT, let ChatGPT implement and verify it, review the resulting Vercel preview, refine once if needed, and merge after approval. This certifies the real collaboration loop without manufacturing a throwaway test.

## Current boundary

All collaboration concerns the new Vercel-hosted application. Public WordPress and domain-switch work remain outside scope until Jody explicitly starts the launch phase.
