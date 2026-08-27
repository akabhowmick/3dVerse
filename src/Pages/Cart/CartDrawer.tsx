import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../providers/CartProvider";
import { CartItem } from "./CartItem";
import "./CartDrawer.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, total, tax, shipping, finalTotal } = useCartContext();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Move focus into the panel on open, trap Tab within it, close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock page scroll behind the drawer while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // The backdrop's click-to-close is a pointer-only convenience, not the
    // only way to close the dialog -- the close button, Escape, and the
    // focus trap above already make the whole thing fully keyboard
    // operable, so the backdrop itself doesn't need its own key handler.
    <div className="cart-drawer-overlay" onClick={onClose} role="presentation">
      {/* stopPropagation here keeps clicks inside the panel from bubbling
          up to the backdrop's onClose above. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <h2 id="cart-drawer-title">Your Cart ({cartCount})</h2>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <p>Your cart is empty.</p>
            <p>
              {/* TODO: "two best-selling categories" was requested by the
                  design brief, but nothing in this codebase/session tracks
                  sales data to actually rank categories -- these are just
                  two of the site's existing nav categories, picked
                  arbitrarily, not a data-backed "best-selling" claim. */}
              Take a look at{" "}
              <a href="/miscellaneous" onClick={onClose}>
                Miscellaneous
              </a>{" "}
              or{" "}
              <a href="/model-houses" onClick={onClose}>
                Replica Houses
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <CartItem cartItem={item} />
                </li>
              ))}
            </ul>

            <div className="cart-drawer-summary">
              <dl>
                <div className="cart-drawer-summary-row">
                  <dt>Subtotal</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
                <div className="cart-drawer-summary-row">
                  <dt>NY Tax</dt>
                  <dd>${tax.toFixed(2)}</dd>
                </div>
                <div className="cart-drawer-summary-row">
                  <dt>Shipping</dt>
                  <dd>${shipping.toFixed(2)}</dd>
                </div>
                <div className="cart-drawer-summary-row cart-drawer-total">
                  <dt>Total</dt>
                  <dd>${finalTotal.toFixed(2)}</dd>
                </div>
              </dl>

              <a href="/checkout" className="btn-primary cart-drawer-checkout-btn" onClick={onClose}>
                Proceed to Checkout
              </a>
              <a href="/cart" className="cart-drawer-view-full" onClick={onClose}>
                View full cart page
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
