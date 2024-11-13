import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, message }) {
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
