import "./Home.css";
import { ImageCarousel } from "../../Components/ImageCarousels/ImageCarousel";
import { companyTagline } from "../../utils/HelpfulText";
import { ItemCarousel } from "./ItemCarousel/ItemCarousel";
import { heroImages } from "../../utils/Products";

export const HeroSection = () => {

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
