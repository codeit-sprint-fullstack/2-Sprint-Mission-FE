import { useState, useEffect } from "react";
import { postProduct } from "../api.js";
import "./Register.css";
import closeIcon from "../assets/ic_X.png";

// Custom Hook for validation
function useValidation(value, validations) {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    for (const validation of validations) {
      const { rule, message } = validation;
      if (!rule(value)) {
        setIsValid(false);
        setError(message);
        return;
      }
    }
    setIsValid(true);
    setError("");
  }, [value, validations]);

  return { isValid, error };
}

export default function Register() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // Validation Rules
  const productNameValidation = useValidation(productName, [
    { rule: (value) => value.length >= 1 && value.length <= 10, message: "상품명은 1자 이상, 10자 이내여야 합니다." },
  ]);
  const descriptionValidation = useValidation(description, [
    {
      rule: (value) => value.length >= 10 && value.length <= 100,
      message: "상품 소개는 10자 이상, 100자 이내여야 합니다.",
    },
  ]);
  const priceValidation = useValidation(price, [
    { rule: (value) => value.length >= 1 && !isNaN(value), message: "판매 가격은 숫자로 입력해주세요." },
  ]);
  const tagValidation = useValidation(tag, [
    { rule: (value) => value.length <= 5, message: "태그는 5자 이내여야 합니다." },
  ]);

  function createProduct() {
    // price 값을 숫자로 변환
    const numericPrice = Number(price);

    postProduct(productName, description, numericPrice, tags).then((newProduct) => {
      console.log(newProduct);
      return newProduct;
    });
  }

  const handleSendRequest = (e) => {
    return createProduct();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagValidation.isValid && tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  useEffect(() => {
    if (productNameValidation.isValid && descriptionValidation.isValid && priceValidation.isValid && tags.length > 0) {
      setIsActive(true); // 모든 값이 유효하면 버튼 활성화
    } else {
      setIsActive(false); // 값이 하나라도 유효하지 않으면 비활성화
    }
  }, [productNameValidation, descriptionValidation, priceValidation, tags]);

  return (
    <div className="container">
      <section>
        <div className="headerButton">
          <h1 className="header">상품 등록하기</h1>
          <button onClick={handleSendRequest} className={isActive ? "active" : ""}>
            등록
          </button>
        </div>
        <form className="registerForm">
          <div className="inputBlock">
            <label className="inputHeader" htmlFor="productName">
              상품명
            </label>
            <div className={`inputGreyBox ${!productNameValidation.isValid && "error"}`}>
              <input
                onChange={(e) => setProductName(e.target.value)}
                id="productName"
                type="text"
                placeholder="상품명을 입력해주세요"
                value={productName}
              />
            </div>
            {!productNameValidation.isValid && <p className="errorText">{productNameValidation.error}</p>}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="productDescription">
              상품 소개
            </label>
            <div className={`inputGreyBox ${!descriptionValidation.isValid && "error"}`}>
              <input
                onChange={(e) => setDescription(e.target.value)}
                id="productDescription"
                type="text"
                placeholder="상품 소개를 입력해주세요"
                value={description}
              />
            </div>
            {!descriptionValidation.isValid && <p className="errorText">{descriptionValidation.error}</p>}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="price">
              판매 가격
            </label>
            <div className={`inputGreyBox ${!priceValidation.isValid && "error"}`}>
              <input
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                type="text"
                placeholder="판매 가격을 입력해주세요"
                value={price}
              />
            </div>
            {!priceValidation.isValid && <p className="errorText">{priceValidation.error}</p>}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="tag">
              태그
            </label>
            <div className={`inputGreyBox ${!tagValidation.isValid && "error"}`}>
              <input
                onChange={(e) => setTag(e.target.value)}
                onKeyPress={handleAddTag}
                id="tag"
                type="text"
                placeholder="태그를 입력 후 Enter를 누르세요"
                value={tag}
              />
            </div>
            {!tagValidation.isValid && <p className="errorText">{tagValidation.error}</p>}
            <div className="tags">
              {tags.map((t, index) => (
                <div className="tagsContainer" key={index}>
                  <span className="tagChip">#{t}</span>
                  <img src={closeIcon} alt="close" />
                </div>
              ))}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
