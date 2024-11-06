"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH } from "@/src/variables/formValidation";
import style from "@/src/styles/signInUp/SignInput.module.css";
import PasswordInput from "./PasswordInput";
import IdInput from "./IdInput";
import SignButton from "./SignButton";

export default function SignupForm() {
  const methods = useForm();

  const handleClick = () => {
    // TODO: 회원가입 로직 추가
  };

  const handleSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className={style.container} onSubmit={methods.handleSubmit}>
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
        <SignButton status={false} onClick={handleClick}>
          회원가입
        </SignButton>
      </form>
    </FormProvider>
  );
}
