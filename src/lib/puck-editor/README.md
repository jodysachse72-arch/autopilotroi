# Puck Editor Extensions

Reusable extensions for the [Puck Editor](https://puckeditor.com/) that add
Thrive-Themes-level formatting controls to any Puck richtext field.

## Features

| Feature | Status | Description |
|---------|--------|-------------|
| Text Color | ✅ | Color picker for any selected text |
| Font Size | 🔜 | Inline font size control |
| Highlight/BG Color | 🔜 | Background highlight for selected text |
| Font Family | 🔜 | Font switcher dropdown |
| Line Height | 🔜 | Per-paragraph line height control |
| Letter Spacing | 🔜 | Per-paragraph letter spacing |

## Architecture

```
src/lib/puck-editor/
├── extensions/         # TipTap extensions (Color, FontSize, etc.)
├── menu/               # Custom RichTextMenu toolbar components
├── fields/             # Puck custom field definitions
├── presets.ts          # Pre-built field configs for quick use
└── index.ts            # Public API
```

## Usage

```tsx
import { richTextField } from '@/lib/puck-editor'

// In your puck.config.tsx
fields: {
  description: richTextField(),          // Full toolbar
  title: richTextField({ minimal: true }) // Just bold/italic/color
}
```

## Portability

This module is self-contained. To use in another project:
1. Copy `src/lib/puck-editor/` to your project
2. Install: `npm install @tiptap/extension-color @tiptap/extension-text-style`
3. Import and use in your Puck config
