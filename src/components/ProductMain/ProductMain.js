import BestProductList from './BestProductList';
import ProductList from './ProductList';
import './ProductMain.css';

function ProductMain() {
  return (
    <div className="product-main">
      <BestProductList />
      <ProductList />
    </div>
  );
}

export  default ProductMain;