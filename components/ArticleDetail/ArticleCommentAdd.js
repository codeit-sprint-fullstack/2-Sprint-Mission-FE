import styles from './ArticleCommentAdd.module.css';

export default function ArticleCommentAdd() {
  return (
    <div className={styles.comment}>
      <h1>댓글달기</h1>
      <textarea placeholder="댓글을 입력해주세요." />
      <button>등록</button>
    </div>
  );
}
