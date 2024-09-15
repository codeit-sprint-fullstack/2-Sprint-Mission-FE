//input에 value 추가 필요

import { useState, useEffect } from "react";
import { postProduct } from "../api.js";
import "./Register.css";

export default function Register() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [tag, setTag] = useState([]);
  const [isActive, setIsActive] = useState(false);

  function createProduct() {
    postProduct(productName, description, price, tag).then((newProduct) => {
      return newProduct;
    });
  }

  const handleSendRequest = (e) => {
    createProduct(e.target.value);
  };

  const handleAddProductName = (e) => {
    setProductName(e.target.value);
  };

  const handleAddDescrption = (e) => {
    setDescription(e.target.value);
  };

  const handleAddPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAddTag = (e) => {
    const tagList = [...tag];
    tagList.push(e.target.value);

    setTag(tagList);
  };

  useEffect(() => {
    if (productName && description && price && tag.length > 0) {
      setIsActive(true); // 모든 값이 입력되면 버튼 활성화
    } else {
      setIsActive(false); // 값이 하나라도 비어있으면 비활성화
    }
  }, [productName, description, price, tag]);

  return (
    <section>
      <div className="headerButton">
        <h1 className="header">상품 등록하기</h1>
        <button onClick={handleSendRequest} className={isActive ? "active" : ""}>
          등록
        </button>
      </div>
      <form className="registerForm">
        <div className="inputBlock">
          <label className="inputHeader" for="producTitle">
            상품명
          </label>
          <div className="inputGreyBox">
            <input
              onChange={handleAddProductName}
              id="producTitle"
              type="text"
              placeholder="상품명을 입력해주세요"
              value={productName}
            />
          </div>
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="productDescription">
            상품 소개
          </label>
          <div className="inputGreyBox" id="longForm">
            <input
              onChange={handleAddDescrption}
              id="productDescription"
              type="text"
              placeholder="상품 소개를 입력해주세요"
              value={description}
            />
          </div>
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="price">
            판매가격
          </label>
          <div className="inputGreyBox">
            <input
              onChange={handleAddPrice}
              id="price"
              type="text"
              placeholder="판매 가격을 입력해주세요"
              value={price}
            />
          </div>
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="tag">
            태그
          </label>
          <div className="inputGreyBox">
            <input onChange={handleAddTag} id="tag" type="text" placeholder="태그를 입력해주세요" value={tag} />
          </div>
        </div>
      </form>
    </section>
  );
}
