import "./BestProductList.css";

function BestProductItem({ item }) {
  return (
    <div className="BestItemList">
      <img src={item.images} alt={item.name} />
      <div>
        <p className="ListFont1">{item.name}</p>
        <p className="ListFont2">{item.price}</p>
        <p className="ListFont3">♡ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

function BestProductList({ items }) {
  return (
    <div className="BestSection">
      <div className="leftArray">
        <p className="BestFont">베스트 상품</p>
      </div>
      <ul className="BestProductFrame">
        {items.map((item) => (
          <li key={item.id} className="BestProductItem">
            <BestProductItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestProductList;
