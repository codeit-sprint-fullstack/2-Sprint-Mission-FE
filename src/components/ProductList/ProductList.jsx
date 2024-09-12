import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../api/fetchApi";
import img_default from "../../images/etc/img_default.svg";
import likeButton from "../../images/etc/likeButton.svg";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent"); // 좋아요 순 필요 없어서 useState를 사용해야하나..?

  const navigation = useNavigate(); // 상품 등록 이동 때 사용

  useEffect(() => {
    fetchProducts();
  }, [currentPage, search]); //페이지, 검색으로 useEffect

  const fetchProducts = async () => {
    try {
      const response = await fetchApi("/products", {
        currentPage,
        limit,
        sort,
        search,
      });
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e) => {
    //검색
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRegisterClick = () => {
    navigation("/registration");
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  // 페이지네이션 처리
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="product-list-wrapper">
      <div className="section-title">
        <h1>판매 중인 상품</h1>
      </div>
      <div className="search-sort-bar">
        <div className="search-bar-wrapper">
          <input
            className="search-bar-input"
            type="text"
            value={search}
            placeholder="검색할 상품을 입력해주세요"
            onChange={handleSearch}
          />
        </div>
        <button className="create-item-button" onClick={handleRegisterClick}>
          상품 등록하기
        </button>
        <select
          className="sort-dropdown"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="recent">최신순</option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="item-card">
            <img src={img_default} alt="이미지 없음" />
            <h3 className="item-name">{product.name}</h3>
            <p className="item-price">{product.price.toLocaleString()}원</p>
            <div className="favorite-count">
              <img src={likeButton} alt="좋아요 버튼" />
              <p>240</p>
              {/* 좋아요가 api에 없으므로 하드코딩 */}
            </div>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pagination-bar-wrapper">
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
  );
};

export default ProductList;
