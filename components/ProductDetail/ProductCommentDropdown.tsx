import { Comment } from '@/types/type';
import styles from './ProductCommentDropdown.module.css';
import { deleteProductComment } from '@/lib/api/ProductService';

interface ProductCommentDropdownProps {
  commentId: number;
  comment: Comment;
  onEditClick: (comment: Comment) => void;
}

export default function ProductCommentDropdown({
  commentId,
  comment,
  onEditClick
}: ProductCommentDropdownProps) {
  const handleDelete = async () => {
    try {
      await deleteProductComment(commentId);
      window.location.reload();
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
    }
  };
  return (
    <div className={styles.menu}>
      <div onClick={() => onEditClick(comment)}>수정하기</div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
