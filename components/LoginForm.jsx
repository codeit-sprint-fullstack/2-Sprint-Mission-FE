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
import Popup from "./Popup/Popup";
import { fetchApi } from "@/utils/axiosInstance";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/folder");
    }
  }, [router]);

  const signInMutation = useMutation({
    mutationFn: async () => {
      return await fetchApi("/auth/signIn", { email, password }, "POST");
    },

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      router.push("/item");
    },
    onError: (error) => {
      const { message } = error.response.data;
      setPopupMessage(message);
      setIsPopupOpen(true);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!emailError && !passwordError) {
      signInMutation.mutate();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const isButtonDisabled = emailError || passwordError || !email || !password;

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
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

          <button
            type="submit"
            className={`${styles.login_btn} ${
              isButtonDisabled ? styles.btn_disabled : styles.btn_active
            }`}
          >
            로그인
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
          <p>판다마켓이 처음이신가요? {"\u00A0"}</p>
          <div className={styles.link_wrapper}>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
}
