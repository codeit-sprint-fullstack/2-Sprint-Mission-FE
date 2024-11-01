import { useState, useEffect } from "react";
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
import { fetchApi } from "@/utils/axiosInstance";
import Popup from "./Popup/Popup";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPWError, setConfirmPWError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPWVisible, setIsConfirmPWVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/folder");
    }
  }, [router]);

  const signUpMutation = useMutation({
    mutationFn: async () => {
      return await fetchApi(
        "/auth/signUp",
        { email, nickname, password, passwordConfirmation: confirmPassword },
        "POST"
      );
    },
    onSuccess: (data) => {
      router.push("/signin");
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        const { message } = error.response.data;
        setPopupMessage(message);
        setIsPopupOpen(true);
      } else {
        console.error(error);
      }
    },
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("잘못된 이메일입니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError("비밀번호는 8자 이상 입력해주세요.");
    } else {
      setPasswordError("");
    }

    if (value !== confirmPassword) {
      setConfirmPWError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPWError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password !== value) {
      setConfirmPWError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPWError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError && !passwordError && !confirmPWError) {
      signUpMutation.mutate();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const isButtonDisabled =
    emailError ||
    passwordError ||
    confirmPWError ||
    !email ||
    !password ||
    !nickname;

  return (
    <div className={styles.container}>
      <div className={styles.signup_container}>
        <Image src={logo} alt="로고 이미지" />
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            className={`${styles.input} ${
              emailError ? styles.input_error : ""
            }`}
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <div className={styles.error_message}>{emailError}</div>
          )}

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
              className={`${styles.input} ${
                passwordError ? styles.input_error : ""
              }`}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
            />
            <Image
              src={isPasswordVisible ? eye_on : eye_off}
              alt="비밀번호보기"
              className={styles.password_active_toggle}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
          {passwordError && (
            <div className={styles.error_message}>{passwordError}</div>
          )}

          <label htmlFor="passwordcheck">비밀번호 확인</label>
          <div className={styles.input_password_container}>
            <input
              id="passwordcheck"
              name="passwordcheck"
              className={`${styles.input} ${
                confirmPWError ? styles.input_error : ""
              }`}
              type={isConfirmPWVisible ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Image
              src={isPasswordVisible ? eye_on : eye_off}
              alt="비밀번호보기"
              className={styles.password_active_toggle}
              onClick={() => setIsConfirmPWVisible(!isConfirmPWVisible)}
            />
          </div>
          {confirmPWError && (
            <div className={styles.error_message}>{confirmPWError}</div>
          )}

          <button
            type="submit"
            className={`${styles.signup_btn} ${
              isButtonDisabled ? styles.btn_disabled : styles.btn_active
            }`}
          >
            회원가입
          </button>
        </form>

        <div className={styles.easy_login_section}>
          <div className={styles.space_left}>간편 로그인 하기</div>
          <div className={`${styles.social} ${styles.space_right}`}>
            <Link href="https://www.google.com">
              <Image src={google} alt="구글 로그인" />
            </Link>
            <Link href="https://www.kakaocorp.com/page">
              <Image src={kakao} alt="카카오 로그인" />
            </Link>
          </div>
        </div>

        <div className={styles.login_wrapper}>
          <p>이미 회원이신가요? {"\u00A0"}</p>
          <div className={styles.link_wrapper}>
            <Link href="/signin">로그인</Link>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
}
