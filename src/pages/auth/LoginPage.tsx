import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AuthContainer,
  LogoHomeLink,
  Form,
  AuthSwitch,
  SubmitButton,
} from "./AuthStyles";
import logo from "../../assets/images/logo/logo.svg";
import InputItem from "../../components/UI/InputItem";
import SocialLogin from "./components/SocialLogin";
import PasswordInput from "./components/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";
import SimpleModal from "../../components/UI/SimpleModal";

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<LoginFormInputs>= async (data) => {
    try {
      await signin(data);
      navigate("/items");
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    }
  };

  if (user) {
    return <Navigate to="/items" />
  }

  return (
    <>
      <AuthContainer>
        <LogoHomeLink href="/" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </LogoHomeLink>

        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <InputItem
            id="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            error={
              typeof errors.email?.message === "string"
                ? errors.email.message
                : undefined
            }
            register={register("email", {
              required: "이메일을 입력해 주세요",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "잘못된 이메일 형식입니다",
              },
            })}
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            error={typeof errors.password?.message === "string"
              ? errors.password.message
              : undefined}
            register={register("password", {
              required: "비밀번호를 입력해 주세요",
              minLength: {
                value: 8,
                message: "비밀번호를 8자 이상 입력해 주세요",
              },
              onChange: () => trigger("password"),
            })}
          />

          <SubmitButton type="submit" disabled={!isValid}>
            로그인
          </SubmitButton>
        </Form>

        <SocialLogin />

        <AuthSwitch>
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </AuthSwitch>
      </AuthContainer>
      <SimpleModal
        isOpen={!!errorMessage}
        text={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}

export default LoginPage;
