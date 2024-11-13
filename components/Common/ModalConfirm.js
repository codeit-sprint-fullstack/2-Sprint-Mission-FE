import { useEffect } from 'react';
import Image from 'next/image';
import styles from './ModalConfirm.module.css';

export default function ModalConfirm({ isOpen, onConfirm, onCancel, message }) {
  // Enter 또는 Escape 키 입력으로 확인/취소 기능 추가
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onConfirm();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.iconWrapper}>
          <Image 
            src="/images/ic_check.svg" 
            alt="확인 아이콘" 
            fill
            sizes='2.4rem'
          />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelButton}>취소</button>
          <button onClick={onConfirm} className={styles.confirmButton}>네</button>
        </div>
      </div>
    </div>
  );
}
