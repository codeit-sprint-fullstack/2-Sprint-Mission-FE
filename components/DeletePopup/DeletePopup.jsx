import styles from "./DeletePopup.module.css";
import check_icon from "@/images/etc/check_icon.svg";
import Image from "next/image";

const DeletePopup = ({ onDelete, onCancel, message }) => {
  return (
    <>
      <div className={styles.popup_container}>
        <div className={styles.popup_content}>
          <Image src={check_icon} alt="체크 아이콘" />
          <h4>{message}</h4>
          <div className={styles.button_container}>
            <button onClick={onCancel} className={styles.cancel_button}>
              취소
            </button>
            <button onClick={onDelete} className={styles.delete_button}>
              네
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
