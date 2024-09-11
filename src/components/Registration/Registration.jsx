import React, { useState } from "react";
import "./Registration.css";

const Registration = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //refresh 방지
    alert("Product Registered Successfully!");
  };
  return (
    <>
      <main>
        <div className="registration-container">
          <h1 className="registration">상품 등록하기</h1>
          <button className="register-button">등록</button>
        </div>
        <form onSubmit={handleSubmit} className="product-contents-container">
          <div className="product-wrapper">
            <label>상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            ></input>
          </div>
          <div className="product-wrapper">
            <label>상품 소개</label>
            <input
              type="textarea"
              placeholder="상품 소개를 입력해주세요"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></input>
          </div>
          <div className="product-wrapper">
            <label>판매가격</label>
            <input
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="product-wrapper">
            <label>태그</label>
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            ></input>
          </div>
          {/* 태그를 엔터쳤을 때 아래에 #추가와 text를 띄워야함 */}
        </form>
      </main>
    </>
  );
};

export default Registration;
