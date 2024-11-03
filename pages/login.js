import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/pandamarket_logo.svg";
import openEye from "@/public/openEye.svg";
import closeEye from "@/public/closeEye.svg";
import googleIcon from "@/public/googleIcon.svg";
import kakaoIcon from "@/public/kakaoIcon.svg";
import { useState } from "react";

export default function LoginPage() {
  const [passwordToggle, setPasswordToggle] = useState(false); // 비밀번호 표시 토글

  const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);

  return (
    <div className={styles.loginPage}>
      <header className={styles.loginHeader}>
        <Link href="/">
          <Image
            className={styles.logo}
            width={396}
            height={132}
            src={logo}
            alt="logo"
          />
        </Link>
      </header>

      <main className={styles.loginMain}>
        <form className={styles.loginForm}>
          <div className={styles.loginWrapper}>
            <label htmlFor="email">이메일</label>
            <div>
              <input
                className={styles.email}
                name="email"
                placeholder="이메일을 입력해주세요"
                autocomplete="on"
                required
              />
              <div className={`${styles.emptyEmailError} ${styles.hide}`}>
                이메일을 입력해주세요.
              </div>
              <div className={`${styles.emailError} ${styles.hide}`}>
                잘못된 이메일 형식입니다.
              </div>
            </div>
          </div>

          <div className={styles.loginWrapper}>
            <label for="password">비밀번호</label>
            <div>
              <div className={styles.pwContainer}>
                <input
                  className={styles.password}
                  name="password"
                  type={!passwordToggle ? "password" : "text"}
                  placeholder="비밀번호를 입력해주세요"
                />
                <Image
                  className={styles.togglePassword}
                  width={24}
                  height={24}
                  src={!passwordToggle ? openEye : closeEye}
                  onClick={handlePasswordToggle}
                  alt="togglepassword"
                />
              </div>
              <div className={`${styles.emptyPasswordError} ${styles.hide}`}>
                비밀번호를 입력해주세요.
              </div>
              <div className={`${styles.passwordError} ${styles.hide}`}>
                비밀번호 8자 이상 입력해주세요.
              </div>
            </div>
          </div>

          <button className={styles.loginButton} type="button" disabled>
            로그인
          </button>
        </form>

        <section className={styles.easyLogin}>
          <p className={styles.easyLoginText}>간편 로그인하기</p>
          <div className={styles.snsIc}>
            <Link
              className={styles.icImg}
              href="https://www.google.com"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.icLink}
                width={42}
                height={42}
                src={googleIcon}
                alt="googleIcon"
              />
            </Link>
            <Link
              className={styles.icImg}
              href="https://www.kakaocorp.com"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.icLink}
                width={42}
                height={42}
                src={kakaoIcon}
                alt="kakaoIcon"
              />
            </Link>
          </div>
        </section>

        <section className={styles.signup}>
          <span className={styles.signupText}>판다마켓이 처음이신가요?</span>
          <Link className={styles.signupLink} href="/signup">
            회원가입
          </Link>
        </section>
      </main>
    </div>
  );
}
