import React, { useState, useEffect } from "react";
import { getProducts } from "./api.js";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Products from "./components/Products.js";
import BestProducts from "./components/BestProducts.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [best, setBest] = useState([]);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1); // 현재 페이지 수
  const [value, setValue] = useState(""); //input 태그에 사용될 값

  const sortedItem = items.sort((a, b) => {
    if (order === "createdAt") return new Date(b.createdAt) - new Date(a.createdAt); //날짜 형식으로 변환
    return b[order] - a[order];
  });
  const handleNewestClick = () => {
    return setOrder("createdAt");
  };
  const handleBestClick = () => {
    return setOrder("favoriteCount");
  };

  const handleLoad = async () => {
    try {
      const products = await getProducts();
      setItems(products);
      // Best Items 4개만 보이게 만들기
      const bestProducts = [...products].sort((a, b) => b.favoriteCount - a.favoriteCount);
      const topBestProducts = bestProducts.slice(0, 4);
      setBest(topBestProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const itemsPerpage = 10; //한 페이지당 보여질 제품 수
  const totalPages = Math.ceil(items.length / itemsPerpage); //보여질 페이지 버튼의 수
  const indexOfLastItem = page * itemsPerpage; // 한 페이지에서 마지막 제품의 index
  const indexOfFirstItem = indexOfLastItem - itemsPerpage; // 첫번째 제품의 index
  const currentItem = sortedItem.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Nav />
      <div className="container">
        <BestProducts items={best} />
        <div className="productsTool">
          <h1 className="header">판매 중인 상품</h1>
          <div id="searchAndSort">
            <input id="searchBar" type="text" value={value} placeholder="제품명을 입력해주세요" onChange={setValue} />
            <button id="addProduct">상품 등록하기</button>
            <div className="selectBox">
              <select id="selectOrder">
                <option onClick={handleNewestClick} className="itemOrder" value="최신순">
                  최신순
                </option>
                <option onClick={handleBestClick} className="itemOrder" value="좋아요순">
                  좋아요순
                </option>
              </select>
            </div>
          </div>
        </div>
        <Products items={currentItem} />
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
