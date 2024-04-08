import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../Types/interfaces";

export const CartItem = ({ cartItem }: { cartItem: Product }) => {
  const { removeFromCart, changeItemQuantity, changeItemCustomization } = useCartContext();
  const { images, price, name, id, quantity, requiredCustomizations } = cartItem;

  const itemCustomizations = requiredCustomizations && requiredCustomizations.length > 0 && (
    <div className="cart-customizations">
      <h3>Customizations</h3>
      {requiredCustomizations?.map(({ key, value }) => {
        return (
          <div key={key}>
            {
              <div className="input-wrap">
                <label htmlFor={name}>{key}:</label>
                <input
                  placeholder="Enter any values here"
                  value={value}
                  type="text"
                  onChange={(e: { target: { value: string } }) => {
                    changeItemCustomization(id, key, e.target.value);
                  }}
                  id={key}
                />
              </div>
            }
          </div>
        );
      })}
    </div>
  );

  // Todo: 1. implement a select input for the options field, and the onClick method
  // use options
  // use setOption
  // import a select
  const itemOptions = requiredCustomizations && requiredCustomizations.length > 0 && (
    <div className="cart-customizations">
      <h3>Customizations</h3>
      {requiredCustomizations?.map(({ key, value }) => {
        return (
          <div key={key}>
            {
              <div className="input-wrap">
                <label htmlFor={name}>{key}:</label>
                <input
                  placeholder="Enter any values here"
                  value={value}
                  type="text"
                  onChange={(e: { target: { value: string } }) => {
                    changeItemCustomization(id, key, e.target.value);
                  }}
                  id={key}
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
          {itemOptions}
        </div>
      )}
    </div>
  );
};
