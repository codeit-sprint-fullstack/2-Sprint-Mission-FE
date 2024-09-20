import { useState } from "react";

export default function useValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isOk = true;
    let newError = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      isOk = false;
      newError.name = "10자 이내로 입력해주세요";
    }

    if (
      !values.description ||
      values.description.length < 10 ||
      values.description.length > 100
    ) {
      isOk = false;
      newError.description = "10자 이상 100자 이내로 입력해주세요";
    }

    if (!values.price || values.price.length < 1 || isNaN(values.price)) {
      isOk = false;
      newError.price = "숫자로 입력해주세요";
    }

    setErrors(newError);
    return isOk;
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  return {
    values,
    errors,
    validate,
    handleChange,
  };
}
