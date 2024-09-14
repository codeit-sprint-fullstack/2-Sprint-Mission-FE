import { useState } from 'react';

export default function useValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      isValid = false;
      newError.name = '10자 이내로 입력해주세요';
    }

    if (
      !values.description ||
      values.description.length < 10 ||
      values.description.length > 100
    ) {
      isValid = false;
      newError.description = '10자 이상 입력해주세요';
    }

    if (!values.price || values.price.length < 1 || isNaN(values.price)) {
      isValid = false;
      newError.price = '숫자로 입력해주세요';
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
