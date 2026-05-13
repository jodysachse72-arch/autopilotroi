# Puck Editor — Production Completion Plan
_Last updated: May 12, 2026_

---

## Project Roles

| Role | Responsibility |
|------|---------------|
| **Product (PM)** | Define "done" for each feature. Accept or reject based on real functional test — not visual appearance. |
| **Engineering (ENG)** | Build, wire, and verify. No feature is "done" until confirmed working end-to-end. |
| **QA** | Every feature gets an explicit test checklist before it ships. Visual presence ≠ functional. |
| **Architecture** | The `src/lib/puck-editor/` module stays portable and decoupled. No feature bleeds outside the module. |

---

## Guiding Principles

1. **Audit before build.** We confirm what actually works before adding anything new.
2. **Visual ≠ functional.** A control that renders but doesn't persist, apply, or round-trip through Supabase is broken.
3. **Module-first.** Every control, extension, and utility lives in `src/lib/puck-editor/`. `puck.config.tsx` is a consumer, not a host.
4. **No shortcuts.** Each task has a QA checklist. Each phase requires sign-off before the next begins.
5. **Thrive parity is the bar.** Every text editing feature that Thrive Architect ships is a candidate. We build what makes sense for our content model.

---

## Phase 0 — Audit (FIRST — before any new code)

> **Goal:** Establish a ground-truth map of what actually works vs what only appears to work.

### 0-A: Floating Toolbar (Inline Menu)
The `renderInlineMenu` in `presets.tsx` renders inside the Puck iframe canvas when a richtext field is in contentEditable mode. The toolbar appeared near the field but had positioning/clipping issues.

**ENG Task:** Open the editor. Select text in a richtext field on the canvas. Observe the inline toolbar.
**QA Checklist:**
- [ ] Does the toolbar appear when text is selected on the canvas?
- [ ] Does it appear near the selected text, or fixed at top of the field?
- [ ] Does it clip against the iframe edge?
- [ ] Do the Bold/Italic/Underline buttons toggle visually AND apply to text?
- [ ] Do the Color/FontSize/Highlight dropdown buttons open without clipping?
- [ ] After clicking away and re-selecting, does applied formatting show as active (bold button highlighted, color swatch updated)?
- [ ] Does content persist after hitting Publish and reloading the page?

### 0-B: Sidebar Toolbar (renderMenu)
The full toolbar that appears in the Puck sidebar panel when a richtext field is selected.

**QA Checklist:**
- [ ] HeadingSelect — applies H1-H6 and renders correctly?
- [ ] Bold / Italic / Underline / Strikethrough — apply and toggle?
- [ ] ColorPickerControl — preset colors apply? Custom hex applies? Unset works?
- [ ] HighlightColorControl — preset highlights apply? Unset works?
- [ ] FontSizeControl — applies px sizes? Unset to Default works?
- [ ] FontFamilyControl — applies font? Renders visually in the canvas?
- [ ] LineHeightControl — applies line-height? Unset works?
- [ ] AlignSelect — left/center/right apply?
- [ ] ListSelect — ordered/unordered lists create correctly?
- [ ] All dropdown portals open without clipping in sidebar?
- [ ] All formatting persists through Publish → reload cycle?

### 0-C: Puck Config Structure
**QA Checklist:**
- [ ] All 22 components render on canvas without errors?
- [ ] SectionBox DropZone accepts child components?
- [ ] FeatureGrid DropZone renders cards in correct grid?
- [ ] CardGrid DropZone works?
- [ ] StepGroup DropZone works?
- [ ] Viewport switching (Mobile/Tablet/Desktop) changes iframe width?
- [ ] Page switcher dropdown loads correct page data?
- [ ] + New Page creates a new puck_pages row?
- [ ] Reset to Default re-seeds from the seed API?
- [ ] Publish saves to Supabase and live page reflects it immediately (force-dynamic)?

### 0-D: `puck-editor` Module Portability
**QA Checklist:**
- [ ] `extensions/` folder is empty — confirmed placeholder only?
- [ ] `index.ts` exports are all functional (not dead exports)?
- [ ] No import in the module references anything outside `src/lib/puck-editor/` except `@tiptap/extension-text-style` and `@puckeditor/core`?
- [ ] `DropdownPortal` works correctly when rendered inside an iframe context (Puck canvas)?

---

## Phase 1 — Floating Toolbar Fix (Current WIP)

> **Goal:** The inline floating toolbar on the canvas must behave like Thrive's — appears near selected text, doesn't clip, all controls functional.

### Problem Statement
The `renderInlineMenu` positions via Puck's internal mechanism (`renderInlineMenu` API), not our own. Puck renders it as a fixed overlay inside the iframe. The toolbar:
- May not track the selected text position
- May clip at iframe boundaries
- Dropdowns inside it use `DropdownPortal` → `document.body` of the parent window — this may break if the editor is in an iframe context where `document.body` is the iframe's body, not the parent's

### Tasks
| ID | Task | Who | QA Gate |
|----|------|-----|---------|
| 1.1 | Investigate: does `DropdownPortal` use `document.body` of the iframe or parent window? | ENG | Confirm which `document` context the portal targets |
| 1.2 | Fix portal target: ensure dropdowns always escape to the top-level `document.body` (parent window), not the iframe body | ENG | Dropdown opens, positions correctly, not clipped by iframe |
| 1.3 | Audit `renderInlineMenu` positioning — does it need a custom overlay approach or does Puck's API handle it? | ENG | Toolbar appears near selected text, not fixed at edge |
| 1.4 | Add `Escape` key closes toolbar | ENG | Escape dismisses without disrupting editor focus |
| 1.5 | Visual QA: toolbar does not cover text being edited | QA | No overlap with active text on smallest supported viewport |

---

## Phase 2 — Missing Controls (Thrive Parity)

> **Goal:** Build every missing control into the `puck-editor` module. Each one lives in `menu/` or `extensions/`. Zero changes to `puck.config.tsx` except consuming new options.

### 2-A: Link Control
**What:** Inline link insertion — select text → click link button → dialog for URL + "open in new tab" toggle + apply/remove.
**Why:** Fundamental. Thrive has it. Puck has `RichTextMenu.Link` but we haven't wired it or confirmed it works.

| Task | QA Gate |
|------|---------|
| Verify `RichTextMenu.Link` exists and what it renders | Confirmed via Puck docs/source |
| Wire into `createFullMenu` | Link button appears in sidebar toolbar |
| Test: select text → insert link → link renders in canvas | Link appears as `<a>` in rendered output |
| Test: link persists through Publish → reload | `<a href>` in published page HTML |
| Test: "remove link" removes the mark | Text reverts to plain |
| Test: opens in new tab option works | `target="_blank"` present when toggled |

### 2-B: Clear Formatting
**What:** Button that strips all marks (bold, italic, color, size, font, etc.) from selection.
**Why:** Essential editing hygiene. Thrive has it. TipTap supports `.clearNodes().unsetAllMarks()`.

| Task | QA Gate |
|------|---------|
| Add `ClearFormattingControl` to `menu/` | Button appears in full toolbar |
| Applies `.chain().focus().clearNodes().unsetAllMarks().run()` | All formatting stripped from selection |
| Works on partial selections | Only selected text cleared, surrounding text untouched |
| Persists cleared state through publish | No residual marks in Supabase JSON |

### 2-C: Text Transform
**What:** Uppercase / Lowercase / Capitalize toggle.
**Why:** Thrive has it. Common in headers. TipTap TextStyle already loaded — CSS `textTransform` via mark.

| Task | QA Gate |
|------|---------|
| Add `TextTransformExtension` to `extensions/` | Extension registered and functional |
| Add `TextTransformControl` to `menu/` | Toggle appears in toolbar |
| Uppercase/lowercase/capitalize apply visually | Canvas renders transformed text |
| Persists through publish | Saved and re-rendered correctly |

### 2-D: Letter Spacing
**What:** Dropdown to control `letterSpacing` (e.g. -0.05em to 0.2em).
**Why:** Thrive has it. Critical for heading style control. TipTap TextStyle supports inline CSS.

| Task | QA Gate |
|------|---------|
| Add `LetterSpacingControl` to `menu/` (uses existing TextStyle base) | Dropdown appears in toolbar |
| Options: Default, Tight (-0.03em), Normal (0), Wide (0.05em), Wider (0.1em), Widest (0.2em) | Each option applies correctly |
| Shows current value in button | Button label updates on selection |
| Persists through publish | Correct `letter-spacing` in published output |

### 2-E: Superscript / Subscript
**What:** TipTap `@tiptap/extension-superscript` and `@tiptap/extension-subscript`.
**Why:** Thrive has it. Needed for footnotes, legal copy, math notation.

| Task | QA Gate |
|------|---------|
| Install `@tiptap/extension-superscript` and `@tiptap/extension-subscript` | In package.json, builds without error |
| Add to `buildExtensions` as optional flags (`superscript`, `subscript`) | Gated flags, off by default |
| Add buttons to full toolbar | Appear as `x²` and `x₂` buttons |
| Apply correctly, mutually exclusive | Can't be both super and sub simultaneously |
| Persist through publish | Correct `<sup>`/`<sub>` in output |

### 2-F: Undo / Redo Keyboard Shortcuts
**What:** Confirm `Ctrl+Z` / `Ctrl+Shift+Z` (Windows) work inside richtext fields.
**Why:** Thrive has it. TipTap has history by default — but we need to confirm it actually fires inside Puck's iframe context.

| Task | QA Gate |
|------|---------|
| Test Ctrl+Z while editing richtext on canvas | Undoes last change |
| Test Ctrl+Shift+Z | Redoes change |
| Shortcuts don't trigger Puck's own undo (conflict check) | Puck history doesn't interfere with TipTap history |

---

## Phase 3 — puck.config.tsx Modularization

> **Goal:** The 1,019-line monolith gets split into per-component files. The module is easier to maintain, test, and hand off.

### Architecture Target
```
src/
├── lib/
│   └── puck-editor/          ← portable module (no app deps)
│       ├── index.ts
│       ├── presets.tsx
│       ├── menu/             ← 5 controls + new ones from Phase 2
│       ├── extensions/       ← custom TipTap extensions (currently empty)
│       └── utils/
├── puck/
│   ├── components/           ← NEW: one file per Puck component
│   │   ├── HeroDark.tsx
│   │   ├── HeroBlue.tsx
│   │   ├── PageHeaderWhite.tsx
│   │   ├── SectionBox.tsx
│   │   ├── ... (22 total)
│   │   └── index.ts          ← re-exports all configs
│   └── config.tsx            ← NEW: thin assembler, imports from components/
```

### Tasks
| Task | QA Gate |
|------|---------|
| Create `src/puck/components/` directory | Directory exists |
| Extract each component config to its own file | File exists, imports compile |
| Each component file exports `{ label, fields, defaultProps, render }` | TypeScript happy, no `any` |
| Update `puck.config.tsx` to import and assemble | Editor loads with all 22 components, no regression |
| All QA gates from Phase 0-C still pass | Full regression |

---

## Phase 4 — Block-Level Controls

> **Goal:** Add per-component sidebar controls for spacing, border, background — the block-level styling Thrive exposes per-element.

> **Note:** These live in `puck.config.tsx` (consumer side), not the `puck-editor` module. They are Puck field definitions, not richtext controls.

### Scope (which components get what)
| Component | Padding | Background Color | Border Radius | Border |
|-----------|---------|-----------------|---------------|--------|
| SectionBox | ✅ Already has custom padding | ✅ (via `variant`) | ➕ Add | ➕ Add optional |
| HeroDark | ➕ top/bottom padding | — | — | — |
| FeatureCard | ➕ padding | ➕ background override | ➕ radius | — |
| TrustSignalCard | ➕ padding | ➕ background override | ➕ radius | — |
| Spacer | ✅ height | — | — | — |
| ButtonBlock | ✅ variant/align | ➕ padding override | ➕ radius | ➕ border color |

### Tasks
| Task | QA Gate |
|------|---------|
| Add `paddingTop`/`paddingBottom` number fields to HeroDark | Canvas renders padding change immediately |
| Add `borderRadius`, `backgroundColor` to FeatureCard + TrustSignalCard | Canvas reflects change, persists |
| Add `borderColor` + `borderWidth` to ButtonBlock | Renders correctly across all 3 variants |
| All new fields have sensible defaults (no visual change from current state) | Zero regression on existing published pages |

---

## Phase 5 — Final Audit & Handoff

> **Goal:** Full end-to-end functional audit. Every feature confirmed working. Module documented and ready for extraction.

### Full Regression Checklist
- [ ] All Phase 0 items re-verified
- [ ] All Phase 1 fixes hold
- [ ] All Phase 2 controls: apply → persist → render in published page
- [ ] Modular config loads all 22 components correctly
- [ ] Block-level controls apply and persist
- [ ] `puck-editor` module is self-contained (no outside deps other than `@tiptap/extension-text-style` and `@puckeditor/core`)
- [ ] `README.md` updated to reflect all new controls
- [ ] `HANDOFF.md` updated with Phase 1 completion status

---

## Summary — What We're Building

| Phase | What | Sessions Est. |
|-------|------|---------------|
| 0 | Full audit — confirm ground truth | 1 |
| 1 | Floating toolbar positioning fix | 1 |
| 2 | Link, Clear, Transform, Letter Spacing, Super/Sub, Undo | 2-3 |
| 3 | Modularize puck.config.tsx into per-component files | 1 |
| 4 | Block-level controls (padding, bg, radius) per component | 1-2 |
| 5 | Full regression audit + README + HANDOFF update | 1 |
| **Total** | | **~7-9 sessions** |

---

## What We Are NOT Building

- Animation controls (scroll reveal, fade-in on elements) — Phase 2 of the overall project roadmap
- Responsive per-viewport field value overrides — requires Puck API support not yet available
- Inline image upload within richtext — out of scope for text editing, ImageBlock handles this
- Breadcrumb navigation for nested elements — Puck handles this natively
- Countdown timers, opt-in forms, dynamic content — not applicable to this project
