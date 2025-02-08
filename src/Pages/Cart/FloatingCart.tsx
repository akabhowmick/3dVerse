import "./Cart.css";
import { useCartContext } from "../../providers/CartProvider";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FloatingCartButton = () => {
  const { cartItems } = useCartContext();
  return (
    <a href="/cart" className="floating-cart-btn">
      <FontAwesomeIcon icon={faCartShopping} />
      {" "} Cart ({cartItems.length})
    </a>
  );
};

export default FloatingCartButton;
