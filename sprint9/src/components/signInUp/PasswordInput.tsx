"use client";

import { useState } from "react";
import Image from "next/image";
import invisibleIcon from "@/public/assets/icon_invisiblePw.svg";
import visibleIcon from "@/public/assets/icon_visiblePw.png";
import { useFormContext } from "react-hook-form";
import style from "@/src/styles/signInUp/SignInput.module.css";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  validations: object;
}

export default function PasswordInput({
  name,
  label,
  placeholder,
  validations
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    formState: { errors },
    trigger,
    watch
  } = useFormContext();

  const addError = errors[name] ? `${style.error} ` : ``;
  const isConfirming = name === "passwordConfirmation";
  //NOTE: watch: 다른 입력 필드의 현재 값을 가져옴 watch("name")으로 사용
  const password = watch("password");

  const handlePasswordVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  //NOTE: 유효성 검사 작동 순서
  //1. register로 폼 입력 등록({...register(name, validations)})
  //2. trigger로 유효성 검사 실행
  //3. errors: 폼 필드에 에러가 있을 경우 자동으로 생성됨 (react-hook-form이 처리해줌)
  //4. errors는 formState.errors 안에 저장되고,
  //5. 해당 필드에 오류가 있다면 컴포넌트 내에서 errors[name]을 통해 오류 메시지를 가져옴
  //validate: register 함수 내에서 유효성 검사를 위한 옵션으로 사용
  //validate는 함수로 작성되어, 필드의 값을 받아서 유효성을 검사
  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <div className={`${style.inputContainer} ${addError}`}>
        <input
          className={style.input}
          {...register(name, {
            ...validations,
            onBlur: () => trigger(name),
            onChange: () => trigger(name),
            validate: isConfirming
              ? (value) => value === password || "비밀번호가 일치하지 않습니다."
              : undefined
          })}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
        />
        <button onClick={handlePasswordVisibility} type="button">
          <Image
            src={isVisible ? visibleIcon : invisibleIcon}
            alt={isVisible ? "비밀번호 보이기" : "비밀번호 숨기기"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {errors && errors[name] && (
        <span className={style.errorMessage}>
          {typeof errors[name]?.message === "string"
            ? errors[name]?.message
            : ""}
        </span>
      )}
    </div>
  );
}
