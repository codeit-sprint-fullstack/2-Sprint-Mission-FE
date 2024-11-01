import styles from "./ProductDetails.module.css";
import { fetchApi } from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";

const fetchProductDetail = async (id) => {
  if (id) {
    try {
      const data = await fetchApi(`/products/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetail = async () => {
      const productData = await fetchProductDetail(productId);
      setProduct(productData);
    };
    if (productId) {
      getProductDetail();
    }
  }, [productId]);

  return (
    <>
      <div className={styles.product_detail_container}>
        {product ? (
          <>
            <h2>{product.name}</h2>
          </>
        ) : (
          <p>상품이 없습니다</p>
        )}
      </div>
    </>
  );
}
