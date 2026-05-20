# AutopilotROI — Content Editor Guide

> **Who this is for:** Anyone updating the website content — no technical knowledge required.
> **Last updated:** 2026-05-20

---

## Opening the Editor

1. Go to: **https://autopilotroi.vercel.app/admin/edit**
2. The editor will load with the homepage ready to edit.
3. You'll see the page content in the middle, a list of sections on the left, and settings on the right.

> If the page loads but the editor looks blank or shows a spinner for more than 10 seconds, refresh the browser once. If it still doesn't load, contact your developer.

---

## Understanding the Screen Layout

```
┌────────────────────────────────────────────────────────────────┐
│  [Header bar]  Page selector ▼  View live page ↗  Publish     │
│  Status bar: ● All changes published · Last: May 20, 4:48 PM  │
├──────────┬──────────────────────────────────┬──────────────────┤
│          │                                  │                  │
│  Outline │         Page Preview             │   Edit Fields    │
│  (left)  │         (centre)                 │   (right)        │
│          │                                  │                  │
└──────────┴──────────────────────────────────┴──────────────────┘
```

- **Left panel (Outline):** Shows all the sections on the page as a list. Click any section name to select it.
- **Centre (Preview):** Shows what the page looks like. You can click directly on elements here too.
- **Right panel (Fields):** Shows the editable fields for whatever section you've selected. This is where you type.

---

## How to Find the Section You Want to Edit

**Method 1 — Use the Outline (left panel):**

The outline lists every section on the page in order:
- `Hero (Dark)` — the big headline section at the top
- `Content Section` — each of these is a page section (stats, features, steps, etc.)
- `Call-to-Action Banner` — the final signup prompt at the bottom

Click any item in the list. The preview will scroll to that section, and the right panel will show you its editable fields.

> **Tip:** When you click a Content Section, the first field in the right panel will say **"Section Name (for your reference)"** — this tells you which section you're in (e.g., "Stats Bar", "Features / Benefits", "Testimonials"). You don't need to change this — it's just a label for your own orientation.

**Method 2 — Click directly in the preview:**

Click on any visible element in the centre preview. The right panel will immediately show that element's editable fields.

---

## How to Edit Content

1. Click the section you want to edit (outline or preview).
2. The right panel shows all the editable fields for that section.
3. Click into any text field and type your changes.
4. The preview updates as you type.

**What you'll see in the right panel:**

| Field Name | What It Controls |
|---|---|
| Badge Text | The small pill/badge above a headline |
| Headline — First Line | The main title text |
| Headline — Highlighted Word(s) | The part of the title shown in the accent colour |
| Body Text | The descriptive paragraph beneath a headline |
| Primary Button Text | What the main button says |
| Primary Button Link | Where the main button goes (URL) |
| Secondary Button Text | The second, lighter button (leave blank to hide it) |
| Section Name (for your reference) | Your private label for this section — not shown on the live site |
| Background Color | The colour behind this section |
| Vertical Spacing | How much space above and below the section |

> **Never change the Primary Button Link unless you are sure of the destination.** Broken links send visitors nowhere.

---

## Editing Safely

**Do edit:**
- Headline text
- Body copy / descriptions
- Button labels
- Badge/eyebrow text
- Testimonial quotes and names
- Step titles and descriptions

**Do NOT edit:**
- Background Color unless changing the section's visual weight is intentional
- Section Name — this is for your reference only, changing it has no visible effect
- Button links unless you are certain the destination URL is correct
- Anything you don't understand

**If you're unsure, don't publish. Ask your developer first.**

---

## How to Publish Your Changes

When you've made your changes and you're happy with how they look in the preview:

1. Look at the top-right corner of the screen.
2. Click the blue **Publish** button.
3. Wait 3–5 seconds. You'll see the confirmation appear.

That's it.

---

## Understanding the Status Indicators

There are two places that tell you the current save state:

### The Header Bar (top right)

| What you see | What it means |
|---|---|
| `● Unpublished` (amber dot) | You have unsaved changes — don't close the tab yet |
| `✓ Published May 20, 4:48 PM` (green check) | Your last publish succeeded at that time |
| `↻` (spinning circle) | Publishing is in progress — wait for it to finish |
| `✗ Error` (red) | Something went wrong — try publishing again; if it fails twice, contact your developer |

### The Status Bar (just below the header)

| What you see | What it means |
|---|---|
| `● Unpublished changes — click Publish to go live` (amber) | Changes made, not yet published |
| `● All changes published · Last: May 20, 4:48 PM` (green) | Everything is live |
| `● Error saving` (red) | Publish failed — see Error guidance below |

> **Rule of thumb:** If you see anything green, you're good. If you see anything amber, remember to publish before you leave.

---

## What Happens After You Publish

Your changes are saved to the database **immediately** when you click Publish.

However, the live website uses a **cache** — a fast copy of the page stored on Vercel's servers around the world. This cache refreshes automatically within **30–60 seconds** of publishing.

So after you publish:
1. Your editor will confirm the publish succeeded (green status).
2. If you visit the live site immediately, you may see the old version for up to 60 seconds.
3. Wait 60 seconds, then hard-refresh the page (`Ctrl+Shift+R` or `Cmd+Shift+R`).
4. You should now see your changes live.

**This delay is normal and expected. It does not mean something went wrong.**

---

## Switching Between Pages

Use the **page selector dropdown** in the header bar (it shows `/ (Homepage) ✓`).

Click it to see all available pages. Click any page to load it in the editor.

> If you have unsaved changes when you switch pages, you'll see a warning asking whether you want to leave. Always **publish first** before switching pages.

---

## How to Undo a Mistake

**Before publishing:**

Use the **undo arrow** (↩) in the header bar to step back through your changes. You can undo as many steps as you need.

**After publishing:**

Once you click Publish, the change is live. Contact your developer — they can restore a previous version from a backup within a few minutes.

> This is why it's important to **check the preview carefully before clicking Publish.**

---

## How to Reset Everything on a Page

In the header bar there is a small grey **↺ Reset** button.

Clicking it will ask you to confirm before doing anything. If you confirm, the page will return to its original default content.

**Only use this if you want to completely start over. This cannot be undone without developer help.**

---

## If Something Goes Wrong

| Problem | What to do |
|---|---|
| Editor won't load | Refresh the browser. If still broken, contact your developer. |
| Changes aren't showing on the live site | Wait 60 seconds, then hard-refresh (`Ctrl+Shift+R`). |
| Publish shows an error | Try again once. If it fails twice, contact your developer. |
| You accidentally broke the layout | Use undo (↩) if you haven't published. If you have published, contact your developer for a restore. |
| You can't find a section | Click the 💡 tip area in the outline panel — every section name is listed. |
| The editor is showing stale content | Refresh the editor page. Content loads fresh on each page load. |

---

## When to Call Your Developer

Contact your developer if:
- The editor won't load after a refresh
- You see a red error that won't go away
- You published something that broke the page layout
- You want to add a completely new section
- You want to change the navigation menu or footer
- You want to change a URL/link destination you're unsure about
- You need something done that isn't in this guide

**The editor is designed to be safe.** If a change isn't possible through the editor, it's intentionally restricted to prevent accidents. Ask your developer to do it directly.

---

## Quick Reference

```
Open editor:    https://autopilotroi.vercel.app/admin/edit
Publish:        Blue "Publish" button (top right)
Undo:           ↩ arrow in header bar
Switch pages:   Dropdown in header bar
Live site:      https://autopilotroi.vercel.app
Cache delay:    30–60 seconds after publishing
```
