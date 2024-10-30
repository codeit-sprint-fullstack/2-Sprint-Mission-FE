import style from "./styles/Comment.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticleComment, createComment, patchComment } from "../pages/api/CommentService";
import CommentList from "./CommentList";

export default function Comment() {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchComments = async () => {
        try {
          const commentData = await getArticleComment(id);
          console.log('fetched Comment:', commentData);
          setComments(commentData);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchComments();
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    if (newComment.length > 100) {
      alert("댓글은 100자를 초과할 수 없습니다.");
      return;
    }

    try {
      if (editComment) {
        const updatedComment = await patchComment(editComment.id, { content: newComment });
        setComments((prev) => prev.map((comment) => (comment.id === editComment.id ? updatedComment : comment)));
        setEditComment(null);
      } else {
        const commentData = { content: newComment, articleId: id };
        const createdComment = await createComment(commentData);
        setComments((prev) => [...prev, createdComment]);
      }
      setNewComment("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
    setNewComment(comment.content);
  }

  return (
    <div className={style.commentContainer}>
      <div className={style.commentSection}>
        <label className={style.comment} htmlFor="commentInput">
          {editComment ? "댓글 수정" : "댓글 달기"}
        </label>
        <textarea
          id="commentInput"
          className={style.commentInput}
          placeholder="댓글을 입력해주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className={`${style.submitBtn} ${newComment ? style.active : ""}`}
          onClick={handleCommentSubmit}
        >
          {editComment ? "수정" : "등록"}
        </button>
      </div>
      <div className={style.commentListSection}>
        <CommentList comments={comments} onEdit={handleEdit} setComments={setComments} />
      </div>
    </div>
  );
}
