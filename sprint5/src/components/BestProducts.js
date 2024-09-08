import { getProducts } from "../api.js";
import { useEffect, useState } from "react";

function CostFormat(amount) {
  return amount.toLocaleString();
}

export default function BestProducts() {
  const [items, setItems] = useState([]);

  function ProductList() {
    getProducts(1, 4, "favorite", "").then((productlist) => {
      //console.log("getLsit:", productlist);
      setItems(productlist);
    });
  }

  useEffect(() => {
    ProductList();
  }, []);

  return (
    <div>
      <h1 className="header">베스트 상품</h1>
      <ul className="bestProductsListing">
        {items.map((item) => {
          return (
            <li className="bestProductsContainer" key={item.id}>
              <img className="bestImg" src={item.images} alt={`the picture of ${item.title}`} />
              <p className="name">{item.name}</p>
              <p className="price"> {CostFormat(item.price)}원</p>
              <p className="like">♡ {item.favoriteCount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
