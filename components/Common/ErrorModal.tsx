import styles from './ErrorModal.module.css';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({
  isOpen,
  onClose,
  message
}: ErrorModalProps) {
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
