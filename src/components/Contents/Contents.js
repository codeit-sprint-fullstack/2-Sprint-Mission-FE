import "./style/Contents.css";
import ProductsEntire from "./ProductsEntire.js";
import PageEntire from "./PageEntire.js";
function Contents({ bestList, sellingList, onMoreLoad }) {
  return (
    <div id="contents">
      <ProductsEntire
        id="products-entire"
        bestList={bestList}
        sellingList={sellingList}
      />
      <PageEntire id="page-entire" onMoreLoad={onMoreLoad} />
    </div>
  );
}
export default Contents;
