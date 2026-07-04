import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { NavUnlisted } from "./NavbarStyles";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

import navbarLogo from "../../assets/Main/logo.png";
import { links } from "../../utils/NavbarAndFooterLinks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { companyName } from "../../utils/HelpfulText";

export const Navbar = () => {
  const { cartItems, announcement } = useCartContext();
  const [showNavbar, setShowNavbar] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isInitialMount = useRef(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    if (!showNavbar) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowNavbar(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showNavbar]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    document.getElementById("main-content")?.focus();
  }, [pathname]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const CartLink = (
    <li id="cart-btn">
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
        <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
        <span className="cart-label">Cart</span> <span aria-hidden="true">({cartCount})</span>
        <span className="visually-hidden">
          , {cartCount} item{cartCount === 1 ? "" : "s"} in cart
        </span>
      </NavLink>
    </li>
  );

  const navLinkItems = (
    <>
      {links.map((link, index) => (
        <li key={index}>
          {/* NavLink renders a real <a href> at runtime (native keyboard
              support already verified); jsx-a11y's click-events-have-key-events
              and no-static-element-interactions only recognize a literal
              `href` prop name, not react-router's `to`, so they false-positive
              here. */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <NavLink
            onClick={() => setShowNavbar(false)}
            to={link.value}
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
              ].join(" ")
            }
          >
            {link.key}
          </NavLink>
        </li>
      ))}
      {CartLink}
    </>
  );

  const logoHeaderLink = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- see comment above navLinkItems
    <NavLink onClick={() => setShowNavbar(false)} to="/" id="logo-with-title">
      <img
        className="navbar-logo"
        src={navbarLogo}
        alt="Print3DVerse home"
        width={474}
        height={435}
      />
      <h2>{companyName}</h2>
    </NavLink>
  );

  return (
    <div className="root-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div aria-live="polite" className="visually-hidden">
        {announcement}
      </div>
      <header className="nav-bar">
        <nav>
          <NavUnlisted
            aria-label="Larger viewport navigation menu with links"
            className="main-navbar-ul"
          >
            <ul className="main-regular-links">{navLinkItems}</ul>

            <button
              type="button"
              className="menu-icon"
              onClick={handleShowNavbar}
              aria-expanded={showNavbar}
              aria-controls="mobile-nav-menu"
              aria-label={showNavbar ? "Close navigation menu" : "Open navigation menu"}
              ref={menuButtonRef}
            >
              <MenuIcon aria-hidden="true" />
            </button>
            <ul className="cart-small-screen">{CartLink}</ul>
            {showNavbar && (
              <div className="nav-elements" id="mobile-nav-menu">
                <ul>{navLinkItems}</ul>
              </div>
            )}
            {logoHeaderLink}
          </NavUnlisted>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
};

// display the cart icon only when small screen
