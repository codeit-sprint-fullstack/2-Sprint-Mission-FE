import { useState } from 'react';

interface InitialValuesProps {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function useLoginValidate(initialValues: InitialValuesProps) {
  const [values, setValues] = useState<InitialValuesProps>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = (): boolean => {
    let isValid = true;
    let newError: Errors = {};

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
