import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/ProductService";
import styles from "./ProductDetailPage.module.css";
  
function ProductDetailpage() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const ProductData = await getProduct(id);
        setProduct(ProductData);
      } catch (error) {
        setError('상품 정보를 불러오는 데 실패했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!product) {
    return <p className={styles.noProduct}>해당 상품 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>상품 상세 페이지</h1>
      <p className={styles.productInfo}>상품 ID: {product.id}</p>
      <p className={styles.productInfo}>상품명: {product.name}</p>
      <p className={styles.productInfo}>상품소개: {product.description}</p>
      <p className={styles.productInfo}>판매가격: {product.price}</p>
      <p className={styles.productInfo}>태그: {product.tags.join(", ")}</p>
    </div>
  );
}

export default ProductDetailpage;