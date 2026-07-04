import {
  faEbay,
  faEtsy,
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcon } from "../Types/interfaces";

const fontAwesomeIcons: (faIcon & { name: string })[] = [
  { link: "/", icon: faFacebook, name: "Facebook" },
  { link: "https://www.instagram.com/print3dverse/", icon: faInstagram, name: "Instagram" },
  {
    link: "https://www.etsy.com/shop/Print3DverseShop?ref=l2-about-shopname",
    icon: faEtsy,
    name: "Etsy",
  },
  { link: "/", icon: faEbay, name: "eBay" },
  { link: "/", icon: faTwitter, name: "Twitter" },
  { link: "/", icon: faTiktok, name: "TikTok" },
];

export const socialButtons = fontAwesomeIcons
  .filter((social) => social.link !== "/")
  .map(({ link, icon, name }) => {
    return (
      <a href={link} key={link} aria-label={name}>
        <FontAwesomeIcon id="btn__social" className="icon" icon={icon} aria-hidden="true" />
      </a>
    );
  });
