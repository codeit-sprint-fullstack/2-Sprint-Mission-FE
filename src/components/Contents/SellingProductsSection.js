import styles from "./SellingProductsSection.module.css";
import CategoryTitle from "./CategoryTitle.js";
import ProductListHeader from "./ProductListHeader.js";
import SellingProductList from "./SellingProductList.js";
function SellingProductsSection({
  sellingList,
  onChangeOrder,
  onChangeKeyword,
  className,
  pageSize,
}) {
  return (
    <div className={`${styles.sellingProductsSeciton} ${className}`}>
      <ProductListHeader
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
      />
      <SellingProductList sellingList={sellingList} pageSize={pageSize} />
    </div>
  );
}
export default SellingProductsSection;
