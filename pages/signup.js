import styles from "@/styles/Signup.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/pandamarket_logo.svg";
import openEye from "@/public/openEye.svg";
import closeEye from "@/public/closeEye.svg";
import googleIcon from "@/public/googleIcon.svg";
import kakaoIcon from "@/public/kakaoIcon.svg";
import { useState } from "react";

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);
  return (
    <div className={styles.signupPage}>
      <header className={styles.signupHeader}>
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

      <main className={styles.signupMain}>
        <form className={styles.signupForm}>
          <div className={styles.signupWrapper}>
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

          <div className={styles.signupWrapper}>
            <label htmlFor="nickname">닉네임</label>
            <div>
              <input
                className={styles.nickname}
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                autocomplete="on"
                required
              />
              <div className={`${styles.emptyNicknameError} ${styles.hide}`}>
                닉네임을 입력해주세요.
              </div>
            </div>
          </div>

          <div className={styles.signupWrapper}>
            <label htmlFor="password">비밀번호</label>
            <div>
              <div className={styles.pwContainer}>
                <input
                  className={styles.password}
                  name="password"
                  type={!isPasswordVisible ? "password" : "text"}
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
                <Image
                  className={styles.togglePassword}
                  width={24}
                  height={24}
                  src={!isPasswordVisible ? openEye : closeEye}
                  onClick={onTogglePassword}
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

          <div className={styles.signupWrapper}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div>
              <div className={styles.pwContainer}>
                <input
                  className={styles.confirmPassword}
                  name="confirmPassword"
                  type={!isConfirmVisible ? "password" : "text"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  required
                />
                <Image
                  className={styles.togglePassword}
                  width={24}
                  height={24}
                  src={!isConfirmVisible ? openEye : closeEye}
                  onClick={onToggleConfirm}
                  alt="togglepassword"
                />
              </div>
              <div
                className={`${styles.emptyConfirmPasswordError} ${styles.hide}`}
              >
                비밀번호를 다시 한 번 입력해주세요.
              </div>
              <div className={`${styles.confirmPasswordError} ${styles.hide}`}>
                비밀번호가 일치하지 않습니다.
              </div>
            </div>
          </div>

          <button className={styles.signupButton} type="button" disabled>
            회원가입
          </button>
        </form>

        <section className={styles.easyLogin}>
          <p className={styles.easyLoginText}>간편 로그인하기</p>
          <div className={styles.snsIc}>
            <Link className={styles.icImg} href="https://www.google.com">
              <Image
                className={styles.icLink}
                width={42}
                height={42}
                src={googleIcon}
                alt="googleIcon"
              />
            </Link>
            <Link className={styles.icImg} href="https://www.kakaocorp.com">
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

        <section className={styles.login}>
          <span className={styles.loginText}>이미 회원이신가요?</span>
          <Link className={styles.loginLink} href="/login">
            로그인
          </Link>
        </section>
      </main>
    </div>
  );
}
