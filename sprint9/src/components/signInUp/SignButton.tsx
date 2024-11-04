import { ReactNode } from "react";
import style from "@/src/styles/signInUp/SignButton.module.css";

interface ButtonProps {
  children: ReactNode;
  status: boolean;
  onClick: () => void;
}

export default function SignButton({ children, status, onClick }: ButtonProps) {
  const buttonClass = `${style.button} ${
    status ? style.active : style.inactive
  }`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
