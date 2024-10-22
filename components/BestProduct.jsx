import React, { useState, useEffect } from "react";
import { fetchApi } from "../api/axiosInstance";
import likeButton from "../images/etc/likeButton.svg";
import nonImage from "../images/etc/nonImage.svg";
import "../css/BestProduct.css";

const PCBEST = 4;
const TABLETBEST = 2;
const MOBILEBEST = 1;

const getPageSize = () => {
  const width = window.innerWidth;
  // 전체 상품의 반응형 그리드 설정
  if (width >= 1200) {
    return PCBEST;
  } else if (width >= 744) {
    return TABLETBEST;
  } else {
    return MOBILEBEST;
  }
};

const BestProduct = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  // 베스트 상품 목록 가져오기
  useEffect(() => {
    bestFetchProducts();
  }, []);

  const bestFetchProducts = async () => {
    try {
      const response = await fetchApi("/products", {
        limit: PCBEST,
        sort: "favorite",
      });

      let products = response.list || [];

      products.sort((a, b) => b.favoriteCount - a.favoriteCount); // favoriteCount 기준으로 내림차순 정렬
      setBestProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  //페이지 사이즈마다
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  //이미지가 없을 때
  const handleImageError = (e) => {
    e.target.src = nonImage; // 대체 이미지 경로
  };

  return (
    <div className="product-wrapper">
      <div className="best-product">
        <div className="best-product-title">
          <h2>베스트 상품</h2>
        </div>
        <div className="product-list">
          {bestProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.images[0] || nonImage}
                onError={handleImageError}
                alt={product.name}
              />
              <div className="product-content">
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()}원</p>
                <div className="like-wrapper">
                  <img src={likeButton} alt="좋아요 버튼" />
                  <p>{product.favoriteCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestProduct;
