import React from "react";
import "../style/ProductContent.css";

function ProductContent({ product, useDescription }) {
  return (
    <div className="productContent">
      <img src="/img/defaultImg.png" alt="상품 이미지" className="productImg" />
      <h1 className="productName">
        {useDescription ? product.description : product.name}
      </h1>
      <p className="productPrice">{product.price}원</p>
      <div className="favorite">
        <img src="/img/heart.png" alt="하트이미지" className="heartImg" />
        <p className="heartCount">{product.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ProductContent;
