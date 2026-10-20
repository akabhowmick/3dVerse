import "./SingleProduct.css";
import { useCartContext } from "../../providers/CartProvider";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../Types/interfaces";
import { fullDetailedDetails } from "../../utils/HelpfulText";
import { categoryFor } from "../../utils/NavbarAndFooterLinks";
import { ImageCarousel } from "../ImageCarousels/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPlus, faTruckFast } from "@fortawesome/free-solid-svg-icons";

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
    type,
  } = product;
  const { addToCart, cartItems, removeFromCart, changeItemVariant } = useCartContext();

  const [showDetails, setShowDetails] = useState(false); // Mobile: expand `details`
  const [showFullDetails, setShowFullDetails] = useState(false); // "How ordering works"

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

  const displayPrice = variantOptions
    ? (variantOptions.find((variant) => variant.skuId === selectedSkuId)?.price ?? price)
    : price;

  const isInCart = !!cartItems.find((item) => item.id === id);
  const category = categoryFor(type);

  const cartBtn = (
    <button
      type="button"
      id={displayType === "card" ? undefined : "card-cart-btn"}
      className={isInCart ? "btn-secondary" : "btn-primary"}
      onClick={toggleInCart}
    >
      {isInCart ? "Remove from cart" : "Add to cart"}
    </button>
  );

  // ---------- Card view ----------
  if (displayType === "card") {
    // A quiet hint about how many variants a product has, so shoppers
    // aren't surprised by a size/pack picker after they click through.
    const variantHint =
      options && options.length > 0
        ? `${options.length} options`
        : bulkOptions && bulkOptions.length > 0
          ? `${bulkOptions.length} pack sizes`
          : null;

    return (
      <article className="product-card">
        {/* Pointer convenience only -- the product name below is the
            card's real, focusable link, so this duplicate stays out of the
            tab order and the accessibility tree. */}
        <a href={learnMoreLink} className="product-image-frame" tabIndex={-1} aria-hidden="true">
          <img src={images[0]} className="product-image" alt="" loading="lazy" />
          <span className="kit-stripe product-card-stripe" />
        </a>

        <div className="product-card-body">
          {category && <p className="product-card-category">{category.label}</p>}
          <h3 className="product-card-name">
            <a href={learnMoreLink}>{name}</a>
          </h3>
          <div className="product-card-price-row">
            <p className="product-card-price num">
              {variantOptions && <span className="product-card-from">From </span>}
              {`$${price.toFixed(2)}`}
            </p>
            {variantHint && <p className="product-card-hint">{variantHint}</p>}
          </div>
          <div className="product-card-actions">
            {cartBtn}
            <a className="btn-secondary" href={learnMoreLink}>
              Details<span className="visually-hidden">: {name}</span>
            </a>
          </div>
        </div>
      </article>
    );
  }

  // ---------- Product detail page ----------

  // Tactile variant buttons -- never a native <select>. Selected state is
  // conveyed by a check icon + aria-pressed + a heavier ink border and red
  // underline together, not by color alone. Price is shown as a delta from
  // the cheapest/default variant so the cost of upgrading is obvious.
  const variantSelector = variantOptions && variantOptions.length > 0 && (
    <div className="variant-selector">
      <h2 className="pdp-label" id={`variant-label-${id}`}>
        {isBulkVariant ? "Pack size" : "Model type"}
      </h2>
      <div className="variant-buttons" role="group" aria-labelledby={`variant-label-${id}`}>
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
              <span className="variant-btn-price num">
                {delta === 0 ? `$${variant.price.toFixed(2)}` : `+$${delta.toFixed(2)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Specs: a two-column definition list with thin dividers. Sourced from
  // Products.ts's `specs` field, which is itself drawn only from facts
  // already stated in each product's copy.
  const specsList = specs && specs.length > 0 && (
    <dl className="specs-list">
      {specs.map(({ key, value }) => (
        <div className="specs-row" key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div className="pdp">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          {category && (
            <li>
              <a href={category.href}>{category.label}</a>
            </li>
          )}
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <div className="pdp-grid">
        <div className="pdp-gallery">
          <ImageCarousel images={images} alt={name} />
        </div>

        <div className="pdp-info">
          {category && <p className="kicker">{category.label}</p>}
          <h1 className="pdp-title">{name}</h1>
          <div className="pdp-price-row">
            <p className="pdp-price num">${displayPrice.toFixed(2)}</p>
            <p className="price-tag">Limited time price</p>
          </div>

          {variantSelector}

          {/* The buy box sits right after name/price/variants so Add to
              Cart is reachable on mobile without scrolling past the specs
              and copy below it, and stays pinned in view on desktop. */}
          <div className="pdp-buy-box">
            {cartBtn}
            {/* TODO: confirm the real production/turnaround time with the
                shop owner. "3-5 business days" is a placeholder from the
                design brief, not a sourced figure -- nothing in this
                codebase states an actual lead time for made-to-order
                pieces. */}
            <p className="made-to-order-note">
              <FontAwesomeIcon icon={faTruckFast} aria-hidden="true" />
              Made to order. Ships in 3-5 business days.
            </p>
          </div>

          {specsList}

          <section className="pdp-section" aria-labelledby={`details-title-${id}`}>
            <h2 className="pdp-label" id={`details-title-${id}`}>
              Details
            </h2>
            {shortDetails.map((detail, index) => (
              <p className="pdp-copy" key={`short-${index}`}>
                {detail}
              </p>
            ))}
            {/* Full copy is always shown on desktop; on mobile it's
                collapsed behind the toggle below (pure CSS breakpoint
                switch, no JS viewport check). */}
            <div
              id={`details-body-${id}`}
              className={`pdp-details-body${showDetails ? " is-open" : ""}`}
            >
              {details.map((detail, index) => (
                <p className="pdp-copy" key={`detail-${index}`}>
                  {detail}
                </p>
              ))}
            </div>
            <button
              type="button"
              className="pdp-details-toggle"
              aria-expanded={showDetails}
              aria-controls={`details-body-${id}`}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Show less" : "Show full details"}
            </button>
          </section>

          <section className="pdp-section pdp-disclosure">
            <h2 className="pdp-disclosure-heading">
              <button
                type="button"
                className="pdp-disclosure-btn"
                aria-expanded={showFullDetails}
                aria-controls={`how-to-order-${id}`}
                onClick={() => setShowFullDetails(!showFullDetails)}
              >
                How ordering works
                <FontAwesomeIcon icon={showFullDetails ? faMinus : faPlus} aria-hidden="true" />
              </button>
            </h2>
            <div className="full-details" id={`how-to-order-${id}`} hidden={!showFullDetails}>
              {fullDetailedDetails.map(({ title, ordered, items }) => {
                const List = ordered ? "ol" : "ul";
                return (
                  <div className="full-details-group" key={title}>
                    <h3>{title}</h3>
                    <List>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </List>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
