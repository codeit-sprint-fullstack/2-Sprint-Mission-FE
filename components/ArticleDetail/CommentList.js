import { useState } from 'react';
import CommentItem from './CommentItem';
import Image from 'next/image';
import styles from './CommentList.module.css';
import CommentForm from './CommentForm';

export default function CommentList({ comments }) {
  const [commentList, setCommentList] = useState(comments); // 초기값으로 전달된 comments 사용
  const [ editingComment, setEditingComment] = useState(null);

  // 댓글 삭제 처리 함수
  const handleDeleteComment = (commentId) => {
    setCommentList((prevComments) => prevComments.filter(comment => comment.id !== commentId));
  };

  // 댓글 수정 모드 진입 함수
  const handleEditComment = ((comment) => {
    setEditingComment(comment);
  })

  // 댓글 수정 완료 처리  함수
  const handleUpdateComment = (updatedComment) => {
    setCommentList((prevComments) => 
      prevComments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setEditingComment(null); // 수정 모드 해제
  }
  return (
    <div>
      {commentList.length === 0 ? (
        <div className={styles.noComments}>
          <div className={styles.iconWrapper}>
            <Image
              src="/images/articles/Img_reply_empty.svg"
              alt="댓글 없음"
              fill
              sizes="10rem"
            />
          </div>
          <p>아직 댓글이 없습니다.<br />첫 댓글을 남겨보세요!</p>
        </div>
    ) : (
      <div className={styles.hasComments}>
      {commentList.map((comment) => (
        editingComment && editingComment.id === comment.id ? (
          // 수정 중인 댓글에 대해서는 CommentForm을 렌더링
          <CommentForm
            key={comment.id}
            articleId={comment.articleId}
            initialComment={editingComment}
            onUpdateComment={handleUpdateComment} // 수정 완료 함수 전달
          />
        ) : (
          // 수정 중이 아닌 댓글에 대해서는 CommentItem을 렌더링
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment} // 수정 모드 활성화 함수 전달
          />
        )
      ))}
    </div>
  )}
</div>
);
}