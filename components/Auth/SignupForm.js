import { useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SocialLogin from './SocialLogin';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [nickErrorMsg, setNickErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  // 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // 버튼 활성화 상태 체크
  const isButtonDisabled = () => {
    return !(
      validateEmail(email) &&
      nick.trim() !== '' &&
      validatePassword(password) &&
      password === passwordConfirm &&
      emailErrorMsg === '' &&
      nickErrorMsg === '' &&
      passwordErrorMsg === '' &&
      passwordConfirmErrorMsg === ''
    );
  };

  // 이메일 입력 처리
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (email.trim() === '') {
      setEmailErrorMsg('이메일을 입력해 주세요');
    } else if (!validateEmail(email.trim())) {
      setEmailErrorMsg('잘못된 이메일 형식입니다');
    } else {
      setEmailErrorMsg('');
    }
  };

  // 닉네임 입력 처리
  const handleNickChange = (e) => {
    setNick(e.target.value);
  };

  const handleNickBlur = () => {
    if (nick.trim() === '') {
      setNickErrorMsg('닉네임을 입력해 주세요');
    } else {
      setNickErrorMsg('');
    }
  };

  // 패스워드 입력 처리
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    if (password.trim() === '') {
      setPasswordErrorMsg('비밀번호를 입력해 주세요');
    } else if (!validatePassword(password.trim())) {
      setPasswordErrorMsg('비밀번호를 8자 이상 입력해 주세요');
    } else {
      setPasswordErrorMsg('');
    }
  };

  // 패스워드 확인 입력 처리
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm.trim() === '') {
      setPasswordConfirmErrorMsg('비밀번호를 다시 한 번 입력해 주세요');
    } else if (passwordConfirm !== password) {
      setPasswordConfirmErrorMsg('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordConfirmErrorMsg('');
    }
  };

  // 패스워드 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 통과 여부 확인
    if (isButtonDisabled()) {
      return;
    }

    // 회원가입 처리 로직 추가
    console.log('회원가입 정보:', { email, nick, password });
    alert('회원가입 처리!');

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

      {/* 회원가입 컨테이너 */}
      <div className={styles.signupContainer}>
        <form id="signup-form" className={styles.signupForm} onSubmit={handleSubmit}>
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

          {/* 닉네임 입력 필드 */}
          <div className={styles.formField}>
            <label htmlFor="nick">닉네임</label>
            <input
              type="text"
              id="nick"
              name="nick"
              placeholder="닉네임을 입력해주세요"
              value={nick}
              onChange={handleNickChange}
              onBlur={handleNickBlur}
              required
            />
            {nickErrorMsg && (
              <span className={styles.errorMessage}>{nickErrorMsg}</span>
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

          {/* 비밀번호 확인 입력 필드 */}
          <div className={styles.formField}>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordConfirmVisible ? 'text' : 'password'}
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                onBlur={handlePasswordConfirmBlur}
                required
              />
              <div
                className={styles.visibilityIcon}
                onClick={togglePasswordConfirmVisibility}
              >
                <Image
                  src={
                    passwordConfirmVisible
                      ? '/images/auth/btn_visibility_on_24px.svg'
                      : '/images/auth/btn_visibility_off_24px.svg'
                  }
                  alt="비밀번호 보기"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            {passwordConfirmErrorMsg && (
              <span className={styles.errorMessage}>{passwordConfirmErrorMsg}</span>
            )}
          </div>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isButtonDisabled()}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>

      {/* 소셜 로그인 */}
      <SocialLogin />

      {/* 로그인 링크 */}
      <div className={styles.signupLink}>
        <p>
          이미 회원이신가요?{' '}
          <Link href="/signin/">
            로그인
          </Link>
        </p>
      </div>
    </>
  );
};