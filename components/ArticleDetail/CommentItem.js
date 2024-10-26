import Image from 'next/image';
import { useState } from 'react';
import styles from './CommentItem.module.css';
import formatTimeAgo from '@/lib/formatTimeAgo';
import Dropdown from '@/components/Common/Dropdown';
import { deleteArticleComment } from '@/lib/api/ArticleService';

export default function CommentItem({ comment, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmed) {
      setIsDeleting(true);
      try {
        await deleteArticleComment(comment.id);
        onDelete(comment.id);
      } catch (error) {
        alert('댓글 삭제에 실패했습니다.');
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

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
        {/* 드롭다운 메뉴 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            name="commentOptions"
            iconMode={true}
            options={[{ label: '삭제하기', value: 'delete' }]}
            value=""
            onChange={(name, value) => value === 'delete' && handleDelete()}
          />
        </div>
      </div>
      {isDeleting && <p className={styles.deletingText}>삭제 중...</p>}
    </div>
  );
}
