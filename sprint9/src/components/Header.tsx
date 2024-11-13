import { ReactNode } from "react";
import style from "../../src/styles/Header.module.css";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <h1 className={style.header}>{children}</h1>;
}
