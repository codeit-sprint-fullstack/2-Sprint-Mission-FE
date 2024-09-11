import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api";
import useAsync from "../hook/useAsync";
import styles from "./AllProducts.module.css";

function AllProductList({ item }) {
  return (
    <div className={styles.allProduct}>
      <img className={styles.productImage} src={item.images} alt={item.name} />
      <div className={styles.productInfo}>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price}원</p>
        <p className={styles.favoriteCount}>♡ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

function AllProducts() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);
  const [width, setWidth] = useState(0);

  const handleLoad = useCallback(
    async (options) => {
      const result = await getProductsAsync(options);
      if (!result) return;

      const { list, totalCount } = result;
      setItems(list);
      setPage(options.page);

      const pages = Math.ceil(totalCount / options.pageSize);
      setTotalPages(pages);
    },
    [getProductsAsync]
  );

  const handleChange = (e) => {
    setPage(1);
    if (e.target.value === "recent") {
      setOrder("recent");
    } else {
      setOrder("favorite");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const startPage =
    page < totalPages - 1 ? Math.max(1, page - 2) : totalPages - 4;
  const endPage = startPage + 4;
  const pagination = [];
  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width >= 1200) {
      setPageSize(10);
    } else if (width >= 744) {
      setPageSize(6);
    } else {
      setPageSize(4);
    }

    handleLoad({ orderBy: order, page: page, pageSize: pageSize });
  }, [order, page, pageSize, width, handleLoad]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.subTitle}>
        <h1>판매 중인 상품</h1>
        <div className={styles.subTitleMenus}>
          <form>
            <input placeholder="      검색할 상품을 입력해주세요" />
            <button className={styles.formButton} onClick={handleClick}>
              상품 등록하기
            </button>
          </form>
          <select onChange={handleChange}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
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
