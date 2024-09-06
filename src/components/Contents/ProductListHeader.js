import CategoryTitle from "./CategoryTitle.js";
import "./style/ProductListHeader.css";
import SearchBox from "./SearchBox.js";
import SortSelector from "./SortSelector.js";
function ProductListHeader() {
  return (
    <div id="product-list-header">
      <CategoryTitle>판매 중인 상품</CategoryTitle>
      <div id="search-sort-box">
        <SearchBox id="search-box" />
        <SortSelector />
      </div>
    </div>
  );
}
export default ProductListHeader;
