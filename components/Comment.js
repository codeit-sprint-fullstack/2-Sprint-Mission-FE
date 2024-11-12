import style from "./styles/Comment.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticleComment, getProductComment, createArticleComment, createProductComment, patchComment } from "../pages/api/CommentService";
import CommentList from "./CommentList";
import { useAuth } from "@/contexts/AuthProvider";

export default function Comment() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const isProductPage = router.pathname === "/items/[id]";

  useEffect(() => {
    if (id) {
      const fetchComments = async () => {
        try {
          let commentData;
          if (isProductPage) {
            commentData = await getProductComment(id, { limit: 10, cursor: nextCursor});
          } else {
            commentData = await getArticleComment(id, { limit: 10, cursor: nextCursor});
          }
          console.log('fetched Comment:', commentData);
          setComments(commentData.list);
          setNextCursor(commentData.nextCursor);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchComments();
    }
  }, [id, isProductPage]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (newComment.length > 100) {
      alert("100자를 초과할 수 없습니다.");
      return;
    }

    try {
      if (editComment) {
        const updatedComment = await patchComment(editComment.id, { content: newComment });
        setComments((prev) => prev.map((comment) => (comment.id === editComment.id ? updatedComment : comment)));
        setEditComment(null);
      } else {
        let commentData;
        let createdComment;
        if (isProductPage) {
          commentData = { content: newComment };
          createdComment = await createProductComment(id, commentData);
        } else {
          commentData = { content: newComment };
          createdComment = await createArticleComment(id, commentData);
        }
        setComments((prev) => [...prev, { ...createdComment, writer: { image: user.image, nickname: user.nickname, id: user.id }}]);
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
          {isProductPage ? "문의하기" : editComment ? "댓글 수정" : "댓글 달기"}
        </label>
        <textarea
          id="commentInput"
          className={style.commentInput}
          placeholder={isProductPage ? "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." : "댓글을 입력해주세요"}
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
        <CommentList comments={comments} onEdit={handleEdit} setComments={setComments} userId={user.id} />
      </div>
    </div>
  );
}
