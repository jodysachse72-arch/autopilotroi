-- ═══════════════════════════════════════════════════════════════
-- PCC-1: Add 'resource' to cms_posts type check constraint
-- and seed initial partner resources.
-- ═══════════════════════════════════════════════════════════════

-- 1. Widen the type check constraint to include 'resource'
ALTER TABLE cms_posts DROP CONSTRAINT IF EXISTS cms_posts_type_check;
ALTER TABLE cms_posts ADD CONSTRAINT cms_posts_type_check
  CHECK (type = ANY (ARRAY[
    'blog'::text,
    'faq'::text,
    'video'::text,
    'page_copy'::text,
    'resource'::text
  ]));

-- 2. Seed initial partner resources
--    meta.status = resource lifecycle (active | featured | needs_review | broken | archived)
--    post status  = 'published' so the read path picks them up
INSERT INTO cms_posts (type, slug, title, body, body_html, meta, status, sort_order)
VALUES
  (
    'resource',
    NULL,
    'Neyro Product Overview Video',
    NULL,
    NULL,
    '{"url": "https://www.youtube.com/watch?v=neyro-overview", "resource_type": "video", "category": "Neyro", "status": "featured", "official": true, "last_verified": "2026-05-01", "description": "Official Neyro product walkthrough video. Great first resource for new partners."}',
    'published',
    10
  ),
  (
    'resource',
    NULL,
    'AutopilotROI Wallet Setup Guide',
    NULL,
    NULL,
    '{"url": "https://docs.autopilotroi.com/wallet-setup.pdf", "resource_type": "pdf", "category": "Wallet", "status": "active", "official": true, "last_verified": "2026-04-15", "description": "Step-by-step PDF guide for setting up your AutopilotROI partner wallet."}',
    'published',
    20
  ),
  (
    'resource',
    NULL,
    'Partner Onboarding Checklist',
    NULL,
    NULL,
    '{"url": "https://docs.autopilotroi.com/onboarding-checklist.docx", "resource_type": "doc", "category": "Onboarding", "status": "active", "official": true, "last_verified": "2026-05-10", "description": "Complete checklist to ensure a smooth partner onboarding experience."}',
    'published',
    30
  ),
  (
    'resource',
    NULL,
    'Presentation Deck – Q2 2026',
    NULL,
    NULL,
    '{"url": "https://slides.autopilotroi.com/q2-2026-deck", "resource_type": "link", "category": "Presentation", "status": "active", "official": false, "last_verified": "2026-04-01", "description": "Partner-facing slide deck covering Q2 2026 product roadmap and milestones."}',
    'published',
    40
  ),
  (
    'resource',
    NULL,
    'Support FAQ Knowledge Base',
    NULL,
    NULL,
    '{"url": "https://support.autopilotroi.com/faq", "resource_type": "link", "category": "Support", "status": "active", "official": false, "last_verified": "2026-05-20", "description": "Searchable knowledge base covering common partner support questions."}',
    'published',
    50
  )
ON CONFLICT DO NOTHING;
