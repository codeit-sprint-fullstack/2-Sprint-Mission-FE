import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ProductForm.module.css';
import useValidateProductForm from '@/hooks/useValidateProductForm';

export default function ProductForm({ initialData = {}, onSubmit, isEdit = false }) {
  const { productData, setProductData, errors, handleChange, isFormValid } = useValidateProductForm({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    tags: initialData.tags || [],
    images: initialData.images || [], 
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // 필요한 필드만 선택하여 payload 생성
    const payload = {
      images: productData.images || ["https://example.com/sample-image.jpg"],  // 기본 이미지 추가
      tags: productData.tags || [],
      price: parseFloat(productData.price) || 0, // 숫자형 변환
      description: productData.description || "",
      name: productData.name || "상품 이름"
    };
  
    try {
      await onSubmit(payload); // onSubmit으로 전달
    } catch (error) {
      console.error(error);
      alert('상품 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tagInput.trim().length > 5) {
        alert('태그는 5글자 이내로 입력해 주세요.');
        return;
      }
      setProductData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...productData.tags];
    updatedTags.splice(index, 1);
    setProductData({ ...productData, tags: updatedTags });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{isEdit ? '상품 수정하기' : '상품 등록하기'}</h2>
        <button
          type="submit"
          className={`${styles.submitBtn} ${isFormValid ? styles.active : ''}`}
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (isEdit ? '수정 중' : '등록 중') : (isEdit ? '수정' : '등록')}
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="name">*상품명</label>
        <input
          id="name"
          type="text"
          name="name"
          className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
          placeholder="상품명을 입력해 주세요"
          value={productData.name}
          onChange={handleChange}
          ref={nameInputRef}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

        <label className={styles.label} htmlFor="description">*상품 소개</label>
        <textarea
          id="description"
          name="description"
          className={`${styles.textarea} ${errors.description ? styles.errorInput : ''}`}
          placeholder="상품 소개를 입력해 주세요"
          value={productData.description}
          onChange={handleChange}
        />
        {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}

        <label className={styles.label} htmlFor="price">*판매가격</label>
        <input
          id="price"
          type="text"
          name="price"
          className={`${styles.input} ${errors.price ? styles.errorInput : ''}`}
          placeholder="판매 가격을 입력해 주세요"
          value={productData.price}
          onChange={handleChange}
        />
        {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}

        <label className={styles.label} htmlFor="tags">태그</label>
        <input
          id="tags"
          type="text"
          name="tags"
          className={`${styles.input} ${errors.tags ? styles.errorInput : ''}`}
          placeholder="태그를 입력해 주세요"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
        />
        {errors.tags && <p className={styles.errorMessage}>{errors.tags}</p>}
        
        <div className={styles.tags}>
          {productData.tags.map((tag, index) => (
            <div key={index} className={styles.tag}>
              {tag}
              <div className={styles.removeTagIconWrapper}>
                <Image
                  src="/images/items/ic_X.png"
                  alt="태그 제거"
                  fill
                  className={styles.removeTagButton}
                  onClick={() => handleRemoveTag(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
