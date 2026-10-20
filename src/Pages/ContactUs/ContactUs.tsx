import { PageHero } from "../../Components/PageHero/PageHero";
import { socialButtons } from "../../utils/SocialMediaLink";
import { ContactForm } from "./ContactForm";
import "./Contact.css";

export const ContactUs = () => {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Contact us"
        lead="Questions, quotes or a custom idea? Send us a message."
      />
      <div className="section form-layout">
        <aside className="form-aside">
          <h2 className="form-aside-title">Other ways to reach us</h2>
          <p className="form-aside-label">Email</p>
          <p>
            <a href="mailto:print3Dverse@gmail.com">print3Dverse@gmail.com</a>
          </p>
          <p className="form-aside-label">Follow along</p>
          <div className="form-aside-social">{socialButtons}</div>
        </aside>
        <ContactForm />
      </div>
    </>
  );
};
