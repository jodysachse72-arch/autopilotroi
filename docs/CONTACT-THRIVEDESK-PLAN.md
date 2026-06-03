# Contact Us + ThriveDesk Dual-Write (Stubbed)

*ThriveDesk credentials not available yet. Build so that (1) nothing is lost while ThriveDesk is offline — Supabase is the durable store — and (2) dropping in the API key later activates the secondary write with no rebuild.*

## Key facts
- The ThriveDesk adapter (`src/lib/integrations/thrivedesk.ts`) is already fail-safe: no `THRIVEDESK_API_KEY` → logs + returns `{success:false}`, never throws.
- BUG to fix: signup currently calls `submitToThriveDesk` **client-side**, but the adapter reads server-only `process.env.THRIVEDESK_API_KEY` → it can never work there. Move the call **server-side**.
- No `contact_messages` table exists; contacts must persist to Supabase (durable) so stub period loses nothing.
- Navbar "Contact" mis-points to `/signup` (old backlog item) — fix to `/contact`.

## Build
1. **DB:** `contact_messages` table — id, name, email, subject (nullable), message, source (default 'contact'), thrivedesk_synced bool (default false), created_at. RLS enabled; writes via service-role route only. Also add `thrivedesk_synced bool default false` to `leads` for backfill readiness.
2. **/contact page:** premium-light form (name, email, optional subject, message), success state, Turnstile + rate-limit (mirror /signup).
3. **/api/contact route:** validate → insert to `contact_messages` (service-role) → call `submitToThriveDesk` server-side (no-op until key); set `thrivedesk_synced` from the result. Fail-safe: ThriveDesk no-op still returns success to the user.
4. **Signup dual-write fix:** remove the client-side `submitToThriveDesk` call; call it server-side in `/api/leads` after the lead insert (fail-safe), setting `leads.thrivedesk_synced`.
5. **Nav:** point navbar "Contact" → `/contact`.
6. **Env:** ensure `.env.example` documents `THRIVEDESK_API_KEY` (+ inbox id) and a comment that it's stubbed until set.

## Backfill (when credentials arrive — documented, not built now)
- With `thrivedesk_synced` flags in place, a later admin-only route/script can find `thrivedesk_synced=false` rows in `leads` + `contact_messages` and submit them. Leave a TODO; don't build/test now (no creds).

## Out of scope
- Actual ThriveDesk activation (needs creds), the backfill job, and any ThriveDesk-specific UI.
