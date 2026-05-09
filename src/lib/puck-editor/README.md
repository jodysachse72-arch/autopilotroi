# Puck Editor Extensions

Reusable rich text editor extensions for [Puck Editor](https://puckeditor.com/)
that add Thrive-Themes-level formatting controls to any Puck richtext field.

## Quick Start

```tsx
import { richTextField } from '@/lib/puck-editor'

// In your puck.config.tsx:
const config = {
  components: {
    Hero: {
      fields: {
        description: richTextField(),                    // Full toolbar
        title: richTextField({ minimal: true }),         // Bold/Italic/Color/Size only
        quote: richTextField({ fontFamily: false }),      // Disable specific features
      },
      // ...
    },
  },
}
```

## What `richTextField()` Does

Returns a complete Puck field configuration object with:

1. **TipTap extensions injected** — TextStyle, Color, FontSize, FontFamily, BackgroundColor, LineHeight
2. **Custom sidebar toolbar** (`renderMenu`) — with all controls arranged in groups
3. **Inline canvas toolbar** (`renderInlineMenu`) — for contentEditable editing
4. **`contentEditable: true`** — enables WYSIWYG editing directly on the canvas

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minimal` | boolean | `false` | Use minimal toolbar (Bold/Italic/Color/Size only) |
| `contentEditable` | boolean | `true` | Enable inline editing on the canvas |
| `colors` | boolean | `true` | Enable text color picker |
| `fontSize` | boolean | `true` | Enable font size control |
| `fontFamily` | boolean | `true` | Enable font family dropdown |
| `backgroundColor` | boolean | `true` | Enable background/highlight color |
| `lineHeight` | boolean | `true` | Enable line height control |
| `inline` | boolean | `true` | Enable inline canvas toolbar |

## Controls

### ColorPickerControl
- 20 preset colors in a 5×4 grid
- Custom hex input with native color picker
- Shows current color as underline on the "A" button

### FontSizeControl
- Preset sizes: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72
- "Default" option to unset
- Shows current size value in button

### FontFamilyControl
- Options: Default, Inter, Plus Jakarta Sans, System Sans, Serif, Mono
- "Default" option to unset
- Each option previewed in its own font

### HighlightColorControl
- 20 preset highlight colors (pastels + solids)
- First swatch is "remove highlight" (red strikethrough)
- Shows current highlight as colored square

### LineHeightControl
- Options: Default, 1, 1.15, 1.3, 1.5, 1.75, 2
- "Default" option to unset
- Icon button with line spacing symbol

## Architecture

```
src/lib/puck-editor/
├── index.ts                        # Public API exports
├── presets.tsx                      # richTextField() factory function
├── menu/
│   ├── ColorPickerControl.tsx      # Text color picker
│   ├── FontSizeControl.tsx         # Font size dropdown
│   ├── FontFamilyControl.tsx       # Font family dropdown
│   ├── HighlightColorControl.tsx   # Background/highlight picker
│   └── LineHeightControl.tsx       # Line height dropdown
├── extensions/                     # Future: custom TipTap extensions
└── README.md                       # This file
```

## Dependencies

```json
{
  "@tiptap/extension-text-style": "^3.23.0",
  "@puckeditor/core": "^0.21.0"
}
```

`@tiptap/extension-text-style` provides all formatting extensions in a single package:
TextStyle, Color, FontSize, FontFamily, BackgroundColor, LineHeight.

## Portability

To use in another Puck project:

```bash
# 1. Copy the folder
cp -r src/lib/puck-editor/ ../other-project/src/lib/puck-editor/

# 2. Install the single dependency
npm install @tiptap/extension-text-style

# 3. Import in your puck config
import { richTextField } from '@/lib/puck-editor'
```

## Known Limitations

- **Saved data format**: richtext content is stored as serialized React nodes by Puck. Adding new extensions does NOT break existing saved data — old content simply won't have the new styles until re-edited.
- **Font loading**: FontFamily options reference fonts that must be loaded in your CSS/HTML. The defaults (Inter, Plus Jakarta Sans) are commonly available via Google Fonts.
- **Inline menu positioning**: The inline canvas menu uses Puck's built-in `renderInlineMenu` positioning, which may overlap content on very small viewports.

## Future Roadmap

- [ ] Floating toolbar polish (custom positioning, animations)
- [ ] Breadcrumb navigation (element hierarchy)
- [ ] Animation controls (fade, slide, scale on scroll)
- [ ] Conditional display (show/hide based on viewport or state)
- [ ] Link color control
- [ ] Letter spacing control
- [ ] Text transform (uppercase, lowercase, capitalize)
