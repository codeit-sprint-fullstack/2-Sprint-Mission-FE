import Image from "next/image";
import pandaLogo from "../../../public/panda-logo.svg";
import google from "../../../public/ic_google.svg";
import kakao from "../../../public/ic_kakao.svg";
import eye from "../../../public/btn_visibility_on.png";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";

export default function Signup() {
  return (
    <div className={styles.signup}>
      <Image className={styles.panda_image} src={pandaLogo} alt="판다마켓" />
      <div className={styles.signup_bottom}>
        <div className={styles.input_wrapper}>
          <div className={styles.wrapper}>
            <p className={styles.text}>이메일</p>
            <input
              className={styles.email_input}
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.text}>닉네임</p>
            <input
              className={styles.nick_input}
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.text}>비밀번호</p>
            <div className={styles.eye_wrapper}>
              <input
                className={styles.pw_input}
                placeholder="비밀번호를 입력해주세요"
              />
              <Image src={eye} alt="눈" />
            </div>
          </div>{" "}
          <div className={styles.wrapper}>
            <p className={styles.text}>비밀번호 확인</p>
            <div className={styles.eye_wrapper}>
              <input
                className={styles.pw_input}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
              />
              <Image src={eye} alt="눈" />
            </div>
          </div>
        </div>
        <button className={styles.signup_button}>회원가입</button>
        <div className={styles.simple_login}>
          <p className={styles.simple_login_text}>간편 로그인하기</p>
          <div className={styles.icons}>
            <Image src={google} alt="구글" />
            <Image src={kakao} alt="카카오" />
          </div>
        </div>
        <div className={styles.first}>
          <p className={styles.first_text}>이미 회원이신가요?</p>
          <Link href="/signup" className={styles.login}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
