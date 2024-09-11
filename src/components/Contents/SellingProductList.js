import styles from "./SellingProductList.module.css";
import SellingProduct from "./SellingProduct.js";
function SellingProductList({ sellingList, pageSize }) {
  return (
    <ul className={styles.sellingProductList}>
      {sellingList.map((product) => (
        <li key={product.id}>
          <SellingProduct product={product} pageSize={pageSize} />
        </li>
      ))}
    </ul>
  );
}
export default SellingProductList;
