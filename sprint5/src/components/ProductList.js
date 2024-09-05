import '../css/ProductList.css';

function ProductListItem({ item }) {
  const { images, name, price, favoriteCount, createdAt } = item;

  return (
    <div className="product-item">
      <img className="product-item-img" src={images} alt={name} />
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}원</span>
        <span className="product-favorite-count">♡ {favoriteCount}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}

export default function ProductList({ items }) {
  return (
    <section>
      <div className="products">
        <div className="product-list">
          {items.map((item) => (
            <div key={item.id}>
              <ProductListItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
