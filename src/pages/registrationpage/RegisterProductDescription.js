import styles from "./RegisterProductDescription.module.css";
import { useState } from "react";
function RegisterProductDescription({
  fieldStatus,
  errorMessage,
  validate,
  onChange
}) {
  const handleonBlur = (e) => {
    validate("description", e.target.value);
    if (fieldStatus === "PASS") onChange(e.target.value);
  };
  return (
    <div className={styles.description}>
      <div className={styles.label}>상품 소개</div>
      <div className={styles.container}>
        <textarea
          onBlur={handleonBlur}
          className={`${styles.input} ${
            fieldStatus === "ERROR" ? styles.error : ""
          }`}
          placeholder="상품 소개를 입력해주세요"
        />
        <div className={styles.guide}>{errorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductDescription;
