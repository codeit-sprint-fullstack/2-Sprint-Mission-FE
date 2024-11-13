import { useEffect, useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SocialLogin from './SocialLogin';
import useValidateSignupForm from '@/hooks/useValidateSignupForm';
import { authApi } from '@/lib/api/AuthService';
import { useRouter } from 'next/router';
import Modal from '../Common/Modal';
import { useAuth } from '@/contexts/AuthProvider';

export default function SignupForm() {
  const {
    signupData,
    errors,
    handleChange,
    isFormValid,
  } = useValidateSignupForm();

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { user, login } = useAuth();

  // 패스워드 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 통과 여부 확인
    if (!isFormValid) {
      return;
    }

    // API 문서에 맞춘 키 변환
    const formattedSignupData = {
      email: signupData.email,
      nickname: signupData.nick,               
      password: signupData.password,
      passwordConfirmation: signupData.passwordConfirm, 
    };

    try {
      const res = await authApi.signUp(formattedSignupData);
      if(res) {
        //setModalMessage('회원 가입이 성공적으로 처리되었습니다.');
        //setIsModalOpen(true);   

        // 회원가입 성공 시 로그인
        await login({
          email: signupData.email,
          password: signupData.password,
        });
        router.push('/items');
      }
    } catch (error) {
      console.warn('회원가입 실패: ', error.message);
      setModalMessage(error.message);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      router.push('/items');
    }
  }, [user, router]);

  return (
    <>
      {/* 모달 메시지 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />

      <div className={styles.logoSubpage}>
        <Link href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/images/auth/logo_subpage.png"
              alt="판다마켓 로고"
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes='39.6rem'
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
              value={signupData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
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
              value={signupData.nick}
              onChange={handleChange}
              required
            />
            {errors.nick && (
              <span className={styles.errorMessage}>{errors.nick}</span>
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
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
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
                onChange={handleChange}
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
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            {errors.passwordConfirm && (
              <span className={styles.errorMessage}>{errors.passwordConfirm}</span>
            )}
          </div>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={!isFormValid}
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