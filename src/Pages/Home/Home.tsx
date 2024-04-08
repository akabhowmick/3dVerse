import "./Home.css";
import { products } from "../../utils/Products";
import { SingleProduct } from "../../Components/SingleProduct/SingleProduct";
import { HeroSection } from "./HeroSection";
import { ReviewCarousel } from "./ReviewCarousel/ReviewCarousels";

export const Home = () => {
  const homeProductsList = (
    <div className="products-display">
      {products.map((product) => {
        return <SingleProduct key={product.id} product={product} displayType="card" />;
      })}
    </div>
  );

  return (
    <section className="home-page">
      <HeroSection />
      <h2 className="page-header">View our featured products! </h2>
      {homeProductsList}
      <ReviewCarousel />
    </section>
  );
};
