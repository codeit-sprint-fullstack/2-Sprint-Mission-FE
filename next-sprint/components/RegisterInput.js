import styles from './RegisterInput.module.css';

export default function RegisterInput() {
  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <h2>게시글 쓰기</h2>
        <button>등록</button>
      </header>
      <section className={styles.section}>
        <h2>제목</h2>
        <input placeholder="제목을 입력해주세요" />
      </section>
      <footer className={styles.footer}>
        <h2>내용</h2>
        <textarea placeholder="내용을 입력해주세요"></textarea>
      </footer>
    </form>
  );
}
