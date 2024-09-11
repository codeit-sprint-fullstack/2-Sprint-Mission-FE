import React, { useEffect, useState, useCallback } from "react";
import ProductContent from "./ProductContent";
import "../style/SaleProduct.css";

function SaleProduct() {
  const [saleProduct, setSaleProduct] = useState({ list: [] });
  const [order, setOrder] = useState("createdAt");
  const [searchProduct, setSearchProduct] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const sortSaleProduct = (list, order) => {
    if (order === "favoriteCount") {
      return list.sort((a, b) => b.favoriteCount - a.favoriteCount);
    } else {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const fetchSaleProduct = useCallback(
    async (order = "", searchProduct = "") => {
      const query = `sort=${order}&search=${searchProduct}`;
      const response = await fetch(
        `https://panda-market-api.vercel.app/products?${query}`
      );
      const data = await response.json();

      const sortedData = {
        ...data,
        list: sortSaleProduct(data.list, order),
      };

      setSaleProduct(sortedData);
    },
    []
  );

  const handleSearch = (e) => setSearchProduct(e.target.value);
  const toggleOption = () => setOpen(!open);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
    if (option === "최신순") {
      setOrder("createdAt");
    } else if (option === "좋아요순") {
      setOrder("favoriteCount");
    }
  };

  useEffect(() => {
    fetchSaleProduct(order, searchProduct);
  }, [order, searchProduct]);

  return (
    <div>
      <div className="saleBar">
        <h2 className="sale">판매중인 상품</h2>
        <div className="searchBar">
          <img src="/img/search.png" alt="검색 아이콘" className="searchImg" />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchProduct}
            onChange={handleSearch}
            className="searchInput"
          />
        </div>
        <button className="productRegistrationButton">상품 등록하기</button>
        <div className={`toggle ${open ? "open" : ""}`}>
          <button onClick={toggleOption} className="toggleButton">
            {selectedOption}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;▼</span>
          </button>
          {open && (
            <ul className="toggleOption">
              <li
                onClick={() => handleOptionClick("최신순")}
                className="createAt"
              >
                최신순
              </li>
              <li
                onClick={() => handleOptionClick("좋아요순")}
                className="favoriteCount"
              >
                좋아요순
              </li>
            </ul>
          )}
        </div>
      </div>
      <div>
        {saleProduct.list.map((product) => (
          <ProductContent
            key={product.id}
            product={product}
            useDescription={true}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default SaleProduct;
