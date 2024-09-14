import { useState } from "react";
import "../css/RegisterPage.css";
import { initialProductData, validationCheck, submitProductData } from "../utils/Register";

export default function RegisterPage() {
  const [productData, setProductData] = useState(initialProductData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedProductData = {
      ...productData,
      [name]: value,
    };
    setProductData(updatedProductData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validationCheck(productData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
        await submitProductData(productData);
        alert("상품이 등록되었습니다.");
        setProductData(initialProductData);
    } catch(e) {
        alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className="register-body">
      <div className="registration-top">
        <p className="registration-top-title">상품 등록하기</p>
        <button
          className="registration-top-button"
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          등록
        </button>
      </div>
      <div className="register-form">
        <div className="form-section">
          <label htmlFor="product-name" className="registration-title">
            상품명
          </label>
          <textarea
            name="name"
            className={`register-input-form ${errors.name ? 'error' : ''}`}
            placeholder="상품명을 입력해주세요"
            id="product-name"
            value={productData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-section">
          <label htmlFor="product-description" className="registration-title">
            상품 소개
          </label>
          <textarea
            name="description"
            className={`register-description-input ${errors.description ? 'error' : ''}`}
            placeholder="상품 소개를 입력해주세요"
            id="product-description"
            value={productData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
          </div>
        <div className="form-section">
          <label htmlFor="product-price" className="registration-title">
            판매 가격
          </label>
          <textarea
            name="price"
            className={`register-input-form ${errors.price ? 'error' : ''}`}
            placeholder="판매 가격을 입력해주세요"
            id="product-price"
            value={productData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="form-error">{errors.price}</p>}
          </div>
        <div className="form-section">
          <label htmlFor="product-tags" className="registration-title">
            태그
          </label>
          <textarea
            name="tags"
            className={`register-input-form ${errors.tags ? 'error' : ''}`}
            placeholder="태그를 입력해주세요"
            id="product-tags"
            value={productData.tags}
            onChange={handleInputChange}
          />
          {errors.tags && <p className="form-error">{errors.tags}</p>}
          </div>
      </div>
    </div>
  );
}
