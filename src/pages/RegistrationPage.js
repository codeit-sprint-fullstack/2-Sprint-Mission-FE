import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api.js";
import useValidation from "../hooks/useRegistrationValidation.js";
import "../style/RegistrationPage.css";

function RegistrationPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const [touchedFields, setTouchedFields] = useState({
    itemName: false,
    itemDescription: false,
    itemPrice: false,
    tagInput: false,
  });

  const { errors, validate } = useValidation(
    itemName,
    itemDescription,
    itemPrice,
    tagInput
  );

  //tag
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

  //submit
  const handleSubmit = async () => {
    if (!validate()) return;

    const response = await createProduct(
      itemName,
      itemDescription,
      itemPrice,
      tags,
      []
    );

    navigate(`/products/${response._id}`);
  };

  //field touch
  const handleFieldTouch = (field) => {
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  return (
    <div className="register">
      <div className="register1">
        <div className="registerTitle">상품 등록하기</div>
        <button
          className="registerButton"
          disabled={Object.values(errors).some((error) => error !== "")}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="register2">
        <div className="itemName">상품명</div>
        <input
          className={`itemNameInput ${
            errors.itemName && touchedFields.itemName ? "error" : ""
          }`}
          type="text"
          placeholder="상품명을 입력해주세요"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            handleFieldTouch("itemName");
          }}
        ></input>
        {errors.itemName && touchedFields.itemName && (
          <div className="errorMessage">{errors.itemName}</div>
        )}
      </div>

      <div className="register3">
        <div className="itemDescription">상품 소개</div>
        <textarea
          className={`itemDescriptionInput ${
            errors.itemDescription && touchedFields.itemDescription
              ? "error"
              : ""
          }`}
          placeholder="상품 소개를 입력해주세요"
          value={itemDescription}
          onChange={(e) => {
            setItemDescription(e.target.value);
            handleFieldTouch("itemDescription");
          }}
        ></textarea>
        {errors.itemDescription && touchedFields.itemDescription && (
          <div className="errorMessage">{errors.itemDescription}</div>
        )}
      </div>

      <div className="register4">
        <div className="itemPrice">판매 가격</div>
        <input
          className={`itemPriceInput ${
            errors.itemPrice && touchedFields.itemPrice ? "error" : ""
          }`}
          type="text"
          placeholder="판매 가격을 입력해주세요"
          value={itemPrice}
          onChange={(e) => {
            setItemPrice(e.target.value);
            handleFieldTouch("itemPrice");
          }}
        ></input>
        {errors.itemPrice && touchedFields.itemPrice && (
          <div className="errorMessage">{errors.itemPrice}</div>
        )}
      </div>

      <div className="register5">
        <div className="tag">태그</div>
        <input
          className={`tagInput ${
            errors.tagInput && touchedFields.tagInput ? "error" : ""
          }`}
          type="text"
          placeholder="태그를 입력해주세요"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            handleFieldTouch("tagInput");
          }}
          onKeyDown={handleTagInput}
        ></input>
        {errors.tagInput && touchedFields.tagInput && (
          <div className="errorMessage">{errors.tagInput}</div>
        )}
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
