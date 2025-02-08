import { ContactForm } from "./ContactForm";

export const ContactUs = () => {
  return (
    <div className="contact-page">
      <h2 className="page-header">Contact Us!</h2>
      <div className="form-container-with-social">
        <ContactForm />
      </div>
    </div>
  );
};
