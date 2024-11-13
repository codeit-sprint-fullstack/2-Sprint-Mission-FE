import { useState, useEffect } from 'react';

export default function useValidateLoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (fieldName, value) => {
    let error = '';

    if (fieldName === 'email') {
      if (value.trim() === '') {
        error = '이메일을 입력해 주세요';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = '잘못된 이메일 형식입니다';
      }
    }

    if (fieldName === 'password') {
      if (value.trim() === '') {
        error = '비밀번호를 입력해 주세요';
      } else if (value.trim().length < 8) {
        error = '비밀번호를 8자 이상 입력해 주세요';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // 로그인 실패시 에러메시지를 클릭 후 포커스아웃만으로 사라지도록 추가
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => !error) &&
      loginData.email.trim() &&
      loginData.password.trim();

    setIsFormValid(isValid);
  }, [loginData, errors]);

  return {
    loginData,
    errors,
    handleChange,
    handleBlur,
    isFormValid,
    setErrors,
  };
}