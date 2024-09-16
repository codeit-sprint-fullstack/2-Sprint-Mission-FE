import styles from "./RegisterProductTag.module.css";
import xImage from "./image/tagximage.png";
function RegisterProductTag({
  fieldStatus,
  errorMessage,
  validate,
  onChange,
  onDelete,
  tags
}) {
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const tagValue = e.target.value.trim();
      const { status } = await validate("tags", tagValue, tags);
      if (status === "PASS") onChange(tagValue);
      e.target.value = "";
    }
  };
  const handleOnClickX = (index) => () => onDelete(index);

  return (
    <div className={styles.tags}>
      <div className={styles.label}>태그</div>
      <div className={styles.container}>
        <input
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${
            fieldStatus === "ERROR" ? styles.error : ""
          }`}
          placeholder="태그를 입력해주세요"
        ></input>
        <div className={styles.guide}>{errorMessage}</div>
        <ul className={styles.tagList}>
          {tags?.map((tag, index) => (
            <li className={styles.inputTag} key={index}>
              #{tag}
              <button onClick={handleOnClickX(index)} className={styles.button}>
                <img src={xImage} alt="태그 취소 버튼" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RegisterProductTag;
