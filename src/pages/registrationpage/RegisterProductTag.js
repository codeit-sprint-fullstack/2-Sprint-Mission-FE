import styles from "./RegisterProductTag.module.css";
import { useState } from "react";
import xImage from "./image/tagximage.png";
function RegisterProductTag({ onChange, onDelete, tags, onValidate, error }) {
  const [errorMessage, setErrorMessage] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const tagValue = e.target.value.trim();
      if (tagValue.length > 5) {
        setErrorMessage("5글자 이내로 입력해주세요");
        onValidate("tags", false);
        e.target.value = "";
      } else if (tags.includes(tagValue)) {
        //똑같은게 있는지 체크
        setErrorMessage("똑같은 태그가 이미 있습니다.");
        onValidate("tags", false);
        e.target.value = "";
      } else {
        // 통과
        setErrorMessage("");
        onChange(tagValue);
        onValidate("tags", true);
        e.target.value = "";
      }
    }
  };
  const handleOnClickX = (index) => () => onDelete(index);

  return (
    <div className={styles.tags}>
      <div className={styles.label}>태그</div>
      <div className={styles.container}>
        <input
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${error === "ERROR" ? styles.error : ""}`}
          placeholder="태그를 입력해주세요"
        ></input>
        <div className={styles.guide}>{errorMessage}</div>
        <div className={styles.tagList}>
          {tags.map((tag, index) => (
            <div className={styles.inputTag} key={index}>
              #{tag}
              <button onClick={handleOnClickX(index)} className={styles.button}>
                <img src={xImage} alt="태그 취소 버튼" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default RegisterProductTag;
