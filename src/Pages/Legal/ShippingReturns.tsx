import { LegalPage, LegalSection } from "./LegalPage";
import { companyEmail } from "../../utils/config";
import { calculateOrderTotal, catalog, centsToDollarString } from "../../../shared/pricing";

// Read from the shared pricing module -- the same calculation the cart and
// the payment functions use -- so the shipping fee stated here can't drift
// from what checkout actually charges.
const shippingFee = `$${centsToDollarString(
  calculateOrderTotal([{ id: catalog[0].id, quantity: 1 }]).shippingCents
)}`;

// Lead times and the return/replacement policy come from the existing
// product and ordering copy (Products.ts, HelpfulText.ts).
const email = <a href={`mailto:${companyEmail}`}>{companyEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "made-to-order",
    title: "Made to order",
    content: (
      <p>
        Nothing ships from stock. Every piece is modeled and printed for your order, and production
        starts once you&rsquo;ve approved the rendering or mock-up we send you. How quickly you send
        photos and approve the design affects when your order ships.
      </p>
    ),
  },
  {
    id: "production-times",
    title: "Production times",
    content: (
      <>
        <ul>
          <li>
            <strong>Replica houses and front facades:</strong> typically several days to a few weeks
            after you approve the rendering, depending on the size and detail of the model.
          </li>
          <li>
            <strong>Business card holders:</strong> around 7&ndash;10 business days.
          </li>
          <li>
            <strong>Custom keychains:</strong> we send a mock-up for your approval, then make and
            ship them as soon as possible.
          </li>
        </ul>
        <p>
          Need it by a certain date? <a href="/contact-us">Contact us</a> before you order and
          we&rsquo;ll tell you whether we can make it in time.
        </p>
      </>
    ),
  },
  {
    id: "shipping",
    title: "Shipping",
    content: (
      <>
        <p>
          Shipping is a flat <strong>{shippingFee} per order</strong>, shown in your cart and at
          checkout along with sales tax.
        </p>
        <p>
          We ship to the address you enter at checkout, so please check it carefully. If you spot a
          mistake, email us right away at {email}.
        </p>
      </>
    ),
  },
  {
    id: "returns",
    title: "Returns and refunds",
    content: (
      <>
        <p>
          Our pieces are personalized to you, so unfortunately we can&rsquo;t accept returns or
          offer refunds once your order has been made.
        </p>
        <p>
          If we&rsquo;re unable to make your order, we&rsquo;ll let you know and refund what you
          paid (see our <a href="/terms">Terms of Service</a>).
        </p>
      </>
    ),
  },
  {
    id: "defects",
    title: "Production defects",
    content: (
      <>
        <p>
          If your piece has a production defect, we&rsquo;ll replace it free of charge. Email us at{" "}
          {email} with your order number and a photo of the problem, and we&rsquo;ll take it from
          there.
        </p>
        <p>
          3D-printed plastic has small natural imperfections; the product pages show what to
          expect.
        </p>
      </>
    ),
  },
  {
    id: "delivery-problems",
    title: "Delivery problems",
    content: (
      <p>
        If your order hasn&rsquo;t arrived or arrives damaged, email us at {email} with your order
        number and we&rsquo;ll help sort it out.
      </p>
    ),
  },
];

export const ShippingReturns = () => (
  <LegalPage
    title="Shipping & Returns"
    lead="How long custom pieces take, what shipping costs, and what happens if something isn't right."
    sections={sections}
  />
);
