import styles from './ArticleDropdown.module.css';
import { deleteArticle } from '@/lib/api/ArticleService';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DropdownMenu() {
  const router = useRouter();
  const articleId = parseInt(router.query['id'] as string, 10);

  const handleDelete = async () => {
    try {
      await deleteArticle(articleId);
      return router.push('/articles');
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
    }
  };
  return (
    <div className={styles.menu}>
      <div>
        <Link href={`/articles/${articleId}/edit`}>수정하기</Link>
      </div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
