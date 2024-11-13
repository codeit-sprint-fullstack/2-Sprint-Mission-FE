"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH } from "@/src/variables/formValidation";
import style from "@/src/styles/signInUp/SignInput.module.css";
import PasswordInput from "./PasswordInput";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import IdInput from "./IdInput";
import SignButton from "./SignButton";
import { useAuth } from "@/src/hooks/useAuth";

export default function SignupForm() {
  const { signUp, isLoading } = useAuth();
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    watch
  } = formMethods;

  const handleSignUpSubmit = () => {
    const filterData = {
      email: watch("email"),
      nickname: watch("nickname"),
      password: String(watch("password")),
      passwordConfirmation: String(watch("passwordConfirmation"))
    };
    signUp.mutate(filterData);
  };

  return (
    <FormProvider {...formMethods}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className={style.container}
          onSubmit={handleSubmit(handleSignUpSubmit)}
        >
          <IdInput
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            validations={AUTH.EMAIL}
          />
          <IdInput
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            type="text"
            validations={AUTH.NICKNAME}
          />
          <PasswordInput
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            validations={AUTH.PASSWORD}
          />
          <PasswordInput
            name="passwordConfirmation"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            validations={AUTH.CONFIRM_PW}
          />
          <SignButton status={isValid} type="submit">
            회원가입
          </SignButton>
        </form>
      )}
    </FormProvider>
  );
}
