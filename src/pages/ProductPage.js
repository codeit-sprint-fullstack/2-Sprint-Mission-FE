import styles from "./ProductPage.module.css";
import ProductList from "../components/ProductMain/ProductList";

function ProductPage() {
  return (
    <div className={styles.productMain}>
      <ProductList />
    </div>
  )
}

export default ProductPage;