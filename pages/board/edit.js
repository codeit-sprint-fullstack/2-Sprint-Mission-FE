import styles from "./board.module.css";

export default function Register() {
  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_title}>
          <h2>게시글 수정</h2>
          <button className={styles.register_buttion}>등록</button>
        </div>
        <div className={styles.register_form}>
          <form>
            <h3>*제목</h3>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className={styles.register_input}
            />
            <h3>*내용</h3>
            <textarea
              placeholder="내용을 입력해주세요"
              className={`${styles.register_input} ${styles.register_textarea}`}
            />
          </form>
        </div>
      </div>
    </>
  );
}
