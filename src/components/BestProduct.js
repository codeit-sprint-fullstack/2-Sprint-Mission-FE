import React, { useState, useEffect } from "react";
import axios from "axios";
import likeButton from "../images/etc/likeButton.svg";
import nonImage from "../images/etc/nonImage.svg";
import "../css/BestProduct.css";

const PCBEST = 4;

const BestProduct = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);

  // 베스트 상품 목록 가져오기
  useEffect(() => {
    bestFetchProducts();
  }, []);

  const bestFetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://panda-market-api.vercel.app/products",
        {
          params: {
            limit: PCBEST,
            sort: "favorite",
          },
        }
      );
      const products = response.data.list || [];
      products.sort((a, b) => b.favoriteCount - a.favoriteCount); // favoriteCount 기준으로 내림차순 정렬
      setBestProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setDisplayCount(1); // 모바일: 1개
      } else if (width <= 1199) {
        setDisplayCount(2); // 태블릿: 2개
      } else {
        setDisplayCount(4); // PC: 4개
      }
    };
    // 초기화 및 리사이즈 이벤트 리스너 추가
    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

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
        <div
          className="product-list"
          style={{ gridTemplateColumns: `repeat(${displayCount}, 1fr)` }}
        >
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
