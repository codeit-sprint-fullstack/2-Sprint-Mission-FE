import style from '@/styles/Button.module.css';

export default function Button({ children, status }) {
  const buttonClass = `${style.button} ${
    status ? style.active : style.inactive
  }`;

  return <button className={buttonClass}>{children}</button>;
}
