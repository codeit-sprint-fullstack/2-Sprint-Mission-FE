function BestProductItem({ item }) {
  const { images, name, price, favoriteCount, createdAt } = item;

  return (
    <div className="BestProductItem">
      <img className="BestProductItem-img" src={images} alt={name} />
      <div className="best-product-info">
        <span>{name}</span>
        <span>{price}</span>
        <span>{favoriteCount}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}

export default function BestProduct({ items }) {
  return (
    <section>
      <div className="BestProducts">
        <div className="BestProductList">
          {items.map((item) => (
            <div key={item.id}>
              <BestProductItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
