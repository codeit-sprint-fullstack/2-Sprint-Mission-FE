import { ChangeEvent, useState } from 'react';

interface InitialValuesProps {
  name: string;
  description: string;
  price: string;
  images: string[];
}

interface Errors {
  name?: string;
  description?: string;
  price?: string;
  images?: string;
}

export default function useProductValidate(initialValues: InitialValuesProps) {
  const [values, setValues] = useState<InitialValuesProps>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    let isValid = true;
    let newError: Errors = {};

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

    if (
      !values.price ||
      values.price.length < 1 ||
      isNaN(parseInt(values.price))
    ) {
      isValid = false;
      newError.price = '숫자로 입력해주세요';
    }

    if (!values.images || values.images.length > 3) {
      isValid = false;
      newError.images = '이미지는 3개까지 등록 가능합니다.';
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value
    });
  };

  return {
    values,
    setValues,
    errors,
    validate,
    handleChange
  };
}
