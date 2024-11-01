import { useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SocialLogin from './SocialLogin';
import useValidateLoginForm from '@/hooks/useValidateLoginForm';
import { authApi } from '@/lib/api/AuthService';
import { useRouter } from 'next/router';

export default function LoginForm() {

  const {
    loginData,
    errors,
    handleChange,
    isFormValid,
  } = useValidateLoginForm();

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  // 패스워드 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 통과 여부 확인
    if (!isFormValid) {
      return;
    }
    
    console.log('loginData', loginData);
    try {
      const res = await authApi.signIn(loginData);
      alert('로그인에 성공하였습니다.');
      router.push('/items');
    } catch (error) {
      console.error('로그인에 실패하였습니다', error.message);
      alert(`로그인에 실패하였습니다: ${error.message}`)
    }
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
              value={loginData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
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
                value={loginData.password}
                onChange={handleChange}
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
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={!isFormValid}
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
