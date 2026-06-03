# Onboarding Walkthrough & Audit

*Inventory of everything that currently exists in the onboarding flow, as of this audit. Purpose: a linear walk-through you can read, mark up, and hand to Barry — so the conversation is about "what changes," not "what is it."*

**Status of the surface:** functionally built, content-rich, but **still on the old light theme** (clashes with the now-dark signup / orientation / waiting-room funnel) and carries some literal-text rendering bugs. Referral-ID (`ref`) passing is currently NOT wired through to onboarding — known, deferred.

---

## ✅ LOCKED DECISIONS (this pass)

*Confirmed with Jody. This is the spec the restyle should implement.*

**Final step order — 2 phases, 8 steps:**

**Phase 1 — Get In**
1. **Set up VPN** — regional access must come first.
2. **Create Aurum account** — external hand-off to the Aurum Foundation link carrying the referral ID. Referral is given to / hand-held with the person for now; automated later. Account creation stays on Aurum's site, not in-app.
3. **Confirm email** — click the verification link Aurum emails.
4. **Enable 2FA** — REQUIRED, non-negotiable. Account is secured before any money moves.

**Phase 2 — Fund & Go Live** *(person returns to AutopilotROI for this half)*
5. **Install Trust Wallet**
6. **Buy / fund Trust Wallet** with USDC or USDT
7. **Fund Aurum** — transfer from Trust Wallet into Aurum
8. **Activate EX-AI Bot**

- **Why this order (D2):** account creation moves up to step 2 so the person commits before the heavier crypto work; reduces front-loaded friction. 2FA stays immediately after account creation. All wallet/crypto plumbing is bundled in Phase 2.
- **Videos:** keep embedded on the relevant steps.
- **Completion destination (D3):** drop the person at **/university**. The "Go to Partner Dashboard" CTA is removed this pass — partner-gated resources/dashboard come later once earned.
- **VPN tunneling:** NOT a platform feature. Compliance/liability risk (circumventing Aurum's regional controls) + browsers can't VPN the device. Person sets up their own VPN. (Separate research possible if desired.)
- **Primary goal:** get people signed up into the Aurum platform.
- **Out of scope this pass:** referral-`ref` rebuild (tracked separately), in-site account creation.
- **D1 — DECIDED:** retire `/onboarding/setup` entirely (the 5-step wizard). `/onboarding` is the single canonical surface.
- **Visual bar:** premium / top-tier **LIGHT** theme — clean and bright, in the spirit of onepay.com. Generous white space, soft neutral (not stark-white) background, big confident typography, generously rounded cards with soft diffuse shadows (not hard borders), one vibrant accent color used sparingly, calm muted secondary text. Premium through restraint. (Barry prefers clean/bright over dark.)
- **Funnel consistency — FOLLOW-UP:** signup / orientation / waiting-room are currently DARK (`#061238`, from the funnel build). Decision: restyle **onboarding to premium light now**, and convert the dark funnel pages to premium light in a later pass so the whole flow is consistent. A temporary dark→light seam at the onboarding hand-off is accepted for now.

---

## The map: how a person gets here

```
/signup  →  /orientation (readiness quiz)  →  /waiting-room (partner-notified status)
                                                     │
                                       PersonalizedPath card
                                                     │
                                   /onboarding?tier=beginner | intermediate | advanced
```

- The **waiting-room** shows a "Recommended Path" card (the `PersonalizedPath` component). Its button links to `/onboarding` with the person's **tier** based on their readiness score.
- The **tier** is passed in the URL. The **partner referral code (`ref`) is NOT** — so the Aurum signup link built inside onboarding currently loses partner attribution. *(This is the referral tracking that broke during the restyle. Deferred for now; flagged at the end.)*

There are **two distinct onboarding surfaces** in the codebase. They overlap:

| | `/onboarding` | `/onboarding/setup` |
|---|---|---|
| Role | The full guided guide | A second "post-signup setup" wizard |
| Length | 8 steps, 3 phases | 5 steps, single stepper |
| Modes | Beginner accordion + Advanced checklist | One linear stepper only |
| Gated? | Yes (redirects to /signup if no lead) | No |
| Saves progress? | Yes (beginner) / No (advanced) | No |
| Overlap | — | Repeats funding + bot activation from `/onboarding` |

**Open question for you:** do we need both? `/onboarding/setup` covers 2FA → fund → activate → reinvest → dashboard, which is the back half of `/onboarding`. One is likely redundant.

---

## SURFACE 1 — `/onboarding` (the main guide)

### Shared header
- Sticky top bar: logo (left) + a pill badge (right).
- Badge reads **"Guided Setup"** (beginner) or **"Fast Track"** (advanced).
- *Current style:* white translucent bar, blue/green accent pill. **→ needs dark restyle.**

### Mode A — Beginner / Intermediate (accordion)

Landing view:
- H1 "Onboarding Guide" + subtitle "Follow each step in order. Your progress is saved automatically."
- A progress bar with an `X/8` counter.
- Steps grouped under three phase headers, each with its own icon, label, description, and a "Complete" chip when all its steps are done.

**Phase 1 — Preparation** *("Before you touch Aurum")*

1. **Set Up a VPN** · 5 min
   - *What:* a VPN encrypts traffic and masks location.
   - *Why:* Aurum isn't available in all regions; protects financial data.
   - *Steps:* download a trusted VPN (NordVPN / ExpressVPN / Surfshark) → create account → quick-connect to US/UK/Canada → verify on whatismyipaddress.com → always connect before opening any crypto platform.
   - *Tip:* NordVPN is most beginner-friendly; set auto-connect.
   - *Warning:* never use a free VPN for financial transactions.
   - *Video:* embedded (hgPSheoUs_s).

2. **Install Trust Wallet** · 10 min
   - *What:* a self-custodial crypto wallet — you hold your own keys.
   - *Why:* you need a personal wallet to hold crypto before depositing into Aurum.
   - *Steps:* download from app store → "Create a new wallet" → write 12-word phrase **on paper** → store safely → confirm phrase → ready to receive USDT/USDC.
   - *Warning:* lose the 12 words = lose the crypto forever; no recovery by anyone.
   - *Links:* Trust Wallet iOS + Android.
   - *Video:* embedded (C4cTJLPmIlY).

3. **Buy USDC or USDT** · 15 min
   - *What:* stablecoins pegged 1:1 to USD; how money moves in/out of crypto.
   - *Why:* Aurum accepts USDC/USDT deposits.
   - *Steps:* Option A (easiest) buy inside Trust Wallet with card/Apple Pay · Option B (lower fees) buy on Coinbase/Binance/Kraken and transfer in (check address AND network) → wait for confirm → verify balance.
   - *Tip:* card purchases carry a 1–3% fee; exchange transfers cheaper but need an extra account.
   - *Warning:* wrong address/network = permanently lost funds.
   - *Video:* embedded (ZxTVBeeeJNQ).

**Phase 2 — Account Setup** *("Creating & securing your account")*

4. **Create Your Aurum Account** · 5 min
   - *What:* register the Aurum back office via the partner's referral link.
   - *Why:* where you manage the bot, returns, deposits/withdrawals.
   - *Steps:* click the "Create Aurum Account" button (carries partner ref) → fill real name/email → strong password → submit.
   - *Tip:* use the same email as your AutopilotROI signup so your partner can track progress.
   - *Special:* this step renders a **"Create Aurum Account →" button** to the Aurum signup URL. **← this is where the referral `ref` should be injected (currently not passed in).**

5. **Confirm Your Email** · 2 min
   - *What:* Aurum sends a verification email.
   - *Why:* required before back-office access or transactions.
   - *Steps:* check inbox (and spam) → click verify link → redirected to login → log in.
   - *Tip:* add Aurum's address to contacts.

6. **Enable Two-Factor Authentication** · 5 min · **CRITICAL / REQUIRED**
   - *What:* 2FA adds a second login layer.
   - *Why:* required before depositing any funds — the most important security step.
   - *Steps:* install Google Authenticator/Authy → Aurum → Settings → Security → enable → scan QR → enter 6-digit code → save backup codes on paper → test by logging out/in.
   - *Warning:* no backup codes + lost phone = permanent lockout.
   - *Tip:* Authy backs up to cloud.
   - *Video:* embedded (K8qYdD1sC7w).
   - *Visual:* this card is styled red/critical.

**Phase 3 — Go Live** *("Fund & start earning")*

7. **Fund Your Aurum Account** · 10 min
   - *What:* transfer USDC/USDT from Trust Wallet into Aurum.
   - *Why:* the bot needs capital to trade.
   - *Steps:* Aurum → Deposits → pick method (USDC BEP20 / ERC20 / USDT) → copy deposit address → Trust Wallet → Send → paste address → confirm → wait 2–10 min → balance appears.
   - *Warning:* triple-check the address; crypto is irreversible.
   - *Tip:* send a $5–10 test first.
   - *Video:* embedded (ZxTVBeeeJNQ).

8. **Activate the EX-AI Bot** · 5 min
   - *What:* AI trading algorithm that trades 24/7.
   - *Why:* the core product — returns start once active.
   - *Steps:* back office → Bots → EX-AI Bot → select tier by deposit → review tier → Activate → choose reinvest ON/OFF → bot starts; check back in 24h.
   - *Tip:* start with auto-reinvest ON for 90 days.
   - *Video:* embedded (1BI9_YikUKc).

**Completion card** (appears when all 8 are checked):
- Green check, "You're All Set," reassurance copy.
- Buttons: **"Go to Partner Dashboard →"** (/dashboard) and **"Continue Learning"** (/university).
- *Note to review:* a brand-new member isn't a partner yet — confirm /dashboard is the right destination vs. their member back office.

Per-step interactions: click row to expand; checkbox to mark complete; "Mark as complete" + "Done → Next Step" buttons; progress auto-saves.

### Mode B — Advanced (Fast Track checklist)

- Centered card, sparkle icon, H1 "Advanced Fast Track," subtitle "Confirm each item, then head straight to Aurum."
- The same 8 items as one-line checkboxes grouped by the 3 phases:
  1. VPN installed & connected · 2. Trust Wallet installed, phrase secured · 3. USDC/USDT purchased · 4. Aurum account created w/ referral · 5. Email verified + logged in · 6. 2FA enabled · 7. Funds deposited · 8. EX-AI Bot activated.
- A gated **"Create Aurum Account →"** button — disabled until all 8 are checked; shows `(X/8)` progress while incomplete.
- Footer link: "Need a refresher? Switch to Guided Setup."
- *Known gap:* advanced checkbox state is **not saved** (resets on reload). Beginner mode does save.

---

## SURFACE 2 — `/onboarding/setup` (the second wizard)

A separate single-card stepper. Header badge reads **"Post-Signup Setup"** (purple). Progress bar + 5 circular step indicators you can click between. Not gated, no saved progress.

1. **Verify 2FA is Active** · CRITICAL
   - Log into Aurum → Security Settings → confirm 2FA "Active" → test logout/login.
   - Red banner: "Do not deposit until 2FA is confirmed active."
   - *Video:* K8qYdD1sC7w.

2. **Add Funds to Your Account**
   - Aurum → Deposits → pick method → copy address → send from Trust Wallet → wait → balance appears.
   - *Video:* ZxTVBeeeJNQ.

3. **Set Up the EX-AI Bot**
   - Bots → EX-AI Bot → select tier → review → Activate → starts immediately.
   - *Video:* CRuZqkc8sh4.

4. **Configure Auto-Reinvest**
   - Bot settings → Reinvest toggle → ON compounds / OFF withdrawable → recommended ON 90 days → switchable anytime.
   - *Video:* 1BI9_YikUKc.

5. **Dashboard Overview & Next Steps**
   - Portfolio overview · transaction history · referral center · support · mobile app.
   - *Video:* GJEK3wOjlyQ.

Navigation: "← Previous" / "Complete & Continue →" (last step: "Finish Setup ✓"). Completion screen: "You're All Set" → "Go to Dashboard →" + "Continue Learning."

**Overlap analysis:** Steps 1–4 of this wizard = Phase 2/3 of the main guide (2FA, fund, activate, reinvest). The unique additions here are the explicit **Auto-Reinvest** step and the **Dashboard tour** step, which the main guide folds into step 8. Everything else is duplicated.

---

## Issues found (the "pile of crap" list)

1. **Wrong theme — the big one.** Both surfaces are still the old light treatment (white cards, dark `#181d26` text, cream background, white sticky header). The funnel is now dark `#061238`. This is the primary restyle job. *(Design-system note: there are no dark tokens in `globals.css` yet — the dark look is achieved with hardcoded `#061238` / `rgba(255,255,255,…)` values, consistent with how waiting-room was done. Logged in BACKLOG.)*

2. **Literal escape-sequence bugs.** Arrows and checks render as raw text in button/CTA labels on both files:
   - `/onboarding`: "Create Aurum Account `→`", "Done `→` Next Step", "Go to Partner Dashboard `→`", advanced CTA `→`.
   - `/onboarding/setup`: "`←` Previous", "Complete & Continue `→`", "Finish Setup `✓`", "Go to Dashboard `→`".
   - *(Note: the `—` / `→` inside the step **data** arrays render fine — only these JSX label literals are broken.)*

3. **Two overlapping surfaces** — `/onboarding` vs `/onboarding/setup`. Decide canonical; likely consolidate or retire `setup`.

4. **Advanced checklist doesn't persist** — minor, inconsistent with beginner mode.

5. **Referral `ref` not threaded through** — waiting-room → onboarding passes `tier` but not `ref`, so the Aurum signup link loses partner attribution. *(Deferred per your call — listed so it isn't forgotten. This is the tracking that the restyle broke.)*

6. **Completion → /dashboard** — verify a new member should land on the partner dashboard vs. their Aurum back office.

---

## Decisions for you (to give clear direction)

- **D1.** Keep both surfaces, or consolidate into one? If consolidating, which is the keeper — the 8-step `/onboarding` (more complete) or the 5-step `/onboarding/setup`?
- **D2.** Is the 8-step list correct and complete, or do any steps need to be added / removed / reworded before Barry sees it?
- **D3.** Completion destination — /dashboard, the Aurum back office, or somewhere else?
- **D4.** Restyle scope for this pass: dark restyle + fix the literal-text bugs only (leave referral wiring for a later rebuild)? — that's the recommended "make the surface awesome for review" scope.

---

## Recommended phase plan (restyle track)

- **O1 — Bug fixes:** replace the literal `→ / ← / ✓` in both files with real glyphs; persist the advanced checklist. *(Tiny, safe, removes the embarrassing text bugs.)*
- **O2 — Restyle `/onboarding`:** move beginner accordion + advanced checklist + header to the dark `#061238` system (match signup / orientation / waiting-room).
- **O3 — Restyle `/onboarding/setup`** (only if D1 keeps it) — same dark system.
- **O4 — Walkthrough confirmation:** step through both modes and all 8 steps end-to-end; verify content, links, videos, gating, and exit routes render correctly on the new dark surface.

*Referral-ID rebuild is intentionally out of scope for this pass and tracked separately.*
