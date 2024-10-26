import CommentItem from './CommentItem';
import Image from 'next/image';
import styles from './CommentList.module.css';

export default function CommentList({ comments }) {
  return (
    <div>
      {comments.length === 0 ? (
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
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        </div>
      )}
    </div>
  );
}
