import React, { useState, useEffect } from "react";
import axios from "axios";
import likeButton from "../images/etc/likeButton.svg";
import nonImage from "../images/etc/nonImage.svg";
import "../css/ProductList.css";

const PCITEMS = 10; // 전체 상품 (Desktop)
const TABLETITEMS = 6; // 전체 상품 (Tablet)
const MOBILEITEMS = 4; // 전체 상품 (Mobile)

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState("recent"); // 기본 정렬은 최신순
  const [searchContent, setSearchContent] = useState("");

  // 페이지 크기 계산
  const getPageSize = () => {
    const width = window.innerWidth;
    // 전체 상품의 반응형 그리드 설정
    if (width >= 1200) return PCITEMS;
    if (width >= 744) return TABLETITEMS;
    return MOBILEITEMS;
  };

  const [pageSize, setPageSize] = useState(getPageSize());

  // 반응형 페이지네이션 설정
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 판매 중인 상품 목록 가져오기
  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortType, searchContent, pageSize]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://panda-market-api.vercel.app/products",
        {
          params: {
            page: currentPage,
            limit: pageSize,
            sort: sortType === "recent" ? "recent" : "favorite",
            search: searchContent,
          },
        }
      );
      let products = response.data.list || [];

      // 검색 필터링 -> 서버에서 검색 지원이 안됨
      if (searchContent) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(searchContent.toLowerCase())
        );
      }

      // 정렬 처리
      if (sortType === "favorite") {
        products.sort((a, b) => b.favoriteCount - a.favoriteCount); // 좋아요순 정렬
      }

      setProducts(products);
      setTotalPages(Math.ceil(response.data.totalCount / pageSize));
    } catch (error) {
      console.error(error);
    }
  };

  /* 핸들 */

  // 정렬 변경 처리
  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1); // 정렬 변경 시 페이지 초기화
  };

  // 검색 처리
  const handleSearchChange = (e) => {
    setSearchContent(e.target.value);
    setCurrentPage(1); // 검색 시 페이지 초기화
  };

  //이미지가 없을 때
  const handleImageError = (e) => {
    e.target.src = nonImage; // 대체 이미지 경로
  };

  // 페이지네이션 처리
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="product-wrapper">
      {/* 판매중 상품 */}
      <div className="on-sale-product">
        <div className="search-sort-bar">
          <h2>판매 중인 상품</h2>
          <div className="form-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="&nbsp; &nbsp; &nbsp;검색할 상품을 입력해주세요"
              value={searchContent}
              onChange={handleSearchChange}
            />
            <button className="register-product">상품 등록하기</button>
            <select value={sortType} onChange={handleSortChange}>
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
        <div className="product-list">
          {products.length === 0 ? (
            <p>검색된 상품이 없습니다.</p> // 검색 결과가 없는 경우
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={product.images[0] || nonImage}
                  onError={handleImageError}
                  alt={product.name}
                />
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.price.toLocaleString()}원</p>
                  <div className="like-wrapper">
                    <img src={likeButton} alt="좋아요 버튼" />
                    <p>{product.favoriteCount}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt;
          </button>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
