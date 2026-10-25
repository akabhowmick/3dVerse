import "./Footer.css";

import navbarLogo from "../../assets/Main/logo.webp";

import { KeyValueStringPairs } from "../../Types/interfaces";
import { socialButtons } from "../../utils/SocialMediaLink";
import { companyName, companyTagline } from "../../utils/HelpfulText";
import { links } from "../../utils/NavbarAndFooterLinks";
import { legalLinks } from "../../utils/legal";
import { Wordmark } from "../Navbar/Wordmark";

const contactLink = links.find((link) => link.value === "/contact-us");

const footerColumns: { heading: string; items: KeyValueStringPairs[] }[] = [
  {
    heading: "Shop",
    items: [
      ...links.filter((link) => link !== contactLink),
      { key: "Your Cart", value: "/cart" },
    ],
  },
  {
    heading: "Help",
    items: [
      ...(contactLink ? [contactLink] : []),
      { key: "Email Us", value: "mailto:print3Dverse@gmail.com" },
      ...legalLinks.filter((link) => link.value === "/shipping-returns"),
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="site-footer on-dark">
      <span className="kit-stripe" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="/" className="brand-link">
            <img className="brand-logo" src={navbarLogo} alt="" width={474} height={435} />
            <Wordmark />
            <span className="visually-hidden"> home</span>
          </a>
          <p className="footer-tagline">{companyTagline}</p>
          <div className="footer-social">{socialButtons}</div>
        </div>

        <nav className="footer-columns" aria-label="Footer">
          {footerColumns.map(({ heading, items }) => (
            <div className="footer-col" key={heading}>
              <h2 className="footer-heading">{heading}</h2>
              <ul>
                {items.map((link) => (
                  <li key={link.value}>
                    <a href={link.value}>{link.key}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {companyName}
        </p>
        <ul className="footer-legal" aria-label="Policies">
          {legalLinks.map((link) => (
            <li key={link.value}>
              <a href={link.value}>{link.key}</a>
            </li>
          ))}
        </ul>
        <p>
          Site by <a href="http://akashbhowmick.com/">AKA CODE</a>
        </p>
      </div>
    </footer>
  );
};
