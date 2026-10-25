# # E-Commerce Website for Print3DVerse

## Description

This is an e-commerce website for your Etsy business. Secure payment processing is facilitated through PayPal integration.

## Features
- Browse and view a collection of 3D renders of houses and house fronts.
- Add items to the shopping cart and proceed to checkout securely using PayPal.
- Secure user authentication and account management powered by Firebase.
- Responsive design for optimal viewing on various devices.
- Integration with PayPal for secure and seamless payment processing.
- Utilization of Material-UI (MUI) components for a modern and visually appealing interface.

## Technologies Used
- React (frontend code logic)
- React-Bootstrap (overall styling)
- UploadCloud (file storage)
- Form Spark (send forms via email)
- MUI (product and checkout sections styling)
- React Router Dom (navigation)
- PayPal integration (payment processing)

## Environment Variables

Copy `.env.example` to `.env` and fill in real values. `.env` is gitignored and must never be committed.

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_PAYPAL_CLIENT_ID` | Browser (Vite) | PayPal client ID for rendering the PayPal buttons. Safe to expose client-side. |
| `PAYPAL_CLIENT_ID` | Netlify Functions | PayPal REST app client ID, server-side only. |
| `PAYPAL_SECRET` | Netlify Functions | PayPal REST app secret. Must never be prefixed `VITE_` or referenced anywhere under `src/`. |
| `PAYPAL_ENV` | Netlify Functions | `sandbox` or `live`. Selects the PayPal API base URL. |

All four must also be set in the Netlify site's dashboard (Site configuration -> Environment variables) before deploying, in addition to the local `.env`.

## Order pricing and payment flow

The browser never determines what a customer is charged. It sends only product/variant SKU ids and quantities; `netlify/functions/create-paypal-order` recomputes the order total from [shared/pricing.ts](shared/pricing.ts) (the single source of truth for the catalog and for NY sales tax/shipping) and creates the PayPal order server-side. `netlify/functions/capture-paypal-order` re-verifies that total against PayPal's own stored order before capturing, so the amount charged can never diverge from the catalog.

## Running Netlify Functions locally

The PayPal buttons call `/.netlify/functions/create-paypal-order` and `/.netlify/functions/capture-paypal-order`, which only exist when served through the Netlify CLI (plain `npm run dev` serves the Vite app alone, without functions).

```bash
npx netlify-cli dev
```

This proxies the Vite dev server and serves the functions from `netlify/functions/` alongside it, using the `PAYPAL_*` values from your local `.env`. Type-check the functions on their own with:

```bash
npm run typecheck:functions
```

