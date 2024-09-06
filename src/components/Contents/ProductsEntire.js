import "./style/ProductsEntire.css";
import BestProductsSection from "./BestProductsSection.js";
import SellingProductsSection from "./SellingProductsSection.js";
function ProductsEntire({ bestList, sellingList }) {
  return (
    <div id="products-entire">
      <BestProductsSection bestList={bestList} />
      <SellingProductsSection
        id="selling-products-entire"
        sellingList={sellingList}
      />
    </div>
  );
}
export default ProductsEntire;
