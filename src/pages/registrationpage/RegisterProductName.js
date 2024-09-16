import styles from "./RegisterProductName.module.css";
import { useState } from "react";
function RegisterProductName({ onChange, onValidate, error }) {
  const [ErrorMessage, setErrorMessage] = useState("");
  const handleBlur = (e) => {
    if (e.target.value.length > 10) {
      setErrorMessage("10자 이내로 입력해주세요");
      onValidate("name", false);
    } else if (e.target.value.length === 0) {
      setErrorMessage("상품명을 입력해주세요.");
      onValidate("name", false);
    } else {
      setErrorMessage("");
      onChange(e.target.value);
      onValidate("name", true);
    }
  };
  return (
    <div className={styles.name}>
      <div className={styles.label}>상품명</div>
      <div className={styles.container}>
        <input
          onBlur={handleBlur}
          className={`${styles.input} ${error === "ERROR" ? styles.error : ""}`}
          placeholder="상품명을 입력해주세요"
        ></input>
        <div className={styles.guide}>{ErrorMessage}</div>
      </div>
    </div>
  );
}
export default RegisterProductName;
