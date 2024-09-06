import "./style/SellingProductsSection.css";
import CategoryTitle from "./CategoryTitle.js";
import ProductListHeader from "./ProductListHeader.js";
import SellingProductList from "./SellingProductList.js";
function SellingProductsSection({ sellingList }) {
  return (
    <div id="selling-product-section">
      <ProductListHeader />
      <SellingProductList sellingList={sellingList} />
    </div>
  );
}
export default SellingProductsSection;
