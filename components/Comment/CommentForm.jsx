// CommentForm.js
import styles from "@/pages/board/styles/detail.module.css";

export default function CommentForm({
  newComment,
  onCommentChange,
  onCommentSubmit,
}) {
  return (
    <div className={styles.comment_register_container}>
      <h4>댓글달기</h4>
      <textarea
        placeholder="댓글을 입력해주세요."
        className={styles.comment_textarea}
        value={newComment}
        onChange={onCommentChange}
      ></textarea>
      <div className={styles.button_container}>
        <button
          className={`${styles.register_button} ${
            newComment.trim().length > 0 ? styles.active_button : ""
          }`}
          onClick={onCommentSubmit}
          disabled={newComment.trim().length === 0}
        >
          등록
        </button>
      </div>
    </div>
  );
}
