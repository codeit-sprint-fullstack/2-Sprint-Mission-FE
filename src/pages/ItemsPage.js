import SalesProduct from '../components/SalesProduct.js';
import styles from './ItemsPage.module.css'
export default function ItemsPage() {
  return(
    <div className={styles.salesProduct}>
      <SalesProduct />
    </div>
  );
}