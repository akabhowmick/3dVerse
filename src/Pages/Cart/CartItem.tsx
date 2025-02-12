import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../Types/interfaces";

export const CartItem = ({ cartItem }: { cartItem: Product }) => {
  const {
    removeFromCart,
    changeItemQuantity,
    changeItemCustomization,
    changeItemOption,
    updateItemCustomization,
  } = useCartContext();
  const { images, price, name, id, quantity, requiredCustomizations, options, bulkOptions } =
    cartItem;

  const itemCustomizations = requiredCustomizations && (
    <div className="cart-customizations">
      <h3>Customizations</h3>
      {requiredCustomizations &&
        requiredCustomizations.length > 0 &&
        requiredCustomizations?.map(({ key, value }) => {
          return (
            <div key={key}>
              {
                <div className="input-wrap">
                  <label htmlFor={key}>{key}:</label>
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

  const itemOptions = options && (
    <div className="cart-customizations">
      <h4>Model Type</h4>
      <select
        name="product-options"
        id="product-options"
        onChange={(event) => {
          const selectedValue = event.target.value;
          updateItemCustomization(id, [
            { name: `Model Type- ${event.target.name} `, value: selectedValue },
          ]),
            changeItemOption(id, selectedValue);
        }}
      >
        {options.map(({ option, price }) => {
          return (
            <option key={option} value={price}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );

  // {/* Bulk Options Selection */}
  const itemBulkOptions = bulkOptions && bulkOptions.length > 0 && (
    <div>
      <h4>Bulk Options</h4>
      <select
        name="bulk-options"
        id="bulk-options"
        onChange={(event) => {
          updateItemCustomization(id, [
            {
              name: `Bulk Option - ${event.target.selectedOptions[0].id}`,
              value: event.target.value,
            },
          ]),
            changeItemOption(id, event.target.value);
        }}
      >
        {bulkOptions.map(({ option, price }) => (
          <option id={`Pack of ${option}`} key={option} value={price}>
            {option} Pack - ${price}
          </option>
        ))}
      </select>
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
            {itemOptions}
            {itemBulkOptions}
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
