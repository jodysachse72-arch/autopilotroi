# AutoPilotROI — Current Working Workflow

This is the operating model for AutoPilotROI as of July 15, 2026. The shared ChatGPT project is the collaboration hub. GitHub holds the source of truth, Vercel hosts development deployments, and Supabase provides the database and authentication.

## Scope boundary

- All current work is on the new application deployed through Vercel.
- The existing public WordPress site and its domain are outside this project's working scope.
- Do not inspect, compare with, edit, configure, or point the public domain until Jody explicitly starts the launch/domain-switch phase.
- A Vercel deployment labeled “Production” is still part of the new application's development environment until that explicit launch.

## How Jody and Barry work with ChatGPT

Jody and Barry can describe changes in ordinary language. They do not need file names, selectors, technical prompts, magic phrases, or knowledge of GitHub and Vercel.

Examples:

- “The headline on the signup page feels too salesy. Make it clearer and calmer.”
- “Move this card below the video on mobile.”
- “This flow let me continue without answering the question. Fix it.”
- “Review the Command Center with me. I’ll tell you what I don’t like as we go.”

Screenshots and page names are helpful but not mandatory. ChatGPT should inspect the relevant implementation, translate the request into a complete change, and ask a question only when the answer would materially change the intended outcome.

There is no LOCKED zone and no override phrase. Visual design, spacing, layout, copy, frontend behavior, backend behavior, and data wiring may all be changed when the request calls for it. Preserve unrelated approved work and avoid unrequested redesigns, but never refuse an intended change merely because it affects design or layout.

## The normal change loop

1. **Request** — Jody or Barry explains what should change.
2. **Inspect** — ChatGPT traces the relevant page, components, APIs, database behavior, and likely side effects.
3. **Implement** — make the coherent set of changes needed for the requested outcome.
4. **Verify** — run checks proportional to the risk: targeted tests, build/type checks, browser flow, responsive review, API behavior, and database verification as applicable.
5. **Preview** — publish a Vercel preview when review is useful and provide the exact link and what to examine.
6. **Refine** — Jody or Barry responds naturally in the same ChatGPT conversation.
7. **Merge** — after approval, merge through a pull request to protected `main`.

Related changes may travel together when that makes review clearer. Keep each branch coherent and reviewable; there is no arbitrary one-comment/one-file/one-branch rule.

## Responsibilities ChatGPT owns

- Work from the existing repository rather than reinterpreting the application from scratch.
- Check the blast radius before editing and preserve unrelated user work.
- Follow a feature through the full stack when needed instead of stopping at a cosmetic surface fix.
- State what was verified, what was not verified, and any genuine blocker.
- Keep documentation aligned when architecture, workflow, or project status changes.
- Prefer making progress over asking Jody or Barry to translate business intent into technical instructions.

## Safeguards that remain

The retired AI restrictions are not the same as product security. Keep these real safeguards:

- Authentication, role checks, row-level security, secret handling, and server-side authorization.
- Protected `main` and pull-request review.
- Tracked Supabase migrations for schema or policy changes.
- No secrets in chat, source control, screenshots, logs, or client bundles.
- No destructive production-data actions without explicit authorization and a recovery plan.

Never weaken security or data integrity simply to make a feature easier to implement.

## Platform boundaries

- **GitHub:** canonical code and history. Use short-lived branches and pull requests.
- **Vercel:** development deployments and previews for the new application. Vercel Comments may be used when convenient, but they are optional rather than the collaboration backbone.
- **Supabase:** database, authentication, storage, and server-side data policies. Treat the schema and RLS policies as part of the application, not an external afterthought.
- **ChatGPT:** shared working room for requests, implementation, verification, previews, and refinement.

## Definition of done for a change

A change is done when the requested outcome works, relevant checks pass or exceptions are clearly reported, the reviewable preview is available when needed, and no known adjacent regression has been left hidden.

## Launch boundary

Finishing the application and switching the public domain are separate events. Do not begin domain work because the application appears ready. Jody will explicitly authorize the launch/domain-switch phase when the team is satisfied with the Vercel application.
