import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchApi } from "../../api/fetchApi";
import img_default from "../../images/etc/img_default.svg";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent"); // 좋아요 순 필요 없어서 useState를 사용해야하나..?

  const navigation = useNavigate(); // 상품 등록 이동 때 사용

  useEffect(() => {
    fetchProducts();
  }, [page, search]); //페이지, 검색으로 useEffect

  const fetchProducts = async () => {
    try {
      const response = await fetchApi("/products", {
        page,
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
    setPage(1);
  };

  const handleRegisterClick = () => {
    navigation("/registration");
  };
  return (
    <div>
      <h1>판매 중인 상품</h1>
      <input
        type="text"
        value={search}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleSearch}
      />
      <button onClick={handleRegisterClick}>상품 등록하기</button>
      <select value={sort}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요 순</option>
      </select>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={img_default} alt="이미지 없음" />
            <Link to={`/products/${product._id}`}>{product.name}</Link> - $
            {product.price}
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
