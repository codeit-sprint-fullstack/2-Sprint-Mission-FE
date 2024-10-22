import style from '@/styles/Button.module.css';

export default function Button({ children }) {
  return <button className={style.button}>{children}</button>;
}
