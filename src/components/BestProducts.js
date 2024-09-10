import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api";
import useAsync from "../hook/useAsync";
import styles from "./BestProducts.module.css";

function BestProductList({ item }) {
  return (
    <div className={styles.bestProduct}>
      <img className={styles.productImage} src={item.images} alt={item.name} />
      <div className={styles.productInfo}>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price}원</p>
        <p className={styles.favoriteCount}>♡ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

function BestProducts() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);
  const [width, setWidth] = useState(0);

  const handleLoad = useCallback(
    async (options) => {
      const result = await getProductsAsync(options);
      if (!result) return;

      const { list } = result;
      setItems(list);
    },
    [getProductsAsync]
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(width);

  useEffect(() => {
    if (width >= 1200) {
      setPageSize(4);
    } else if (width >= 744) {
      setPageSize(2);
    } else {
      setPageSize(1);
    }

    handleLoad({ orderBy: "favorite", page: 1, pageSize: pageSize });
  }, [pageSize, width, handleLoad]);

  return (
    <div className={styles.wrapper}>
      <h1>베스트 상품</h1>
      <div className={styles.bestProductList}>
        {items.map((item) => (
          <BestProductList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BestProducts;
