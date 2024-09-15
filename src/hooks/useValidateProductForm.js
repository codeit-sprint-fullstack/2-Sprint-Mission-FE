import { useState, useEffect } from 'react';

function useValidateProductForm(initialData) {
  const [productData, setProductData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (fieldName, value) => {
    let error = '';

    if (fieldName === 'name') {
      if (!value.trim()) {
        error = '상품명은 필수 항목입니다.';
      } else if (value.length > 10) {
        error = '10자 이내로 입력해 주세요.';
      }
    }

    if (fieldName === 'description') {
      if (!value.trim()) {
        error = '상품 소개는 필수 항목입니다.';
      } else if (value.length < 10 || value.length > 100) {
        error = '10자 이상 100자 이내로 입력해 주세요.';
      }
    }

    if (fieldName === 'price') {
      if (!value.trim()) {
        error = '필수 항목입니다.';
      } else if (isNaN(Number(value))) {
        error = '숫자로 입력해 주세요.';
      }
    }

    if (fieldName === 'tags') {
      if (value.trim() && value.length > 5) {
        error = '5글자 이내로 입력해 주세요.';
      }
    }
  
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  useEffect(() => {
    // 전체 폼의 유효성 검사
    const isValid =
      !Object.values(errors).some(error => error) && 
      productData.name.trim() &&
      productData.description.trim() &&
      productData.price.trim(); 

    setIsFormValid(isValid);
  }, [productData, errors]);

  return {
    productData,
    setProductData,
    errors,
    handleBlur,
    isFormValid,
  };
}

export default useValidateProductForm;
