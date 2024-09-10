import styles from "./ProductsEntire.module.css";
import BestProductsSection from "./BestProductsSection.js";
import SellingProductsSection from "./SellingProductsSection.js";
function ProductsEntire({
  totalList,
  onChangeOrder,
  onChangeKeyword,
  className,
  pageSize,
}) {
  return (
    <div className={`${styles.productsEntire} ${className}`}>
      <BestProductsSection
        bestList={totalList.bestList}
        pageSize={pageSize.bestList}
      />
      <SellingProductsSection
        className={styles.sellingProductsEntire}
        sellingList={totalList.sellingList}
        onChangeOrder={onChangeOrder}
        onChangeKeyword={onChangeKeyword}
        pageSize={pageSize.sellingList}
      />
    </div>
  );
}
export default ProductsEntire;
