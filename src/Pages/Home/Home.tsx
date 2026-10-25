import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faPenRuler, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { products } from "../../utils/Products";
import { SingleProduct } from "../../Components/SingleProduct/SingleProduct";
import { HeroSection } from "./HeroSection";
import { ReviewCarousel } from "./ReviewCarousel/ReviewCarousels";

// Each claim here is already made in the product/ordering copy (custom
// modeling, rendering approval before production, free replacement for
// production defects) -- nothing new is promised.
const benefits = [
  { icon: faCube, title: "Made to order", text: "Every piece is modeled and printed just for you." },
  {
    icon: faPenRuler,
    title: "Approve it first",
    text: "We send you a rendering to sign off before we print.",
  },
  {
    icon: faShieldHalved,
    title: "Defect-free guarantee",
    text: "Production defects get a free replacement.",
  },
];

export const Home = () => {
  return (
    <>
      <HeroSection />

      <ul className="benefit-bar" aria-label="Why order from us">
        {benefits.map(({ icon, title, text }) => (
          <li key={title} className="benefit">
            <FontAwesomeIcon icon={icon} className="benefit-icon" aria-hidden="true" />
            <div>
              <h2 className="benefit-title">{title}</h2>
              <p className="benefit-text">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="section" aria-labelledby="featured-title">
        <div className="section-head">
          <div>
            <p className="kicker">Featured products</p>
            <h2 id="featured-title" className="section-title">
              Shop the lineup
            </h2>
          </div>
          <a className="text-link" href="/model-houses">
            All replica houses <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="products-display">
          {products.map((product) => (
            <SingleProduct key={product.id} product={product} displayType="card" />
          ))}
        </div>
      </section>

      <ReviewCarousel />
    </>
  );
};
