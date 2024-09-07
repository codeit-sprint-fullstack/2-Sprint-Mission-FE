import "./style/SellingProductsSection.css";
import CategoryTitle from "./CategoryTitle.js";
import ProductListHeader from "./ProductListHeader.js";
import SellingProductList from "./SellingProductList.js";
function SellingProductsSection({ sellingList, onChangeOrder, onChangeKeyword }) {
  return (
    <div id="selling-product-section">
      <ProductListHeader onChangeOrder={onChangeOrder} onChangeKeyword={onChangeKeyword} />
      <SellingProductList sellingList={sellingList} />
    </div>
  );
}
export default SellingProductsSection;
