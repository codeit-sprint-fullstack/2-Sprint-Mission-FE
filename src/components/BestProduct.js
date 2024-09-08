import ProductItem from './ProductItem';
import '../css/BestProduct.css';
import { getProductList } from '../api';
import { useCallback, useEffect, useState } from 'react';

export default function BestProduct() {
  const [bestItems, setBestItems] = useState([]);

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

  return (
    <div className='bestItemSection'>
      <h1 className='title'>베스트 상품</h1>
      <div className='bestItems'>
        {bestItems.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} classNames="BestProduct" />
            </li>
          )
        })}
      </div>
    </div>
  );
}