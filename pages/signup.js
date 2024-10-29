import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.signup}>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div>
            <Link href="/">
              <Image
                width={396}
                height={132}
                src="/logo.png"
                alt="panda market"
              />
            </Link>
          </div>
          <div>
            <label className={styles.label} for="username">이메일</label>
            <input
              id="username"
              className={styles.input}
              name="username"
              placeholder="이메일을 입력해주세요"
            />
            <span id="email-error" className="error-msg"></span>
          </div>
          <div>
            <label className={styles.label} for="nickname">닉네임</label>
            <input
              id="nickname"
              className={styles.input}
              name="nickname"
              placeholder="닉네임을 입력해주세요"
            />
            <span id="nickname-error" className="error-msg"></span>
          </div>
          <label className={styles.label} for="password1">비밀번호</label>
          <div className="password-input">
            <input
              id="password1"
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Image
              width={24}
              height={24}
              className="toggle-show-password"
              src="/visibility_eye.png"
              alt="view password"
            />
            <span id="password-error" className="error-msg"></span>
          </div>
          <label className={styles.label} for="password2">비밀번호 확인</label>
          <div className="password-input verification">
            <input
              id="password2"
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <div className="toggle-show-password">
              <Image
                width={24}
                height={24}
                className="toggle-show-password"
                src="/visibility_eye.png"
                alt="view password"
              />
            </div>
            <span id="password2-check-error" className="error-msg"></span>
          </div>
          <button id="signin-button" type="submit" disabled>
            회원가입
          </button>
          <div className="easy-login">
            <span>간편 로그인하기</span>
            <div className="icons">
              <a href="https://www.google.com/">
                <Image width={42} height={42} src="/ic_google.png" alt="google" />
              </a>
              <a href="https://www.kakaocorp.com/page/">
                <Image width={42} height={42} src="/ic_kakao.png" alt="kakao" />
              </a>
            </div>
          </div>
          <div className="ask">
            이미 회원이신가요?
            <a href="/login" className="login">
              로그인
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
