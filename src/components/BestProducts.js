import '../css/BestProducts.css';
import ProductCard from './ProductCard';

function BestProducts({ items }) {
  return (
    <section id="bestProducts">
      <div id="bestProductsTitle">
        <h3>베스트 상품</h3>
      </div>
      <div id="bestProductsItems">
        {items.map((item) => {
          return (
            <ProductCard classNames="bestItem" item={item} key={item.id} />
          );
        })}
      </div>
    </section>
  );
}

export default BestProducts;
