"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH } from "@/src/variables/formValidation";
import style from "@/src/styles/signInUp/SignInput.module.css";
import PasswordInput from "./PasswordInput";
import IdInput from "./IdInput";
import SignButton from "./SignButton";
import { postSignup } from "@/src/api/authServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

export default function SignupForm() {
  const router = useRouter();
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
    watch
  } = formMethods;

  const handleClick = async () => {
    const email = watch("email");
    const nickname = watch("nickname");
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");

    await postSignup({ email, nickname, password, passwordConfirmation });
    router.push("/login");
  };

  return (
    <FormProvider {...formMethods}>
      <form className={style.container} onSubmit={handleSubmit(handleClick)}>
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
    </FormProvider>
  );
}
