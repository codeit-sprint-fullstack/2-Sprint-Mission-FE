import { Link, useNavigate } from "react-router-dom"; // Link 컴포넌트 임포트
import "./HomeStyle/auth.css";
import "./HomeStyle/global.css";
import logo from "./images/logo/logo.svg";
import closeEye from "./images/icons/eye-invisible.svg";
import openEye from "./images/icons/eye-visible.svg";
import kakaoTalk from "./images/social/kakao-logo.png";
import google from "./images/social/google-logo.png";
import Modal from "../component/Modal";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

// 상태의 타입 정의
export interface SignupValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
  errorMsg: string;
  errors: {
    email?: string;
    nickname?: string;
    password?: string;
    passwordConfirmation?: string;
  };
}

// ErrorResponse 타입 정의 추가
export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
    errorMsg: "",
    errors: {},
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordConfirmation, setTogglePasswordConfirmation] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/folder");
    }
  }, [navigate]);

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateNickname = (nickname: string): string | null => {
    if (!nickname) return "닉네임을 입력해 주세요";
    if (nickname.length < 2) return "닉네임은 2글자 이상이어야 합니다";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "비밀번호를 입력해 주세요";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다";
    return null;
  };

  const validatepasswordConfirmation = (
    passwordConfirmation: string
  ): string | null => {
    if (!passwordConfirmation) return "비밀번호 확인을 입력해 주세요";
    if (passwordConfirmation !== values.password)
      return "비밀번호가 일치하지 않습니다";
    return null;
  };

  const handleBlur = (field: keyof SignupValues["errors"]): void => {
    const newErrors = { ...values.errors };

    switch (field) {
      case "email":
        if (!values.email) {
          newErrors.email = "이메일을 입력해 주세요";
        } else if (!validateEmail(values.email)) {
          newErrors.email = "잘못된 이메일 형식입니다";
        } else {
          delete newErrors.email;
        }
        break;

      case "nickname":
        const nicknameError = validateNickname(values.nickname || "");
        if (nicknameError) {
          newErrors.nickname = nicknameError;
        } else {
          delete newErrors.nickname;
        }
        break;

      case "password":
        const passwordError = validatePassword(values.password);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          delete newErrors.password;
        }
        break;

      case "passwordConfirmation":
        const passwordConfirmationError = validatepasswordConfirmation(
          values.passwordConfirmation || ""
        );
        if (passwordConfirmationError) {
          newErrors.passwordConfirmation = passwordConfirmationError;
        } else {
          delete newErrors.passwordConfirmation;
        }
        break;

      default:
        break;
    }

    setValues((prevValues) => ({ ...prevValues, errors: newErrors }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const newErrors: Partial<SignupValues["errors"]> = {};
    setValues((prevValues) => ({ ...prevValues, errors: newErrors }));
    try {
      const { email, nickname, password } = values;
      const encryptedPassword = password;
      await axios.post("/auth/signUp", {
        email,
        nickname,
        encryptedPassword,
      });
      const response = await axios.post("/auth/signIn", {
        email,
        password,
      });

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/items");
    } catch (error) {
      setIsModalOpen(true);
      setValues((prevValues) => ({
        ...prevValues,
        errorMsg: (error as ErrorResponse).response.data.message,
      }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 모든 필드의 유효성 검사 결과를 체크하여 버튼 활성화 상태 설정
    const hasErrors = Object.keys(values.errors).length > 0;
    setIsSubmitDisabled(
      hasErrors ||
        !values.email ||
        !values.nickname ||
        !values.password ||
        !values.passwordConfirmation
    );
  }, [values]);

  return (
    <>
      <main className="auth-container">
        <Link to="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </Link>

        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              onBlur={() => handleBlur("email")}
              required
            />
            {values.errors.email && (
              <span className="error-message">{values.errors.email}</span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={values.nickname}
              onChange={(e) =>
                setValues({ ...values, nickname: e.target.value })
              }
              onBlur={() => handleBlur("nickname")}
              required
            />
            {values.errors.nickname && (
              <span className="error-message">{values.errors.nickname}</span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={togglePassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                onBlur={() => handleBlur("password")}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 보기"
                onClick={() => setTogglePassword(!togglePassword)}
              >
                <img
                  className="password-toggle-icon"
                  src={togglePassword ? openEye : closeEye}
                  alt={togglePassword ? "비밀번호 보임" : "비밀번호 숨김"}
                />
              </button>
            </div>
            {values.errors.password && (
              <span className="error-message">{values.errors.password}</span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <div className="input-wrapper">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={togglePasswordConfirmation ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={values.passwordConfirmation}
                onChange={(e) =>
                  setValues({ ...values, passwordConfirmation: e.target.value })
                }
                onBlur={() => handleBlur("passwordConfirmation")}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 확인 보기"
                onClick={() =>
                  setTogglePasswordConfirmation(!togglePasswordConfirmation)
                }
              >
                <img
                  className="password-toggle-icon"
                  src={togglePasswordConfirmation ? openEye : closeEye}
                  alt={
                    togglePasswordConfirmation
                      ? "비밀번호 보임"
                      : "비밀번호 숨김"
                  }
                />
              </button>
            </div>
            {values.errors.passwordConfirmation && (
              <span className="error-message">
                {values.errors.passwordConfirmation}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`button pill-button full-width ${
              !isSubmitDisabled ? "buttonActive" : ""
            }`}
          >
            회원가입
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img src={google} alt="구글 로그인" width="42" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img src={kakaoTalk} alt="카카오톡 로그인" width="42" />
            </a>
          </div>
        </div>

        <div className="auth-switch">
          이미 회원이신가요? <Link to="/signin">로그인</Link>
        </div>
      </main>
      {isModalOpen && (
        <Modal message={values.errorMsg} onClose={handleCloseModal} />
      )}
    </>
  );
}
