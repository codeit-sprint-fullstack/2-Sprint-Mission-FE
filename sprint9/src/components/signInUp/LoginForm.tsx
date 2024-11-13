"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH } from "@/src/variables/formValidation";
import style from "@/src/styles/signInUp/SignInput.module.css";
import PasswordInput from "./PasswordInput";
import IdInput from "./IdInput";
import SignButton from "./SignButton";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { useAuth } from "@/src/hooks/useAuth";

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    watch
  } = formMethods;

  const handleLogInSubmit = () => {
    const filterData = {
      email: watch("email"),
      password: String(watch("password"))
    };
    console.log("Submitting login with data:", filterData);
    login.mutate(filterData);
  };

  return (
    <FormProvider {...formMethods}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className={style.container}
          onSubmit={handleSubmit(handleLogInSubmit)}
        >
          <IdInput
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            validations={AUTH.EMAIL}
          />
          <PasswordInput
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            validations={AUTH.PASSWORD}
          />
          <SignButton status={isValid} type="submit">
            로그인
          </SignButton>
        </form>
      )}
    </FormProvider>
  );
}
