-- Contact messages: durable store for /contact form submissions.
-- Writes go through the service-role API route only (no public RLS policies).
--
-- ThriveDesk dual-write: thrivedesk_synced tracks whether the row was
-- successfully forwarded. When THRIVEDESK_API_KEY is not set the adapter
-- no-ops and the column stays false — ready for a future backfill job.

CREATE TABLE IF NOT EXISTS contact_messages (
  id                uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text         NOT NULL,
  email             text         NOT NULL,
  subject           text,
  message           text         NOT NULL,
  source            text         DEFAULT 'contact',
  thrivedesk_synced boolean      DEFAULT false,
  created_at        timestamptz  DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- No public policies — service-role client bypasses RLS.

-- Add thrivedesk_synced to leads for backfill readiness.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS thrivedesk_synced boolean DEFAULT false;

-- TODO(future): Admin-only backfill job — find rows in leads + contact_messages
-- where thrivedesk_synced = false and submit them to ThriveDesk once
-- THRIVEDESK_API_KEY is configured. Do NOT build this job now.
