import "./Cart.css";
import { useCartContext } from "../../providers/CartProvider";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FloatingCartButton = () => {
  const { cartItems } = useCartContext();
  // Summed quantity, not distinct line count -- matches the nav badge (see
  // Navbar.tsx) so the two counters never disagree.
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <a href="/cart" className="floating-cart-btn">
      <FontAwesomeIcon icon={faCartShopping} />
      {" "} Cart ({cartCount})
    </a>
  );
};

export default FloatingCartButton;
