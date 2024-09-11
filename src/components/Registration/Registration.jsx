import React, { useState } from "react";
import Header from "../Default/Header";
import Footer from "../Default/Footer";

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
      <h2 className="registration">상품 등록하기</h2>
      <button className="product-register">등록</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          ></input>
        </div>
        <div>
          <label>상품 소개</label>
          <input
            type="textarea"
            placeholder="상품 소개를 입력해주세요"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label>판매가격</label>
          <input
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
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
    </>
  );
};

export default Registration;
