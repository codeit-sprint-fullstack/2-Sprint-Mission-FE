import '../css/ProductList.css';

function ProductListItem({ item }) {
  const { images, name, price, favoriteCount, createdAt } = item;

  return (
    <div className="ProductListItem">
      <img className="ProductListItem-img" src={images} alt={name} />
      <div className="product-info">
        <span>{name}</span>
        <span>{price}</span>
        <span>{favoriteCount}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}

export default function ProductList({ items }) {
  const [items, setItems] = useState([]);

  return (
    <section>
      <div className="Products">
        <div className="ProductList">
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
