import styles from "./Popup.module.css";

export default function Popup({ message, onClose }) {
  return (
    <>
      <div className={styles.popup_overlay} onClick={onClose}></div>
      <div className={styles.popup_container}>
        <div>{message}</div>
        <button className={styles.confirm_btn} onClick={onClose}>
          확인
        </button>
      </div>
    </>
  );
}
