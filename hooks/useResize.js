import { useState, useEffect } from 'react';

const VIEWPORT = Object.freeze({
  DESKTOP: 1200,
  TABLET: 744
});

const DESKTOP_SIZE_BEST_PRODUCT_LIST = 3;
const TABLET_SIZE_BEST_PRODUCT_LIST = 2;
const MOBILE_SIZE_BEST_PRODUCT_LIST = 1;

export default function useResize() {
  const [pageSize, setPageSize] = useState(DESKTOP_SIZE_BEST_PRODUCT_LIST);

  useEffect(() => {
    const handlePageSize = () => {
      const width = window.innerWidth;
      if (width >= VIEWPORT.DESKTOP) {
        setPageSize(DESKTOP_SIZE_BEST_PRODUCT_LIST);
      } else if (width >= VIEWPORT.TABLET) {
        setPageSize(TABLET_SIZE_BEST_PRODUCT_LIST);
      } else {
        setPageSize(MOBILE_SIZE_BEST_PRODUCT_LIST);
      }
    };

    handlePageSize();
    window.addEventListener('resize', handlePageSize);

    return () => window.removeEventListener('resize', handlePageSize);
  }, []);

  return pageSize;
}
