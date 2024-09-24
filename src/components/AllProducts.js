import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api";
import useAsync from "../hook/useAsync";
import styles from "./AllProducts.module.css";
import defaultImage from "../assets/default-image.png";
import createButton from './Button';
import { useViewport } from '../contexts/viewportContext';
import { NavLink } from 'react-router-dom';

function AllProductList({ item }) {
  return (
    <div className={styles.allProduct}>
      <img className={styles.productImage} 
      src={item.images ? item.images : defaultImage} 
      alt={item.name} />
      <div className={styles.productInfo}>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price.toLocaleString()}원</p>
        <p className={styles.favoriteCount}>♡ {item.favoriteCount || 0}</p>
      </div>
    </div>
  );
}

const pageSizeTable = Object.freeze({
  desktop: 10,
  tablet: 6,
  mobile: 4
})

const RegistrationPageButton = createButton({
  style: "btn_small_40"
})

function AllProducts() {
  const viewport = useViewport();
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeTable[`${viewport}`]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);

  const handleLoad = useCallback(
    async (options) => {
      const result = await getProductsAsync(options);
      if (!result) return;

      const { products, totalCount } = result;
      setItems(products);
      setPage(options.page);
      const pages = Math.ceil(totalCount / options.pageSize);
      setTotalPages(pages);
    }, [getProductsAsync]
  );

  const handleChange = (e) => {
    setPage(1);
    if (e.target.value === "createdAt") {
      setOrder("-createdAt");
    } else {
      setOrder("-favoriteCount");
    }
  };

  const startPage =
    page < totalPages - 1 ? Math.max(1, page - 2) : totalPages - 4;
  const endPage = startPage + 4;
  const pagination = [];
  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  };

  useEffect(() => {
    setPageSize(pageSizeTable[`${viewport}`]);
  }, [viewport]);

  useEffect(() => {
    if (pageSize > 0) {
      handleLoad({ orderBy: order, page: page, pageSize: pageSize });
    }
  }, [order, page, pageSize, handleLoad]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.menus}>
        <p className={styles.title}>판매 중인 상품</p>
        <input className={styles.itemSearchInput} placeholder="      검색할 상품을 입력해주세요" />
        <NavLink to={"/registration"}>
          <RegistrationPageButton>상품 등록하기</RegistrationPageButton>
        </NavLink>
        <select onChange={handleChange}>
          <option value="createdAt">최신순</option>
          <option value="favoriteCount">좋아요순</option>
        </select>
      </div>
      <div className={styles.allProductList}>
        {items.map((item) => (
          <AllProductList key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {pagination.map((num) => (
          <button
            className={`${page === num ? styles.active : ""}`}
            key={num}
            onClick={() => setPage(num)}
            disabled={num === page}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
