import Button from "./Button";
import style from "@/src/styles/Modal.module.css";

export default function Modal() {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <h1 className={style.message}>대충 메세지가 들어갈 곳</h1>
        <Button status={true} onClick="">
          확인
        </Button>
      </div>
    </div>
  );
}
