import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useViewport } from '@/lib/viewportContext';
import Image from 'next/image';
import defaultImage from '@/public/no_image.png';
import styles from './BestProductList.module.css';

export async function getStaticProps() {
  const defaultPageSize = 4;
  const res = await axios.get(
    `/products?orderBy=favorite&pageSize=${defaultPageSize}`
  );
  const products = res.data.list;

  return {
    props: {
      products,
    },
  };
}

const pageSizeTable = Object.freeze({
  desktop: 4,
  tablet: 2,
  mobile: 1,
});

function BestProducts({ products }) {
  const [items, setItems] = useState(products);
  const [pageSize, setPageSize] = useState(4);
  const [width, setWidth] = useState(0);
  const viewport = useViewport();

  const handleLoad = useCallback(async () => {
    try {
      const res = await axios.get(
        `/products?orderBy=favorite&pageSize=${pageSize}`
      );
      const products = res.data.list;
      setItems(products);
    } catch (error) {
      console.error(error);
    }
  }, [pageSize]);

  useEffect(() => {
    setPageSize(pageSizeTable[`${viewport}`]);
  }, [viewport]);

  useEffect(() => {
    handleLoad();
  }, [pageSize]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>베스트 상품</p>
      <div className={styles.bestProductList}>
        {items?.map((item) => (
          <div className={styles.bestProduct} key={item.id}>
            <div className={styles.productImage}>
              <Image
                fill
                src={item.images[0] || defaultImage}
                alt={item.name}
                unoptimized
              />
            </div>
            <div className={styles.productInfo}>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.price}>{item.price}원</p>
              <p className={styles.favoriteCount}>♡ {item.favoriteCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestProducts;
