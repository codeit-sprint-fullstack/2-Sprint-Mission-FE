import styles from "./ProductDetails.module.css";
import { fetchApi } from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import product_default from "@/images/etc/product_default.svg";
import selectImage from "@/images/board/select_img.svg";
import user from "@/images/board/profile_img.svg";
import heart_img from "@/images/board/heart_img.svg";

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("ko-KR", options);

  return formattedDate
    .replace(/\//g, " .")
    .replace(/\s/g, " ")
    .replace(/\.$/, "");
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
            <Image src={product_default} />
            <div className={styles.product_wrapper}>
              <div className={styles.product_title}>
                <h2>{product.name}</h2>
                <div>
                  <Image src={selectImage} />
                </div>
              </div>
              <h1>{product.price.toLocaleString()}원</h1>
              <div className={styles.divider_row}> </div>
              <div className={styles.product_inform}>
                <h5>상품소개</h5>
                <p>{product.description}</p>
                <h5>상품 태그</h5>
                <div className={styles.tags_container}>
                  {product.tags.map((tag, index) => (
                    <div key={index} className={styles.tag_box}>
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.user_inform}>
                <div className={styles.user_inform_wrapper}>
                  <Image src={user} width={40} height={40} alt="유저 이미지" />
                  <div className={styles.user_name}>
                    <h5>{product.ownerNickname}</h5>
                    <p>{formatDate(product.createdAt)}</p>
                  </div>
                </div>

                <div className={styles.like_container}>
                  <div className={styles.divider_col}></div>
                  <div className={styles.like_wrapper}>
                    <Image
                      src={heart_img}
                      width={32}
                      height={32}
                      alt="하트 이미지"
                    />
                    <div className={styles.like_count}>
                      {product.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>상품이 없습니다</p>
        )}
      </div>
    </>
  );
}
