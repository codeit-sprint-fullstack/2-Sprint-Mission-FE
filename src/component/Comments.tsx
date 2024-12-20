import { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import formatDate from "../lib/formatDate.js";
import axios from "../lib/axios.js";
import kebab from "../imgFile/ic_kebab.png";
import avatarImg from "../imgFile/김코드마크.png";
import nocomment from "../imgFile/nocomment.png";

export default function Comments({ itemId, toggleDropdown, activeDropdown }) {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정할 댓글 ID
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용

  const accessToken = localStorage.getItem("accessToken");

  async function getComment() {
    try {
      const res = await axios.get(`/products/${itemId}/comments?limit=3`);
      const comments = res.data.list;
      setComment(comments);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("댓글을 찾을 수 없거나, 상품이 삭제되었습니다.");
        setComment([]); // 댓글을 비웁니다.
      }
    }
  }

  const handlePostComment = async () => {
    try {
      const response = await axios.post(
        `/products/${itemId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setComment((prevComments) => [...prevComments, response.data]);
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setComment((prevComments) =>
        prevComments.filter((prevComment) => prevComment.id !== commentId)
      ); // 댓글 목록에서 삭제
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      toggleDropdown(null); // 드롭다운 닫기
    }
  };

  const handleEdit = async (commentId) => {
    try {
      const response = await axios.patch(
        `/comments/${commentId}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setComment((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment.id === commentId ? response.data : prevComment
        )
      );
      setEditingCommentId(null); // 수정 모드 종료
      setEditedContent(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    } finally {
      toggleDropdown(null); // 드롭다운 닫기
    }
  };

  useEffect(() => {
    getComment();
  }, [itemId]); // 댓글이 아닌 itemId만 의존성으로 추가

  return (
    <>
      <div className={styles.container}>
        <p className={styles.commentBox}>문의하기</p>
        <textarea
          className={styles.textBox}
          placeholder="개인정보를 공유 및 요청하거나..."
          value={newComment}
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
                    <div className={styles.content}>{prevComment.content}</div>
                    <img
                      src={kebab}
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
                  <img src={avatarImg} alt="profile" />
                  <div className={styles.nickNameTable}>
                    <p className={styles.nickName}>
                      {prevComment.writer.nickname}
                    </p>
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
          <img src={nocomment} alt="noncomment" className={styles.noComment} />
        </div>
      )}
    </>
  );
}
