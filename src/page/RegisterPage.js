import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/RegisterPage.css";
import { initialProductData, validationCheck, submitProductData } from "../utils/Register";
import X from "../assets/img/ic_X.png";

export default function RegisterPage() {
  const [productData, setProductData] = useState(initialProductData);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedProductData = {
      ...productData,
      [name]: value,
    };
    setProductData(updatedProductData);

    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validationCheck(productData);
    console.log("Validation Errors:", validationErrors); 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
        const response = await submitProductData(productData);
        alert("상품이 등록되었습니다.");
        setProductData(initialProductData);
        navigate(`/items/${response._id}`);
       console.log(response);
    } catch (e) {
        alert("상품 등록에 실패했습니다.");
        console.log(e);
    }
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setProductData((prevData) => ({
        ...prevData,
        tags: [...(prevData.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setProductData((prevData) => ({
      ...prevData,
      tags: (prevData.tags || []).filter((_, t) => t !== tag),
    }));
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
          <input
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
          <input
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
          <div className='tags-input'>
            <input
              name='tags'
              className={`register-input-form ${errors.tags ? 'error' : ''}`}
              placeholder="태그를 입력해주세요"
              id="product-tags"
              value={tagInput}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
            />
            <div className='tags-container'>
              {(productData.tags || []).map((tag, index) => (
                <div key={index} className="tag-chip">
                  # {tag}
                  <img className="tag-remove" onClick={() => handleTagRemove(index)} src={X} alt='delete' />
                </div>
                ))}
            </div>
          </div>
          {errors.tags && <p className="form-error">{errors.tags}</p>}
          </div>
      </div>
    </div>
  );
}
