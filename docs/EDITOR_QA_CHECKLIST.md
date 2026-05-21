# AutoPuck Editor QA Checklist

> Use this checklist after every implementation sprint to verify quality.
> Last updated: 2026-05-21

---

## 1. Editor Field Readability

- [ ] **Right sidebar text inputs**: all text fields show dark text on white background
- [ ] **Rich text editor (ProseMirror)**: text is readable in sidebar rich text fields
- [ ] **Selection visibility**: selected text in sidebar fields uses blue highlight, dark text
- [ ] **HeroDark fields**: editing HeroDark in sidebar → text remains readable (not white-on-white)
- [ ] **HeroBlue fields**: editing HeroBlue in sidebar → text remains readable
- [ ] **CTABand/CTAStrip fields**: editing CTA text in sidebar → readable
- [ ] **Field labels**: all labels in sidebar are dark gray, not invisible

## 2. Inline Canvas Editing (iframe)

- [ ] **contentEditable hover**: dashed blue outline appears on hoverable text
- [ ] **contentEditable focus**: solid blue outline + subtle background tint
- [ ] **Selection in iframe**: text selection uses blue highlight
- [ ] **White text on dark bg**: HeroDark inline editing — white text visible, cursor visible
- [ ] **CTA button hover**: green outline on buttons/links
- [ ] **Image hover**: purple dashed outline on images

## 3. Template Quality

- [ ] **Template selector**: all 15 templates listed with descriptions
- [ ] **Homepage Standard**: matches canonical design — hero, stats, features, steps, testimonials, CTA
- [ ] **Product Page**: multi-section with pricing and FAQ
- [ ] **Campaign Landing**: dark hero, video, benefits, proof, pricing
- [ ] **Onboarding Guide**: blue hero, step process, FAQ
- [ ] **Webinar Landing**: event-focused hero, video, attendee proof
- [ ] **Comparison Page**: header, advantage cards, trust signals, testimonials
- [ ] **Trust & Proof**: blue hero, trust cards, quote, video, stats
- [ ] **Direct CTA Landing**: dark hero, 3 benefits, featured offer
- [ ] **Full Campaign Funnel**: comprehensive multi-section funnel
- [ ] **Webinar Registration**: CTA strip, funnel steps, form block
- [ ] **Lead Magnet**: hero, features, form, testimonials, CTA strip
- [ ] **Pricing / Offer**: header, 3 pricing cards, FAQ, testimonials
- [ ] **Consultation Booking**: hero, vertical funnel steps, quote, form
- [ ] **Onboarding Funnel**: blue hero, 4-step funnel, features, stats
- [ ] **Trust / Authority**: blue hero, stats, trust signals, quote, testimonials

## 4. Page Creation Quality

- [ ] **New page from template**: sections render correctly with realistic placeholder copy
- [ ] **SectionBox variants**: white/surface/blue/navy backgrounds render correctly
- [ ] **Section spacing**: 1.25rem gap between section cards
- [ ] **Max-width cap**: sections capped at 1440px
- [ ] **Page background**: #eef0f4 visible between section cards
- [ ] **Section border radius**: rounded corners on all section cards
- [ ] **Container padding**: proper internal padding (container-xl)

## 5. Design System Parity

- [ ] **Typography**: uses Inter/DM Sans (not system fonts)
- [ ] **Colors**: matches approved palette (brand blue #1b61c9, emerald, etc.)
- [ ] **Card shadows**: subtle box-shadow on white sections
- [ ] **Button styles**: gradient blue backgrounds, proper border-radius
- [ ] **Hero gradients**: HeroDark uses navy gradient, HeroBlue uses blue gradient
- [ ] **Stats formatting**: tabular nums, proper stat layout
- [ ] **Feature cards**: icon + title + description with proper spacing
- [ ] **Testimonial cards**: initials circle + stars + quote with proper styling
- [ ] **Pricing cards**: featured vs standard styling, badge visibility

## 6. Mobile Preview

- [ ] **Viewport selector**: shows 360px, 768px, 1280px options with labels
- [ ] **Mobile (360px)**: sections stack vertically, text wraps properly
- [ ] **Tablet (768px)**: grids reduce columns appropriately
- [ ] **Hero mobile**: headline wraps, CTA buttons stack
- [ ] **Feature grid mobile**: single column on small screens

## 7. Form Fields (FormBlock)

- [ ] **Form renders**: title, description, name, email, submit button visible
- [ ] **Form submit**: submitting sends POST to /api/leads
- [ ] **Loading state**: spinner + "Submitting..." text
- [ ] **Success state**: checkmark + success message + email confirmation
- [ ] **Error state**: red error card with message
- [ ] **Validation**: invalid email shows client-side error

## 8. Media Fields

- [ ] **Image upload**: ImageUrlField shows upload button + preview
- [ ] **Video URL field**: YouTube URL auto-generates thumbnail preview
- [ ] **Broken thumbnail**: graceful fallback shown
- [ ] **Image preview**: uploaded image shows correctly in sidebar

## 9. CTA Links

- [ ] **Link validation**: LinkField validates URL format
- [ ] **CTA href**: all CTAs resolve to valid paths
- [ ] **Button rendering**: CTA buttons show correct text and styling

## 10. Publishing Flow

- [ ] **Publish confirmation**: shows page name, section count, last published time
- [ ] **Mobile check reminder**: blue info card in publish dialog
- [ ] **Recovery reassurance**: green card confirming auto-save
- [ ] **Publish success**: toast/feedback shown after publish
- [ ] **Draft autosave**: status bar shows "Draft saved" with timestamp
- [ ] **Dirty state**: beforeunload warning when leaving with unsaved changes

## 11. Keyboard Shortcuts

- [ ] **Ctrl+Z**: undo works
- [ ] **Ctrl+Y**: redo works
- [ ] **Ctrl+Shift+S**: save draft
- [ ] **Esc**: closes editor panels
- [ ] **Footer bar**: shows all 4 shortcut hints

## 12. Editor Preview vs Live Parity

- [ ] **Same fonts**: preview and live both use Inter/DM Sans
- [ ] **Same colors**: no color differences between editor and live
- [ ] **Same spacing**: section padding matches
- [ ] **Same borders**: section border-radius matches
- [ ] **No hidden elements**: nav/footer hidden in editor, visible in live
- [ ] **No hydration errors**: console clean in both modes
