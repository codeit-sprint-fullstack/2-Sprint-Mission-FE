function CostFormat(amount) {
  return amount.toLocaleString();
}

function ProductList({ item }) {
  return (
    <div>
      <img className="productImg" src={item.images} alt={`the picture of ${item.title}`} />
      <p className="name">{item.name}</p>
      <p className="price"> {CostFormat(item.price)}원</p>
      <p className="like">♡ {item.favoriteCount}</p>
    </div>
  );
}

function Products({ items }) {
  if (!Array.isArray(items)) {
    return <div>thi is not an array</div>;
  }
  return (
    <div>
      <h1 className="header">판매 중인 상품</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <ProductList item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Products;
