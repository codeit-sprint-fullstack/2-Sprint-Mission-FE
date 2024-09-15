//input에 value 추가 필요

import { useState } from "react";
import { postProduct } from "../api.js";
import "./Register.css";

export default function Register() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [tag, setTag] = useState([]);

  function createProduct() {
    postProduct(productName, description, price, tag).then((newProduct) => {
      return newProduct;
    });
  }

  const handleSendRequest = (e) => {
    createProduct(e.target.value);
  };

  const handleAddProductName = (e) => {
    if (productName === "") {
      alert("이름을 지정해주세요");
    }
    setProductName(e.target.value);
  };

  const handleAddDescrption = (e) => {
    if (description === "") {
      alert("설명을 입력해주세요");
    }
    setDescription(e.target.value);
  };

  const handleAddPrice = (e) => {
    if (!price) {
      alert("가격입력해줘");
    }
    setPrice(e.target.value);
  };

  const handleAddTag = (e) => {
    const tagList = [...tag];
    if (tag.length === 0) {
      alert("가격입력해줘");
    }
    tagList.push(e.target.value);

    setTag(tagList);
  };

  return (
    <section>
      <div className="headerButton">
        <h1 className="header">상품 등록하기</h1>
        <button onClick={handleSendRequest}>등록</button>
      </div>
      <form className="registerForm">
        <div className="inputBlock">
          <label className="inputHeader" for="producTitle">
            상품명
          </label>
          <input
            onBlur={handleAddProductName}
            id="producTitle"
            type="text"
            placeholder="상품명을 입력해주세요"
            value={productName}
          />
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="productDescription">
            상품 소개
          </label>
          <input
            onBlur={handleAddDescrption}
            id="productDescription"
            type="text"
            placeholder="상품 소개를 입력해주세요"
            value={description}
          />
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="price">
            판매가격
          </label>
          <input onBlur={handleAddPrice} id="price" type="text" placeholder="판매 가격을 입력해주세요" value={price} />
        </div>
        <div className="inputBlock">
          <label className="inputHeader" for="tag">
            태그
          </label>
          <input onBlur={handleAddTag} id="tag" type="text" placeholder="태그를 입력해주세요" value={tag} />
        </div>
      </form>
    </section>
  );
}
