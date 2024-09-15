import styles from "./SellingProductsSection.module.css";
import CategoryTitle from "./CategoryTitle.js";
import ProductListHeader from "./ProductListHeader.js";
import SellingProductList from "./SellingProductList.js";
function SellingProductsSection({
  sellingList,
  onChangeOrder,
  onChangeKeyword,
  pageSize
}) {
  return (
    <div className={styles.sellingProductsSeciton}>
      <ProductListHeader
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
      />
      <SellingProductList sellingList={sellingList} pageSize={pageSize} />
    </div>
  );
}
export default SellingProductsSection;
