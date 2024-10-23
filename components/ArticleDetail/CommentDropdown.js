import styles from './CommentDropdown.module.css';
import axios from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CommentDropdown() {
  const router = useRouter();
  const id = router.query['id'];

  const handleDelete = async () => {
    try {
      await axios.delete(`/articles/${id}`);
      return router.push('/');
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
    }
  };
  return (
    <div className={styles.menu}>
      <div>
        <Link href={`/articles/${id}/edit`}>수정하기</Link>
      </div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
