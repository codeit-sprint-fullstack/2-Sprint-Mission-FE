import styles from "./RegisterProductPrice.module.css";
function RegisterProductPrice({ onChange, labelFont, inputFont }) {
  const handleChangePrice = (e) => onChange(e.target.value);
  return (
    <div className={styles.price}>
      <div className={`${styles.label} ${labelFont}`}>판매가격</div>
      <input
        onChange={handleChangePrice}
        className={`${styles.input} ${inputFont}`}
      ></input>
    </div>
  );
}
export default RegisterProductPrice;
