import "./Home.css";
import { ItemCarousel } from "./ItemCarousel";

export const HeroSection = () => {

  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="hero__lead">
            <h1>Company Tagline! </h1>
            <ItemCarousel />
            <button className="btn btn-primary">All Products</button>
          </div>
        </div>
      </div>
    </div>
  );
};
