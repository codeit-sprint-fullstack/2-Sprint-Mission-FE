import styles from './ErrorModal.module.css';

export default function ErrorModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}
