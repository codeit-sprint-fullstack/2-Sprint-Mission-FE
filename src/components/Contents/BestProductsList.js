import "./style/BestProductsList.css";
import BestProduct from "./BestProduct.js";
function BestProductsList({ bestList }) {
  return (
    <ul id="best-products-list">
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
