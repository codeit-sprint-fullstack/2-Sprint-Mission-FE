import "./style/Contents.css";
import ProductsEntire from "./ProductsEntire.js";
import PageEntire from "./PageEntire.js";
function Contents({ totalList, onChangePage, pageInfo }) {
  return (
    <div id="contents">
      <ProductsEntire
        id="products-entire"
        totalList={totalList}
      />
      <PageEntire id="page-entire" onChangePage={onChangePage} pageInfo={pageInfo}   />
    </div>
  );
}
export default Contents;
