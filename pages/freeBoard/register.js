import styles from "@/styles/register.module.css";

export default function Register() {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>게시글 쓰기</h1>
          <button className={styles.registerBtn}>등록</button>
        </div>
        <div className={styles.formSection}>
          <form>
            <h2>*제목</h2>
            <input
              className={styles.inputSection}
              type="text"
              placeholder="제목을 입력해주세요"
            />
            <h2>*내용</h2>
            <textarea
              className={`${styles.inputSection} ${styles.textareaSection}`}
              placeholder="내용을 입력해주세요"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
