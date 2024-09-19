import styles from "./RegisterProductName.module.css";
function RegisterProductName({
  fieldStatus,
  errorMessage,
  validate,
  onChange
}) {
  const handleOnBlur = (e) => {
    validate("name", e.target.value);
    if (fieldStatus === "PASS") onChange(e.target.value);
  };
  return (
    <div className={styles.name}>
      <div className={styles.label}>상품명</div>
      <div className={styles.container}>
        <input
          className={`${styles.input} ${
            fieldStatus === "ERROR" ? styles.error : ""
          }`}
          onBlur={handleOnBlur}
          placeholder="상품명을 입력해주세요"
        ></input>
        <div className={styles.guide}>{errorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductName;
