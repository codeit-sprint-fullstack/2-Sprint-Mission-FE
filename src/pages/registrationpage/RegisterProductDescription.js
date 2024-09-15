import styles from "./RegisterProductDescription.module.css";
function RegisterProductDescription({ onChange, labelFont, inputFont }) {
  const handleChangeDescription = (e) => onChange(e.target.value);
  return (
    <div className={styles.description}>
      <div className={`${styles.label} ${labelFont}`}>상품 소개</div>
      <input
        onChange={handleChangeDescription}
        className={`${styles.input} ${inputFont}`}
      ></input>
    </div>
  );
}
export default RegisterProductDescription;
