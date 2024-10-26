import { useState } from 'react';
import { createArticleComment } from '@/lib/api/ArticleService';
import styles from './CommentForm.module.css';

export default function CommentForm({ articleId }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await createArticleComment(articleId, { content: comment });
      setComment('');
      window.location.reload(); // 새로고침으로 댓글 리스트 업데이트
    } catch (error) {
      alert('댓글 등록에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.title}>댓글달기</div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className={styles.commentInput}
      />
      <button 
        type="submit" 
        disabled={!comment.trim()}  
        className={`${styles.commentButton} ${comment.trim() ? styles.active : ''}`}
      >
        등록
      </button>
    </form>
  );
}
