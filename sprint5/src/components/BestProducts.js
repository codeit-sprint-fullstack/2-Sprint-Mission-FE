function CostFormat(amount) {
  return amount.toLocaleString();
}

function BestProductList({ item }) {
  return (
    <>
      <img className="bestImg" src={item.images} alt={`the picture of ${item.title}`} />
      <p className="name">{item.name}</p>
      <p className="price"> {CostFormat(item.price)}원</p>
      <p className="like">♡ {item.favoriteCount}</p>
    </>
  );
}

export default function BestProducts({ items }) {
  if (!Array.isArray(items)) {
    return <div>thi is not an array</div>; //초반에 api 출력이 안돼서 트러블 슈팅 하던 흔적입니당,,,
  }
  return (
    <div>
      <h1 className="header">베스트 상품</h1>
      <ul className="productsListing">
        {items.map((item) => {
          return (
            <li className="bestProductsContainer" key={item.id}>
              <BestProductList item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
