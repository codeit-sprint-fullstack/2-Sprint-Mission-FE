import { useState, useEffect } from "react";
import { postProduct } from "../api.js";
import "./Register.css";
import closeIcon from "../assets/ic_X.png";

// 유효성 검사를 위한 hook
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
  const [touched, setTouched] = useState({
    productName: false,
    description: false,
    price: false,
    tag: false,
  });

  function createProduct() {
    const numericPrice = Number(price);

    postProduct(productName, description, numericPrice, tags)
      .then((newProduct) => {
        console.log(newProduct);
        window.location.href = `/product-detail/${newProduct.id}`;
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  }

  const productNameValidation = useValidation(productName, [
    { rule: (value) => value.length >= 1 && value.length <= 10, message: "10자 이내로 입력해주세요" },
  ]);
  const descriptionValidation = useValidation(description, [
    {
      rule: (value) => value.length >= 10 && value.length <= 100,
      message: "10자 이상 입력해주세요.",
    },
  ]);
  const priceValidation = useValidation(price, [
    { rule: (value) => value.length >= 1 && !isNaN(value), message: "숫자로 입력해주세요." },
  ]);
  const tagValidation = useValidation(tag, [
    { rule: (value) => value.length <= 5, message: "5글자 이내로 입력해주세요." },
  ]);

  const handleSendRequest = (e) => {
    e.preventDefault();
    return createProduct();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagValidation.isValid && tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  useEffect(() => {
    if (productNameValidation.isValid && descriptionValidation.isValid && priceValidation.isValid && tags.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
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
            <div className={`inputGreyBox ${!productNameValidation.isValid && touched.productName && "error"}`}>
              <input
                onChange={(e) => setProductName(e.target.value)}
                onBlur={() => handleBlur("productName")} // Mark as touched
                id="productName"
                type="text"
                placeholder="상품명을 입력해주세요"
                value={productName}
              />
            </div>
            {!productNameValidation.isValid && touched.productName && (
              <p className="errorText">{productNameValidation.error}</p>
            )}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="productDescription">
              상품 소개
            </label>
            <div className={`inputGreyBox ${!descriptionValidation.isValid && touched.description && "error"}`}>
              <input
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                id="productDescription"
                type="text"
                placeholder="상품 소개를 입력해주세요"
                value={description}
              />
            </div>
            {!descriptionValidation.isValid && touched.description && (
              <p className="errorText">{descriptionValidation.error}</p>
            )}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="price">
              판매 가격
            </label>
            <div className={`inputGreyBox ${!priceValidation.isValid && touched.price && "error"}`}>
              <input
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => handleBlur("price")}
                id="price"
                type="text"
                placeholder="판매 가격을 입력해주세요"
                value={price}
              />
            </div>
            {!priceValidation.isValid && touched.price && <p className="errorText">{priceValidation.error}</p>}
          </div>

          <div className="inputBlock">
            <label className="inputHeader" htmlFor="tag">
              태그
            </label>
            <div className={`inputGreyBox ${!tagValidation.isValid && touched.tag && "error"}`}>
              <input
                onChange={(e) => setTag(e.target.value)}
                onKeyPress={handleAddTag}
                onBlur={() => handleBlur("tag")}
                id="tag"
                type="text"
                placeholder="태그를 입력 후 Enter를 누르세요"
                value={tag}
              />
            </div>
            {!tagValidation.isValid && touched.tag && <p className="errorText">{tagValidation.error}</p>}
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
