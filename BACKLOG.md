# AutoPilotROI Backlog

Running list of known issues and follow-up work that's been deferred. Not urgent today, but each item should be addressed at some point. New entries go at the top.

## Entry format

```
### [Severity] Title — discovered YYYY-MM-DD
**Source:** where it came up (audit, session, comment)
**Symptom:** what's broken or suboptimal
**Recommended fix:** what to do about it eventually
**Status:** open | in progress | resolved (with date and PR/commit)
```

Severities:
- 🔴 **High** — silent bugs or partial outages, fix before broader launch
- 🟡 **Medium** — usability or maintainability issues, fix when in the area
- 🟢 **Low** — cosmetic or nice-to-have

---

### 🟢 Navbar "Contact" item is mislabeled — discovered 2026-05-29

**Source:** Phase 5 navbar fix (Antigravity surfaced during preflight)

**Symptom:** In `src/components/layout/Navbar.tsx` line 39, the top-level nav item labeled "Contact" links to `/signup`. Misleading — clicking "Contact" should take a user to a contact destination (contact form, email link, support page), not into the signup funnel. Either the label is wrong or the destination is wrong.

**Recommended fix:** Decide intent first, then update:

- If the intent is "soft CTA into the funnel" → rename label to "Sign Up" or "Get Started" (but this duplicates the existing Get Started CTA button). Probably remove the item entirely instead.
- If the intent is "real contact destination" → create or wire to an actual contact page/destination (mailto link, contact form route, support widget).

Discovered while doing the Phase 5 fix on the adjacent Start dropdown. Not touched per the "ask, don't assume" discipline rule.

**Status:** open

---

### 🟡 Design system missing dark-surface tokens — discovered 2026-05-29

**Source:** Phase 4 waiting-room polish (Antigravity discovered during preflight)

**Symptom:** `globals.css` defines `--color-surface: #FFFFFF` (white) and `--color-surface-alt: #F3F4F6` (light gray) — both light-theme values. There is no dark equivalent (no `--color-surface-dark`, no `--color-surface-overlay`, etc.). Every dark-themed page in the funnel — `/signup`, `/orientation`, `/waiting-room` — applies the dark hero gradient and dark surface cards via **hardcoded values**: `#061238` for the hero gradient, `rgba(255,255,255,0.05)` for dark surface fills, `rgba(255,255,255,0.10)` for borders, `rgba(96,165,250,0.2)` for accent overlays.

This is a hybrid design system: real tokens cover text, accent, borders, light surfaces, radii, and typography, but the dark theme is duct-taped on with literals. It works, but it's fragile — anyone restyling a new page has to know to hardcode these specific rgba values to stay consistent.

**Likely affected surfaces:** Every page that uses the approved dark hero treatment. Currently `/signup`, `/orientation`, `/waiting-room`. Any future dark-themed page will inherit the same pattern.

**Recommended fix:**

Add a proper dark-token set to `globals.css`:
- `--color-surface-dark` (the dark hero gradient endpoint or a solid dark surface)
- `--color-surface-overlay` (the `rgba(255,255,255,0.05)` for cards-on-dark)
- `--color-border-overlay` (the `rgba(255,255,255,0.10)` for borders-on-dark)
- `--color-accent-overlay` (the `rgba(96,165,250,0.2)` for tint accents)
- Possibly a `--gradient-hero-dark` token for the full hero gradient string

Then migrate the hardcoded values in `/signup`, `/orientation`, `/waiting-room`, and (if it accepts `darkMode`) `PersonalizedPath` to reference the new tokens.

Best done as a single sweep across all funnel pages plus the shared component, AFTER the funnel is functionally complete and Barry has done his content pass. Until then, keep using the hardcoded values consistently.

**Status:** open

---

### 🟡 FormX components reference undefined `.be-*` CSS classes — discovered 2026-05-29

**Source:** Phase 2 signup restyle (Antigravity diagnostic during form-controls fix)

**Symptom:** `src/components/backend/forms.tsx` exports `FormField`, `FormInput`, and `FormButton`, which apply CSS classes `.be-label`, `.be-input`, `.be-btn`, `.be-btn--primary`, `.be-help`, `.be-error`. **None of these classes are defined anywhere in `globals.css`.** Anywhere these components are used, the form controls render as unstyled HTML — labels and inputs as inline text, buttons as plain text links. The Phase 2.1 signup fix worked around this by replacing the wrappers with raw HTML elements + inline token styles, but the silent bug remains for every other consumer of FormField/FormInput/FormButton.

**Likely affected surfaces:** Anything under `src/app/admin/`, `src/app/dashboard/`, and any other page importing from `@/components/backend`. The audit flagged admin pages as deferred — the styling debt here is part of why they look unfinished.

**Recommended fix (two options):**

1. **Define the `.be-*` classes properly in `globals.css`** using the design tokens. One coherent set of rules covers every consumer. Best if FormField/FormInput/FormButton are still considered the right abstraction going forward.

2. **Audit consumers and replace each FormX usage with raw HTML + tokens** (the same pattern used in the Phase 2.1 signup fix). Then delete the FormX components entirely and remove the dead `.be-*` references. Best if the abstractions aren't carrying their weight.

Option 1 is faster but keeps a brittle layer. Option 2 is more work but produces a clean state. Decide once the public funnel and Barry's content work are done.

**Status:** open

---

(future entries above this line)
