import "./style/ProductsEntire.css";
import BestProductsSection from "./BestProductsSection.js";
import SellingProductsSection from "./SellingProductsSection.js";
function ProductsEntire({ totalList }) {
  return (
    <div id="products-entire">
      <BestProductsSection bestList={totalList.bestList} />
      <SellingProductsSection
        id="selling-products-entire"
        sellingList={totalList.sellingList}
      />
    </div>
  );
}
export default ProductsEntire;
