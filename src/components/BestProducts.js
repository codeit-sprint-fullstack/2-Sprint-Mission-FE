import style from './css/BestProducts.module.css';
import { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard.js';
import useAsync from '../hooks/useAsync.js';
import { getProducts } from '../api.js';
import { useViewport } from '../contexts/ViewportContext.js';
import { SORT_ORDER } from './SortOrderSelect.js';

const BEST_ITEM_PAGE_SIZE = Object.freeze({
  PC: 4,
  TABLET: 2,
  MOBILE: 1
});

function BestProducts() {
  const viewport = useViewport();
  const [items, setItems] = useState([]);
  const getProductsAsync = useAsync(getProducts);

  const handleLoadItem = useCallback(
    async (params) => {
      const data = await getProductsAsync(params);
      if (!data) return;

      setItems(data.list);
    },
    [getProductsAsync]
  );

  useEffect(() => {
    handleLoadItem({
      page: 1,
      pageSize: BEST_ITEM_PAGE_SIZE[viewport],
      orderBy: SORT_ORDER.FAVORITE
    });
  }, [viewport, handleLoadItem]);

  return (
    <section id={`${style.bestProducts}`}>
      <div id={`${style.bestProductsTitle}`}>
        <h3>베스트 상품</h3>
      </div>
      <div id={`${style.bestProductsItems}`}>
        {items.map((item) => {
          return (
            <ProductCard
              classNames={`${style.bestitem} ${style['bestitem-product-img']}`}
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
    </section>
  );
}

export default BestProducts;
