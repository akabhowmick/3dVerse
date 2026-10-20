import { useMemo } from "react";
import { useCartContext } from "../../providers/CartProvider";
import "./Cart.css";
import { CartBottom } from "./CartBottom";
import { CartItem } from "./CartItem";
import { products } from "../../utils/Products";
import { SingleProduct } from "../../Components/SingleProduct/SingleProduct";
import { PageHero } from "../../Components/PageHero/PageHero";

export const CartPage = () => {
  const { cartItems } = useCartContext();

  const cartSuggestions = useMemo(
    () => products.filter((item1) => !cartItems.some((item2) => item1.id === item2.id)),
    [cartItems]
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isEmpty = cartItems.length === 0;

  const suggestionGrid = cartSuggestions.length > 0 && (
    <div className="products-display">
      {cartSuggestions.map((product) => (
        <SingleProduct key={product.id} product={product} displayType="card" />
      ))}
    </div>
  );

  return (
    <>
      <PageHero
        kicker="Cart"
        title="Your cart"
        lead={
          isEmpty
            ? "Nothing in here yet."
            : `${cartCount} item${cartCount === 1 ? "" : "s"}, ready when you are.`
        }
      />
      <div className="section cart-page">
        {isEmpty ? (
          <section aria-labelledby="cart-empty-title">
            <h2 id="cart-empty-title" className="section-title cart-section-title">
              Start with one of these
            </h2>
            {suggestionGrid}
          </section>
        ) : (
          <>
            <div className="cart-layout">
              <ul className="cart-lines" aria-label="Items in your cart">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <CartItem cartItem={item} />
                  </li>
                ))}
              </ul>
              <CartBottom />
            </div>
            {suggestionGrid && (
              <section className="cart-suggestions" aria-labelledby="cart-suggest-title">
                <h2 id="cart-suggest-title" className="section-title cart-section-title">
                  You might also like
                </h2>
                {suggestionGrid}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};
