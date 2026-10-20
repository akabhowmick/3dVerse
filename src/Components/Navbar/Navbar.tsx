import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { MouseEvent, useEffect, useRef, useState } from "react";

import navbarLogo from "../../assets/Main/logo.webp";
import { links } from "../../utils/NavbarAndFooterLinks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { CartDrawer } from "../../Pages/Cart/CartDrawer";
import { Footer } from "../Footer/Footer";
import { Wordmark } from "./Wordmark";

export const Navbar = () => {
  const { cartItems, announcement } = useCartContext();
  const [showNavbar, setShowNavbar] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const cartTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();
  const isInitialMount = useRef(true);

  const openCartDrawer = (event: MouseEvent<HTMLButtonElement>) => {
    cartTriggerRef.current = event.currentTarget;
    setShowNavbar(false);
    setIsCartOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartOpen(false);
    cartTriggerRef.current?.focus();
  };

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

  // Summed quantity, not distinct line count -- the drawer header uses the
  // same sum, so every cart counter on the site agrees.
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinkItems = links.map((link) => (
    <li key={link.value}>
      {/* NavLink renders a real <a href> at runtime (native keyboard
          support already verified); jsx-a11y's click-events-have-key-events
          and no-static-element-interactions only recognize a literal
          `href` prop name, not react-router's `to`, so they false-positive
          here. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <NavLink
        onClick={() => setShowNavbar(false)}
        to={link.value}
        className={({ isActive, isPending }) =>
          ["nav-link", isPending ? "pending" : "", isActive ? "active" : ""].join(" ")
        }
      >
        {link.key}
      </NavLink>
    </li>
  ));

  return (
    <div className="root-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div aria-live="polite" className="visually-hidden">
        {announcement}
      </div>
      <header className="site-header on-dark">
        <nav className="site-nav" aria-label="Main">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- see comment in navLinkItems */}
          <NavLink onClick={() => setShowNavbar(false)} to="/" className="brand-link">
            <img className="brand-logo" src={navbarLogo} alt="" width={474} height={435} />
            <Wordmark />
            <span className="visually-hidden"> home</span>
          </NavLink>

          <ul className="nav-links">{navLinkItems}</ul>

          <div className="nav-actions">
            {/* Opens the cart drawer rather than navigating -- the full /cart
                page (see CartPage.tsx) stays registered as a fallback route. */}
            <button type="button" className="cart-trigger" onClick={openCartDrawer}>
              <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
              <span className="cart-label">Cart</span>
              <span className="cart-count num" aria-hidden="true">
                {cartCount}
              </span>
              <span className="visually-hidden">
                , {cartCount} item{cartCount === 1 ? "" : "s"} in cart
              </span>
            </button>

            <button
              type="button"
              className="menu-toggle"
              onClick={handleShowNavbar}
              aria-expanded={showNavbar}
              aria-controls="mobile-nav-menu"
              aria-label={showNavbar ? "Close navigation menu" : "Open navigation menu"}
              ref={menuButtonRef}
            >
              {showNavbar ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {showNavbar && (
          <div className="mobile-menu" id="mobile-nav-menu">
            <ul>{navLinkItems}</ul>
          </div>
        )}
        <span className="kit-stripe" aria-hidden="true" />
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={closeCartDrawer} />
    </div>
  );
};
