import '../css/market.css';
import BestProducts from '../components/BestProducts';
import ProductsOnSale from '../components/ProductsOnSale';
import Header from './Header';
import Footer from './Footer';

function ItemsPage() {
  return (
    <>
      <Header />
      <main>
        <BestProducts />
        <ProductsOnSale />
      </main>
      <Footer />

      {/* {isLoading && <Modal message="로딩 중입니다." btn={false} />} */}
      {/* {err && <Modal message={err.message} />} */}
    </>
  );
}

export default ItemsPage;
