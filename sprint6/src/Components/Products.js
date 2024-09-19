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
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagingPages, setPagingPages] = useState([]);
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
  }, [sortLogo]);

  const getProductList = useCallback(async () => {
    getProducts(currentPage, pageSize, search, "recent")
      .then((productlist) => {
        setItems(productlist);
      })
      .catch(
        (error) => {
          console.error(`Error: ${error.message}`);
        },
        [currentPage, pageSize, search],
      );
  });

  const getTotalItemCount = useCallback(async () => {
    getTotalCount(currentPage, pageSize, search, "recent")
      .then((count) => {
        setTotalPages(Math.ceil(count / pageSize));
      })
      .catch(
        (error) => {
          console.error(`Error: ${error.message}`);
        },
        [currentPage, pageSize, search],
      );
  });

  const getPagingPages = useCallback(() => {
    const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(0, currentPage - 3);
    const end = Math.min(pageArray.length, currentPage + 2);
    const pageSlice = pageArray.slice(start, end);
    setPagingPages(pageSlice);
  }, [currentPage, totalPages]);

  const handleSearchItem = (e) => {
    setSearch(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBeforePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getProductList();
      getPagingPages();
    };

    const handleResize = () => {
      const prevPageSize = pageSize;
      updatePageSize();

      // 페이지가 상이할 때만 새 프로덕트 불러오기
      if (prevPageSize !== pageSize) {
        fetchProducts();
      }
    };

    window.addEventListener("resize", handleResize);

    // 처음 렌더링 될 때 실행시키기
    fetchProducts();

    return () => window.removeEventListener("resize", handleResize);
    // 함수들 제거, 원래 의존성으로 복귀
  }, [currentPage, pageSize]);

  return (
    <section>
      <div className="productsTool">
        <h1 className="header">판매 중인 상품</h1>
        {isSmallScreen ? (
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
          <div id="searchAndSort">
            <div className="searchBar">
              <img src={magnifier} alt="Magnifier" id="magnifier" />
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
        {items.map((item) => (
          <li className="productsContainer" key={item._id}>
            <img className="productImg" src={item.images || defaultImage} alt={`the picture of ${item.title}`} />
            <p className="name">{item.name}</p>
            <p className="price"> {formatPrice(item.price)}원</p>
            <p className="like">♡ {item.favoriteCount}</p>
          </li>
        ))}
      </ul>
      <div className="pageButtons">
        <img
          className="arrowButton"
          src={leftArrow}
          onClick={handleBeforePage}
          alt="Previous Page"
          disabled={currentPage === 1}
        />
        {pagingPages.map((page) => (
          <button
            key={page}
            className={`pageButton ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <img
          className="arrowButton"
          src={rightArrow}
          onClick={handleNextPage}
          alt="Next Page"
          disabled={currentPage >= totalPages}
        />
      </div>
    </section>
  );
}
