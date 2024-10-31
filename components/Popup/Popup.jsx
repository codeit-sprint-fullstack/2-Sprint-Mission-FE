import { type } from "@testing-library/user-event/dist/type";
import styles from "./Popup.module.css";

export default function Popup({ type }) {
  let message;

  switch (type) {
    case "wrongPW":
      message = "비밀번호가 일치하지 않습니다.";
    case "usedEmail":
      message = "사용 중인 이메일입니다.";
    case "SignupSuccess":
      message = "가입 완료되었습니다.";
    case "LoginSuccess":
      message = "로그인되었습니다.";
  }
  return (
    <div className={styles.popup_container}>
      <div>{message}</div>
      <button className={styles.confirm_btn}>확인</button>
    </div>
  );
}
