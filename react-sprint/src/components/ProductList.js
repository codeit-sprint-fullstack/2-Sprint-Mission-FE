import { useState, useEffect } from "react";
import useOptionProducts from "../hooks/useOptionProducts";
import Product from "./Product";
import "./ProductList.css";
import leftArrowImg from "../assets/arrowLeft.svg";
import rightArrowImg from "../assets/arrowRight.svg";
import dropdownArrowImg from "../assets/arrowDown.svg";
import dropdownSortImg from "../assets/sortImg.svg";
import searchImg from "../assets/searchImg.svg";
import { Link } from "react-router-dom";

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 10;
  } else if (width >= 744) {
    return 6;
  } else {
    return 4;
  }
}

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("createdAt");
  const [pageSize, setPageSize] = useState(getPageSize());
  const { items, totalCount } = useOptionProducts(page, pageSize, order);
  const [dropdown, setDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743);

  const sortedItems = items.sort((a, b) => {
    if (!a[order] || !b[order]) return 0;
    return b[order] - a[order];
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setIsMobile(window.innerWidth <= 743);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }; // 메모리 누수와 중복 호출 방지
  }, []);

  function pageNumbers() {
    const Numbers = [];
    const maxNumbers = 5;
    let primaryPage = Math.max(1, page - Math.floor(maxNumbers / 2));
    let lastPage = Math.min(totalPages, primaryPage + maxNumbers - 1);

    if (lastPage - primaryPage < maxNumbers - 1) {
      primaryPage = Math.max(1, lastPage - maxNumbers + 1);
    }

    for (let i = primaryPage; i <= lastPage; i++) {
      Numbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`paginationBtn ${page === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return Numbers;
  }

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleNumberClick = (value) => {
    setOrder(value);
    setDropdown(false);
  };

  return (
    <div className="productList">
      <div className="productHeader">
        <h2 className="productHeaderText">판매 중인 상품</h2>
        <div className="productSearch">
          <img src={searchImg} alt="Search" />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="productSearchInput"
          />
        </div>
        <Link className="link" to={"/registration"}>
          <button className="createBtn">상품 등록하기</button>
        </Link>
        <div className="Dropdown" onClick={toggleDropdown}>
          <div className="dropdownSelected">
            {!isMobile && (order === "createdAt" ? "최신순" : "좋아요순")}
            <img
              src={isMobile ? dropdownSortImg : dropdownArrowImg}
              alt="Dropdown"
              className="dropdown-arrow"
            />
          </div>
          {dropdown && (
            <ul className="dropdownList">
              <li
                className="itemCreatedAt"
                onClick={() => handleNumberClick("createdAt")}
              >
                최신순
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="productGrid">
        {sortedItems.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
      <div className="pagination">
        <button
          className="paginationBtn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <img src={leftArrowImg} alt="Left" />
        </button>
        {pageNumbers()}
        <button
          className="paginationBtn"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <img src={rightArrowImg} alt="Right" />
        </button>
      </div>
    </div>
  );
}
