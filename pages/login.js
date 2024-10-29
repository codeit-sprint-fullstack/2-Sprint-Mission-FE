import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.login}>
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
            <label for="username">이메일</label>
            <input
              id="username"
              className={styles.input}
							name="username"
              placeholder="이메일을 입력해주세요"
            />
            <span id="email-error" className="error-msg"></span>
          </div>
          <label for="password">비밀번호</label>
          <div className="password-input">
            <input
              id="password"
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
          <button id="login-button" type="submit" disabled>
            로그인
          </button>
        </form>
        <div className="easy-login">
          <span>간편 로그인하기</span>
          <div className="icons">
            <Link href="https://www.google.com/">
              <Image width={42} height={42} src="/ic_google.png" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image width={42} height={42} src="/ic_kakao.png" />
            </Link>
          </div>
        </div>
        <div className="ask">
          판다마켓이 처음이신가요?{' '}
          <Link href="/signup" className="signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
