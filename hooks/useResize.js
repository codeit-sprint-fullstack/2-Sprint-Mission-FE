import { useState, useEffect } from 'react';

const VIEWPORT = Object.freeze({
  DESKTOP: 1200,
  TABLET: 744,
  MOBILE: 743
});

const DESKTOP_SIZE_PRODUCT_LIST = 10;
const TABLET_SIZE_PRODUCT_LIST = 6;
const MOBILE_SIZE_PRODUCT_LIST = 4;

const DESKTOP_SIZE_BEST_PRODUCT_LIST = 4;
const TABLET_SIZE_BEST_PRODUCT_LIST = 2;
const MOBLIE_SIZE_BEST_PRODUCT_LIST = 1;

export default function useResize(isBestProductList = false) {
  const [pageSize, setPageSize] = useState(
    isBestProductList
      ? DESKTOP_SIZE_BEST_PRODUCT_LIST
      : DESKTOP_SIZE_PRODUCT_LIST
  );

  useEffect(() => {
    const handlePageSize = () => {
      const width = window.innerWidth;

      if (width >= VIEWPORT.DESKTOP) {
        setPageSize(
          isBestProductList
            ? DESKTOP_SIZE_BEST_PRODUCT_LIST
            : DESKTOP_SIZE_PRODUCT_LIST
        );
      } else if (width >= VIEWPORT.TABLET) {
        setPageSize(
          isBestProductList
            ? TABLET_SIZE_BEST_PRODUCT_LIST
            : TABLET_SIZE_PRODUCT_LIST
        );
      } else if (width <= VIEWPORT.MOBILE) {
        setPageSize(
          isBestProductList
            ? MOBLIE_SIZE_BEST_PRODUCT_LIST
            : MOBILE_SIZE_PRODUCT_LIST
        );
      }
    };

    handlePageSize();
    window.addEventListener('resize', handlePageSize);

    return () => window.removeEventListener('resize', handlePageSize);
  }, [isBestProductList]);

  return pageSize;
}
