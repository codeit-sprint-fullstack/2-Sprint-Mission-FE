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
import sortIcon from "../assets/ic_sort.png";
import { useCallback, useEffect, useState } from "react";

function formatPrice(amount) {
  return amount.toLocaleString();
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagingPages, setPagingPages] = useState([]); // 5개씩 paging
  const [pageSize, setPageSize] = useState(10);
  const [sortLogo, setSortLogo] = useState("최신순");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const updatePageSize = useCallback(() => {
    if (window.matchMedia("(min-width: 375px) and (max-width: 743px)").matches) {
      setPageSize(4); // 375px ~ 743px
      setSortLogo(<img id="sortLogo" src={sortIcon} alt="Sort Icon" />);
      setIsSmallScreen(true);
    } else if (window.matchMedia("(min-width: 744px) and (max-width: 1199px)").matches) {
      setPageSize(6); // 744px ~ 1199px
      setSortLogo("최신순");
      setIsSmallScreen(false);
    } else {
      setPageSize(10);
      setSortLogo("최신순");
      setIsSmallScreen(false);
    }
  }, []);

  const getProductList = useCallback(async () => {
    const productlist = await getProducts(currentPage, pageSize, search, "recent");
    setItems(productlist);
  }, [currentPage, pageSize, search]);

  const getTotalItemCount = useCallback(async () => {
    const count = await getTotalCount(currentPage, pageSize, search, "recent");
    setTotalPages(Math.ceil(count / 10));
  }, [currentPage, pageSize, search]);

  const getTotalPages = useCallback(async () => {
    const count = await getTotalCount(currentPage, pageSize, search, "recent");
    const pageArray = Array.from({ length: count }, (_, i) => i + 1);
    const start = currentPage - 1;
    const end = start + 5;
    const pageSlice = pageArray.slice(start, end);
    setPagingPages(pageSlice);
  }, [currentPage, pageSize, search]);

  const handleSearchItem = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleNextPage = (e) => {
    if (currentPage < totalPages) {
      let nextpage = currentPage + 1;
      setCurrentPage(nextpage);
    }
  };

  const handleBeforePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getProductList();
    getTotalItemCount();
    getTotalPages();
    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, [getProductList, getTotalItemCount, getTotalPages, updatePageSize]);

  return (
    <section>
      <div className="productsTool">
        <h1 className="header">판매 중인 상품</h1>
        {isSmallScreen ? (
          // 작은 화면일 때
          <>
            <Link to="/registration">
              <button id="addProduct">상품 등록하기</button>
            </Link>
            <div className="smallSearchandSort">
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
            </div>
            <div className="selectContainer">{sortLogo}</div>
          </>
        ) : (
          // 큰 화면일 때
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
            <div className="selectContainer">{sortLogo}</div>
          </div>
        )}
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
      <div className="pageButtons">
        <img className="arrowButton" src={leftArrow} onClick={handleBeforePage} />
        {pagingPages.map((page) => (
          <button
            key={page}
            className={`pageButton ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <img className="arrowButton" src={rightArrow} onClick={handleNextPage} />
      </div>
    </section>
  );
}
