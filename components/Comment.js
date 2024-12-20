import { useState } from "react";
import styles from "./Comment.module.css";
import formatDate from "@/lib/formatDate";
import axios from "@/lib/axios";

export default function Comment({
  comments,
  toggleDropdown,
  activeDropdown,
  articleId,
}) {
  const [comment, setComment] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정할 댓글 ID
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용

  const handlePostComment = async () => {
    try {
      const response = await axios.post(`/comments`, {
        articleId,
        content: newComment,
      });
      setComment([...comment, response.data]);
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`); // DELETE 요청
      setComment(comment.filter((prevComment) => prevComment.id !== commentId)); // 댓글 목록에서 삭제
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      const response = await axios.patch(`/comments/${commentId}`, {
        content: editedContent,
      });
      setComment(
        comment.map((prevComment) =>
          prevComment.id === commentId ? response.data : prevComment
        )
      );
      setEditingCommentId(null); // 수정 모드 종료
      setEditedContent(""); // 입력 필드 초기화
      toggleDropdown(null); // 드롭다운 닫기
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleFont}>댓글달기</div>
        <textarea
          className={styles.textBox}
          placeholder="댓글을 입력해주세요."
          value={newComment} // textarea 값 저장
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className={styles.buttonTable}>
          <button
            className={styles.postButton}
            onClick={handlePostComment}
            disabled={!newComment.trim()}
          >
            등록
          </button>
        </div>
        {comment.length > 0 && (
          <ul className={styles.commentContain}>
            {comment.map((prevComment) => (
              <li key={prevComment.id} className={styles.commentList}>
                <div className={styles.contentBox}>
                  {editingCommentId === prevComment.id ? (
                    <>
                      <textarea
                        className={styles.textBoxEdit}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <div className={styles.content}>
                        {prevComment.content}
                      </div>
                      <img
                        src="/ic_kebab.png"
                        alt="kebabDropdown"
                        className={styles.kebabDropdown}
                        onClick={() => toggleDropdown(prevComment.id)}
                      />
                      {activeDropdown === prevComment.id && (
                        <div className={styles.dropdownMenu}>
                          <button
                            onClick={() => {
                              setEditingCommentId(prevComment.id);
                              setEditedContent(prevComment.content); // 기존 내용으로 초기화
                            }}
                          >
                            수정하기
                          </button>
                          <button onClick={() => handleDelete(prevComment.id)}>
                            삭제하기
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.profileTable}>
                  <div>
                    <img src="/ic_profile.png" alt="profile" />
                    <div className={styles.nickNameTable}>
                      <p className={styles.nickName}>똑똑한 판다</p>
                      <p className={styles.date}>
                        {formatDate(new Date(prevComment.createdAt))}
                      </p>
                    </div>
                  </div>
                  {editingCommentId === prevComment.id && (
                    <div className={styles.editButtonTable}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => {
                          setEditingCommentId(null);
                          toggleDropdown(null);
                        }}
                      >
                        취소
                      </button>
                      <button
                        className={styles.patchButton}
                        onClick={() => {
                          handleEdit(prevComment.id);
                          toggleDropdown(null);
                        }}
                      >
                        수정 완료
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {comment.length === 0 && (
          <div className={styles.noCommentTable}>
            <img
              src="/def_comment.png"
              alt="noncomment"
              className={styles.noComment}
            />
            <p className={styles.noCommentFont}>
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
