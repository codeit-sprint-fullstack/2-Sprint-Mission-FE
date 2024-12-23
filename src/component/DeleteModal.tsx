import check from "../imgFile/ic_deleteCheck.png";
import style from "./DeleteModal.module.css";

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteModal({ isOpen, onDelete, onClose }: DeleteModalProps) {
  // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className={style.deleteTable}>
      <img src={check} alt="deleteCheck" />
      <p className={style.deleteFont}>정말로 상품을 삭제하시겠어요?</p>
      <div className={style.buttonTable}>
        <button className={style.yesButton} onClick={onDelete}>
          예
        </button>
        <button className={style.noButton} onClick={onClose}>
          아니오
        </button>
      </div>
    </div>
  );
}
