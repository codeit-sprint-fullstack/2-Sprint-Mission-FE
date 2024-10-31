import { useState } from 'react';

export default function useSignUpValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!values.email || !emailPattern.test(values.email)) {
      isValid = false;
      newError.email = '잘못된 이메일입니다.';
    }

    if (
      !values.nickname ||
      values.nickname.length < 1 ||
      values.nickname.length > 20
    ) {
      isValid = false;
      newError.nickname = '닉네임은 20자 이하로 입력해주세요.';
    }

    if (
      !values.password ||
      values.password.length < 8 ||
      values.password.length > 100
    ) {
      isValid = false;
      newError.password = '비밀번호를 8자 이상 입력해주세요.';
    }

    if (
      !values.passwordConfirmation ||
      values.passwordConfirmation.length < 8 ||
      values.passwordConfirmation.length > 100
    ) {
      isValid = false;
      newError.passwordConfirmation = '비밀번호 확인을 8자 이상 입력해주세요.';
    } else if (values.passwordConfirmation !== values.password) {
      isValid = false;
      newError.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value
    });
  };

  return {
    values,
    errors,
    validate,
    handleChange
  };
}
