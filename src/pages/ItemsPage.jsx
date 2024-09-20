import style from "./css/ItemsPage.module.css";
import BestProducts from "../components/BestProducts.jsx";
import ProductsOnSale from "../components/ProductsOnSale.jsx";

function ItemsPage() {
  return (
    <main id={`${style.itemsPage}`}>
      <div id={`${style.bestProductWrapper}`}>{/* <BestProducts /> */}</div>
      <ProductsOnSale />
    </main>
  );
}

export default ItemsPage;
