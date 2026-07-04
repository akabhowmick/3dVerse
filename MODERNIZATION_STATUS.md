# 3dVerse Modernization — Status

Tracks outstanding items across the modernization spec's phases. Update as items are resolved.

## Phase 1 — Correctness / accessibility / quick security wins

**Status: complete, merged into `main`** (branch `phase-1/a11y-and-hardening`, 17 commits).

### Deferred items (need a human or a future session)
- **formsubmit.co token swap** (spec task 1.11): `contactFormId` / `imageUploadFormId` / `orderReviewFormId` in `src/utils/config.ts` still use the raw `print3dverse@gmail.com` address instead of a real form token. Getting the token requires manually submitting the contact form once and confirming via email — can't be done from an agent session.
- **Production PayPal client ID**: now read from `import.meta.env.VITE_PAYPAL_CLIENT_ID` instead of being hardcoded, but the real value still needs to be added to Netlify's site environment-variable dashboard before the next deploy, and to a local untracked `.env` for local dev. No dashboard access from here.

### Known bugs (found, not fixed — out of scope at the time)
- `FloatingCartButton` (`src/Pages/Cart/FloatingCart.tsx`) shows `cartItems.length` (distinct products) while the nav badge shows summed quantity — the two cart counters can disagree.
- Home page review-carousel "prev/next" faded preview cards (opacity 0.35) fail WCAG AA color-contrast. Fixing via opacity alone would need ~0.85, which erases the intended faded-peek effect — needs a design decision, not a silent change.

## Phase 2 — UI consolidation, responsiveness, assets, dependency upgrades

**Status: complete, on branch `phase-2/consolidate-and-upgrade`, not yet pushed.** All 23 planned commits done, plus 3 follow-up fixes from the final Lighthouse pass:

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

### Remaining step
Push the branch to origin. Per standing workflow, do **not** open the PR without explicit go-ahead.

## Not yet started
Spec mentions further phases (full WCAG 2.1 AA, additional security hardening) beyond what Phase 2 covers — not scoped in detail yet.
