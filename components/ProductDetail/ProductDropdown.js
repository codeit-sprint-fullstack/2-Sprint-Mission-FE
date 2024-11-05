import styles from './ProductDropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DropdownMenu({ onDeleteClick }) {
  const router = useRouter();
  const id = router.query['id'];

  return (
    <div className={styles.menu}>
      <div>
        <Link href={`/products/${id}/edit`}>수정하기</Link>
      </div>
      <div onClick={() => onDeleteClick(id)}>삭제하기</div>
    </div>
  );
}
