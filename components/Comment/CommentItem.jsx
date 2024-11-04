import Image from "next/image";
import styles from "@/pages/board/styles/detail.module.css";

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
              onClick={(e) => toggleModal(e, true, comment.id)}
              className={styles.select_button}
            />
          </>
        )}
      </div>
      <div className={styles.detail_user_stats}>
        <Image src={userImage} alt="유저이미지" className={styles.user_img} />
        <div className={styles.comment_user_stats_content}>
          <h5 className={styles.nickname}>총명한판다</h5>
          <h5 className={styles.create_at}>1시간 전</h5>
        </div>
      </div>
    </>
  );
}
