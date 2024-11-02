import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <header className={styles.header}>
        <Image
          width={396}
          height={132}
          src="/images/login_logo.svg"
          alt="로그인 로고 이미지"
        />
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <label className={styles.label}>
            <h4>이메일</h4>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
            />
          </label>
          <label className={styles.label}>
            <h4>비밀번호</h4>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Image
              width={24}
              height={24}
              src="/images/btn_visibility.svg"
              alt="비밀번호 표시 이미지"
              className={styles.btnVisibility}
            />
          </label>
          <button className={styles.loginBtn} type="button" name="login">
            로그인
          </button>
        </form>
        <section className={styles.socialLogin}>
          <div>
            <h4>간편 로그인하기</h4>
          </div>
          <div className={styles.socialLoginBox}>
            <div>
              <Link href="https://www.google.com/" target="_self">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_google.svg"
                  alt="구글 이미지"
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.kakaocorp.com/page" target="_self">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_kakao.svg"
                  alt="카카오 이미지"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>판다마켓이 처음이신가요?</span>
        <Link href="/signup">회원가입</Link>
      </footer>
    </div>
  );
}
