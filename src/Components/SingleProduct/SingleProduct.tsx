import "./SingleProduct.css";
import Typography from "@mui/material/Typography";
import { useCartContext } from "../../providers/CartProvider";
import { Link } from "react-router-dom";
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
  const { images, details, shortDetails, name, id, price, learnMoreLink } = product;

  const { addToCart, cartItems, removeFromCart } = useCartContext();

  const [seeFullDetails, setSeeFullDetails] = useState(false);

  const toggleInCart = () => {
    if (cartItems.find((item) => item.id === id)) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  const cardClassName = displayType === "card" ? "product-card" : "product-banner";

  const detailsToDisplay =
    displayType !== "card" &&
    [...shortDetails, ...details].map((detail, index) => {
      return (
        <Typography
          variant="body2"
          color={"black"}
          key={index}
          style={{ padding: "0.25rem 0", lineHeight: "1.5" }}
        >
          {detail}
        </Typography>
      );
    });

  const fullDetails =
    displayType !== "card" &&
    seeFullDetails &&
    fullDetailedDetails.map((detailType) =>
      detailType.map((detail, index) => (
        <Typography variant="body2" color={"black"} key={index} style={{ lineHeight: "1.5" }}>
          {detail}
        </Typography>
      ))
    );

  const learnLink =
    displayType !== "card" ? (
      <button id="learn-more-btn" onClick={() => setSeeFullDetails(!seeFullDetails)}>
        {seeFullDetails ? "See Less" : "See How To Order!"}
      </button>
    ) : (
      <></>
    );

  const redirectButton =
    displayType === "card" ? (
      <Link id="redirect-btn" to={learnMoreLink}>
        <button>Learn More!</button>
      </Link>
    ) : (
      <Link id="redirect-btn" to="/">
        <button>Back To Home!</button>
      </Link>
    );

  const cartBtn = (
    <button id="card-cart-btn" onClick={() => toggleInCart()}>
      {cartItems.find((item) => item.id === id) ? "Remove from Cart" : "Add To Cart!"}
    </button>
  );

  const productImage =
    displayType !== "card" ? (
      <div className="image-container product-image">
        <ImageCarousel images={images} />
      </div>
    ) : (
      <img src={images[0]} className="product-image" alt={`product image for ${name}`} />
    );

  console.log("hello,", displayType !== "card");

  return (
    <div className={cardClassName}>
      <div className="card">
        {productImage}

        <div className="product-info-container">
          <div className="product-info-header">
            <h3 className="product-name">{name}</h3>
            <div className="product-info-price">
              <h4 className="discount-price">Limited Time Price: ${price}+</h4>
            </div>
          </div>

          {displayType !== "card" && (
            <div className="product-info-details product-description">
              <h4>Item Details:</h4>
              {detailsToDisplay}
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
