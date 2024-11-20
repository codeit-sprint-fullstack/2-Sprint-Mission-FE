import Image from "next/image";
import style from "./styles/Modal.module.css";
import check from "../public/ic_check.png";

const Modal = ({ message, onClose, onComfirm, isAuth }) => {
  return (
    <div className={style.container}>
      <div className={style.modal}>
        {!isAuth && (
          <Image className={style.checkIcon} src={check} alt="check Icon" />
        )}
        <p className={style.modalContent}>{message}</p>
        {!isAuth ? (
          <div className={style.buttonGroup}>
            <button className={style.cancleButton} onClick={onComfirm}>
              취소
            </button>
            <button className={style.confirmButton} onClick={onClose}>
              네
            </button>
          </div>
        ) : (
          <button className={style.closeButton} onClick={onClose}>
            '확인'
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;