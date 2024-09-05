import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import products from '../api';
import ProductList from './ProductList';
import PageBar from './PageBar';
import ProductListBar from './ProductListBar';
import BestProduct from './BestProduct';

export default function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewest = () => setOrder('createdAt');
  const handleBest = () => setOrder('favoriteCount');

  const handleBestLoad = async (options) => {
    const { list } = await products.getProductList(options);
    setBestItems(list);
  };

  useEffect(() => {
    handleBestLoad({ page: 1, pageSize: 4, orderBy: 'favorite' });
  }, [order]);

  const handleLoad = async (options) => {
    const { list } = await products.getProductList(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, orderBy: 'recent' });
  }, [order]);

  return (
    <div>
      <Header />
      <BestProduct items={bestItems} />
      <ProductListBar />
      <ProductList items={sortedItems} />
      <PageBar />
      <Footer />
    </div>
  );
}
