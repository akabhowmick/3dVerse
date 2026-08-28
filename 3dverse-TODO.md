# 3dVerse TODO

Tracks outstanding work. Update as items land.

## Now
- [ ] Add friend's sandbox credentials to local `.env` and Netlify env vars
      (`PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_ENV=sandbox`,
      `VITE_PAYPAL_CLIENT_ID`)
- [ ] Scope `PAYPAL_ENV` per deploy context in Netlify: sandbox for previews,
      live for production only
- [ ] Run verification check 8: full sandbox purchase end to end, confirm
      captured amount matches catalog price for the chosen variant
- [ ] Run verification check 9: double-capture the same order ID, confirm no
      double charge
- [ ] Confirm the PayPal button iframe renders once real
      `VITE_PAYPAL_CLIENT_ID` is in place (ERR_ABORTED was likely the
      placeholder)
- [x] Decide whether `phase3.md` planning doc belongs in the repo — no;
      matches convention (`3dverse-TODO.md`, `3dverse-phase-4-design.md`,
      and every prior phase doc have always stayed untracked, never
      committed). Left as an untracked local file.
- [ ] Open Phase 3 PR (explicit go-ahead only)

## Blocked on client / external
- [ ] FormSubmit token swap in `src/utils/config.ts`: requires one manual
      form submission and email confirmation (Phase 1 deferred item)
- [ ] Live PayPal Client ID and Secret for production, plus confirm the
      account is live-enabled (may need PayPal verification if it has never
      processed live payments)

## Phase 4: premium redesign
- [x] Run `3dverse-phase-4-design.md` with Claude Code
      (branch `phase-4/premium-redesign`, 6 commits, pushed) — build and
      lint clean, pricing/checkout data flow untouched (verified via diff)
- [x] Includes fixes for two known Phase 1 bugs:
      cart counter mismatch (FloatingCartButton vs nav badge, both now sum
      quantity) and review carousel contrast failure (peek cards no longer
      fade real text)
- [ ] Manual browser verification pass (no Lighthouse/Playwright available
      in the agent's environment, so these are unconfirmed): Lighthouse
      90+/95+ on Home and a product page, keyboard-only pass on the new
      cart drawer + PDP variant buttons + carousel, 360px/1440px overflow
      check on all routes, prefers-reduced-motion check, screenshots of
      every redesigned view
- [ ] Confirm real made-to-order turnaround time for the product page copy
      (agent left a TODO comment in `SingleProduct.tsx`; "3-5 business
      days" is the design brief's placeholder, not sourced)
- [ ] Confirm "two best-selling categories" for the cart drawer empty
      state — agent linked Miscellaneous / Replica Houses arbitrarily
      (TODO comment in `CartDrawer.tsx`, no sales data available to rank)
- [ ] Open Phase 4 PR (explicit go-ahead only)

## Later / unscoped
- [ ] 6 high-severity npm advisories (brace-expansion, js-yaml, nanoid,
      postcss, react-router), deferred from Phase 3, batch into a
      dependency pass
- [ ] Server-side order persistence (launch checklist Tier 3: orders
      currently exist only as FormSubmit emails and in the PayPal dashboard)
- [ ] Full WCAG 2.1 AA pass beyond Phase 2 scope
- [ ] Final launch checklist pass (Tier 0 + Tier 3) on the deployed site
      before calling the project done

## Done
- [x] Phase 1: a11y and hardening, merged to main
- [x] Phase 2: consolidation, responsiveness, perf (Home 94/96/96, product
      90-92/100/100), pushed
- [x] Phase 3: server-side price authority, variant-flattened catalog SKUs,
      tamper tests A/B/C passing, branch pushed
