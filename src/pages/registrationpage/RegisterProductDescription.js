import styles from "./RegisterProductDescription.module.css";
import { useState } from "react";
function RegisterProductDescription({ onChange, onValidate, error }) {
  const [errorMessage, setErrorMessage] = useState("");
  const handleBlurDescription = (e) => {
    if (e.target.value.length < 10) {
      setErrorMessage("10자 이상 입력해주세요.");
      onValidate("description", false);
    } else if (e.target.value.length > 100) {
      setErrorMessage("100자 이내로 입력해주세요.");
      onValidate("description", false);
    } else {
      setErrorMessage("");
      onChange(e.target.value);
      onValidate("description", true);
    }
  };
  return (
    <div className={styles.description}>
      <div className={styles.label}>상품 소개</div>
      <div className={styles.container}>
        <textarea
          onBlur={handleBlurDescription}
          className={`${styles.input} ${error === "ERROR" ? styles.error : ""}`}
          placeholder="상품 소개를 입력해주세요"
        />
        <div className={styles.guide}>{errorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductDescription;
