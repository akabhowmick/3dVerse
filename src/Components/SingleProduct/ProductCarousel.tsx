import { useState } from "react";
import { Product } from "../../Types/interfaces";
import { SingleProduct } from "./SingleProduct";

const Carousel = ({ cartSuggestedItems }: { cartSuggestedItems: Product[] }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? cartSuggestedItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === cartSuggestedItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <SingleProduct product={cartSuggestedItems[index]} displayType="card" />
      <div className="carousels-buttons">
        <button className="btn-secondary" onClick={handlePrev}>
          Prev
        </button>
        <button className="btn-secondary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
