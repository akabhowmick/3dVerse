import { products } from "../../../utils/Products";
import "./ItemCarousel.css";


const itemNames = products.map((product) => product.name);

export const ItemCarousel = () => {
  return (
    <div className="scrolling-words-container">
      <span>You can buy custom: </span>
      <div className="scrolling-words-box">
        <ul>
          {itemNames.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
