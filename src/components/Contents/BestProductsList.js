import styles from "./BestProductsList.module.css";
import BestProduct from "./BestProduct.js";
function BestProductsList({ bestList, pageSize }) {
  const list = bestList.slice(0, pageSize);
  return (
    <ul id="best-products-list" className={styles.bestProductsListUI}>
      {list.map((product) => (
        <li key={product.id}>
          <BestProduct
            name={product.name}
            price={product.price}
            image={product.images}
            favoriteCount={product.favoriteCount}
            description={product.description}
          />
        </li>
      ))}
    </ul>
  );
}
export default BestProductsList;
