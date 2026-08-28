# 3dVerse Phase 3: Server-side price authority for PayPal

## Context

This is a React + TypeScript + Vite e-commerce site deployed on Netlify, using npm. It sells 3D printed products at fixed catalog prices stored as a hardcoded array/JSON module in the repo. Orders are currently emailed via FormSubmit only; there is no order database.

Phases 1 and 2 of modernization are complete. Do not revisit accessibility,
performance, or dependency work.

## The vulnerability being fixed

PayPal order creation currently happens in the browser, and the order total originates client-side. Anyone can open devtools, modify the amount, and pay an arbitrary price for any order. The browser must never be the source of the
amount charged.

## Required outcome

The browser sends only product IDs and quantities. A Netlify Function recomputes the total from the repo's own catalog, creates the PayPal order server-side, and
returns only an order ID. A second function captures the payment and verifies the captured amount matches what the server calculated.

## Step 1: Audit and report before changing anything

Read the checkout flow and report back:

- Which file(s) render the PayPal buttons and what is passed to `createOrder`
- The exact path and shape of the product catalog module
- Where cart totals, tax, and shipping are currently computed
- Whether the catalog module imports anything browser-only (React, assets, CSS)

Do not start editing until you have reported this.

## Step 2: Extract a shared pricing module

Create a framework-free, dependency-free module that both the frontend and the
Netlify Functions import. It must contain:

- The product catalog (id, name, unit price in cents, currency)
- A pure `calculateOrderTotal(items)` function that takes `[{ id, quantity }]`
  and returns a line-item breakdown plus subtotal, tax, shipping, and grand total

Rules:

- All money is integer cents internally. Never use floats for money.
- NY sales tax and shipping logic must live here, not in a component.
- Unknown product ID, non-integer quantity, quantity < 1, or quantity above a
  sane per-item cap must throw.
- No React imports, no `import.meta.env`, no asset imports. This file must be importable from a Node runtime.

Refactor the frontend to use this module for display totals so there is exactly one pricing implementation in the codebase.

## Step 3: `netlify/functions/create-paypal-order`

- Accept POST only. Reject other methods with 405.
- Validate the body with Zod: `{ items: Array<{ id: string, quantity: number }> }`.
  Reject any request containing a price, amount, total, or currency field. Do not
  silently ignore those fields, reject the request.
- Compute the total using the shared module. If it throws, return 400 with a
  generic message.
- Get a PayPal OAuth token using `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET` from
  `process.env`. Choose the API base URL from `PAYPAL_ENV`
  (`sandbox` -> api-m.sandbox.paypal.com, `live` -> api-m.paypal.com).
  Fail loudly on startup if any of these are missing.
- Create the PayPal order with the server-computed amount and line items.
- Return only `{ orderId }`. Never return the secret, the token, or the raw
  PayPal response.

## Step 4: `netlify/functions/capture-paypal-order`

- Accept POST only, body `{ orderId: string }` validated with Zod.
- Before capturing, GET the order from PayPal and confirm its amount and currency
  match what `calculateOrderTotal` produces for that order's line items. If they
  disagree, do not capture. Return 409 and log the discrepancy server-side.
- Send a `PayPal-Request-Id` header derived from the order ID so a retried or
  double-submitted capture cannot double-charge.
- Handle the already-captured case gracefully rather than erroring.
- Return a clean order summary (order ID, status, authoritative line items and
  total) for the confirmation screen and the FormSubmit email body.

## Step 5: Wire up the frontend

- `createOrder` calls the create function and returns the order ID from it.
- `onApprove` calls the capture function. Do not use the PayPal SDK's
  client-side `actions.order.capture()`.
- The FormSubmit order email must be built from the capture function's returned
  summary, not from cart state.
- Show useful UI for declined, cancelled, and network-failure states. Never
  surface raw PayPal error text to the user.
- `VITE_PAYPAL_CLIENT_ID` stays in the client for SDK rendering. `PAYPAL_SECRET`
  must never appear in any `VITE_`-prefixed variable or anywhere in `src/`.

## Step 6: Environment and docs

- Add `.env.example` listing `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_ENV`,
  `VITE_PAYPAL_CLIENT_ID` with placeholder values.
- Confirm `.env` is gitignored.
- Update the README with the required Netlify environment variables and how to
  run functions locally.

## Verification: run these and report results

1. `npm run build` succeeds with no type errors.
2. `grep -ri "PAYPAL_SECRET" src/` returns nothing.
3. `grep -ri "PAYPAL_SECRET" dist/` returns nothing after a build.
4. Start the local dev server with functions and confirm a normal cart produces
   a valid order ID.
5. **Tamper test A:** curl the create function with an injected price field.
   Confirm 400 and no PayPal order created.
6. **Tamper test B:** curl the create function with a valid item but
   `quantity: -5` and again with `quantity: 0.5`. Confirm both rejected.
7. **Tamper test C:** curl with a product ID that does not exist. Confirm 400.
8. Complete one full sandbox purchase end to end and confirm the amount PayPal
   records matches the catalog price, not anything the client sent.
9. Confirm calling the capture function twice with the same order ID does not
   double-charge.
10. Report every file changed and anything you could not verify from this session.

## Workflow

Work on a branch named `phase-3/server-side-payments`. Commit in logical units.
Do not open a pull request without explicit go-ahead.

PayPal setup

Log into the PayPal Developer Dashboard and create a REST API app if you don't already have one for 3dVerse
Grab the Client ID and Secret for sandbox first (you'll test with sandbox before flipping to live)
Get the live Client ID and Secret too, once you're ready to go live

Netlify environment variables

In the 3dVerse Netlify site settings, add PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV (set to sandbox for now), and VITE_PAYPAL_CLIENT_ID
These need to exist before Claude Code's local testing and before any deploy, since the functions fail loudly without them by design

Local dev

Create your own untracked .env with the same sandbox values so Claude Code (or you) can run functions locally during testing

Testing

After Claude Code finishes, do one real sandbox checkout yourself on the deployed preview and confirm the charged amount matches the catalog price
When you're satisfied, swap PAYPAL_ENV to live and update the live keys
