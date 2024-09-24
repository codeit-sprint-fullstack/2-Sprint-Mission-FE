import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductContent from "./ProductContent.js";
import Pagination from "./Pagination.js";
import useMediaQuery from "../hooks/useMediaQuery.js";
import { getProductList } from "../api.js";
import "../style/SaleProduct.css";

function SaleProduct() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useMediaQuery();
  const [saleProduct, setSaleProduct] = useState({
    products: [],
    totalCount: 0,
  });
  const [searchProduct, setSearchProduct] = useState("");
  const [order, setOrder] = useState("createdAt");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visibleProduct, setVisibleProduct] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMobile) setVisibleProduct(4);
    else if (isTablet) setVisibleProduct(6);
    else if (isDesktop) setVisibleProduct(10);
  }, [isMobile, isTablet, isDesktop]);

  // 검색 기능 코드
  const handleSearch = (e) => setSearchProduct(e.target.value);

  const filteredProducts = saleProduct.products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // 정렬 기능 코드
  const sortSaleProduct = useCallback((list, order) => {
    return [...list].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
    if (option === "최신순") {
      setOrder("createdAt");
    }
  };

  // 페이지 기능 코드
  useEffect(() => {
    setTotalPages(Math.ceil(saleProduct.totalCount / visibleProduct));
  }, [visibleProduct, saleProduct.totalCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const sortedProducts = sortSaleProduct(filteredProducts, order);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * visibleProduct,
    page * visibleProduct
  );

  const fetchSaleProduct = async (order = "", searchProduct = "", page = 1) => {
    setLoading(true);
    const params = {
      sort: order,
      keyword: searchProduct,
      page: page,
      pageSize: visibleProduct,
    };

    const data = await getProductList(params);

    if (data && data.products) {
      setSaleProduct(data);
      const totalProduct = data.totalCount;
      const totalPages = Math.ceil(totalProduct / visibleProduct);
      setTotalPages(totalPages);
    }
    setLoading(false);
  };

  // 검색, 정렬, 페이지 옵션이 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    fetchSaleProduct(order, searchProduct, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, searchProduct, page]);

  //return
  return (
    <div className="SaleProduct">
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
        <button
          className="productRegistrationButton"
          onClick={() => navigate("/registration")}
        >
          상품 등록하기
        </button>
        <div className={`toggle ${open ? "open" : ""}`}>
          <button onClick={() => setOpen(!open)} className="toggleButton">
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
            </ul>
          )}
        </div>
      </div>
      {loading ? (
        <div className="loadingMessage">Loading...</div>
      ) : (
        <div className="productGrid">
          {paginatedProducts.map((product) => (
            <ProductContent
              key={product._id}
              product={product}
              useDescription={true}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default SaleProduct;
