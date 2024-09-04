import React, { useState, useEffect } from "react";
import likeButton from "../images/etc/likeButton.svg";
import axios from "axios";
import "./Product.css";
const PCITEMS = 10;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("recent"); //최신 순을 기본으로
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    fetchProducts(); //fetch함수로
  }, [currentPage, sortType]); //현재 페이지와 정렬에 따라 렌더링이 됨

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://panda-market-api.vercel.app/products",
        {
          params: {
            page: currentPage,
            limit: PCITEMS, //심화 요구사항 때 `${}` 로 변경 예정
            sort: sortType === "recent" ? "recent" : "favorite",
          },
        }
      );
      setProducts(response.data.list || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1); //정렬 변경 시 첫 페이지로 바뀜
  };

  const handleSearchChange = (e) => {
    setSearchContent(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="product-wrapper">
      {/* 베스트 상품 목록 */}
      <div className="best-product">
        <h2>베스트 상품</h2>
      </div>
      {/* //판매중 상품 목록 */}
      <div className="on-sale-product">
        <div className="search-sort-bar">
          <h2>판매 중인 상품</h2>
          <input
            className="search-input"
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchContent}
            onChange={handleSearchChange}
          />
          <button className="register-product">상품 등록하기</button>
          <select value={sortType} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.images} alt={product.name} />
              <div className="product-content">
                <h3>{product.name}</h3>
                <p>{product.price}원</p>

                <div className="like-wrapper">
                  <img src={likeButton} alt="좋아요 버튼" />
                  <p>240</p>
                  {/* 추후 변경해야함 좋아요 */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
