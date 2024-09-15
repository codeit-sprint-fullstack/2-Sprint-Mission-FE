import styles from "./BestProductsList.module.css";
import BestProduct from "./BestProduct.js";
function BestProductsList({ bestList, pageSize }) {
  return (
    <ul className={styles.bestProductsListUI}>
      {bestList.map((product) => (
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
