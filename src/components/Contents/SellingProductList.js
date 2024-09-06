import "./style/SellingProductList.css";
import SellingProduct from "./SellingProduct.js";
function SellingProductList({ sellingList }) {
  return (
    <ul id="selling-product-list">
      {sellingList.map((product) => (
        <li key={product.id}>
          <SellingProduct product={product} />
        </li>
      ))}
    </ul>
  );
}
export default SellingProductList;
