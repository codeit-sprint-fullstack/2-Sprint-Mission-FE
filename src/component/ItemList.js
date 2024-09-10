import { useEffect, useState } from "react";
import useItem from "./hook/useItem";
import Item from "./Item";
import search from "../assets/ic_search.svg";
import rightArrow from "../assets/btn_right.svg";
import leftArrow from "../assets/btn_left.svg";
import arrowDown from "../assets/ic_arrow_down.svg";
import sort from "../assets/ic_sort.svg";

const getPageSize = () => {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 10;
  } else if (width >= 744) {
    return 6;
  } else {
    return 4;
  }
};

const ItemList = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [pageSize, setPageSize] = useState(getPageSize());
  const { item, allProduct, loadingData } = useItem(page, pageSize, orderBy);
  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 743);

  const totalPages = Math.ceil(allProduct / pageSize);

  useEffect(() => {
    const handleSize = () => {
      setPageSize(getPageSize());
      setMobile(window.innerWidth <= 743);
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  if (loadingData) return <div>Loading...</div>;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    let startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(allProduct, startPage + maxPageNumbers - 1);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(1)}
          className={page === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleOptionClick = (value) => {
    setOrderBy(value);
    setDropdown(false);
  };

  return (
    <div className="itemList">
      <div className="itemHeader">
        <p>판매중인 상품</p>
        <div className="search">
          <img src={search} alt="Search" />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="searchInput"
          />
        </div>
        <button className="updateProduct">상품 등록하기</button>
        <div className="dropdown" onClick={toggleDropdown}>
          <div className="dropdownSelect">
            {!mobile && (orderBy === "recent" ? "최신순" : "좋아요순")}
            <img
              src={mobile ? sort : arrowDown}
              alt="dropdown"
              className="dropdownArrow"
            />
          </div>
          {dropdown && (
            <ul className="dropdownList">
              <li
                className="item-recent"
                onClick={() => handleOptionClick("recent")}
              >
                최신순
              </li>
              <li
                className="item-favorite"
                onClick={() => handleOptionClick("favorite")}
              >
                좋아요순
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="product-grid">
        {item.map((product) => (
          <Item key={product.id} item={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <img src={leftArrow} alt="left" />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <img src={rightArrow} alt="right" />
        </button>
      </div>
    </div>
  );
};

export default ItemList;
