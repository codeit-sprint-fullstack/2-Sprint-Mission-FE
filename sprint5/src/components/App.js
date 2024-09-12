import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import BestProduct from './BestProduct';
import '../css/App.css';

export default function App() {
  return (
    <div>
      <Header />
      <BestProduct />
      <ProductList />
      <Footer />
    </div>
  );
}
