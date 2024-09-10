import styles from "./SellingProductList.module.css";
import SellingProduct from "./SellingProduct.js";
function SellingProductList({ sellingList, pageSize }) {
  const list = sellingList.slice(0, pageSize);
  return (
    <ul className={styles.sellingProductList}>
      {list.map((product) => (
        <li key={product.id}>
          <SellingProduct product={product} pageSize={pageSize} />
        </li>
      ))}
    </ul>
  );
}
export default SellingProductList;
