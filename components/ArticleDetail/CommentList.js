import { useState } from 'react';
import CommentItem from './CommentItem';
import Image from 'next/image';
import styles from './CommentList.module.css';

export default function CommentList({ comments }) {
  const [commentList, setCommentList] = useState(comments); // 초기값으로 전달된 comments 사용

  // 댓글 삭제 처리 함수
  const handleDeleteComment = (commentId) => {
    setCommentList((prevComments) => prevComments.filter(comment => comment.id !== commentId));
  };

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
            <CommentItem key={comment.id} comment={comment} onDelete={handleDeleteComment} />
          ))}
        </div>
      )}
    </div>
  );
}
