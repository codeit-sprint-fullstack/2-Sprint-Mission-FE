import '../css/BestProducts.css';
import { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import useAsync from '../hooks/useAsync';
import { getProducts } from '../api';
import { useViewport } from '../contexts/ViewportContext';
import { SORT_ORDER } from './SortOrderSelect';

const BEST_ITEM_PAGE_SIZE = Object.freeze({
  PC: 4,
  TABLET: 2,
  MOBILE: 1
});

function BestProducts() {
  const viewport = useViewport();
  const [items, setItems] = useState([]);
  const [isLoading, err, getProductsAsync] = useAsync(getProducts);

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
    <section id="bestProducts">
      <div id="bestProductsTitle">
        <h3>베스트 상품</h3>
      </div>
      <div id="bestProductsItems">
        {items.map((item) => {
          return (
            <ProductCard classNames="bestItem" item={item} key={item.id} />
          );
        })}
      </div>
    </section>
  );
}

export default BestProducts;
