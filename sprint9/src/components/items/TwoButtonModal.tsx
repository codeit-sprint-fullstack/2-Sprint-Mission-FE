import style from "@/src/styles/TwoButtonModal.module.css";
import check from "@/public/assets/ic_check.png";
import Image from "next/image";

interface TwoButtonModalProps {
  msg: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function TwoButtonModal({
  msg,
  onCancel,
  onConfirm
}: TwoButtonModalProps) {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <Image src={check} alt="checkimage" height={24} width={24} />
        <h1 className={style.message}>{msg}</h1>
        <div className={style.buttonContainer}>
          <button className={style.cancel} onClick={onCancel}>
            취소
          </button>
          <button className={style.confirm} onClick={onConfirm}>
            네
          </button>
        </div>
      </div>
    </div>
  );
}
