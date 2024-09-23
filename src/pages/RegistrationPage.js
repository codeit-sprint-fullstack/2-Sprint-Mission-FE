import React from "react";
import "../style/RegistrationPage.css";

function RegistrationPage() {
  return (
    <div className="register">
      <div className="register1">
        <div className="registerTitle">상품 등록하기</div>
        <button className="registerButton">등록</button>
      </div>
      <div className="register2">
        <div className="itemName">상품명</div>
        <input
          className="itemNameInput"
          type="text"
          placeholder="상품명을 입력해주세요"
        ></input>
      </div>
      <div className="register3">
        <div className="itemDescription">상품 소개</div>
        <input
          className="itemDescriptionInput"
          type="text"
          placeholder="상품 소개를 입력해주세요"
        ></input>
      </div>
      <div className="register4">
        <div className="itemPrice">판매 가격</div>
        <input
          className="itemPriceInput"
          type="text"
          placeholder="판매 가격을 입력해주세요"
        ></input>
      </div>
      <div className="register5">
        <div className="tag">태그</div>
        <input
          className="tagInput"
          type="text"
          placeholder="태그를 입력해주세요"
        ></input>
      </div>
    </div>
  );
}

export default RegistrationPage;
