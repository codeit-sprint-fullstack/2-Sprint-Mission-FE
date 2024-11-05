import { useState } from "react";
import style from "@/src/styles/signInUp/SignInput.module.css";
import Image from "next/image";
import invisibleIcon from "@/public/assets/icon_invisiblePw.svg";
import visibleIcon from "@/public/assets/icon_visiblePw.png";

const TYPE = [
  { value: "email", title: "이메일", placeholder: "이메일을", icon: false },
  { value: "nickname", title: "닉네임", placeholder: "닉네임을", icon: false },
  {
    value: "password",
    title: "비밀번호",
    placeholder: "비밀번호를",
    icon: true
  },
  {
    value: "passwordVerify",
    title: "비밀번호 확인",
    placeholder: "비밀번호를 다시 한 번",
    icon: true
  }
];

interface ButtonProps {
  value: string;
}

export default function SignInput({ value }: ButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = TYPE.find((type) => type.value === value);

  if (!inputType) {
    return null; // NOTE: 타입 스크립트에서 지정 필수
  }

  const validateInput = () => {
    if (inputValue.trim() === "") {
      return `${inputType.placeholder} 입력해주세요`;
    }

    switch (value) {
      case "email":
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)
          ? ""
          : "잘못된 이메일 입니다.";
      case "password":
        console.log("인풋 밸류", inputValue);
        console.log("패스워드 밸류", passwordValue);
        return inputValue.length >= 8 ? "" : "비밀번호를 8자 이상 입력해주세요";
      //TODO: 유효성 검사 로직 수정 필요
      case "passwordVerify":
        console.log("인풋 밸류", inputValue);
        console.log("패스워드 밸류", passwordValue);
        return inputValue === passwordValue
          ? ""
          : "비밀번호가 일치하지 않습니다.";
      default:
        return "";
    }
  };

  const handleBlur = () => {
    setError(validateInput());
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (value === "password") {
      setPasswordValue(newValue);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const checkPassword =
    (value === "password" || value === "passwordVerify") && !isPasswordVisible
      ? "password"
      : "text";
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
            onChange={handleChange}
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
