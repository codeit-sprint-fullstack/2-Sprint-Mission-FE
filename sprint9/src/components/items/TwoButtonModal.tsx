import style from "@/src/styles/TwoButtonModal.module.css";
import check from "@/public/assets/ic_check.png";
import Image from "next/image";

export default function TwoButtonModal() {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <Image src={check} alt="checkimage" height={24} width={24} />
        <h1 className={style.message}>대충 메세지가 들어갈 곳</h1>
        <div className={style.buttonContainer}>
          <button className={style.cancel}>취소</button>
          <button className={style.confirm}>네</button>
        </div>
      </div>
    </div>
  );
}
