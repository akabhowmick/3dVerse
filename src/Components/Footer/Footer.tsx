import "./Footer.css";

import navbarLogo from "../../assets/Main/logo.png";

import { KeyValueStringPairs } from "../../Types/interfaces";
import { socialButtons } from "../../utils/SocialMediaLink";
import { companyName, heroText } from "../../utils/HelpfulText";
import { links } from "../../utils/NavbarAndFooterLinks";

const footerSiteLinks: KeyValueStringPairs[] = [{ key: "Home", value: "/" }, ...links];

export const Footer = () => {
  const logoFooterLink = (
    <a href="/" id="logo-with-title">
      <img className="navbar-logo" src={navbarLogo} alt="tkd-main-logo" />
      <h3>{companyName}</h3>
    </a>
  );
  return (
    <>
      <footer className="footer">
        <div className="footer-left col-md-4 col-sm-6">
          <h4 className="about">{heroText}</h4>
          <div id="social-links">{socialButtons}</div>
          <p className="about">
            For more tailor-made sites, please visit:
            <br /> <a href="http://akashbhowmick.com/">AKA CODE</a>
          </p>
        </div>
        <div className="footer-right col-md-4 col-sm-6">
          {logoFooterLink}

          <ul className="menu">
            {footerSiteLinks.map((link) => {
              return (
                <li key={link.key} aria-label={`Link to ${link.key}`}>
                  <a aria-label={`Link to ${link.key}`} href={link.value}>
                    {link.key}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </footer>
    </>
  );
};
