import styles from '../css/RegistrationForm.module.css';
import Tags from './Tags';
import useValidate from '../hooks/useValidate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../lib/api';

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.bar}>
          <h1 className={styles.title}>상품 등록하기</h1>
          <button
            type="submit"
            disabled={!isInputEmpty()}
            className={styles.add}
          >
            등록
          </button>
        </div>
        <div className={styles.form}>
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            style={{ border: errors.name ? '1px solid red' : 'none' }}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div className={styles.form}>
          <label htmlFor="description">상품 소개</label>
          <textarea
            id="description"
            value={values.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
            style={{ border: errors.description ? '1px solid red' : 'none' }}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>
        <div className={styles.form}>
          <label htmlFor="price">판매가격</label>
          <input
            type="text"
            id="price"
            value={values.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해주세요"
            style={{ border: errors.price ? '1px solid red' : 'none' }}
          />
          {errors.price && <div className={styles.error}>{errors.price}</div>}
        </div>
        <div className={styles.form}>
          <label htmlFor="tags">태그</label>
          <Tags tags={tags} setTags={setTags} />
          {errors.tags && <div className={styles.error}>{errors.tags}</div>}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
