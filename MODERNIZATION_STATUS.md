# 3dVerse Modernization — Status

Tracks outstanding items across the modernization spec's phases. Update as items are resolved.

## Phase 1 — Correctness / accessibility / quick security wins

**Status: complete, merged into `main`** (branch `phase-1/a11y-and-hardening`, 17 commits).

### Deferred items (need a human or a future session)
- **formsubmit.co token swap** (spec task 1.11): `contactFormId` / `imageUploadFormId` / `orderReviewFormId` in `src/utils/config.ts` still use the raw `print3dverse@gmail.com` address instead of a real form token. Getting the token requires manually submitting the contact form once and confirming via email — can't be done from an agent session.
- **Production PayPal client ID**: now read from `import.meta.env.VITE_PAYPAL_CLIENT_ID` instead of being hardcoded, but the real value still needs to be added to Netlify's site environment-variable dashboard before the next deploy, and to a local untracked `.env` for local dev. No dashboard access from here.

### Known bugs — both resolved in Phase 4
- ~~`FloatingCartButton` counted distinct products while the nav badge counted summed quantity.~~ Fixed in `7d34a63` (both now sum quantity).
- ~~Review-carousel peek cards (opacity 0.35) failed WCAG AA contrast.~~ Fixed in `dc8f499` (peek cards no longer fade real text).

## Phase 2 — UI consolidation, responsiveness, assets, dependency upgrades

**Status: complete, merged into `main`** (PR #2, branch `phase-2/consolidate-and-upgrade`). All 23 planned commits done, plus 3 follow-up fixes from the final Lighthouse pass:

- Logo converted to WebP (125KB → 13KB), import sites updated.
- Product-page accessibility and CLS findings resolved (see below).
- Google Fonts stylesheet made non-render-blocking.

### Final verification: passed

| Page | Performance | Accessibility | Best Practices |
|---|---|---|---|
| Home | 94 (≥90) | 96 (≥95) | 96 (≥95) |
| Product detail (`/products/3`) | 90-92 (≥90) | 100 (≥95) | 100 (≥95) |

What got the product page from 68/93/100 to passing, for reference:
- **Color contrast** — `.toggle-details-btn` used `#007bff` on white (3.97:1); switched to the existing `--primary` brand color (8.1:1).
- **Touch target size** — `react-image-gallery`'s bullets rendered at ~9px; added a scoped CSS override to 24×24px. Also fixed insufficient spacing between the "Add to Cart" / "See How to Order" / "Back to Home" buttons (they stack on narrow widths now instead of relying on a gap that had zero slack in the row).
- **CLS (was 0.53, the biggest single regression)** — root cause: `react-image-gallery`'s active slide and thumbnails have no reserved height in the library's own CSS, so the gallery collapses to near-zero and snaps to full size once each image decodes, shifting the whole page below it. Fixed by reserving a fixed aspect-ratio box (with `object-fit`) for both the main slide and thumbnails, so layout no longer depends on image-load timing. Also gave the footer's logo an explicit `aspect-ratio` — it kept intermittently registering as a layout-shift source despite carrying width/height HTML attributes.
- **Render-blocking font stylesheet** — deferred the Google Fonts link with the standard `media=print`/`onload` swap pattern (`<noscript>` fallback included); this also bumped the Home page from 90 to 94.

Manual 360px/1440px flow check: all 8 routes (home, category, product detail, cart, checkout, contact, upload-image, thank-you) confirmed with zero horizontal overflow at both widths.

## Phase 3 — Server-side PayPal price authority

**Status: code complete, pushed to origin, no PR yet** (branch `phase-3/server-side-payments`, 5 commits; merges cleanly into current `main`). Not verified against real PayPal.

- Shared framework-free pricing module (`shared/pricing.ts`): integer-cent catalog, `calculateOrderTotal()`, NY tax, shipping, per-item and per-order caps. Variants are flattened into per-SKU catalog IDs so the request shape stays `{ id, quantity }`.
- `netlify/functions/create-paypal-order` (Zod `.strict()`, rejects any price/amount/total/currency field, returns only `{ orderId }`) and `capture-paypal-order` (re-reads the order from PayPal, recomputes, 409 on mismatch, idempotent `PayPal-Request-Id`, already-captured treated as success).
- Frontend checkout wired to both functions; `.env.example` and README updated.
- Verified: build, functions typecheck, eslint, `PAYPAL_SECRET` absent from `src/` and `dist/`, tamper tests A/B/C rejected locally.

### Not verified (needs sandbox credentials)
- Verification 4/8/9: a full sandbox purchase, captured amount matching the catalog price, and double-capture not double-charging.
- The PayPal smart-buttons iframe failed to render in a Playwright smoke test (`net::ERR_ABORTED`); likely the placeholder `VITE_PAYPAL_CLIENT_ID`, unconfirmed.

### Remaining steps
- Add sandbox credentials to local `.env` and Netlify, scoped per deploy context (sandbox for previews, live for production only).
- Run the sandbox checks above, then open the PR (explicit go-ahead only).
- Go live: live client ID and secret, `PAYPAL_ENV=live` on production only.

## Phase 4 — Premium storefront redesign

**Status: implemented, pushed to origin, no PR yet** (branch `phase-4/premium-redesign`, stacked on Phase 3). Design brief: `3dverse-phase-4-design.md`.

- First pass: "workshop precision" palette/type, product cards, sticky PDP, slide-out cart drawer with focus trap, global restyle. Resolves both Phase 1 known bugs (see above).
- **Revision (2026-10-19): rebrand to match the logo.** The first pass's Space Grotesk / Inter / JetBrains Mono and cobalt-on-cream didn't match the logo's athletic, sporting-goods look. Replaced with:
  - Type: Barlow Condensed (600/700/800, headings, prices, buttons, uppercase) + Barlow (400/500/600, body). Self-hosted latin subsets in `public/fonts/`, three first-paint weights preloaded, metric-matched Arial fallbacks (`src/fonts.css`) so the swap causes no layout shift. Google Fonts origins removed from the CSP in `public/_headers`.
  - Palette sampled from the logo: ink `#0E0F12`, red `#C4291F` (actions, 5.7:1 with white text), blue `#0249AB` (links/focus, 8.3:1), brighter tints for accents on dark bands only. All pairs checked for AA.
  - Motif: red/blue "kit stripe" (jersey trim) replaces layer lines.
  - Dark sticky header (logo sits flush on its black field) with a colored wordmark; floating cart pill removed (header cart is always visible). Footer rebuilt and moved inside the router layout.
  - Home: full-bleed hero with the tagline as the page's `<h1>`, video pause control (paused under reduced motion), benefit bar (claims sourced from existing copy), reviews as a scroll-snap track (no faded duplicates).
  - Category pages now show a card grid instead of stacked full product layouts. PDP: breadcrumb, sticky gallery, restyled gallery controls (no bullets/play button), "How ordering works" disclosure.
  - Every non-home page gets a `PageHero` band with a real `<h1>`.
  - Fixes found along the way: cart variant `<select>` was uncontrolled (showed the first option even when a different variant was in the cart); duplicate element IDs in cart lines and social icons; leaked global CSS (`.card` color, `.btn-primary:hover` light-blue override, global `h1`/`body` rules in ThankYouPage.css); broken inline hero background URL; 404 page hotlinked third-party images (also blocked by the CSP); `#n` ID prefixes leaking into review text.
- Pricing, cart state and checkout data flow untouched (`shared/`, `netlify/`, `CartProvider.tsx` not modified).

### Verified (2026-10-19, local, Playwright + Chrome)
- Build, lint, functions typecheck clean.
- 360px / 1440px: all routes, zero horizontal overflow, zero console errors.
- Keyboard: cart drawer opens on Enter, focus lands on close, Tab stays trapped, Escape closes and returns focus to the trigger; mobile menu closes on Escape; variant buttons expose `aria-pressed`; review paging buttons disable at both ends.
- Non-default PDP variant (Medium 10in) carries into the cart and the cart's select shows it; totals match the shared pricing math ($275 + $10 + 8.75% NY tax + $5 = $314.94); nav and drawer counters agree.
- `prefers-reduced-motion`: no card image scale, no stripe motion, hero video starts paused.
- Lighthouse mobile (local `vite preview`, 3 runs each):

| Page | Perf | A11y | Best Practices | CLS |
|---|---|---|---|---|
| Home, before revision | 80-93 | 100 | 96 | 0.001 |
| Home, after | 88-89 | 100 | 100 | 0 |
| `/products/3`, before revision | 77-89 | 100 | 100 | 0 |
| `/products/3`, after | 85 | 100 | 100 | 0 |

  Performance is at or above the pre-revision baseline on the same machine but still under 90: LCP (~3.5s) is the video poster / first gallery image, which can't be discovered until the 800KB JS bundle runs. Route-level code splitting (lazy-load checkout/MUI/PayPal) is the likely fix; not attempted here.

### Open questions
- Real made-to-order turnaround for the product page copy (currently the brief's placeholder "3-5 business days"; TODO in `SingleProduct.tsx`).
- Which two categories are best sellers for the cart-drawer empty state (currently Replica Houses / Miscellaneous, chosen arbitrarily; TODO in `CartDrawer.tsx`).
- Variant label typo "Large Mode (12in)" comes from `shared/pricing.ts` (out of scope for a visual phase).

### Remaining step
Review, then open the PR (explicit go-ahead only).

## Not yet started / unscoped
- 6 high-severity npm advisories (brace-expansion, js-yaml, nanoid, postcss, react-router), newly disclosed since Phase 2 — needs a dependency pass.
- Server-side order persistence (orders currently exist only as FormSubmit emails and in the PayPal dashboard).
- Full WCAG 2.1 AA pass beyond Phase 2 scope; further security hardening.
- Final launch-checklist pass on the deployed site.

## Merge order
Phases 1 and 2 are on `main` (PRs #1, #2). Phase 4 is stacked on Phase 3, so Phase 3 must merge first.
