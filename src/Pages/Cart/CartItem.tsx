import "./Cart.css";
import { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../Types/interfaces";

export const CartItem = ({ cartItem }: { cartItem: Product }) => {
  const { removeFromCart, changeItemQuantity, changeItemCustomization, changeItemVariant } =
    useCartContext();
  const {
    images,
    price,
    name,
    id,
    quantity,
    requiredCustomizations,
    options,
    bulkOptions,
    skuId,
  } = cartItem;
  // The same line can render in the drawer and on the /cart page at once,
  // so control ids come from useId() rather than the product name/key.
  const uid = useId();

  const itemCustomizations = requiredCustomizations && requiredCustomizations.length > 0 && (
    <fieldset className="cart-line-customizations">
      <legend>Customizations</legend>
      {requiredCustomizations.map(({ key, value }, index) => (
        <div className="field" key={key}>
          <label htmlFor={`${uid}-custom-${index}`}>{key}</label>
          <input
            id={`${uid}-custom-${index}`}
            className="field-input"
            placeholder="Enter any values here"
            value={value}
            type="text"
            onChange={(e: { target: { value: string } }) => {
              changeItemCustomization(id, key, e.target.value);
            }}
          />
        </div>
      ))}
    </fieldset>
  );

  // Controlled by the line's skuId so the select always shows the variant
  // actually in the cart (including one picked on the product page), not
  // just the first option.
  const itemOptions = options && options.length > 0 && (
    <div className="field cart-line-variant">
      <label htmlFor={`${uid}-options`}>Model type</label>
      <select
        id={`${uid}-options`}
        name="product-options"
        className="field-input"
        value={skuId ?? options[0].skuId}
        onChange={(event) => {
          const selectedSkuId = event.target.value;
          const selected = options.find((opt) => opt.skuId === selectedSkuId);
          changeItemVariant(id, selectedSkuId, `Model Type - ${selected?.option ?? ""}`);
        }}
      >
        {options.map(({ option, skuId: optionSkuId }) => (
          <option key={optionSkuId} value={optionSkuId}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const itemBulkOptions = bulkOptions && bulkOptions.length > 0 && (
    <div className="field cart-line-variant">
      <label htmlFor={`${uid}-bulk`}>Pack size</label>
      <select
        id={`${uid}-bulk`}
        name="bulk-options"
        className="field-input"
        value={skuId ?? bulkOptions[0].skuId}
        onChange={(event) => {
          const selectedSkuId = event.target.value;
          const selected = bulkOptions.find((opt) => opt.skuId === selectedSkuId);
          changeItemVariant(id, selectedSkuId, `Bulk Option - Pack of ${selected?.option ?? ""}`);
        }}
      >
        {bulkOptions.map(({ option, price, skuId: optionSkuId }) => (
          <option key={optionSkuId} value={optionSkuId}>
            {option} Pack - ${price}
          </option>
        ))}
      </select>
    </div>
  );

  if (quantity <= 0) return null;

  return (
    <div className="cart-line">
      <img
        className="cart-line-img"
        src={images[0]}
        alt=""
        width={80}
        height={80}
        loading="lazy"
      />
      <div className="cart-line-body">
        <div className="cart-line-top">
          <p className="cart-line-name">{name}</p>
          <p className="cart-line-total num">${(quantity * price).toFixed(2)}</p>
        </div>
        <p className="cart-line-unit">
          <span className="num">${price.toFixed(2)}</span> each
        </p>

        {itemOptions}
        {itemBulkOptions}

        <div className="cart-line-controls">
          <div className="qty-stepper" role="group" aria-label={`Quantity for ${name}`}>
            <button
              type="button"
              className="qty-btn"
              onClick={() => changeItemQuantity(id, "minusOne")}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${name}`}
            >
              <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
            </button>
            <span className="qty-value num" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => changeItemQuantity(id, "addOne")}
              aria-label={`Increase quantity of ${name}`}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="cart-line-remove" onClick={() => removeFromCart(id)}>
            Remove<span className="visually-hidden"> {name}</span>
          </button>
        </div>

        {itemCustomizations}
      </div>
    </div>
  );
};
