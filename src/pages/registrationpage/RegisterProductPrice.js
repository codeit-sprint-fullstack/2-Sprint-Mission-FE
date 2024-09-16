import styles from "./RegisterProductPrice.module.css";
import { useState } from "react";
function RegisterProductPrice({ onChange, onValidate, error }) {
  const [errorMessage, setErrorMessage] = useState("");
  function validatePositiveInteger(data) {
    if (Number.isInteger(data) && data > 0) {
      return true;
    } else {
      return false;
    }
  }
  const handleBlurPrice = (e) => {
    if (validatePositiveInteger(Number(e.target.value))) {
      setErrorMessage("");
      onChange(e.target.value);
      onValidate("price", true);
    } else if (Number(e.target.value) <= 0) {
      setErrorMessage("가격은 0보다 커야합니다");
      onValidate("price", false);
    } else {
      setErrorMessage("숫자로 입력해주세요");
      onValidate("price", false);
    }
  };
  return (
    <div className={styles.price}>
      <div className={styles.label}>판매가격</div>
      <div className={styles.container}>
        <input
          onBlur={handleBlurPrice}
          className={`${styles.input} ${error === "ERROR" ? styles.error : ""}`}
          placeholder="판매 가격을 입력해주세요"
        />
        <div className={styles.guide}>{errorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductPrice;
