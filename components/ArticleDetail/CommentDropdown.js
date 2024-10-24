import styles from './CommentDropdown.module.css';
import axios from '@/lib/api/ArticleService';
import { useRouter } from 'next/router';

export default function CommentDropdown({ commentId, onEditClick }) {
  const router = useRouter();
  const articleId = router.query['id'];
  const handleDelete = async () => {
    try {
      await axios.delete(`/articles/${articleId}/comments/${commentId}`);
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
