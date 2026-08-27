import "./SingleProduct.css";
import Typography from "@mui/material/Typography";
import { useCartContext } from "../../providers/CartProvider";
import { useState } from "react";
import { Product } from "../../Types/interfaces";
import { fullDetailedDetails } from "../../utils/HelpfulText";
import { ImageCarousel } from "../ImageCarousels/ImageCarousel";

export const SingleProduct = ({
  product,
  displayType,
}: {
  product: Product;
  displayType: string;
}) => {
  const { images, details, shortDetails, name, id, price, learnMoreLink, options, bulkOptions } =
    product;
  const { addToCart, cartItems, removeFromCart } = useCartContext();

  const [showDetails, setShowDetails] = useState(false); // For showing `details`
  const [showFullDetails, setShowFullDetails] = useState(false); // For showing `fullDetailedDetails`

  const toggleInCart = () => {
    if (cartItems.find((item) => item.id === id)) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  const cardClassName = displayType === "card" ? "product-card" : "product-banner";

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
              <h4 className="discount-price">Limited Time Price: ${price}</h4>
            </div>
            {variantHint}
          </div>

          {displayType !== "card" && (
            <div className="product-info-details product-description">
              <h4>Item Details:</h4>

              {/* Show short details */}
              {detailsToDisplay}

              {/* Desktop/Tablet View: Show details always */}
              <div className="details-container">{extraDetails}</div>

              {/* Mobile View: Show More/Less Button for `details` */}
              <button
                className="toggle-details-btn"
                onClick={() => setShowDetails(!showDetails)}
                style={{ display: window.innerWidth <= 768 ? "block" : "none" }}
              >
                {showDetails ? "Show Less Product Details ⏫" : "Show More Product Details ⏬"}
              </button>

              {/* Full details */}
              {window.innerWidth > 768 ? (
                details.map((detail, index) => (
                  <Typography
                    variant="body2"
                    color={"black"}
                    key={`extra-${index}`}
                    style={{ padding: "0.25rem 0", lineHeight: "1.5" }}
                  >
                    {detail}
                  </Typography>
                ))
              ) : (
                <></>
              )}
              {fullDetails}
            </div>
          )}

          <div className="all-product-info-buttons">
            {cartBtn}
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
