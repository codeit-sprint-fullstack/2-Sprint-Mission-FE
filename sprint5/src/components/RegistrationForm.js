import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api'; // API 호출 함수
import '../css/RegistrationForm.css'; // CSS 파일

function RegistrationForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const tagArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const product = { name, description, price, tags: tagArray };
      const response = await createProduct(product);

      const productID = response.id;
      if (productID) {
        navigate(`/detail/${productID}`);
      } else {
        setError('상품 ID를 얻는 데 실패했습니다.');
      }
    } catch (err) {
      setError('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div className="add-bar">
          <h1>상품 등록하기</h1>
          <button type="submit">등록</button>
        </div>
        <div className="form-group">
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="상품명을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">상품 소개</label>
          <input
            id="description"
            value={description}
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">판매가격</label>
          <input
            type="number"
            id="price"
            value={price}
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">태그</label>
          <input
            id="tags"
            value={tags}
            placeholder="태그를 입력해주세요"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default RegistrationForm;
