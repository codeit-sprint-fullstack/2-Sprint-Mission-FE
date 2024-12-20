import { ChangeEvent, useState } from 'react';

interface InitialValuesProps {
  title: string;
  content: string;
  image: string;
}

interface Errors {
  title?: string;
  content?: string;
  image?: string;
}

export default function useArticleValidate(initialValues: InitialValuesProps) {
  const [values, setValues] = useState<InitialValuesProps>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    let isValid = true;
    let newError: Errors = {};

    if (!values.title || values.title.length < 1 || values.title.length > 50) {
      isValid = false;
      newError.title = '50자 이내로 입력해주세요';
    }

    if (
      !values.content ||
      values.content.length < 10 ||
      values.content.length > 300
    ) {
      isValid = false;
      newError.content = '300자 이내로 입력해주세요';
    }

    if (!values.image) {
      isValid = false;
      newError.image = '이미지를 등록해주세요.';
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
