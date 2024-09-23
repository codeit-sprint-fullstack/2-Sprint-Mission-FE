import React from "react";
import { useState } from "react";
import "../style/RegistrationPage.css";

function RegistrationPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.length <= 5) {
      e.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const formValidation = () => {
    return itemName && itemDescription && itemPrice && tags.length > 0;
  };

  return (
    <div className="register">
      <div className="register1">
        <div className="registerTitle">상품 등록하기</div>
        <button className="registerButton" disabled={!formValidation()}>
          등록
        </button>
      </div>
      <div className="register2">
        <div className="itemName">상품명</div>
        <input
          className="itemNameInput"
          type="text"
          placeholder="상품명을 입력해주세요"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        ></input>
      </div>
      <div className="register3">
        <div className="itemDescription">상품 소개</div>
        <textarea
          className="itemDescriptionInput"
          type="text"
          placeholder="상품 소개를 입력해주세요"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="register4">
        <div className="itemPrice">판매 가격</div>
        <input
          className="itemPriceInput"
          type="text"
          placeholder="판매 가격을 입력해주세요"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        ></input>
      </div>
      <div className="register5">
        <div className="tag">태그</div>
        <input
          className="tagInput"
          type="text"
          placeholder="태그를 입력해주세요"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
        ></input>
        <div className="tagList">
          {tags.map((tag, index) => (
            <div key={index} className="tagChip">
              <div className="tagText">#{tag}</div>
              <button
                className="deleteButton"
                onClick={() => handleTagDelete(index)}
              >
                <img src="/img/xImg.png" alt="x" className="xImg" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
