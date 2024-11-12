import { useState } from 'react';

export default function useLoginValidate(initialValues) {
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
      !values.password ||
      values.password.length < 8 ||
      values.password.length > 100
    ) {
      isValid = false;
      newError.password = '비밀번호를 8자 이상 입력해주세요.';
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
