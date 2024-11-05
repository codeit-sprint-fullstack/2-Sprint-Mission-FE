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
      if (value.length < 10 || value.length > 100) {
        error = '10자 이상 100자 이내로 입력해 주세요.';
      }
    }

    if (fieldName === 'price') {
      if (!value.trim()) {
        error = '필수 항목입니다.';
      } else if (isNaN(Number(value)) || Number(value) <= 0) {
        error = '0보다 큰 숫자로 입력해 주세요.';
      }
    }

    if (fieldName === 'tags') {
      if (value.trim() && value.length > 5) {
        error = '5글자 이내로 입력해 주세요.';
      }
    }
  
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
  
    setProductData((prevData) => ({
      ...prevData,
      [name]: value, // productData 업데이트
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  

  useEffect(() => {
    const isValid =
      !Object.values(errors).some(error => error) &&
      productData.price && 
      productData.description.trim() &&
      productData.name.trim();

    setIsFormValid(isValid);
  }, [productData, errors]);

  return {
    productData,
    setProductData,
    errors,
    handleChange,
    isFormValid,
  };
}

export default useValidateProductForm;
