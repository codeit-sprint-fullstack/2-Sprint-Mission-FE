"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AUTH } from "@/src/variables/formValidation";
import style from "@/src/styles/signInUp/SignInput.module.css";
import PasswordInput from "./PasswordInput";
import IdInput from "./IdInput";
import SignButton from "./SignButton";
import { postSignin } from "@/src/api/authServices";
import { useRouter } from "next/navigation";

export default function LoginForm() {
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
    const password = watch("password");

    try {
      const response = await postSignin({ email, password });
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      router.push("/items");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
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
    </FormProvider>
  );
}
