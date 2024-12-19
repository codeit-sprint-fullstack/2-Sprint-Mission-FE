import styles from './ConfirmModal.module.css';
import Image from 'next/image';

interface ConfirmModalProps {
  onCancel: () => void;
  onDelete: () => void;
  loading: boolean;
}

export default function ConfirmModal({
  onCancel,
  onDelete,
  loading
}: ConfirmModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Image
            src="/images/ic_check.png"
            width={24}
            height={24}
            alt="체크 아이콘"
          />
          <p>정말로 상품을 삭제하시겠어요?</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            취소
          </button>
          <button className={styles.delete} onClick={onDelete}>
            {loading ? '삭제 중...' : '네'}
          </button>
        </div>
      </div>
    </div>
  );
}
