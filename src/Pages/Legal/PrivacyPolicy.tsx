import { LegalPage, LegalSection } from "./LegalPage";
import { companyName } from "../../utils/HelpfulText";
import { companyEmail } from "../../utils/config";
import { thirdPartyPolicies } from "../../utils/legal";

// Every statement here should stay true to what the code actually does:
// the three FormSubmit forms (contact, photo upload, order review), the
// PayPal checkout via Netlify Functions, the localStorage cart, and no
// analytics or tracking scripts. Update this page if any of that changes.
const email = <a href={`mailto:${companyEmail}`}>{companyEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          {companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) makes custom 3D-printed pieces and
          sells them through this website. This policy explains what information we collect here,
          how we use it, who we share it with, and the choices you have.
        </p>
        <p>Questions about your information? Email us at {email}.</p>
      </>
    ),
  },
  {
    id: "information-you-give-us",
    title: "Information you give us",
    content: (
      <>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, phone number, message and the
            design you&rsquo;re interested in.
          </li>
          <li>
            <strong>Checkout:</strong> your name, email address, phone number and shipping address,
            the items in your order and any personalization (such as colors and lettering), and an
            order number we create.
          </li>
          <li>
            <strong>Photo upload:</strong> your name, email address, phone number, order number,
            message, and the photos or logos you upload.
          </li>
          <li>
            <strong>Email, Etsy or Instagram:</strong> whatever you choose to send us there.
          </li>
        </ul>
        <p>
          The photos you send are usually of your home or your logo. We use them only to design and
          make your order.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    content: (
      <>
        <p>
          Payments are processed by PayPal. Your card or bank details go directly to PayPal; we
          never see or store them.
        </p>
        <p>
          When you pay, our server sends PayPal the items and quantities in your order and receives
          back a confirmation (the PayPal order ID, the amount and the payment status). As the
          seller, we may also receive your name, email address and shipping address from PayPal.
          PayPal&rsquo;s own handling of your information is covered by the{" "}
          <a href={thirdPartyPolicies.paypal}>PayPal Privacy Statement</a>.
        </p>
      </>
    ),
  },
  {
    id: "collected-automatically",
    title: "Information collected automatically",
    content: (
      <>
        <p>
          <strong>Hosting logs.</strong> Our website host, Netlify, records standard technical
          information when you visit, such as your IP address, browser type and the pages
          requested. This is used to deliver the site and keep it secure.
        </p>
        <p>
          <strong>Your cart.</strong> The contents of your cart, including any personalization you
          type in, are saved in your browser&rsquo;s local storage so they survive a page reload.
          They stay on your device until you check out. You can clear them by emptying your cart or
          clearing this site&rsquo;s data in your browser.
        </p>
        <p>
          <strong>No analytics or ad tracking.</strong> We don&rsquo;t use analytics tools,
          advertising pixels or tracking cookies. When you reach the payment step, PayPal&rsquo;s
          checkout buttons load from PayPal and may set PayPal&rsquo;s own cookies.
        </p>
        <p>
          <strong>Do Not Track.</strong> Because we don&rsquo;t track visitors across websites,
          there&rsquo;s nothing for a Do Not Track signal to switch off; we treat every visitor the
          same way whether or not one is sent.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <ul>
          <li>To answer your questions and send quotes.</li>
          <li>
            To design, make and ship your order, including sending you renderings or mock-ups to
            approve.
          </li>
          <li>To process payments and help prevent fraud.</li>
          <li>To send you order confirmations and updates about your order.</li>
          <li>To keep the records we need for tax, accounting and legal purposes.</li>
        </ul>
        <p>We don&rsquo;t sell or rent your personal information.</p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    content: (
      <>
        <p>
          We share information only with the services that help us run the shop, and only what
          each one needs:
        </p>
        <ul>
          <li>
            <strong>FormSubmit</strong> delivers what you send through our contact, photo upload and
            order forms to our email inbox (<a href={thirdPartyPolicies.formSubmit}>privacy policy</a>).
          </li>
          <li>
            <strong>Google</strong> hosts the Gmail inbox where those emails arrive, and the Google
            Form if you choose that option for sending photos (
            <a href={thirdPartyPolicies.google}>privacy policy</a>).
          </li>
          <li>
            <strong>PayPal</strong> processes payments (
            <a href={thirdPartyPolicies.paypal}>privacy statement</a>).
          </li>
          <li>
            <strong>Netlify</strong> hosts this website and runs the server code that creates and
            confirms PayPal orders (<a href={thirdPartyPolicies.netlify}>privacy policy</a>).
          </li>
          <li>
            <strong>Shipping carriers</strong> receive your name and address so they can deliver
            your order.
          </li>
        </ul>
        <p>
          We may also disclose information if the law requires it, or to protect our rights or
          someone&rsquo;s safety.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    content: (
      <p>
        We keep order details and our messages with you for as long as we need them to make and
        ship your order, handle any replacement, and answer questions about it, and after that for
        as long as tax and accounting rules require. You can ask us to delete the photos and logos
        you sent once your order is complete.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    content: (
      <>
        <p>
          You can ask us to tell you what information we have about you, correct it, or delete it,
          by emailing {email}. We may need to keep some records where the law requires it (for
          example, for taxes), and we&rsquo;ll tell you if that applies.
        </p>
        <p>Depending on where you live, you may have additional rights under local law.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        This site is served over HTTPS, and payment details are handled by PayPal rather than by
        us. We limit who can access order information. No method of sending or storing information
        is completely secure, but we take reasonable care to protect what you share with us.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        This site isn&rsquo;t intended for children under 13, and we don&rsquo;t knowingly collect
        their information. If you believe a child has sent us personal information, contact us and
        we&rsquo;ll delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        If we change this policy, we&rsquo;ll update the &ldquo;Last updated&rdquo; date at the top
        of this page.
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

export const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    lead="What we collect when you use this site, how we use it, and the choices you have."
    sections={sections}
  />
);
