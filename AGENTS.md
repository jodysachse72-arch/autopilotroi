<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## AutoPilotROI operating rules

- Read `WORKFLOW.md` and `PROJECT-CURRENT-STATE.md` before making project changes.
- The shared ChatGPT project is the current collaboration surface. Users may request changes in ordinary language; translate intent into a complete, verified implementation.
- There is no LOCKED zone or special override phrase. Make visual, layout, copy, frontend, backend, and data changes when requested while preserving unrelated approved work.
- All current work concerns the new Vercel-hosted application. The existing public WordPress site and public-domain switch are out of scope until Jody explicitly starts the launch phase.
- Keep real safeguards intact: authentication, authorization, RLS, secrets, data integrity, tracked migrations, protected `main`, and pull-request review.
- Inspect the full relevant path and verify in proportion to risk. Do not report a surface edit as complete when the requested behavior crosses UI, API, auth, or database boundaries.
