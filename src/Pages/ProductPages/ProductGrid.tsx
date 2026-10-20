import { SingleProduct } from "../../Components/SingleProduct/SingleProduct";
import { Product } from "../../Types/interfaces";

export const ProductGrid = ({ productList }: { productList: Product[] }) => {
  return (
    <div className="products-display">
      {productList.map((product) => (
        <SingleProduct key={product.id} product={product} displayType="card" />
      ))}
    </div>
  );
};
