import BestProduct from './BestProduct';
import Footer from './Footer';
import Nav from './Nav'
import '../css/App.css'
import { getProductList } from '../api';
import { useCallback, useEffect, useState } from 'react';
import SalesProduct from './SalesProduct';

export default function App() {
  const [bestItems, setBestItems] = useState([]);
  const [salesItems, setSalesItems] = useState([]);

  const handleLoadBestItem = useCallback(
    async (params) => {
      const data = await getProductList(params);
      if (!data) return;

      setBestItems(data.list);
    },
    [getProductList]
  );

  useEffect(() => {
    handleLoadBestItem({
      page: 1,
      pageSize: 4,
      orderBy: 'favorite'
    });
  }, []);

  const handleLoadSalesItem = useCallback(
    async (params) => {
      const data = await getProductList(params);
      if (!data) return;

      setSalesItems(data.list);
    },
    [getProductList]
  );

  useEffect(() => {
    handleLoadSalesItem({
      page: 1,
      pageSize: 10,
      orderBy: 'recent'
    });
  }, []);

  return (
    <div className='full'>
      <Nav />
      <div className='main'>
        <BestProduct items={bestItems} />
        <SalesProduct items={salesItems} />
      </div>
      <Footer />
    </div>
  );
}