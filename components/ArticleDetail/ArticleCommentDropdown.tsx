import styles from './ArticleCommentDropdown.module.css';
import { deleteArticleComment } from '@/lib/api/ArticleService';
import { Comment } from '@/types/type';

interface ArticleCommentDropdownProps {
  commentId: number;
  comment: Comment;
  onEditClick: (comment: Comment) => void;
}

export default function ArticleCommentDropdown({
  commentId,
  comment,
  onEditClick
}: ArticleCommentDropdownProps) {
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
      <div onClick={() => onEditClick(comment)}>수정하기</div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
