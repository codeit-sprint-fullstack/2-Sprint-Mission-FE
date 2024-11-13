import styles from './ProductDropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductDropdown({ onDeleteClick }) {
  const router = useRouter();
  const id = router.query['id'];

  return (
    <div className={styles.menu}>
      <div className={styles[`patch-menu`]}>
        <Link className={styles.Link} href={`/items/${id}/edit`}>
          수정하기
        </Link>
      </div>
      <div className={styles[`delete-menu`]} onClick={() => onDeleteClick(id)}>
        삭제하기
      </div>
    </div>
  );
}
