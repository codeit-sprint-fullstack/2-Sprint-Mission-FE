import styles from './ArticleHeader.module.css';

export default function ArticleHeader() {
  return (
    <div className={styles.wrapper}>
      <h1>게시글</h1>
      <button>글쓰기</button>
    </div>
  );
}
