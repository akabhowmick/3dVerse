import { contactFormId, homePage } from "../../utils/ApiKeys";
import { socialButtons } from "../../utils/SocialMediaLink";
import "./Contact.css";

export const ContactForm = () => {
  const contactFormInput = [
    { name: "Name", label: "from_name" },
    { name: "Email", label: "reply_to" },
    { name: "Phone Number", label: "phone_number" },
    { name: "Message", label: "message" },
  ];

  const contactFormInputs = contactFormInput.map(({ name, label }) => {
    return (
      <div key={name} className="contact-form-div">
        <label htmlFor={label}>{name}</label>
        <input
          className="contact-form-input"
          id={label}
          name={label}
          type="text"
          autoComplete="off"
          placeholder={`Your ${name}`}
          required
        />
      </div>
    );
  });

  const productOptions = [
    "Funko Pop Stand",
    "City Skyline",
    "Key Chains",
    "Card Stand",
    "Game Card Holder",
    "Game Display Holder",
    "Horizontal Six Card Stand",
    "Six Card Stand",
    "Three Card Stand",
  ];

  const selectClasses = (
    <div className="contact-form-div">
      <label htmlFor="design_of_interest">Class Of Interest</label>
      <select className="contact-form-input" id="design_of_interest" name="design_of_interest">
        {productOptions.map((className) => {
          return <option key={className} value={className} label={className}></option>;
        })}
      </select>
    </div>
  );

  const socialMediaButtons = socialButtons.map((button, index) => {
    return <div key={index}>{button}</div>;
  });

  return (
    <form action={contactFormId}>
      <div className="contact__form-container">
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input type="hidden" name="_redirect" value={homePage} />
        {contactFormInputs}
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
