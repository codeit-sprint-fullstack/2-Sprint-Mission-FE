import styles from "@/components/Comment/Comment.module.css";

export default function CommentForm({
  newComment,
  onCommentChange,
  onCommentSubmit,
  isInquiry = false,
}) {
  return (
    <div className={styles.comment_register_container}>
      <h4>{isInquiry ? "문의하기" : "댓글 달기"}</h4>
      <textarea
        placeholder={
          isInquiry
            ? "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다"
            : "댓글을 입력해주세요."
        }
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
