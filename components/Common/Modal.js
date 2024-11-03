import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, message }) {
  // Enter 키 입력시 모달 닫힘
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 모달이 닫힐 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.modalButton}>확인</button>
      </div>
    </div>
  );
}
