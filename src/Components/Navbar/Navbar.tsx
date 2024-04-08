import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";

import { NavUnlisted } from "./NavbarStyles";
import "./Navbar.css";
import { useState } from "react";

import navbarLogo from "../../assets/Main/logo.png";
import { links } from "../../utils/NavbarAndFooterLinks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { companyName } from "../../utils/HelpfulText";

export const Navbar = () => {
  const { cartItems } = useCartContext();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const CartLink = (
    <NavLink
      to="/cart"
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
    >
      <li id="cart-btn">
        <FontAwesomeIcon icon={faCartShopping} />
        <span>Cart</span> ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </li>
    </NavLink>
  );

  const linksWithNavLink = (
    <div className="navbar-links-container">
      {links.map((link, index) => (
        <NavLink
          onClick={() => setShowNavbar(false)}
          key={index}
          to={link.value}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "active" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
        >
          <li>{link.key}</li>
        </NavLink>
      ))}
      {CartLink}
    </div>
  );

  const logoHeaderLink = (
    <NavLink onClick={() => setShowNavbar(false)} to="/" id="logo-with-title">
      <img className="navbar-logo" src={navbarLogo} alt="tkd-main-logo" />
      <h2>{companyName}</h2>
    </NavLink>
  );

  return (
    <div className="root-layout">
      <header className="nav-bar">
        <nav>
          <NavUnlisted
            aria-label="Larger viewport navigation menu with links"
            className="main-navbar-ul"
          >
            <ul className="main-regular-links">{linksWithNavLink}</ul>

            <div className="menu-icon" onClick={handleShowNavbar}>
              <MenuIcon />
            </div>
            <div className="cart-small-screen">{CartLink}</div>
            {showNavbar && (
              <div className="nav-elements">
                <ul>{linksWithNavLink}</ul>
              </div>
            )}
            {logoHeaderLink}
          </NavUnlisted>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// display the cart icon only when small screen
