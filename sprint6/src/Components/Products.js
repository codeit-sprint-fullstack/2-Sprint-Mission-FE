// 함수명은 동사, 대문자 시작 안하게 조심
// totalProducts도 함수명 수정
// console.log 다 삭제하기
//await 함수 usecallbak으로 감싸기

import "./Product.css";
import { getProducts, getTotalCount } from "../api.js";
import { Link } from "react-router-dom";
import magnifier from "../assets/ic_search.png";
import defaultImage from "../assets/defaultImg.png";
import rightArrow from "../assets/arrow_active_right.png";
import leftArrow from "../assets/arrow_active_left.png";
import { useEffect, useState } from "react";

function formatPrice(amount) {
  return amount.toLocaleString();
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [search, setSearch] = useState("");

  function getProductList() {
    getProducts(1, 10, search, "recent").then((productlist) => {
      console.log(productlist);
      setItems(productlist);
    });
  }

  function getTotalItemCount() {
    getTotalCount(1, 10, search, "recent").then((productlist) => {
      setTotalPages(productlist);
    });
  }

  const handleSearchItem = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getProductList();
    getTotalItemCount();
  }, [search]);

  return (
    <section>
      <div className="productsTool">
        <h1 className="header">판매 중인 상품</h1>
        <div id="searchAndSort">
          <div className="searchBar">
            <img src={magnifier} alt="Magnifier" />
            <input
              onInput={handleSearchItem}
              id="searchInput"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={search}
            />
          </div>
          <Link to="/registration">
            <button id="addProduct">상품 등록하기</button>
          </Link>
          <div className="selectContainer">최신순</div>
        </div>
      </div>
      <ul className="productsListing">
        {items.map((item) => {
          return (
            <li className="productsContainer" key={item._id}>
              <img className="productImg" src={item.images || defaultImage} alt={`the picture of ${item.title}`} />
              <p className="name">{item.name}</p>
              <p className="price"> {formatPrice(item.price)}원</p>
              <p className="like">♡ {item.favoriteCount}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
