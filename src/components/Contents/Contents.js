import styles from "./Contents.module.css";
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
    <div id="contents" className={styles.contents}>
      <ProductsEntire
        className={styles.productsEntire}
        totalList={totalList}
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
        pageSize={pageInfo.pageSize}
      />
      <PageEntire
        className={styles.pageEntire}
        onChangePage={onChangePage}
        pageInfo={pageInfo}
      />
    </div>
  );
}
export default Contents;
