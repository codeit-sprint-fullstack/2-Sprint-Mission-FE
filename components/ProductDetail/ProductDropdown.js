import styles from './ProductDropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DropdownMenu() {
  const router = useRouter();
  const id = router.query['id'];

  //   const handleDelete = async () => {
  //     try {
  //       await deleteArticle(id);
  //       return router.push('/');
  //     } catch (err) {
  //       console.error('삭제 요청 중 오류 발생:', err);
  //     }
  //   };

  return (
    <div className={styles.menu}>
      <div>수정하기</div>
      <div>삭제하기</div>
    </div>
  );
}
