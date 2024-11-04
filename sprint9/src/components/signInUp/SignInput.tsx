import style from "@/styles/SignInput.module.css";
import Image from "next/image";
import visibleIcon from "../../../public/assets/icon_visible.svg";

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
  const inputType = TYPE.find((type) => type.value === value);

  if (!inputType) {
    return null; // NOTE: 타입 스크립트에서 지정 필수
  }

  return (
    <div>
      <label className={style.label}>{inputType.title}</label>
      <div className={style.inputContainer}>
        <input
          className={style.input}
          placeholder={`${inputType.placeholder} 입력해주세요`}
        />
        {inputType.icon && <Image src={visibleIcon} alt="Visible Icon" />}
      </div>
    </div>
  );
}
