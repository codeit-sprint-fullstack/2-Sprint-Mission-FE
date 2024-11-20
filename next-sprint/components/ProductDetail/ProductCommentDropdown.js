import styles from './ProductCommentDropdown.module.css';
import { deleteProductComments } from '@/lib/api';

export default function ProductCommentDropdown({ commentId, onEditClick }) {
  const handleDelete = async () => {
    try {
      await deleteProductComments(commentId);
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
