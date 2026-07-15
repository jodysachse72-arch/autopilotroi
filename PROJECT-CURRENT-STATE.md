# AutoPilotROI — Current Project State

Verified July 15, 2026. This document is the starting context for ChatGPT, Jody, and Barry. Update it when a meaningful milestone changes the facts below.

## Working environment

- Repository: `jodysachse72-arch/autopilotroi`
- Canonical branch: protected `main`
- Current baseline commit: `ba46c57` (merged PR #29 on July 15, 2026)
- Application: Next.js frontend and server routes, Supabase database/auth, Vercel deployments
- Current phase: development and full-project refinement
- Build status at reconnection: production build passes and reports 66 routes
- Lint status at reconnection: existing debt remains (16 errors and 12 warnings); do not mistake it for a clean baseline

All current work is confined to the new Vercel-hosted application. The existing public WordPress site and the eventual domain switch are not part of development work. They enter scope only when Jody explicitly begins the launch phase.

## Completed foundation

- Removed abandoned Puck/Payload/editor systems and consolidated DB-backed editing for blog posts, FAQs, and Command Center resources.
- Added real admin email/password authentication and removed demo backdoors.
- Fixed partner referral attribution through the funnel and added saved Aurum partner IDs.
- Built the gated Partner Command Center foundation with Start Here and searchable Resource Library.
- Wired Contact Us submissions to the database, with ThriveDesk integration stubbed for credentials.
- Replaced placeholder Admin Prospects data with real lead records and reconciled lead column names on the read path.
- Refined the homepage ecosystem product status indicators and merged the approved result in PR #28.
- Rebuilt `/faqs` as a searchable, topic-led help center while preserving the approved responsive card containment; merged in PR #29.

## Needs hands-on verification or refinement

- Exercise the `/admin/cms` resource editor end to end in the UI.
- Review onboarding Advanced mode and its completion card.
- Confirm the live Aurum registration base URL.
- Test login with real credentials on a Vercel deployment.
- Test Command Center gating in live sessions for allowed and disallowed roles.
- Review the Command Center Start Here and Resource Library experience with real eyes.
- Finish the remaining admin work: email templates and activity log.
- Decide whether the parked re-engagement drip should be completed and, if so, define its missing schema intentionally.
- Populate the Command Center with real resources before building the deferred AI assistant over that corpus.

## Verified connected services

- Vercel project is connected to the GitHub repository and the current `main` baseline.
- Supabase project is active and reachable.
- At reconnection, the database contained 4 auth users, 4 profiles, 4 leads, 8 readiness responses, 12 CMS posts, no contact messages, and no referral links.
- The previously documented contact-message and partner-code test residue was not present when checked.

## Important audit finding

The `cms_posts` table currently has a broad public write policy (`cms_posts_write_all`). Treat this as a real security issue to remediate through a reviewed, tracked Supabase migration. Do not confuse removal of the old AI workflow guardrails with permission to weaken application security.

Migration history also appears older than parts of the live schema. Before substantial database work, reconcile the repository migrations with the live Supabase schema so future changes remain reproducible.

## Deliberate gaps

- Partner creation remains a manual Supabase process; there is no self-serve invite flow.
- ThriveDesk sync awaits Barry's credentials and will require a one-time backfill after activation.
- The Command Center contains only sample resources.
- The Command Center AI assistant is deferred until a meaningful content corpus exists.
- The re-engagement drip is guarded and parked because the code previously expected columns that do not exist in the live leads table.

## Recommended next move

Run one genuine, low-risk Barry-style change through the new loop: natural-language request, implementation, verification, Vercel preview, conversational refinement, and PR merge. Then continue the project audit section by section, beginning with authentication/gating and the CMS resource editor because they combine user-facing behavior with security-sensitive backend state.
