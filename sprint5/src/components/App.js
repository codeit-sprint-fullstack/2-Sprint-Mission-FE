import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { getProduct } from '../api';
import ProductList from './ProductList';
import PageBar from './PageBar';
import ProductListBar from './ProductListBar';
import BestProduct from './BestProduct';

export default function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]); ///

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewest = () => setOrder('createdAt');
  const handleBest = () => setOrder('favoriteCount');

  const handleLoad = async (options) => {
    const { list } = await getProduct(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, order });
  }, [order]);

  return (
    <div>
      <Header />
      <ProductListBar />
      <ProductList items={sortedItems} />
      <PageBar />
      <Footer />
    </div>
  );
}
