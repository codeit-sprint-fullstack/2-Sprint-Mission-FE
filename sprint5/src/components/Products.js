import { getProducts, totalProducts } from "../api.js";
import { useEffect, useState } from "react";
import rightArrow from "../assets/status=active-2.png";
import leftArrow from "../assets/status=active-1.png";
import search from "../assets/ic_search.png";

function CostFormat(amount) {
  return amount.toLocaleString();
}

export default function Products() {
  // const selecList = ["좋아요순 ",""]
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]); // 전체 page 수 출력
  const [pagingPages, setPagingPages] = useState([]); // 5개씩 paging
  const [searchValue, setSearchValue] = useState("");

  const pageSize = 10;

  function ProductList() {
    //console.log(searchValue);
    getProducts(currentPage, pageSize, order, searchValue).then((productlist) => {
      setItems(productlist);
    });
  }

  function fetchTotalPages() {
    totalProducts(currentPage, pageSize, order, searchValue).then((totalCount) => {
      let start = currentPage - 1;
      let end = start + 5;
      const pageArray = totalCount.slice(start, end);
      setPagingPages(pageArray);
      setTotalPages(totalCount); // 14 넘기기
    });
  }

  const handleNextPage = () => {
    //console.log(currentPage, totalPages.length);
    if (currentPage < totalPages.length) {
      let nextpage = currentPage + 1;
      console.log(nextpage);
      setCurrentPage(nextpage);
    }
  };

  const handleBeforePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchItem = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortItems = (e) => {
    setOrder(e.target.value);
  };

  // 무한 요청 막기
  useEffect(() => {
    ProductList();
    fetchTotalPages();
  }, [currentPage, order, searchValue]);

  return (
    <div>
      <div className="productsTool">
        <h1 className="header">판매 중인 상품</h1>
        <div id="searchAndSort">
          <div className="searchBar">
            <img src={search} alt="Magnifier" />
            <input
              onInput={handleSearchItem}
              id="search-input"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={searchValue}
            />
          </div>
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
      <div className="pageButtons">
        <img className="arrowButton" src={leftArrow} onClick={handleBeforePage} />
        {pagingPages.map((page) => (
          <button key={page} className="pageButton" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <img className="arrowButton" src={rightArrow} onClick={handleNextPage} />
      </div>
    </div>
  );
}
