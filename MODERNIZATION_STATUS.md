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

**Status: implemented, pushed to origin, no PR yet** (branch `phase-4/premium-redesign`, stacked on Phase 3, 7 commits). Design brief: `3dverse-phase-4-design.md`.

- New palette/type system (workshop precision), product cards, sticky-column product page with tactile variant buttons, slide-out cart drawer with focus trap, global restyle of footer/contact/404/thank-you/checkout.
- Resolves both Phase 1 known bugs (see above).
- Pricing and checkout data flow untouched (verified via diff).
- Build and lint clean.

### Not verified (no Lighthouse/Playwright in the agent environment)
- Lighthouse 90+/95+ on Home and a product page.
- Keyboard-only pass: cart drawer, variant buttons, carousel.
- 360px / 1440px overflow check on all routes, `prefers-reduced-motion` check, screenshots.

### Open questions
- Real made-to-order turnaround for the product page copy (currently the brief's placeholder "3-5 business days"; TODO in `SingleProduct.tsx`).
- Which two categories are best sellers for the cart-drawer empty state (currently Miscellaneous / Replica Houses, chosen arbitrarily; TODO in `CartDrawer.tsx`).

### Remaining step
Manual verification pass, then open the PR (explicit go-ahead only).

## Not yet started / unscoped
- 6 high-severity npm advisories (brace-expansion, js-yaml, nanoid, postcss, react-router), newly disclosed since Phase 2 — needs a dependency pass.
- Server-side order persistence (orders currently exist only as FormSubmit emails and in the PayPal dashboard).
- Full WCAG 2.1 AA pass beyond Phase 2 scope; further security hardening.
- Final launch-checklist pass on the deployed site.

## Merge order
Phases 1 and 2 are on `main` (PRs #1, #2). Phase 4 is stacked on Phase 3, so Phase 3 must merge first.
