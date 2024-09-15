import styles from "./Contents.module.css";
import SellingProductsSection from "./SellingProductsSection.js";
import PageEntire from "./PageEntire.js";
function Contents({
  className,
  totalList,
  pageInfo,
  onChangePage,
  onChangeOrder,
  onChangeKeyword
}) {
  return (
    <div className={`${styles.contents} ${className}`}>
      <SellingProductsSection
        sellingList={totalList.sellingList}
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
        pageSize={pageInfo.pageSize.sellingList}
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
