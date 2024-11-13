import style from "@/src/styles/Button.module.css";

interface ButtonProps {
  children: string;
  status: boolean;
  onClick: () => void;
}

export default function Button({ children, status, onClick }: ButtonProps) {
  const buttonClass = `${style.button} ${
    status ? style.active : style.inactive
  }`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
