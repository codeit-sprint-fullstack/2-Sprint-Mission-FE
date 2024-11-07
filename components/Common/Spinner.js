import styles from './Spinner.module.css'; // 스타일을 별도로 지정할 수 있습니다.

export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p>로딩 중...</p>
    </div>
  );
}
