import style from '@/src/styles/Header.module.css';

export default function Header({ children }) {
  return <h1 className={style.header}>{children}</h1>;
}