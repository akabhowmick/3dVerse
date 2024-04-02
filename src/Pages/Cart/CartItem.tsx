import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../Types/interfaces";

export const CartItem = ({ cartItem }: { cartItem: Product }) => {
  const { removeFromCart, changeItemQuantity, changeItemCustomization } = useCartContext();
  const { images, price, name, id, quantity, requiredCustomizations } = cartItem;

  const itemCustomizations = (
    <div className="cart-customizations">
      <h3>Customizations</h3>
      {requiredCustomizations &&
        requiredCustomizations.length > 0 &&
        requiredCustomizations?.map(({ name, value }) => {
          return (
            <div key={name}>
              {
                <div className="input-wrap">
                  <label htmlFor={name}>{name}:</label>
                  <input
                    placeholder="Enter any values here"
                    value={value}
                    type="text"
                    onChange={(e: { target: { value: string } }) => {
                      changeItemCustomization(id, name, e.target.value);
                    }}
                    id={name}
                  />
                </div>
              }
            </div>
          );
        })}
    </div>
  );

  return (
    <div>
      {quantity > 0 && (
        <div className="cart-single-item">
          <div className="cart-img-container">
            <img className="cart-img" src={images[0]} alt="cart-image" />
            <button onClick={() => removeFromCart(id)}>Remove</button>
          </div>
          <div className="cart-text-details-container">
            <div className="product-name">{name}</div>
            <div className="single-item-quantity-container">
              {quantity > 1 && (
                <FontAwesomeIcon
                  className="quantity-icon minus-icon"
                  icon={faMinusCircle}
                  onClick={() => changeItemQuantity(id, "minusOne")}
                />
              )}
              <div className="product-quantity">{quantity}</div>
              <FontAwesomeIcon
                className="quantity-icon add-icon"
                icon={faPlusCircle}
                onClick={() => changeItemQuantity(id, "addOne")}
              />
            </div>
            <div className="product-price">Unit Price: ${price.toFixed(2)}</div>
            <div className="product-price">
              <span className="text-black">
                <b>Total Cost: </b>
              </span>{" "}
              <span className="product-price-total">${(quantity * price).toFixed(2)}</span>
            </div>
          </div>
          {itemCustomizations}
        </div>
      )}
    </div>
  );
};
