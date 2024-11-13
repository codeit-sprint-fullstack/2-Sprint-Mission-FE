import { useEffect, useState } from 'react';
import { createArticleComment, updateArticleComment } from '@/lib/api/ArticleService';
import styles from './ArticleCommentForm.module.css';

export default function ArticleCommentForm({ articleId, initialComment = null, onUpdateComment }) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  useEffect(()=> {
    if (initialComment) {
      setComment(initialComment.content);
    }
  }, [initialComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    setShowLoadingText(false);

    const loadingTextTimeout = setTimeout(() => setShowLoadingText(true), 500); // 500ms 후에 버튼 텍스트 변경

    try {
      if (initialComment) {
        // 수정 모드일 경우
        const updatedComment = await updateArticleComment(initialComment.id, { content: comment });
        onUpdateComment(updatedComment);
      } else {
        // 새로운 댓글 등록
        await createArticleComment(articleId, { content: comment });
      }
      setComment('');
      window.location.reload(); // 새로고침으로 댓글 리스트 업데이트
    } catch (error) {
      alert(initialComment ? '댓글 수정에 실패했습니다.' : '댓글 등록에 실패했습니다.');
    } finally {
      clearTimeout(loadingTextTimeout);
      setIsSubmitting(false);
      setShowLoadingText(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.title}>{initialComment?'댓글 수정' : '댓글달기'}</div>
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
        {isSubmitting && showLoadingText  ? '처리중' : initialComment? '수정' : '등록'}
      </button>
    </form>
  );
}
