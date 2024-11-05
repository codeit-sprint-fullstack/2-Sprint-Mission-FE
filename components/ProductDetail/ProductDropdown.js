import styles from './ProductDropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProduct } from '@/lib/api/ProductService';

export default function DropdownMenu() {
  const router = useRouter();
  const id = router.query['id'];

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      return router.push('/products');
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
    }
  };

  return (
    <div className={styles.menu}>
      <div>
        <Link href={`/products/${id}/edit`}>수정하기</Link>
      </div>
      <div onClick={handleDelete}>삭제하기</div>
    </div>
  );
}
