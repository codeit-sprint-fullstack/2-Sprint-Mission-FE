import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "@/images/home/logo.svg";
import eye_on from "@/images/etc/toggle_eye_on.svg";
import eye_off from "@/images/etc/toggle_eye_off.svg";
import kakao from "@/images/icon/kakao.svg";
import google from "@/images/icon/google.svg";
import styles from "@/components/Sign.module.css";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않아요.");
      return;
    }
    setPasswordError("");
  };

  return (
    <>
      <div className={styles.signup_container}>
        <Image src={logo} alt="로고 이미지" />
        <form className={styles.form_wrapper}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            className={styles.input}
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className={styles.error_message} id="errorEmail"></span>

          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            name="nickname"
            className={styles.input}
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <div className={styles.input_password_container}>
            <input
              id="password"
              name="password"
              className={styles.input}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              src={isPasswordVisible ? eye_off : eye_on}
              alt="비밀번호보기"
              className={styles.password_active_toggle}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
          <span className={styles.error_message} id="errorPassword"></span>

          <label htmlFor="passwordcheck">비밀번호 확인</label>
          <div className={styles.input_password_container}>
            <input
              id="passwordcheck"
              name="passwordcheck"
              className={styles.input}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Image
              src={isPasswordVisible ? eye_off : eye_on}
              alt="비밀번호보기"
              className={styles.password_active_toggle}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
          <span className={styles.error_message} id="errorPasswordCheck"></span>

          <button type="button" className={styles.signup_btn}>
            회원가입
          </button>
        </form>

        <div className={styles.easy_login_section}>
          <div className={styles.space_left}>간편 로그인 하기</div>
          <div className={`${styles.social} ${styles.space_right}`}>
            <Image src={google} alt="구글 로그인" />
            <Image src={kakao} alt="카카오 로그인" />
          </div>
        </div>

        <div className={styles.login_container}>
          <p>이미 회원이신가요? {"\u00A0"}</p>
          <div className={styles.link_wrapper}>
            <Link href="/login">로그인</Link>
          </div>
        </div>
      </div>
    </>
  );
}
