import { useState, useEffect, useCallback } from 'react';

export default function useValidateSignupForm() {
  const [signupData, setSignupData] = useState({
    email: '',
    nick: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    nick: '',
    password: '',
    passwordConfirm: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback((fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'email':
        if (value.trim() === '') {
          error = '이메일을 입력해 주세요';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = '잘못된 이메일 형식입니다';
        }
        break;
      case 'nick':
        if (value.trim() === '') {
          error = '닉네임을 입력해 주세요';
        }
        break;
      case 'password':
        if (value.trim() === '') {
          error = '비밀번호를 입력해 주세요';
        } else if (value.trim().length < 8) {
          error = '비밀번호를 8자 이상 입력해 주세요';
        }
        break;
      case 'passwordConfirm':
        if (value.trim() === '') {
          error = '비밀번호를 다시 한 번 입력해 주세요';
        } else if (value !== signupData.password) {
          error = '비밀번호가 일치하지 않습니다';
        }
        break;
      default:
        break;
    }

    return error;
  }, [signupData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  /***************************************************************/
  // password와 passwordConfirm을 정상적으로 일치하게 입력한 후, //
  // password를 변경하면 에러메시지 출력하기 위해 추가함.        //
  /***************************************************************/
  useEffect(() => {
    if (signupData.passwordConfirm) {
      const confirmError = validateField('passwordConfirm', signupData.passwordConfirm);
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: confirmError }));
    }
  }, [signupData.password, signupData.passwordConfirm, validateField]);

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => !error) &&
      signupData.email &&
      signupData.nick &&
      signupData.password &&
      signupData.passwordConfirm === signupData.password;

    setIsFormValid(isValid);
  }, [signupData, errors]);

  return {
    signupData,
    errors,
    handleChange,
    isFormValid,
  };
}
