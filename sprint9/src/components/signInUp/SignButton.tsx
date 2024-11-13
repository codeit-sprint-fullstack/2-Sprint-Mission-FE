import { ReactNode } from "react";
import style from "@/src/styles/signInUp/SignButton.module.css";

interface ButtonProps {
  children: ReactNode;
  status: boolean;
  type: "button" | "submit" | "reset";
}

export default function SignButton({ children, status, type }: ButtonProps) {
  const buttonClass = `${style.button} ${
    status ? style.active : style.inactive
  }`;
  return (
    <button type={type} className={buttonClass}>
      {children}
    </button>
  );
}
