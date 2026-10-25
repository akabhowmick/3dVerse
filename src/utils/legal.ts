import { KeyValueStringPairs } from "../Types/interfaces";

// Shown as "Last updated" on every policy page. Bump it whenever the
// wording of any policy changes.
export const policiesLastUpdated = "October 25, 2026";

// TODO: confirm with the shop owner. Inferred from the New York sales tax
// the checkout applies (shared/pricing.ts), not from any stated policy.
export const governingLawState = "New York";

export const legalLinks: KeyValueStringPairs[] = [
  { key: "Privacy Policy", value: "/privacy" },
  { key: "Terms of Service", value: "/terms" },
  { key: "Shipping & Returns", value: "/shipping-returns" },
];

// Third-party policies the Privacy Policy points to (all checked live
// 2026-10-25).
export const thirdPartyPolicies = {
  paypal: "https://www.paypal.com/us/legalhub/paypal/privacy-full",
  netlify: "https://www.netlify.com/privacy/",
  formSubmit: "https://formsubmit.co/privacy.pdf",
  google: "https://policies.google.com/privacy",
};
