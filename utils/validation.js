import { useState, useEffect } from "react";

export function validation(email, password, passwordCheck, isLoginPage, nickname) {
  const [error, setError] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    (isLoginPage || (nickname && passwordCheck === password));

  useEffect(() => {
    if (email && !isEmailValid) {
      setError((prev) => ({ ...prev, email: "잘못된 이메일입니다." }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (password && !isPasswordValid) {
      setError((prev) => ({ ...prev, password: "비밀번호는 8자 이상이어야 합니다." }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (!isLoginPage && passwordCheck && password !== passwordCheck) {
      setError((prev) => ({ ...prev, passwordCheck: "비밀번호가 일치하지 않습니다." }));
    } else {
      setError((prev) => ({ ...prev, passwordCheck: "" }));
    }
  }, [email, password, passwordCheck, isEmailValid, isPasswordValid, isLoginPage]);

  return { error, isFormValid };
}
