function CostFormat(amount) {
  return amount.toLocaleString();
}

function BestProductList({ item }) {
  return (
    <div>
      <img className="bestImg" src={item.images} alt={`the picture of ${item.title}`} />
      <p className="name">{item.name}</p>
      <p className="price"> {CostFormat(item.price)}원</p>
      <p className="like">♡ {item.favoriteCount}</p>
    </div>
  );
}

export default function BestProducts({ items }) {
  if (!Array.isArray(items)) {
    return <div>thi is not an array</div>;
  }
  return (
    <div>
      <h1 className="header">베스트 상품</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <BestProductList item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
