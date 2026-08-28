# 3dVerse Phase 4: Premium storefront redesign

## Context
React + TypeScript + Vite e-commerce site for a 3D printing shop, deployed on
Netlify. Phases 1-3 complete (accessibility, performance, server-side payment
authority). This phase is visual design only. Do not touch the Netlify Functions,
the shared pricing module, or any checkout logic. Cart and checkout UI may be
restyled but their data flow must not change.

## Design direction: workshop precision
The brand is a working 3D print shop. The design should feel like a well-run
workshop: precise, technical, warm. Not a generic SaaS template, not a dark
gamer aesthetic.

### Committed palette (do not substitute)
- `--base`: #F6F6F3 (page background, never pure white)
- `--surface`: #FFFFFF (cards, panels)
- `--ink`: #14161A (headings, primary text)
- `--muted`: #6B7075 (secondary text, captions)
- `--accent`: #2743E3 (cobalt, actions and links only, used sparingly)
- `--line`: #E3E3DE (dividers, borders)

Contrast rules from Phase 1 still apply: every text/background pair 4.5:1
minimum, 3:1 for large text and UI borders.

### Committed typography (do not substitute)
- Display: Space Grotesk 500/700 for headings and product names
- Body: Inter 400/500
- Data: JetBrains Mono 400 for anything spec-like: dimensions, materials,
  print time, prices in the cart summary

Load via Google Fonts with the existing non-render-blocking pattern from
Phase 2. Subset and preload per the launch checklist.

### Signature element: layer lines
3D prints are built in layers. Use a thin stacked-horizontal-line motif as the
one decorative device across the site: section dividers, the hero background
texture (subtle, low contrast against --base), and the hover state on product
cards (lines rise in from the bottom edge). Implement in CSS/SVG, no images.
This is the single aesthetic risk. Everything else stays quiet.

## Scope of work

### 1. Product cards
- Remove visible card borders and drop shadows. Whitespace is the separator.
- Image area: fixed aspect ratio, consistent warm-gray backdrop behind every
  product photo (CSS background, photos themselves stay as-is for now).
- Hover: image scales to 1.02 (image only, not the card), layer-line motif
  slides in along the bottom edge. Respect prefers-reduced-motion.
- Name in Space Grotesk 500, price in JetBrains Mono, visually quieter than
  the name.
- Variant count hint where applicable ("4 sizes") in --muted.

### 2. Product detail page
- Desktop: gallery left, sticky info column right so Add to Cart never
  scrolls away. Single column on mobile, buy button reachable without
  scrolling past the full gallery.
- Product name as the page's one large typographic moment, Space Grotesk 700,
  distinctly larger than the rest of the type scale.
- Variant selectors as tactile buttons showing the price delta, never a
  native select. Selected state must not rely on color alone.
- Specs as a two-column definition list in JetBrains Mono values with thin
  --line dividers and generous line height. No bullet lists.
- Add a "Made to order. Ships in 3-5 business days." line directly under the
  Add to Cart button (confirm the real turnaround with a TODO comment if
  unknown).
- Keep the react-image-gallery aspect-ratio reservation from Phase 2 intact.

### 3. Cart
- Convert to a slide-out drawer from the right, triggered from the nav cart
  icon, with the existing full cart page kept as the fallback route.
- Line items: 80px thumbnail, name, variant, quantity stepper
  (minus / count / plus, not a free input), line total. Each row breathes,
  no cramped table.
- Order summary panel: subtotal, NY tax, shipping, then the grand total as
  the single largest number, all in JetBrains Mono, values sourced from the
  shared pricing module exactly as they are now.
- Empty state: short line of copy plus a link back to the two best-selling
  categories. No sad-face illustration cliches.
- Drawer traps focus, closes on Escape, returns focus to the trigger.
- Fix the known Phase 1 bug while in here: FloatingCartButton shows distinct
  product count while the nav badge shows summed quantity. Standardize both
  on summed quantity.

### 4. Review carousel contrast (deferred Phase 1 bug)
The faded prev/next preview cards at opacity 0.35 fail contrast. Design
decision, now made: keep the faded-peek effect but apply it to a solid
--muted-toned duplicate of the card rather than opacity on real text, so no
actual text node fails contrast. If that proves awkward, replace the peek
with simple prev/next arrow buttons.

### 5. Global
- Apply the palette and type system across nav, footer, contact, upload, and
  thank-you pages so nothing is left in the old MUI default look.
- Buttons: one primary style (accent background, white text), one secondary
  (ink outline). No third style.
- Focus rings visible on everything, styled to the accent, never removed.

## Verification
1. `bun run build` clean.
2. Lighthouse mobile on Home and a product page: Performance 90+,
   Accessibility 95+ (do not regress Phase 2 numbers).
3. Keyboard-only pass: cart drawer open/close/trap, variant selection,
   carousel.
4. 360px and 1440px manual check on all 8 routes, zero horizontal overflow.
5. prefers-reduced-motion check: no card hover scale, no layer-line motion.
6. Screenshot every redesigned view and include in the report.
7. Confirm both cart counters now agree.

## Workflow
Branch `phase-4/premium-redesign`. Commit in logical units. No PR without
explicit go-ahead.
