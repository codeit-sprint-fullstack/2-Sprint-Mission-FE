import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { getProduct } from '../api';
import ProductList from './ProductList';

export default function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('favoriteCount');

  const handleLoad = async () => {
    const { list } = await getProduct();
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <Header />
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>좋아요순</button>
      <ProductList items={sortedItems} />
      <Footer />
    </div>
  );
}
