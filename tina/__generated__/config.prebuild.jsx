// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ──────────────────────────────────────────────────────────
         GLOBAL: Navigation
         File: content/globals/nav.json
         ────────────────────────────────────────────────────────── */
      {
        name: "navigation",
        label: "\u{1F5FA}\uFE0F Navigation",
        path: "content/globals",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        match: { include: "nav" },
        fields: [
          {
            type: "object",
            name: "navItems",
            label: "Nav Menu Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label ?? "Nav Item" }) },
            fields: [
              { type: "string", name: "label", label: "Menu Label", required: true },
              { type: "string", name: "href", label: "URL (e.g. /faqs)", required: true },
              {
                type: "object",
                name: "dropdown",
                label: "Dropdown Sub-items (optional)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label ?? "Item" }) },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "URL" }
                ]
              }
            ]
          },
          { type: "string", name: "ctaLabel", label: "CTA Button Text (top-right)" },
          { type: "string", name: "ctaHref", label: "CTA Button URL" }
        ]
      },
      /* ──────────────────────────────────────────────────────────
         GLOBAL: Footer
         File: content/globals/footer.json
         ────────────────────────────────────────────────────────── */
      {
        name: "footer",
        label: "\u{1F4C4} Footer",
        path: "content/globals",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        match: { include: "footer" },
        fields: [
          { type: "string", name: "tagline", label: "Brand Tagline" },
          {
            type: "object",
            name: "columns",
            label: "Footer Columns",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading ?? "Column" }) },
            fields: [
              { type: "string", name: "heading", label: "Column Heading" },
              {
                type: "object",
                name: "links",
                label: "Links",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label ?? "Link" }) },
                fields: [
                  { type: "string", name: "label", label: "Link Text" },
                  { type: "string", name: "href", label: "URL" },
                  { type: "boolean", name: "external", label: "Open in new tab" }
                ]
              }
            ]
          },
          { type: "string", name: "copyright", label: "Copyright / Disclaimer Text" }
        ]
      },
      /* ──────────────────────────────────────────────────────────
         COLLECTION: FAQs
         Files: content/faqs/*.json — one file per FAQ item
         Barry can add, edit, delete, and reorder Q&A pairs
         ────────────────────────────────────────────────────────── */
      {
        name: "faq",
        label: "\u2753 FAQs",
        path: "content/faqs",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60) ?? "faq"
          }
        },
        fields: [
          { type: "string", name: "title", label: "Question", required: true },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "basic", label: "\u{1F9ED} Basic" },
              { value: "advanced", label: "\u26A1 Advanced" },
              { value: "technical", label: "\u{1F527} Technical" },
              { value: "partner", label: "\u{1F91D} Partner Program" },
              { value: "getting-started", label: "\u{1F680} Getting Started" },
              { value: "products", label: "\u{1F4E6} Products" },
              { value: "general", label: "\u{1F4CB} General" }
            ]
          },
          {
            type: "string",
            name: "body",
            label: "Answer",
            ui: { component: "textarea" }
          },
          { type: "number", name: "sortOrder", label: "Sort Order (lower = first)" }
        ]
      },
      /* ──────────────────────────────────────────────────────────
         GLOBAL: Homepage
         File: content/pages/home.json
         ────────────────────────────────────────────────────────── */
      {
        name: "homePage",
        label: "\u{1F3E0} Homepage",
        path: "content/pages",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        match: { include: "home" },
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero Eyebrow Badge" },
          { type: "string", name: "heroHeadline", label: "Hero Headline" },
          { type: "string", name: "heroSubheadline", label: "Hero Sub-headline" },
          { type: "string", name: "heroCtaLabel", label: "Hero CTA Button Text" },
          { type: "string", name: "heroCtaHref", label: "Hero CTA Button URL" },
          { type: "string", name: "stat1Number", label: "Stat 1 \u2014 Number" },
          { type: "string", name: "stat1Label", label: "Stat 1 \u2014 Label" },
          { type: "string", name: "stat2Number", label: "Stat 2 \u2014 Number" },
          { type: "string", name: "stat2Label", label: "Stat 2 \u2014 Label" },
          { type: "string", name: "stat3Number", label: "Stat 3 \u2014 Number" },
          { type: "string", name: "stat3Label", label: "Stat 3 \u2014 Label" },
          { type: "string", name: "stat4Number", label: "Stat 4 \u2014 Number" },
          { type: "string", name: "stat4Label", label: "Stat 4 \u2014 Label" }
        ]
      },
      /* ──────────────────────────────────────────────────────────
         GLOBAL: Contact Page
         File: content/pages/contact.json
         ────────────────────────────────────────────────────────── */
      {
        name: "contactPage",
        label: "\u{1F4EC} Contact Page",
        path: "content/pages",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false }
        },
        match: { include: "contact" },
        fields: [
          { type: "string", name: "headline", label: "Headline" },
          { type: "string", name: "subheadline", label: "Sub-headline" },
          { type: "string", name: "email", label: "Support Email Address" },
          { type: "string", name: "telegram", label: "Telegram Handle" },
          {
            type: "string",
            name: "responseNote",
            label: "Response Time Note",
            ui: { component: "textarea" }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
