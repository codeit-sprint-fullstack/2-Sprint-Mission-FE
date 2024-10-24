import styles from './CommentDropdown.module.css';
import { deleteArticleComment } from '@/lib/api/ArticleCommentService';
import { useRouter } from 'next/router';

export default function CommentDropdown({ commentId, onEditClick }) {
  const router = useRouter();
  const articleId = router.query['id'];
  const handleDelete = async () => {
    try {
      await deleteArticleComment(articleId, commentId);
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
