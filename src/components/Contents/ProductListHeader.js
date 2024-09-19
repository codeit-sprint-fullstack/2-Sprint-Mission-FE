import styles from "./ProductListHeader.module.css";
import CategoryTitle from "./CategoryTitle.js";
import SortSelector from "./SortSelector.js";
function ProductListHeader({ onChangeOrder, onChangeKeyword }) {
  const handleChangeKeyword = (e) => {
    onChangeKeyword(e.target.value);
  };
  return (
    <div className={styles.listHeader}>
      <CategoryTitle className={styles.title}>판매 중인 상품</CategoryTitle>
      <input
        id="search-input"
        className={styles.searchInput}
        onChange={handleChangeKeyword}
      ></input>
      <button id="register-btn" className={styles.registerBtn}>
        상품 등록하기
      </button>
      <SortSelector
        className={styles.sortSelector}
        onChangeOrder={onChangeOrder}
      />
    </div>
  );
}
export default ProductListHeader;
