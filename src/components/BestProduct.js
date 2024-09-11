import ProductItem from './ProductItem';
import '../css/BestProduct.css';
import { getProductList } from '../api';
import { useCallback, useEffect, useState } from 'react';

const TABLET_WIDTH = 1200
const MOBILE_WIDTH = 744
const PC_PAGE_SIZE = 4
const TABLET_PAGE_SIZE = 2
const MOBILE_PAGE_SIZE = 1

function getPageSize() {
  const width = window.innerWidth;

  if (width >= TABLET_WIDTH) {
    return PC_PAGE_SIZE;
  } else if (width >= MOBILE_WIDTH) {
    return TABLET_PAGE_SIZE;
  } else {
    return MOBILE_PAGE_SIZE;
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
      if (window.innerWidth < MOBILE_WIDTH) {
        setPageSize(MOBILE_PAGE_SIZE);
      } else if (window.innerWidth < TABLET_WIDTH) {
        setPageSize(TABLET_PAGE_SIZE);
      } else {
        setPageSize(PC_PAGE_SIZE);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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