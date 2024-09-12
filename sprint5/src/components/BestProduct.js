import '../css/BestProduct.css';
import { useCallback, useState, useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { getProductList } from '../api';
import defaultImg from '../images/img_default.png';

function BestProductItem({ bestItem }) {
  const { name, price } = bestItem;

  return (
    <div className="best-product-item">
      <img className="best-product-item-img" src={defaultImg} alt={name} />
      <div className="best-product-info">
        <span className="best-product-name">{name}</span>
        <span className="best-product-price">{price}원</span>
      </div>
    </div>
  );
}

export default function BestProduct() {
  const [bestItems, setBestItems] = useState([]);
  const [isLoading, loadingError, getProductAsync] = useAsync(getProductList);
  const [bestPageSize, setBestPageSize] = useState(4);

  useEffect(() => {
    const handlePageSize = () => {
      if (window.innerWidth >= 1200) {
        setBestPageSize(4);
      } else if (window.innerWidth >= 744) {
        setBestPageSize(2);
      } else {
        setBestPageSize(1);
      }
    };
    handlePageSize();
    window.addEventListener('resize', handlePageSize);

    return () => window.removeEventListener('resize', handlePageSize);
  }, []);

  const handleBestLoad = useCallback(
    async (params) => {
      const result = await getProductAsync(params);
      if (!result) return;

      const products = result;
      setBestItems(products.sort((a, b) => b.favoriteCount - a.favoriteCount));
    },
    [getProductAsync]
  );

  useEffect(() => {
    handleBestLoad({ page: 1, pageSize: bestPageSize, orderBy: 'favorite' });
  }, [bestPageSize, handleBestLoad]);

  return (
    <section>
      <div>
        <h1 className="best-product-title">베스트 상품</h1>
        <div className="best-products">
          <div className="best-product-list">
            {bestItems.slice(0, bestPageSize).map((bestItem) => (
              <div key={bestItem.id}>
                <BestProductItem bestItem={bestItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
