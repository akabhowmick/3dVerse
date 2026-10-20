import { Product } from "../../Types/interfaces";
import { products } from "../../utils/Products";
import { PageHero } from "../../Components/PageHero/PageHero";
import { ProductGrid } from "./ProductGrid";

export const ProductPage = ({
  pageHeader,
  pageContent,
}: {
  pageHeader: string;
  pageContent: string;
}) => {
  const productList: Product[] = products.filter((product) => product.type === pageContent);

  return (
    <>
      <PageHero
        kicker="Shop"
        title={pageHeader}
        lead={`${productList.length} ${productList.length === 1 ? "product" : "products"}, each one made to order.`}
      />
      <div className="section">
        {productList.length > 0 ? (
          <ProductGrid productList={productList} />
        ) : (
          <p className="section-lead">
            Nothing here yet. <a href="/contact-us">Contact us</a> about a custom piece.
          </p>
        )}
      </div>
    </>
  );
};
