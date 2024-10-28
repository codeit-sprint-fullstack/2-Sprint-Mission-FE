import styles from "./ArticleCommentList.module.css";
import Image from "next/image";
import profileIcon from "@/public/ic_profile.svg";
import emptyImg from "@/public/Img_reply_empty.svg";
import KebabMenu from "./KebabMenu";
import formatDate from "@/lib/formatDate";
import { useState } from "react";
import axios from "@/lib/axios";

export default function ArticleCommentList({
  articleComments,
  setArticleComments
}) {
  const [editMode, setEditMode] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditCommentValid, setIsEditCommentValid] = useState(false);

  const handleEditClick = (commentId, currentContent) => {
    setEditMode(commentId);
    setEditedComment(currentContent);
    setIsEditCommentValid(currentContent.trim().length > 0);
  };

  const handleCancelClick = () => {
    setEditMode(null);
    setEditedComment("");
    setIsEditCommentValid(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEditedComment(value);
    setIsEditCommentValid(value.trim().length > 0);
  };

  const handleSubmitClick = async (commentId) => {
    setIsLoading(true);

    try {
      const data = { content: editedComment };
      const res = await axios.patch(`/articles/comments/${commentId}`, data);
      const updatedComment = res.data;
      console.log("updatedComment", updatedComment);
      if (updatedComment) {
        setArticleComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: updatedComment.content }
              : comment
          )
        );
      } else {
        alert("댓글 수정을 실패하였습니다.");
      }
    } catch (error) {
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setEditMode(null);
      setEditedComment("");
      setIsEditCommentValid(false);
    }
  };

  const handleDeleteClick = async (commentId) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        await axios.delete(`/articles/comments/${commentId}`);
        setArticleComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {articleComments && articleComments.length > 0 ? (
        <ul className={styles.wrapper}>
          {articleComments.map((articleComment) => (
            <li key={articleComment.id}>
              <div
                className={`${styles.commentListContainer} ${
                  editMode ? styles.editModeContainer : ""
                }`}
              >
                {editMode === articleComment.id ? (
                  <div className={styles.commentEditMode}>
                    <textarea
                      type="text"
                      value={editedComment}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                  </div>
                ) : (
                  <div className={styles.commentTitle}>
                    <p>{articleComment.content}</p>
                    <KebabMenu
                      id={articleComment.id}
                      onEditClick={() =>
                        handleEditClick(
                          articleComment.id,
                          articleComment.content
                        )
                      }
                      onDeleteClick={() => handleDeleteClick(articleComment.id)}
                    />
                  </div>
                )}
                <div className={styles.commentFooter}>
                  <div className={styles.commentUserInfo}>
                    <Image
                      className={styles.commentUserImg}
                      width="32"
                      height="32"
                      src={profileIcon}
                      alt="profileIcon"
                    />
                    <div className={styles.commentUserInfoText}>
                      <p className={styles.commentUserNickname}>총명한판다</p>
                      <p className={styles.commentCreateAt}>
                        {formatDate(articleComment.createdAt)}
                      </p>
                    </div>
                  </div>
                  {editMode === articleComment.id && (
                    <div className={styles.editModeBtnSection}>
                      <button
                        className={styles.editModeBtn}
                        onClick={handleCancelClick}
                      >
                        취소
                      </button>
                      <button
                        className={`${styles.editModeBtn} ${
                          !isEditCommentValid || isLoading
                            ? styles.inactive
                            : ""
                        }`}
                        onClick={() => handleSubmitClick(articleComment.id)}
                        disabled={!isEditCommentValid || isLoading}
                      >
                        {isLoading ? "수정 중" : "수정 완료"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.commentEmpty}>
          <Image src={emptyImg} width={140} height={140} alt="emptyImg" />
          <p>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
    </div>
  );
}
