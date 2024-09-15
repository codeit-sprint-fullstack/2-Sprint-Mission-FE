import styles from "./RegisterProductName.module.css";
function RegisterProductName({ onChange, labelFont, inputFont }) {
  const handleChangeName = (e) => onChange(e.target.value);

  return (
    <div className={styles.name}>
      <div className={`${styles.label} ${labelFont}`}>상품명</div>
      <input
        onChange={handleChangeName}
        className={`${styles.input} ${inputFont}`}
      ></input>
    </div>
  );
}
export default RegisterProductName;
