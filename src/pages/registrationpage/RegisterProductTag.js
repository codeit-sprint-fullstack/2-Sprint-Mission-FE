import styles from "./RegisterProductTag.module.css";
function RegisterProductTag({ onChange, labelFont, inputFont }) {
  const handleChangeTags = (e) => onChange(e.target.value);
  return (
    <div className={styles.tag}>
      <div className={`${styles.label} ${labelFont}`}>태그</div>
      <input
        onChange={handleChangeTags}
        className={`${styles.input} ${inputFont}`}
      ></input>
      <div className={styles.tagList}></div>
    </div>
  );
}
export default RegisterProductTag;
