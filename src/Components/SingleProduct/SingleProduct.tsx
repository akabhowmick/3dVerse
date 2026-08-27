import "./SingleProduct.css";
import Typography from "@mui/material/Typography";
import { useCartContext } from "../../providers/CartProvider";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../Types/interfaces";
import { fullDetailedDetails } from "../../utils/HelpfulText";
import { ImageCarousel } from "../ImageCarousels/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const SingleProduct = ({
  product,
  displayType,
}: {
  product: Product;
  displayType: string;
}) => {
  const {
    images,
    details,
    shortDetails,
    name,
    id,
    price,
    learnMoreLink,
    options,
    bulkOptions,
    specs,
  } = product;
  const { addToCart, cartItems, removeFromCart, changeItemVariant } = useCartContext();

  const [showDetails, setShowDetails] = useState(false); // For showing `details`
  const [showFullDetails, setShowFullDetails] = useState(false); // For showing `fullDetailedDetails`

  // PDP-only variant selection. `options`/`bulkOptions` are read-only
  // catalog data (see shared/pricing.ts); picking one only decides which
  // sku a subsequent addToCart/changeItemVariant call targets. It never
  // computes a price itself -- displayPrice below just looks up the same
  // number already present on the option/bulkOption entry.
  const variantOptions = options ?? bulkOptions;
  const isBulkVariant = !options && !!bulkOptions;
  const [selectedSkuId, setSelectedSkuId] = useState<string | undefined>(
    variantOptions && variantOptions.length > 0 ? variantOptions[0].skuId : undefined
  );

  // addToCart() always adds the catalog's default (first) sku -- it has no
  // way to take a caller-chosen variant, and CartProvider.tsx's cart logic
  // is out of scope for this redesign. So a non-default PDP selection is
  // applied as a follow-up changeItemVariant() call once the item actually
  // shows up in cartItems (addToCart's state update isn't visible in this
  // closure yet on the same tick).
  const pendingVariantRef = useRef<{ skuId: string; label: string } | null>(null);

  useEffect(() => {
    const pending = pendingVariantRef.current;
    if (!pending) return;
    const cartLine = cartItems.find((item) => item.id === id);
    if (!cartLine) return;
    if (cartLine.skuId !== pending.skuId) {
      changeItemVariant(id, pending.skuId, pending.label);
    }
    pendingVariantRef.current = null;
  }, [cartItems, id, changeItemVariant]);

  const toggleInCart = () => {
    if (cartItems.find((item) => item.id === id)) {
      removeFromCart(id);
      return;
    }
    if (variantOptions && selectedSkuId && selectedSkuId !== variantOptions[0].skuId) {
      const selected = variantOptions.find((variant) => variant.skuId === selectedSkuId);
      if (selected) {
        pendingVariantRef.current = {
          skuId: selectedSkuId,
          label: isBulkVariant
            ? `Bulk Option - Pack of ${selected.option}`
            : `Model Type - ${selected.option}`,
        };
      }
    }
    addToCart(id);
  };

  const cardClassName = displayType === "card" ? "product-card" : "product-banner";

  const displayPrice = variantOptions
    ? (variantOptions.find((variant) => variant.skuId === selectedSkuId)?.price ?? price)
    : price;

  // Show shortDetails always, details only when "Show More" is clicked
  const detailsToDisplay = shortDetails.map((detail, index) => (
    <Typography
      variant="body2"
      color={"black"}
      key={`short-${index}`}
      style={{ padding: "0.25rem 0", lineHeight: "1.5" }}
    >
      {detail}
    </Typography>
  ));

  const extraDetails = showDetails
    ? details.map((detail, index) => (
        <Typography
          variant="body2"
          color={"black"}
          key={`extra-${index}`}
          style={{ padding: "0.25rem 0", lineHeight: "1.5" }}
        >
          {detail}
        </Typography>
      ))
    : null;

  // Show full details only when "See How To Order!" is clicked
  const fullDetails = showFullDetails && (
    <div className="full-details">
      {fullDetailedDetails.map((detailGroup, groupIndex) =>
        detailGroup.map((detail, index) => (
          <Typography
            variant="body2"
            color={"black"}
            key={`${groupIndex}-${index}`}
            style={{ lineHeight: "1.5" }}
          >
            {detail}
          </Typography>
        ))
      )}
    </div>
  );

  const learnLink =
    displayType !== "card" ? (
      <button
        id="learn-more-btn"
        className="btn-secondary"
        onClick={() => setShowFullDetails(!showFullDetails)}
      >
        {showFullDetails ? "See Less" : "See How To Order!"}
      </button>
    ) : null;

  const redirectButton =
    displayType === "card" ? (
      <a id="redirect-btn" href={learnMoreLink} target="_top">
        <button className="btn-secondary">Learn More!</button>
      </a>
    ) : (
      <a id="redirect-btn" href="/" target="_top">
        <button className="btn-secondary">Back To Home!</button>
      </a>
    );

  const cartBtn = (
    <button id="card-cart-btn" className="btn-primary" onClick={toggleInCart}>
      {cartItems.find((item) => item.id === id) ? "Remove from Cart" : "Add To Cart!"}
    </button>
  );

  // Card view only: a quiet hint about how many variants a product has, so
  // shoppers aren't surprised by a size/pack picker after they click through.
  const variantHint =
    displayType === "card" &&
    (options && options.length > 0 ? (
      <p className="variant-hint">{options.length} options</p>
    ) : bulkOptions && bulkOptions.length > 0 ? (
      <p className="variant-hint">{bulkOptions.length} pack sizes</p>
    ) : null);

  // PDP-only tactile variant buttons -- never a native <select>. Selected
  // state is conveyed by a check icon + aria-pressed + the accent border
  // together, not by color alone. Price is shown as a delta from the
  // cheapest/default variant so the cost of upgrading is obvious at a glance.
  const variantSelector = displayType !== "card" && variantOptions && variantOptions.length > 0 && (
    <div className="variant-selector">
      <h4 className="variant-selector-label">{isBulkVariant ? "Pack size" : "Model type"}</h4>
      <div
        className="variant-buttons"
        role="group"
        aria-label={isBulkVariant ? "Pack size" : "Model type"}
      >
        {variantOptions.map((variant) => {
          const isSelected = variant.skuId === selectedSkuId;
          const delta = variant.price - price;
          return (
            <button
              type="button"
              key={variant.skuId}
              className={`variant-btn${isSelected ? " selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedSkuId(variant.skuId)}
            >
              <span className="variant-btn-check" aria-hidden="true">
                {isSelected && <FontAwesomeIcon icon={faCheck} />}
              </span>
              <span className="variant-btn-label">
                {isBulkVariant ? `Pack of ${variant.option}` : variant.option}
              </span>
              <span className="variant-btn-price">
                {delta === 0 ? `$${variant.price.toFixed(2)}` : `+$${delta.toFixed(2)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // PDP-only specs: a two-column definition list, JetBrains Mono values,
  // no bullet lists. Sourced from Products.ts's `specs` field, which is
  // itself drawn only from facts already stated in each product's copy.
  const specsList = displayType !== "card" && specs && specs.length > 0 && (
    <dl className="specs-list">
      {specs.map(({ key, value }) => (
        <div className="specs-row" key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );

  // The buy box sits near the top of the sticky info column (right after
  // name/price/variant selection) so Add to Cart is reachable on mobile
  // without scrolling past the specs/details copy below it, and stays
  // pinned in view on desktop.
  const buyBox = displayType !== "card" && (
    <div className="pdp-buy-box">
      {cartBtn}
      {/* TODO: confirm the real production/turnaround time with the shop
          owner. "3-5 business days" is a placeholder from the design brief,
          not a sourced figure -- nothing in this codebase states an actual
          lead time for made-to-order pieces. */}
      <p className="made-to-order-note">Made to order. Ships in 3-5 business days.</p>
    </div>
  );

  const productImage =
    displayType !== "card" ? (
      <div className="image-container product-image">
        <ImageCarousel images={images} alt={name} />
      </div>
    ) : (
      <a href={learnMoreLink} target="_top" className="product-image-frame">
        <img src={images[0]} className="product-image" alt={name} loading="lazy" />
        <span className="layer-lines-hover" aria-hidden="true"></span>
      </a>
    );

  return (
    <div className={cardClassName}>
      <div className="card">
        {productImage}

        <div className="product-info-container">
          <div className="product-info-header">
            <h3 className="product-name">{name}</h3>
            <div className="product-info-price">
              <h4 className="discount-price">Limited Time Price: ${displayPrice.toFixed(2)}</h4>
            </div>
            {variantHint}
          </div>

          {variantSelector}

          {buyBox}

          {specsList}

          {displayType !== "card" && (
            <div className="product-info-details product-description">
              <h4>Item Details:</h4>

              {/* Always shown, on every viewport */}
              {detailsToDisplay}

              {/* Desktop/tablet: full details shown unconditionally */}
              <div className="details-always">
                {details.map((detail, index) => (
                  <Typography
                    variant="body2"
                    color={"black"}
                    key={`always-${index}`}
                    style={{ padding: "0.25rem 0", lineHeight: "1.5" }}
                  >
                    {detail}
                  </Typography>
                ))}
              </div>

              {/* Mobile: full details behind a Show more/less toggle */}
              <button className="toggle-details-btn" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Show Less Product Details ⏫" : "Show More Product Details ⏬"}
              </button>
              <div className="details-container">{extraDetails}</div>

              {fullDetails}
            </div>
          )}

          <div className="all-product-info-buttons">
            {displayType === "card" && cartBtn}
            <div className="product-info-buttons">
              {learnLink}
              {redirectButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
