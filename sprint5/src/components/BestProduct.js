import '../css/BestProduct.css';
import useQuery from '../hooks/useQuery';
import useResize from '../hooks/useResize';
import { getProductList } from '../api';
import defaultImg from '../images/img_default.png';

function BestProductItem({ item }) {
  const { name, price, favoriteCount } = item;

  return (
    <div className="best-product-item">
      <img className="best-product-item-img" src={defaultImg} alt={name} />
      <div className="best-product-info">
        <span className="best-product-name">{name}</span>
        <span className="best-product-price">{price}원</span>
        <span className="product-favorite">♡ {favoriteCount}</span>
      </div>
    </div>
  );
}

export default function BestProduct() {
  const pageSize = useResize(true);

  const [data, isLoading, error] = useQuery(() => getProductList({}));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  const bestProducts = data.sort((a, b) => b.favoriteCount - a.favoriteCount);

  return (
    <section>
      <div>
        <h1 className="best-product-title">베스트 상품</h1>
        <div className="best-products">
          <div className="best-product-list">
            {bestProducts.slice(0, pageSize).map((item) => (
              <div key={item.id}>
                <BestProductItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
