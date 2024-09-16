import styles from "./RegisterProductPrice.module.css";
function RegisterProductPrice({
  fieldStatus,
  errorMessage,
  validate,
  onChange
}) {
  const handleBlurPrice = (e) => {
    validate("price", Number(e.target.value));
    if (fieldStatus === "PASS") onChange(e.target.value);
  };
  return (
    <div className={styles.price}>
      <div className={styles.label}>판매가격</div>
      <div className={styles.container}>
        <input
          onBlur={handleBlurPrice}
          className={`${styles.input} ${
            fieldStatus === "ERROR" ? styles.error : ""
          }`}
          placeholder="판매 가격을 입력해주세요"
        />
        <div className={styles.guide}>{errorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductPrice;
