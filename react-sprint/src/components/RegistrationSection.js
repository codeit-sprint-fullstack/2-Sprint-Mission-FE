import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationSection.css";

export default function RegistrationSection() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTags, setProductTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tags: productTags,
    };

    try {
      const response = await fetch(
        "https://two-sprint-mission-be-ss9z.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        navigate(`/registration/${result._id}`);
      } else {
        console.log("상품 등록에 실패했습니다.");
      }
    } catch (err) {
      console.log("에러 발생", err);
    }
  };

  return (
    <section className="registerSection">
      <form onSubmit={handleSubmit} className="registerForm">
        <label className="registerLabel" id="register">
          <h2>상품 등록하기</h2>
          <button>등록</button>
        </label>
        <label className="registerLabel">
          <h3>상품명</h3>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="상품명을 입력해주세요"
          />
        </label>
        <label className="registerLabel">
          <h3>상품 소개</h3>
          <input
            id="introductionInput"
            type="text"
            name="prdocutIntroduction"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
          />
        </label>
        <label className="registerLabel">
          <h3>판매가격</h3>
          <input
            type="text"
            name="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
          />
        </label>
        <label className="registerLabel" id="tagLabel">
          <h3>태그</h3>
          <input
            type="text"
            name="productTage"
            value={productTags}
            onChange={(e) => setProductTags(e.target.value)}
            placeholder="태그를 입력해주세요"
          />
        </label>
      </form>
    </section>
  );
}
