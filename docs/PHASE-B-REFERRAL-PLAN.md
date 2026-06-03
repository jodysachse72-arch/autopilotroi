# Phase B — Referral (Visual / On-Ramp Layer)

*Scoped per Jody. CRITICAL framing: AutopilotROI does NOT generate or track referrals. Referral IDs come from **Aurum**; partners paste their Aurum ID into AutopilotROI. Aurum's backend owns the real mechanics — 3-tier spillover, placement, attribution, commissions. AutopilotROI's job is the visual on-ramp: carry the Aurum ID through the funnel, stamp it on the Aurum signup link, and give partners light visibility. We are the on-ramp, not the ledger.*

## What this means
- We do **not** mint referral codes. `profiles.partner_code` = the partner's **Aurum referral ID**, entered manually.
- We do **not** build spillover/tier/commission logic — Aurum does. The 3-tier spillover is **partner education content** (Command Center / University), not engineering.
- `referral_links` click/conversion tracking = optional nice-to-have visual analytics, NOT source of truth. Defer.
- Partner model: consolidate on `profiles` (role='partner'); the phantom `partners` table the code references does not exist.

## Current state (verified in code + live DB)
- ✅ Capture works: `?ref=ID` → `/signup` → `POST /api/leads` saves `leads.referred_by = ID`.
- ❌ **The seam that broke:** `ref` is NOT carried from waiting-room → onboarding. `PersonalizedPath` links to `/onboarding?tier=X` with **no `&ref`**, and onboarding reads `ref` only from the URL (`searchParams.get('ref')`). So the onboarding "Create Aurum Account" link (`https://app.aurfrn.com/register?ref=...`) ends up with **no ref** → Aurum gets no attribution. The stored lead (`localStorage autopilotroi-lead.ref`) still has it, just isn't used.
- ❌ Generator is freeform: partner types any code, not their saved Aurum ID; nothing persisted.
- ❌ Partner notify is broken: `getPartnerByReferralCode()` queries the nonexistent `partners` table → partners never get the heads-up.

## Plan (priority order)

### B1 — Thread `ref` to the Aurum signup link (TOP PRIORITY)
The revenue-critical fix: make the Aurum ID survive to the Aurum register link so Aurum can attribute.
- Onboarding should derive `ref` from the **persisted lead** (`localStorage autopilotroi-lead.ref`) as the source of truth, with URL `?ref` as a secondary override. Use it to build `https://app.aurfrn.com/register?ref=<id>`.
- Belt-and-suspenders: `PersonalizedPath` (waiting-room) appends the ref to its `/onboarding?tier=...` link too.
- Verify end-to-end: enter via `?ref=TESTID` → signup → orientation → waiting-room → onboarding → the "Create Aurum Account" button URL contains `ref=TESTID`.

### B2 — Store the partner's Aurum ID + generator uses it
- Partner settings: a field to save their **Aurum referral ID** → `profiles.partner_code`.
- `/dashboard/links` auto-fills the code from the saved profile value (still editable), instead of a blank freeform box. Reframe copy: "Your Aurum referral ID" (not "generate a code").

### B3 — Fix partner attribution/notify (consolidate on profiles)
- Refactor `lib/partners.ts` `getPartnerByReferralCode()` and `/api/admin/partners` to read `profiles` where `role='partner'` (match `partner_code`), removing the phantom `partners`-table dependency.
- This makes the assess→notify flow actually reach the partner (visual heads-up, not commission). Admin Partners page reads real data.

### Deferred (not now)
- `referral_links` click/conversion analytics (visual only).
- 3-tier spillover = education content, handled in the partner Command Center, not here.

## Notes
- This pairs with the partner education work: the partner program must teach "get your Aurum ID → paste it here → share your link → Aurum tracks placement/spillover."
