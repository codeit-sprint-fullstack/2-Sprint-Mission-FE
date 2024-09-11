import '../css/BestProduct.css';
import { useCallback, useState, useEffect } from 'react';
import useQuery from '../hooks/useQuery';
import { getProductList } from '../api';
import useResize from '../hooks/useResize';

function BestProductItem({ bestItem }) {
  const { images, name, price, favoriteCount } = bestItem;

  return (
    <div className="best-product-item">
      <img className="best-product-item-img" src={images} alt={name} />
      <div className="best-product-info">
        <span className="best-product-name">{name}</span>
        <span className="best-product-price">{price}원</span>
        <span className="best-product-favorite">♡ {favoriteCount}</span>
      </div>
    </div>
  );
}

export default function BestProduct() {
  const [bestItems, setBestItems] = useState([]);
  const [data, isLoading, error] = useQuery(() => getProductList({}));

  const pageSize = useResize(true);

  useEffect(() => {
    const handleLoadBestItems = async () => {
      const result = await getProductList();
      setBestItems(
        result.list.sort((a, b) => b.favoriteCount - a.favoriteCount)
      );
    };
    handleLoadBestItems();
  }, []);

  return (
    <section>
      <div>
        <h1 className="best-product-title">베스트 상품</h1>
        <div className="best-products">
          <div className="best-product-list">
            {bestItems.slice(0, pageSize).map((bestItem) => (
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
