import axios from "axios";
import getProducts from "../api.js";
import { useEffect, useState } from "react";

function CostFormat(amount) {
  return amount.toLocaleString();
}

export default function Products() {
  // const selecList = ["좋아요순 ",""]
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");

  function ProductList() {
    getProducts(1, 10, order, "").then((productlist) => {
      //console.log("getLsit:", productlist);
      setItems(productlist);
    });
  }

  const handleSortItems = (e) => {
    console.log(e.target.value);
    setOrder(e.target.value);
  };

  // 무한 요청 막기
  useEffect(() => {
    ProductList();
  }, [order]);

  return (
    <div>
      <div>
        <h1 className="header">items</h1>
        <div>
          <input id="searchBar" type="text" placeholder="제품명을 입력해주세요" />
          <button id="addProduct">상품 등록하기</button>
          <select onChange={handleSortItems} value={order}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <ul className="productsListing">
        {items.map((item) => {
          return (
            <li className="productsContainer" key={item.id}>
              <img className="productImg" src={item.images} alt={`the picture of ${item.title}`} />
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
