import styles from "@/styles/register.module.css";

export default function register() {
  return (
    <>
      <div className={styles.register_container}>
        <div className={styles.register_header}>
          <p className={styles.write_post}>게시글 쓰기</p>
          <button className={styles.registration_button}>등록</button>
        </div>
        <div className={styles.register_body}>
          <p className={styles.title}>*제목</p>
          <textarea
            className={styles.input_title}
            placeholder="제목을 입력해주세요"
          />
          <p className={styles.content}>*내용</p>
          {/* <div className={styles.input_container}> */}
          <textarea
            className={styles.input_content}
            placeholder="내용을 입력해주세요"
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
