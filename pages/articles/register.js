import styles from '@/styles/ArticleRegister.module.css';

export default function Register() {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles[`form-header`]}>
          <h1>게시글 쓰기</h1>
          <button>등록</button>
        </div>
        <div className={styles.group}>
          <label htmlFor="title">* 제목</label>
          <input type="text" id="title" placeholder="제목을 입력해주세요" />
        </div>
        <div className={styles.group}>
          <label htmlFor="content">* 내용</label>
          <textarea type="text" id="content" placeholder="내용 입력해주세요" />
        </div>
      </form>
    </div>
  );
}
