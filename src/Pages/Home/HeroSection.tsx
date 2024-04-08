import { ImageCarousel } from "../../Components/ImageCarousels/ImageCarousel";
import { companyTagline } from "../../utils/HelpfulText";
import { products } from "../../utils/Products";
import "./Home.css";
import { ItemCarousel } from "./ItemCarousel/ItemCarousel";

export const HeroSection = () => {
  const heroImages = products.map((product) => {
    const randomIndex = Math.floor(Math.random() * product.images.length);
    return product.images[randomIndex];
  });

  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="hero__lead">
            <h2>{companyTagline}</h2>
            <ItemCarousel />
            <button className="btn btn-primary">All Products</button>
          </div>
          <div className="hero__image">
            <ImageCarousel images={heroImages} />
          </div>
        </div>
      </div>
    </div>
  );
};
