import createButton from './Button';
import styles from './Modal.module.css';

const CloseButton = createButton({
  style: 'btn_small_40',
});

function Modal({ children, onClose }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContents}>{children}
        <CloseButton onClick={onClose}>확인</CloseButton></div>
      </div>
    </div>
  );
}

export default Modal;
