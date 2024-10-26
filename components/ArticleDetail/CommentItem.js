import Image from 'next/image';
import styles from './CommentItem.module.css';
import formatTimeAgo from '@/lib/formatTimeAgo';

export default function CommentItem({ comment }) {
  return (
    <div className={styles.commentItem}>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentInfo}>
        <div className={styles.profileIcon}>
          <Image 
            src="/images/user_profile.png" 
            alt="프로필 이미지" 
            fill 
            sizes="2.4rem" 
          />
        </div>
        <div className={styles.nicknameAndDate}>
          <span className={styles.nickname}>{comment.nickname || '익명'}</span>
          <span className={styles.date}>{formatTimeAgo(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
