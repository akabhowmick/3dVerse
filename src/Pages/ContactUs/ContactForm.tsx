import { contactFormId, homePage } from "../../utils/config";
import "./Contact.css";

export const ContactForm = () => {
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

  const productOptions = [
    "Replica House - Full",
    "Replica House - Front Facade",
    "Key Chains",
    "Business Card Holder",
    "Custom",
  ];

  return (
    <form className="form-card" action={contactFormId} method="POST">
      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="_next" value={homePage} />
      <input type="hidden" name="_subject" value="Inquiry for Print3DVerse!" />
      <div className="form-grid">
        {contactFormInputs}
        <div className="field">
          <label htmlFor="design_of_interest">Design of interest</label>
          <select className="field-input" id="design_of_interest" name="design_of_interest">
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="field form-grid-full">
          <label htmlFor="message">Message</label>
          <textarea
            className="field-input"
            id="message"
            name="message"
            placeholder="Tell us what you have in mind"
            required
          />
        </div>
      </div>
      <button id="contact-submit-btn" type="submit" className="btn-primary form-submit">
        Send message
      </button>
      <p className="policy-note">
        We&rsquo;ll only use these details to reply to you. See our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
};
