import { ContactForm } from "./ContactForm";

export const ContactUs = () => {

  return (
    <div className="contact-page">
      <h2 className="page-header">Contact Us!</h2>
      <h3 className="page-subheader">
        Fill out the page below and we will reach out to you as soon as possible
      </h3>
      <div className="form-container-with-social">
        <ContactForm />
      </div>
    </div>
  );
};
