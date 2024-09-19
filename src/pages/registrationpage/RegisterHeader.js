import styles from "./RegisterHeader.module.css";
function RegisterHeader({ onSubmit, fieldStatus }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  const isValid = Object.values(fieldStatus).every(
    (status) => status === "PASS"
  );
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>상품 등록하기</div>
      <button
        disabled={!isValid}
        onClick={handleSubmit}
        className={`${styles.headerButton} ${!isValid ? styles.error : ""}`}
      >
        등록
      </button>
    </div>
  );
}
export default RegisterHeader;
