import { useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  // 유효성 검사 함수
  const validateEmail = (email) => {
    // 이메일 형식 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // 비밀번호 길이 검사 (8자 이상)
    return password.length >= 8;
  };

  // 버튼 활성화 상태 체크
  const isButtonDisabled = () => {
    return !(
      validateEmail(email) &&
      validatePassword(password) &&
      emailErrorMsg === '' &&
      passwordErrorMsg === ''
    );
  };

  // 이메일 입력 처리
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 이메일 포커스 아웃 처리
  const handleEmailBlur = () => {
    if (email.trim() === '') {
      setEmailErrorMsg('이메일을 입력해 주세요');
    } else if (!validateEmail(email.trim())) {
      setEmailErrorMsg('잘못된 이메일 형식입니다');
    } else {
      setEmailErrorMsg('');
    }
  };

  // 패스워드 입력 처리
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 패스워드 포커스 아웃 처리
  const handlePasswordBlur = () => {
    if (password.trim() === '') {
      setPasswordErrorMsg('비밀번호를 입력해 주세요');
    } else if (!validatePassword(password.trim())) {
      setPasswordErrorMsg('비밀번호를 8자 이상 입력해 주세요');
    } else {
      setPasswordErrorMsg('');
    }
  };

  // 패스워드 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 통과 여부 확인
    if (isButtonDisabled()) {
      return;
    }

    // 로그인 처리 로직 추가 (예: API 호출)
    console.log('로그인 정보:', { email, password });
    alert('로그인 처리!');

  };

  return (
    <>
      {/* 상단 로고 영역 */}
      <div className={styles.logoSubpage}>
        <Link href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/images/auth/logo_subpage.png"
              alt="판다마켓 로고"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>

      {/* 로그인 컨테이너 */}
      <div className={styles.loginContainer}>
        <form id="login-form" className={styles.loginForm} onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <div className={styles.formField}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              required
            />
            {emailErrorMsg && (
              <span className={styles.errorMessage}>{emailErrorMsg}</span>
            )}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className={styles.formField}>
            <label htmlFor="password">비밀번호</label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              <div className={styles.visibilityIcon} onClick={togglePasswordVisibility}>
                <Image
                  src={
                    passwordVisible
                      ? '/images/auth/btn_visibility_on_24px.svg'
                      : '/images/auth/btn_visibility_off_24px.svg'
                  }
                  alt="비밀번호 보기"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            {passwordErrorMsg && (
              <span className={styles.errorMessage}>{passwordErrorMsg}</span>
            )}
          </div>

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isButtonDisabled()}
            >
              로그인
            </button>
          </div>
        </form>
      </div>

      {/* 소셜 로그인 */}
      <SocialLogin />
      
      {/* 회원가입 링크 */}
      <div className={styles.signupLink}>
        <p>
          판다마켓이 처음이신가요?{' '}
          <Link href="/signup/">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
};
