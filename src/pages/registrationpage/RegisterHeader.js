import styles from "./RegisterHeader.module.css";
function RegisterHeader({ onSubmit }) {
  const handleSubmit = (e) => onSubmit();
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>상품 등록하기</div>
      <button onClick={handleSubmit} className={styles.headerButton}>
        등록
      </button>
    </div>
  );
}
export default RegisterHeader;
