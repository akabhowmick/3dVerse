import { useCartContext } from "../../providers/CartProvider";
import "./Cart.css";

// Order summary panel for the full /cart page. Values come straight from
// CartProvider (itself priced from the shared catalog); the server
// recomputes everything again at checkout.
export const CartBottom = () => {
  const { total, tax, shipping, finalTotal } = useCartContext();

  const rows = [
    { label: "Subtotal", value: total },
    { label: "Shipping", value: shipping },
    { label: "NY tax", value: tax },
  ];

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title" className="cart-summary-title">
        Order summary
      </h2>
      <dl className="summary-list">
        {rows.map(({ label, value }) => (
          <div className="summary-row" key={label}>
            <dt>{label}</dt>
            <dd className="num">${value.toFixed(2)}</dd>
          </div>
        ))}
        <div className="summary-row summary-total">
          <dt>Total</dt>
          <dd className="num">${finalTotal.toFixed(2)}</dd>
        </div>
      </dl>
      <a href="/checkout" id="proceed-to-checkout-btn" className="btn-primary btn-block">
        Proceed to checkout
      </a>
      <p className="cart-summary-note">Estimated totals. Final amounts are confirmed at checkout.</p>
    </aside>
  );
};
