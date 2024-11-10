import Button from "./Button";
import style from "@/src/styles/Modal.module.css";

interface ModalProps {
  msg: string;
  onClose: () => void;
}

export default function Modal({ msg, onClose }: ModalProps) {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <h1 className={style.message}>{msg}</h1>
        <Button status={true} onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
}
