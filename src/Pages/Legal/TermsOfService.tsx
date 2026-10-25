import { LegalPage, LegalSection } from "./LegalPage";
import { companyName } from "../../utils/HelpfulText";
import { companyEmail } from "../../utils/config";
import { governingLawState } from "../../utils/legal";

// The ordering steps, quote policy, color limits, return policy and
// "natural imperfections" note all come from the existing product and
// ordering copy (Products.ts, HelpfulText.ts). Keep them in sync.
const email = <a href={`mailto:${companyEmail}`}>{companyEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms apply when you use print3dverse.com and when you place an order here. By
          using the site or placing an order, you agree to them, along with our{" "}
          <a href="/privacy">Privacy Policy</a> and <a href="/shipping-returns">Shipping &amp;
          Returns</a> policy.
        </p>
        <p>Orders placed through our Etsy shop are also covered by Etsy&rsquo;s own terms.</p>
      </>
    ),
  },
  {
    id: "custom-orders",
    title: "How custom orders work",
    content: (
      <>
        <p>Every piece is made to order from the photos, logos and details you give us:</p>
        <ol>
          <li>You choose a product and options, and pay at checkout.</li>
          <li>
            You send us your photos or logo along with your order number, through our upload page,
            by email, or through Etsy.
          </li>
          <li>
            We review them, and if they aren&rsquo;t enough to model from, we&rsquo;ll ask for
            better photos or other angles.
          </li>
          <li>
            We send you a rendering or mock-up showing how the finished piece will look, including
            the exact color tones we&rsquo;ll use.
          </li>
          <li>We start production only after you approve it.</li>
        </ol>
        <p>
          Color choices are limited by the materials we print with. Once you approve a rendering,
          we make the piece as shown.
        </p>
        <p>
          Some highly detailed models need a custom quote. If yours does, we&rsquo;ll message you
          with the final price before we start, and you can decide whether to go ahead.
        </p>
      </>
    ),
  },
  {
    id: "prices-and-payment",
    title: "Prices and payment",
    content: (
      <>
        <p>
          Prices are in US dollars. Shipping and sales tax are added at checkout, where you&rsquo;ll
          see the full total before you pay. Payments are processed by PayPal.
        </p>
        <p>
          If a price is shown incorrectly because of an error, we&rsquo;ll contact you before
          making your order. You can then go ahead at the correct price or cancel for a full
          refund.
        </p>
      </>
    ),
  },
  {
    id: "if-we-cant-make-it",
    title: "If we can't make your order",
    content: (
      <p>
        If we can&rsquo;t make your piece (for example, because the photos available can&rsquo;t be
        modeled), we&rsquo;ll let you know and refund what you paid.
      </p>
    ),
  },
  {
    id: "your-content",
    title: "Your photos, logos and text",
    content: (
      <>
        <p>
          When you send us photos, logos or lettering, you confirm that you own them or have
          permission to use them, and that having them printed doesn&rsquo;t infringe anyone
          else&rsquo;s rights, including trademarks.
        </p>
        <p>
          You keep ownership of what you send. You give us permission to use it to design, make and
          deliver your order. We may decline content we believe infringes someone else&rsquo;s
          rights or is offensive or unlawful, and refund you if we do.
        </p>
        <p>
          We may share photos of finished pieces on our website and social media. If you&rsquo;d
          rather we didn&rsquo;t share yours, tell us when you order.
        </p>
      </>
    ),
  },
  {
    id: "about-the-products",
    title: "About the products",
    content: (
      <ul>
        <li>
          Pieces are 3D-printed in plastic, so small natural imperfections are a normal part of the
          process.
        </li>
        <li>Colors may look slightly different on your screen than in person.</li>
        <li>Sizes are approximate and listed as a maximum dimension.</li>
        <li>Product photos show examples of past custom work; your piece is made to your order.</li>
      </ul>
    ),
  },
  {
    id: "returns",
    title: "Returns and replacements",
    content: (
      <p>
        Because every piece is personalized, we can&rsquo;t accept returns or give refunds once
        your order is made, but we replace pieces with production defects free of charge. Details
        are on our <a href="/shipping-returns">Shipping &amp; Returns</a> page.
      </p>
    ),
  },
  {
    id: "site-content",
    title: "Our website content",
    content: (
      <p>
        The text, images and designs on this site belong to {companyName} or the people who
        licensed them to us. Please don&rsquo;t copy them for commercial use without our
        permission.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent the law allows, {companyName} isn&rsquo;t liable for indirect,
          incidental or consequential losses arising from your use of this site or your order. Our
          total liability for any claim relating to an order is limited to the amount you paid for
          that order.
        </p>
        <p>Nothing in these terms limits any rights you have by law that can&rsquo;t be waived.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of the State of {governingLawState}. If there&rsquo;s
        ever a problem, please contact us first; we&rsquo;ll do our best to sort it out directly.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time and will change the &ldquo;Last updated&rdquo;
        date when we do. The terms in place when you placed your order apply to that order.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Email {email} or use our <a href="/contact-us">contact form</a>.
      </p>
    ),
  },
];

export const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    lead="The terms that apply when you use this site and order from us."
    sections={sections}
  />
);
