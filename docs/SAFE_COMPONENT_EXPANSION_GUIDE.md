# AutopilotROI — Safe Component Expansion Guide

> **Who this is for:** Developers adding new editable blocks or fields to the production Puck CMS.
> **When to read this:** Before writing a single line of new component code.
> **Last updated:** 2026-05-20

---

## Core Philosophy

This CMS was built with one operating principle:

> **The operator's confidence and safety come before developer flexibility.**

Every decision that makes the editor more flexible also makes it more dangerous for a non-developer operator. Every decision that constrains the editor also makes it harder to break.

We bias toward constraint. We earned this principle through hard-won stabilization sprints.

---

## The 11 Governance Principles

### 1. Constrain Before Expanding

Before adding a new field or component, ask: *"Does the operator actually need to control this?"*

If the answer is "it would be nice to have," that is not sufficient. Every exposed field is a field that can be misconfigured in production.

**Default answer: No. Only expose what is necessary for the operator to do their job.**

### 2. Operator Cognition Over Flexibility

When choosing between a free-form input and a constrained select, always choose the select.

When choosing between a rich text editor and a plain text field, default to plain text unless rich text is genuinely needed.

When choosing between many granular controls and one high-level toggle, use the toggle.

The operator should be able to use the editor without reading documentation.

### 3. No Raw Layout Controls

Never expose:
- `margin`, `padding`, `gap` as numeric inputs
- `flexDirection`, `gridTemplateColumns`, or similar CSS properties
- `position`, `z-index`, or overflow values
- Pixel measurements of any kind (except where critically necessary and constrained to a safe range)

Layout is defined in code. It is not editable by the operator. If a layout change is needed, a developer makes it.

### 4. No Unrestricted Color Inputs

Never expose a free-form `color` or hex text field to the operator.

Use a `select` field with named, brand-approved options instead:

```tsx
// ✅ GOOD — operator picks from approved palette
colorPreset: {
  type: 'select',
  label: 'Accent Color',
  options: [
    { label: 'Brand Blue',    value: 'brand-blue' },
    { label: 'Emerald Green', value: 'emerald'    },
    { label: 'Amber Gold',    value: 'amber'      },
  ],
},

// ❌ BAD — operator can break visual consistency
color: { type: 'text', label: 'Color (hex)' },
```

Resolve the preset value to a real hex inside the render function, not in the field definition.

### 5. Semantic Labels Only

Every field label must answer: *"What does Barry do with this?"* — not *"What is the technical property name?"*

```
// ❌ BAD (developer terminology)
ctaHref          → the href of the call-to-action link
highlightedText  → the highlighted portion of the title
bulletTwo        → the second bullet point text
variant          → the section variant type
padding          → the section padding value

// ✅ GOOD (operator language)
Primary Button Link     → where the main button goes
Headline Highlight      → the accent words in the headline
Second Bullet Point     → the second bullet item
Background Color        → the section background
Vertical Spacing        → space above and below the section
```

**Rule:** If the label contains a camelCase word, a programmer abbreviation, or a CSS property name, it fails the test.

### 6. Preserve the Frontend Baseline

The Puck editor renders the existing React components — it does not replace them. The components themselves are the design system. The CMS is an editor that feeds data into those components.

**Never modify the underlying component just to make it more "flexible" in the editor.** If a component needs a new variant, add it as a constrained option, not as a raw prop.

The live site's visual quality is the baseline. Any CMS change that degrades the visual quality is a regression, even if the TypeScript compiles cleanly.

### 7. Runtime Truth Over Architectural Assumptions

If you think something is working, verify it on the actual running production editor — not in TypeScript types or in your mental model.

The Puck editor behaves differently at runtime than the config suggests. Always:
- Run the editor in a browser against real production data
- Simulate operator actions (click, edit, publish, reload)
- Check the browser console for errors

Never assume a feature works because the code looks correct.

### 8. Deploy Discipline

Every production deploy requires:
1. TypeScript: 0 errors
2. Build: exit 0, 64 pages
3. Manual editor verification (open, click, publish, verify)
4. Console check (0 errors)

No exceptions. A deploy that skips any step is not a certified deploy.

### 9. Backup Before Migration

Any script or code that modifies `puck_pages` data in Supabase must be preceded by:

```bash
npm run puck:backup
```

This includes:
- Seed scripts (`/api/puck/seed`)
- Migration scripts (`scripts/migrate-*.js`)
- Direct Supabase writes in code
- Any schema change to `puck_pages`

The backup takes 2 seconds. Not backing up is not an acceptable risk.

### 10. Avoid Rebuilding Puck Internals

Puck's outline, layer tree, field rendering, and DropZone system are not designed to be replaced — they are designed to be extended.

If you find yourself:
- Reimplementing `LayerTree` rendering
- Overriding CSS inside `.puck-*` selectors to change layout logic
- Replacing the outline's tree structure with a custom component
- Patching Puck's internal state via `dispatch` without using the documented API

...you are fighting the framework. Stop. Use `componentOverlay`, `outline` wrapper, field-level labels, and `createUsePuck` selectors instead.

**The framework is a constraint. Work within it.**

### 11. Additive Governance Layers, Not Framework Rewrites

When a Puck limitation is discovered, add a governance layer *around* it — don't replace the underlying system.

Examples:
- Puck's outline doesn't support per-instance labels → Add a `sectionName` field at the top of each content section. Display it in the right panel. Add canvas overlay via `componentOverlay`.
- Puck's DropZones are deprecated → Add a deprecation note in STATUS.md. Migrate field-by-field in a future sprint. Don't rewrite the whole CMS.
- Puck's color fields are raw text → Replace with `select` at the field definition level. No framework code needed.

---

## Checklist: Before Adding Any New Editable Block

```
□ Can the operator's goal be achieved by editing an EXISTING block?
  → If yes, do not add a new block.

□ Is this block genuinely needed on at least one live production page?
  → If not live, don't add it yet.

□ Does the block preserve the frontend design system?
  → The rendered output must match the existing visual baseline.

□ Is there a corresponding React component already written?
  → Never write a new component just to expose it in Puck.
  → The Puck config wraps existing components, it doesn't create them.

□ Have all field labels been reviewed against Principle 5 (Semantic Labels)?

□ Have all color fields been converted to selects?

□ Have all layout controls been removed or constrained?

□ Has a `defaultProps` been defined so the block is usable without any input?

□ Has a backup been taken before touching puck_pages data?

□ Has the build been verified (tsc + npm run build) after adding the block?

□ Has the block been tested in the live editor against real production data?

□ Has the right panel been visually reviewed — does it look like an operator's tool?
```

---

## Checklist: Before Exposing Any Field to the Operator

```
□ Can this field be misconfigured in a way that breaks the live site?
  → If yes, either constrain it (select/range) or don't expose it.

□ Is the field label in operator language?
  → Run the "Barry test": would a Thrive Themes user understand this label?

□ Is the field's purpose obvious without additional explanation?
  → If the operator needs to ask what it does, rename it or add a helperText.

□ Is a free-form text input the only option?
  → For colors, use select. For sizes, use select or constrained number.
  → For boolean toggles, use select with "Yes/No" options.

□ Does the field have a safe defaultProps value?
  → Default values should match the live production baseline content.

□ What happens if the field is left blank?
  → The render function must handle an empty/undefined value gracefully.
  → Test with an empty string before shipping.
```

---

## Examples: GOOD vs BAD CMS Controls

### Example 1 — Section Background Color

```tsx
// ❌ BAD — operator types raw hex
colorBg: { type: 'text', label: 'Background Color' }
// Result: operator types '#1B61C9', makes a typo '#1B61C', breaks layout

// ✅ GOOD — operator picks from names
variant: {
  type: 'select',
  label: 'Background Color',
  options: [
    { label: 'White',      value: 'white'   },
    { label: 'Light Gray', value: 'surface' },
    { label: 'Blue',       value: 'blue'    },
    { label: 'Dark Navy',  value: 'navy'    },
  ],
},
// Result: operator cannot break the color system
```

### Example 2 — Button Link

```tsx
// ❌ BAD — no context, developer jargon
ctaHref: { type: 'text', label: 'ctaHref' }

// ✅ GOOD — operator knows what this does
ctaHref: { type: 'text', label: 'Primary Button Link' }
// Even better: add a helper
ctaHref: { type: 'text', label: 'Primary Button Link (e.g. /signup or https://...)' }
```

### Example 3 — Testimonial Card

```tsx
// ❌ BAD — developer-facing structure
TestimonialCard: {
  label: 'Testimonial',
  fields: {
    quote: { type: 'text', label: 'quote' },
    name:  { type: 'text', label: 'name' },
    title: { type: 'text', label: 'title' },
  }
}

// ✅ GOOD — operator-facing language
TestimonialCard: {
  label: 'Member Testimonial',
  fields: {
    quote:  richTextField({ label: 'Testimonial Quote' }),
    author: { type: 'text', contentEditable: true, label: 'Member Name' },
    role:   { type: 'text', contentEditable: true, label: 'Member Title or Role' },
  }
}
```

### Example 4 — Section naming for operator orientation

```tsx
// ❌ BAD — operator sees 5 identical rows in outline, no orientation
SectionBox: {
  label: 'Section Container',  // ← generic, repeated 5×
  fields: { variant: ..., padding: ... }
}

// ✅ GOOD — operator can identify sections at a glance
SectionBox: {
  label: 'Content Section',    // ← clearer type name
  fields: {
    sectionName: {
      type: 'text',
      label: 'Section Name (for your reference)',
      // Shows in right panel when section selected — helps operator know where they are
    },
    variant: { ... },
    padding: { ... },
  }
}
```

### Example 5 — Blocking dangerous layout control

```tsx
// ❌ BAD — operator can break layout globally
layout: {
  type: 'select',
  label: 'Layout',
  options: [
    { label: '1 Column', value: 'flex-col' },
    { label: '2 Columns', value: 'grid-cols-2' },
    { label: '3 Columns', value: 'grid-cols-3' },
    { label: 'Custom', value: 'custom' },  // ← disaster
  ]
}

// ✅ GOOD — columns are constrained to safe values
columns: {
  type: 'select',
  label: 'Number of Columns',
  options: [
    { label: '2 Columns', value: '2' },
    { label: '3 Columns', value: '3' },
    { label: '4 Columns', value: '4' },
  ]
}
// The CSS grid is handled inside the render function using the safe value
```

---

## Known Puck Constraints (Do Not Fight These)

| Constraint | Workaround |
|---|---|
| Outline labels are global per component type, not per instance | Add `sectionName` field + `componentOverlay` badge |
| `outline` override is a wrapper, not a full replacement | Use it to add a guide tip above the layer tree |
| `componentOverlay` does not receive instance props | Use it for type-level visual indicators (not content-specific) |
| DropZones are deprecated (use slot fields instead) | Note in STATUS.md; migrate in dedicated future sprint |
| `usePuck()` without selector causes extra re-renders | Use `createUsePuck()` with a selector |
| Puck iframe resets CSS on each load | Inject site CSS inside the `iframe` override's `useEffect` |

---

## Governance Debt Log

Items to address in future sprints:

| Item | Priority | Sprint |
|---|---|---|
| Migrate DropZone to slot fields | Low | `feature/api-layer` or dedicated |
| Replace shared-secret write guard with session auth | Medium | `feature/api-layer` |
| Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for /signup bot protection | Low | Config task |
| Per-field permissions (which roles can edit which fields) | Future | Post-auth sprint |
| Automated smoke test for editor publish flow | Low | CI/CD sprint |
