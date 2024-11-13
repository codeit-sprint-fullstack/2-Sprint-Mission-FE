import { useEffect, useState } from 'react';
import { createProductComment, updateProductComment } from '@/lib/api/ProductService';
import styles from './ProductCommentForm.module.css';
import { useAuth } from '@/contexts/AuthProvider';

export default function ProductCommentForm({ productId, initialComment = null, onUpdateComment }) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  useAuth(true);
  
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
        const updatedComment = await updateProductComment(initialComment.id, { content: comment });
        onUpdateComment(updatedComment);
      } else {
        // 새로운 댓글 등록
        await createProductComment(productId, { content: comment });
      }
      setComment('');
      window.location.reload(); // 새로고침으로 댓글 리스트 업데이트
    } catch (error) {
      alert(initialComment ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
    } finally {
      clearTimeout(loadingTextTimeout);
      setIsSubmitting(false);
      setShowLoadingText(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.title}>{initialComment ? '' : '문의하기'}</div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="개인정보를 공유 및 요청하거나, 명예 웨손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        className={styles.commentInput}
      />
      <button 
        type="submit" 
        disabled={!comment.trim()}  
        className={`${styles.commentButton} ${comment.trim() ? styles.active : ''}`}
        style={{ width: initialComment ? '10.8rem' : '8.8rem' }}
      >
        {isSubmitting && showLoadingText  ? '처리중' : initialComment? '수정완료' : '등록'}
      </button>
    </form>
  );
}
