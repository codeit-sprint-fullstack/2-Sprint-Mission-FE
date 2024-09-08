import "./style/Contents.css";
import ProductsEntire from "./ProductsEntire.js";
import PageEntire from "./PageEntire.js";
function Contents({
  totalList,
  pageInfo,
  onChangePage,
  onChangeOrder,
  onChangeKeyword,
}) {
  return (
    <div id="contents">
      <ProductsEntire
        id="products-entire"
        totalList={totalList}
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
      />
      <PageEntire
        id="page-entire"
        onChangePage={onChangePage}
        pageInfo={pageInfo}
      />
    </div>
  );
}
export default Contents;
