import Image from "next/image";
import styles from "@/pages/board/styles/detail.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
};

export default function CommentItem({
  comment,
  editCommentId,
  editComment,
  handleEditCommentChange,
  handleEditCommentSubmit,
  toggleModal,
  userImage,
  selectImage,
}) {
  return (
    <>
      <div className={styles.comment_title}>
        {editCommentId === comment.id ? (
          <>
            <textarea
              value={editComment}
              onChange={handleEditCommentChange}
              className={styles.comment_edit_textarea}
            />
            <button
              onClick={handleEditCommentSubmit}
              className={styles.edit_button}
            >
              수정
            </button>
          </>
        ) : (
          <>
            <p>{comment.content}</p>
            <Image
              src={selectImage}
              alt="선택"
              onClick={(e) => toggleModal(e, comment.id)}
              className={styles.select_button}
            />
          </>
        )}
      </div>
      <div className={styles.detail_user_stats}>
        <Image src={userImage} alt="유저이미지" className={styles.user_img} />
        <div className={styles.comment_user_stats_content}>
          <h5 className={styles.nickname}>{comment.writer.nickname}</h5>
          <h5 className={styles.create_at}>{formatDate(comment.createdAt)}</h5>
        </div>
      </div>
    </>
  );
}
