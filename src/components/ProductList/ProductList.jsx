import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../api/itemInstance";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    fetchProducts();
  }, [page, sort, search]); //페이지, 정렬, 검색으로 useEffect

  const fetchProducts = () => {
    fetchApi("/products", { page, limit, sort, search })
      .then((response) => {
        setProducts(response.products);
        setTotalPages(response.totalPages);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSearch = (e) => {
    //검색
    setSearch(e.target.value);
    setPage(1);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        value={search}
        placeholder="Search products..."
        onChange={handleSearch}
      />
      <select value={sort} onChange={handleSortChange}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요 순</option> 
      </select>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
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
