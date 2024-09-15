import ProductItem from './ProductItem.js';
import styles from './BestProduct.module.css';
import { getProductList } from '../api.js';
import { useCallback, useEffect, useState } from 'react';

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 4;
  } else if (width >= 744) {
    return 2;
  } else {
    return 1;
  }
}

export default function BestProduct() {
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const handleLoadBestItem = useCallback(
    async (params) => {
      const data = await getProductList(params);
      if (!data) return;

      setBestItems(data.list);
    },
    []
  );

  useEffect(() => {
    handleLoadBestItem({
      page: 1,
      pageSize: pageSize,
      orderBy: 'favorite'
    });
  }, [pageSize, handleLoadBestItem]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 744) {
        setPageSize(1);
      } else if (window.innerWidth < 1200) {
        setPageSize(2);
      } else {
        setPageSize(4);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.bestItemSection}>
      <h1 className={styles.title}>베스트 상품</h1>
      <div className={styles.bestItems}>
        {bestItems.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} classNames='BestProduct' />
            </li>
          )
        })}
      </div>
    </div>
  );
}