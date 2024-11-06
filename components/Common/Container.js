import styles from './Container.module.css';

export default function Container({ children, noneStyle }) {
  return (
    <div
      className={`${styles.container} ${noneStyle ? styles[`none-style`] : ''}`}
    >
      {children}
    </div>
  );
}
