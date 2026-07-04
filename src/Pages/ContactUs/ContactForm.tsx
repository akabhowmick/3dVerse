import { contactFormId, homePage } from "../../utils/config";
import { socialButtons } from "../../utils/SocialMediaLink";
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
      <div key={name} className="contact-form-div">
        <label htmlFor={label}>{name}</label>
        <input
          className="contact-form-input"
          id={label}
          name={label}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={`Your ${name}`}
          required
        />
      </div>
    );
  });

  const messageField = (
    <div className="contact-message-div">
      <label htmlFor="message">Message</label>
      <textarea
        className="contact-form-input"
        id="message"
        name="message"
        placeholder="Your Message"
        required
      />
    </div>
  );

  const productOptions = [
    "Replica House - Full",
    "Replica House - Front Facade",
    "Key Chains",
    "Business Card Holder",
    "Custom",
  ];

  const selectClasses = (
    <div className="contact-form-div">
      <label htmlFor="design_of_interest">Design of Interest</label>
      <select className="contact-form-input" id="design_of_interest" name="design_of_interest">
        {productOptions.map((className) => {
          return (
            <option key={className} value={className}>
              {className}
            </option>
          );
        })}
      </select>
    </div>
  );

  const socialMediaButtons = socialButtons.map((button, index) => {
    return <div key={index}>{button}</div>;
  });

  return (
    <form action={contactFormId} method="POST">
      <div className="contact__form-container">
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
        {contactFormInputs}
        {messageField}
        {selectClasses}
        <div className="submit-btn-container">
          <button id="contact-submit-btn" type="submit" className="btn btn-primary">
            Send Email
          </button>
        </div>
        <div className="social-container">
          <h4>Come check out on our other social media pages!</h4>
          <div className="contact-links">{socialMediaButtons}</div>
        </div>
      </div>
    </form>
  );
};
