import "./style/SellingProductsSection.css";
import CategoryTitle from "./CategoryTitle.js";
import ProductListHeader from "./ProductListHeader.js";
import SellingProductList from "./SellingProductList.js";
function SellingProductsSection({ sellingList, onChangeOrder }) {
  return (
    <div id="selling-product-section">
      <ProductListHeader onChangeOrder={onChangeOrder} />
      <SellingProductList sellingList={sellingList} />
    </div>
  );
}
export default SellingProductsSection;
