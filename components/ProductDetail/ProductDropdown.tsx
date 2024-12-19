import styles from './ProductDropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DropdownMenu({
  onDeleteClick
}: {
  onDeleteClick: () => void;
}) {
  const router = useRouter();
  const productId = parseInt(router.query['id'] as string, 10);

  return (
    <div className={styles.menu}>
      <div>
        <Link href={`/items/${productId}/edit`}>수정하기</Link>
      </div>
      <div onClick={() => onDeleteClick()}>삭제하기</div>
    </div>
  );
}
