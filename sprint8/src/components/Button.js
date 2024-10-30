import style from '@/src/styles/Button.module.css';

export default function Button({ children, status, onClick }) {
  const buttonClass = `${style.button} ${
    status ? style.active : style.inactive
  }`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
