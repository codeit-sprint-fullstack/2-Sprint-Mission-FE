import styles from './CommentDropdown.module.css';
import { deleteArticleComment } from '@/lib/api/ArticleService';

export default function CommentDropdown({ commentId, onEditClick }) {
  const handleDelete = async () => {
    try {
      await deleteArticleComment(commentId);
      window.location.reload();
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
    }
  };
  return (
    <div className={styles.menu}>
      <div onClick={() => onEditClick(commentId)}>수정하기</div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
