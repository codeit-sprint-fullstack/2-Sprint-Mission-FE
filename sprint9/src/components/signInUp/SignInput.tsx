import { useState } from "react";
import style from "@/src/styles/signInUp/SignInput.module.css";
import Image from "next/image";
import invisibleIcon from "@/public/assets/icon_invisiblePw.svg";
import visibleIcon from "@/public/assets/icon_visiblePw.png";

const TYPE = [
  { value: "email", title: "이메일", placeholder: "이메일을", icon: false },
  {
    value: "password",
    title: "비밀번호",
    placeholder: "비밀번호를",
    icon: true
  }
];

interface ButtonProps {
  value: string;
}

export default function SignInput({ value }: ButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = TYPE.find((type) => type.value === value);

  if (!inputType) {
    return null; // NOTE: 타입 스크립트에서 지정 필수
  }

  const validateInput = () => {
    if (inputValue.trim() === "") {
      return `${inputType.title}을 입력해주세요`;
    }

    switch (value) {
      case "email":
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)
          ? ""
          : "잘못된 이메일 입니다.";
      case "password":
        return inputValue.length >= 8 ? "" : "비밀번호를 8자 이상 입력해주세요";
      default:
        return "";
    }
  };

  const handleBlur = () => {
    setError(validateInput());
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const checkPassword =
    value === "password" && !isPasswordVisible ? "password" : "text";
  const toggleVisibleIcon = isPasswordVisible ? visibleIcon : invisibleIcon;

  return (
    <div className={style.container}>
      <label className={style.label}>{inputType.title}</label>
      <div className={style.errorContainer}>
        <div
          className={`${style.inputContainer} ${
            isFocused ? style.focused : ""
          } ${error ? style.error : ""}`}
        >
          <input
            className={style.input}
            type={checkPassword}
            placeholder={`${inputType.placeholder} 입력해주세요`}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
          />
          {inputType.icon && (
            <Image
              src={toggleVisibleIcon}
              alt="Visible Icon"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
