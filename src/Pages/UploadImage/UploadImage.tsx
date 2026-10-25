import "../ContactUs/Contact.css";
import { imageUploadFormId, thankYouPage } from "../../utils/config";
import { useEffect } from "react";
import { useCartContext } from "../../providers/CartProvider";
import { PageHero } from "../../Components/PageHero/PageHero";
import { fullDetailedDetails } from "../../utils/HelpfulText";

const photoGuidelines =
  fullDetailedDetails.find((group) => group.title === "Photo guidelines")?.items ?? [];

export const UploadImageForm = () => {
  const { setCart } = useCartContext();

  useEffect(() => {
    setCart([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contactFormInput: {
    name: string;
    label: string;
    type: string;
    autoComplete: string;
    inputMode?: "email" | "tel";
  }[] = [
    { name: "Name", label: "from_name", type: "text", autoComplete: "name" },
    { name: "Email", label: "reply_to", type: "email", autoComplete: "email", inputMode: "email" },
    {
      name: "Phone Number",
      label: "phone_number",
      type: "tel",
      autoComplete: "tel",
      inputMode: "tel",
    },
    { name: "Order Number", label: "order_number", type: "text", autoComplete: "off" },
  ];

  const contactFormInputs = contactFormInput.map(({ name, label, type, autoComplete, inputMode }) => {
    return (
      <div key={name} className="field">
        <label htmlFor={label}>{name}</label>
        <input
          className="field-input"
          id={label}
          name={label}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={`Your ${name.toLowerCase()}`}
          required
        />
      </div>
    );
  });

  return (
    <>
      <PageHero
        kicker="Customize your order"
        title="Send us your photos"
        lead="Upload a photo or logo and our designers will build a rendering for you to approve before anything is printed."
      />
      <div className="section form-layout">
        <aside className="form-aside">
          <h2 className="form-aside-title">Photo guidelines</h2>
          <ul className="form-aside-list">
            {photoGuidelines.map((guideline) => (
              <li key={guideline}>{guideline}</li>
            ))}
          </ul>
          <p className="form-aside-label">Prefer email?</p>
          <p>
            <a href="mailto:print3Dverse@gmail.com">print3Dverse@gmail.com</a>
          </p>
        </aside>

        <form
          className="form-card"
          action={imageUploadFormId}
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="_next" value={thankYouPage} />
          <input
            type="text"
            name="_honey"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input type="hidden" name="_subject" value="Customization for Print3dVerse order!" />
          <input type="hidden" name="_template" value="table" />
          <div className="form-grid">
            {contactFormInputs}
            <div className="field form-grid-full">
              <label htmlFor="message">Message</label>
              <textarea
                className="field-input"
                id="message"
                name="message"
                placeholder="Colors, lettering, anything we should know"
                required
              />
            </div>
            <div className="field form-grid-full">
              <label htmlFor="Image-for-Customization">Image for customization</label>
              <input
                id="Image-for-Customization"
                className="file-input"
                type="file"
                name="Image-for-Customization"
                accept="image/png, image/jpeg"
                aria-describedby="image-hint"
                required
              />
              <p className="file-input-hint" id="image-hint">
                PNG or JPEG.
              </p>
            </div>
          </div>
          <button id="contact-submit-btn" type="submit" className="btn-primary form-submit">
            Submit to our designers
          </button>
          <p className="policy-note">
            We&rsquo;ll only use these details and your photos to work on your order. See our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </>
  );
};
