import { useState } from 'react';

export default function useSignupValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function validate() {
    let isValid = true;
    let newErrors = {};

    if (!values.email || !emailPattern.test(values.email)) {
      isValid = false;
      newErrors.email = '잘못된 이메일입니다.';
    }

    if (
      !values.nickname ||
      values.nickname.length < 1 ||
      values.nickname.length > 10
    ) {
      isValid = false;
      newErrors.nickname = '닉네임은 10자 이하로 입력해주세요.';
    }

    if (!values.password || values.password.length < 8) {
      isValid = false;
      newErrors.password = '비밀번호를 8자 이상 입력해주세요.';
    }

    if (
      !values.passwordConfirmation &&
      values.passwordConfirmation !== values.password
    ) {
      isValid = false;
      newErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return isValid;
  }

  return { values, errors, validate, setValues };
}
