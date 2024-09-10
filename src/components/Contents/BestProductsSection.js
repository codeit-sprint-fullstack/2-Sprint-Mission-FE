import styles from "./BestProductsSection.module.css";
import CategoryTitle from "./CategoryTitle.js";
import BestProductsList from "./BestProductsList.js";

function BestProductsSection({ bestList, pageSize }) {
  return (
    <div className={styles.bestProductsSection}>
      <CategoryTitle>베스트 상품</CategoryTitle>
      <BestProductsList bestList={bestList} pageSize={pageSize} />
    </div>
  );
}
export default BestProductsSection;
