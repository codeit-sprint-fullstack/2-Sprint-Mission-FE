import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api'; // API 호출 함수
import '../css/RegistrationForm.css'; // CSS 파일
import Tags from './Tags';
import useValidate from '../hooks/useValidate';

export default function RegistrationForm() {
  const { values, errors, handleChange, validate } = useValidate({
    name: '',
    description: '',
    price: ''
  });

  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isInputEmpty = () => {
    return (
      values.name.trim() !== '' &&
      values.description.trim() !== '' &&
      values.price.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const product = { ...values, tags };
      const response = await createProduct(product);

      const productID = response.id;
      if (productID) {
        navigate(`/detail/${productID}`);
      } else {
        setError('상품 ID를 얻는 데 실패했습니다.');
      }
    } catch (error) {
      setError('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div className="add-bar">
          <h1>상품 등록하기</h1>
          <button type="submit" disabled={!isInputEmpty()}>
            등록
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            style={{
              borderColor: errors.name ? 'red' : '',
              border: `1px solid ${errors.name ? 'red' : ''}`
            }}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">상품 소개</label>
          <textarea
            id="description"
            value={values.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
            style={{
              borderColor: errors.description ? 'red' : '',
              border: `1px solid ${errors.description ? 'red' : ''}`
            }}
          />
          {errors.description && (
            <div className="error-message">{errors.description}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">판매가격</label>
          <input
            type="number"
            id="price"
            value={values.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해주세요"
            style={{
              borderColor: errors.price ? 'red' : '',
              border: `1px solid ${errors.price ? 'red' : ''}`
            }}
          />
          {errors.price && <div className="error-message">{errors.price}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="tags">태그</label>
          <Tags tags={tags} setTags={setTags} />
          {errors.tags && <div className="error-message">{errors.tags}</div>}
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
