import "./style/ProductsEntire.css";
import BestProductsSection from "./BestProductsSection.js";
import SellingProductsSection from "./SellingProductsSection.js";
function ProductsEntire({ totalList, onChangeOrder, onChangeKeyword }) {
  return (
    <div id="products-entire">
      <BestProductsSection bestList={totalList.bestList} />
      <SellingProductsSection
        id="selling-products-entire"
        sellingList={totalList.sellingList}
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
      />
    </div>
  );
}
export default ProductsEntire;
