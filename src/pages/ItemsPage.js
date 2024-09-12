import style from './css/ItemsPage.module.css';
import BestProducts from '../components/BestProducts.js';
import ProductsOnSale from '../components/ProductsOnSale.js';

function ItemsPage() {
  return (
    <main id={`${style.itemsPage}`}>
      <div id={`${style.bestProductWrapper}`}>{/* <BestProducts /> */}</div>
      <ProductsOnSale />
    </main>
  );
}

export default ItemsPage;
