import styles from './Signup.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/Common/Modal';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/lib/api';
import useSignupValidate from '@/hooks/useSignupValidate';
import { useUser } from '@/contexts/UserContext';

export default function Signup() {
  const router = useRouter();
  const { values, setValues, errors, validate } = useSignupValidate({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: ''
  });
  const [signupFailed, setSignupFailed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState(false);
  const { setUser, user } = useUser();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'undefined' && user !== null) {
      router.push('/folder');
    }
  }, [router, user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
    validate();
    if (signupFailed) {
      setSignupFailed(false);
    }
  }

  const signupMutation = useMutation({
    mutationFn: (userValues) => signup(userValues),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToekn', data.refreshToken);
        setUser(data);
        setModalMessage('가입 완료되었습니다.');
        setIsModalOpen(true);
      }
    },
    onError: (err) => {
      if (err.response) {
        if (err.response.data.message === '이미 사용중인 이메일입니다.') {
          setModalMessage('이미 사용중인 이메일입니다.');
          setIsModalOpen(true);
        } else if (
          err.response.data.message === '이미 사용중인 닉네임입니다.'
        ) {
          setModalMessage('이미 사용중인 닉네임입니다.');
          setIsModalOpen(true);
        }
      }
      setSignupFailed(true);
    }
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, nickname, password, passwordConfirmation } = values;
    signupMutation.mutate({ email, nickname, password, passwordConfirmation });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSignupFailed(false);
  };

  const handleModalConfirm = () => {
    router.push('/items');
    setIsModalOpen(false);
    setSignupFailed(false);
  };

  const handleVisibilityChange = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmationVisibilityChange = () => {
    setPasswordConfirmationVisibility(!passwordConfirmationVisibility);
  };

  return (
    <div className={styles.signupPage}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            width={396}
            height={132}
            src="/images/login_logo.svg"
            alt="로그인 로고 이미지"
          />
        </Link>
      </header>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSignup}>
          <label className={styles.label}>
            <h4>이메일</h4>
            <input
              value={values.email}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>
          <label className={styles.label}>
            <h4>닉네임</h4>
            <input
              value={values.nickname}
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              onChange={handleChange}
            />
            {errors.nickname && (
              <span className={styles.error}>{errors.nickname}</span>
            )}
          </label>
          <label className={styles.label}>
            <h4>비밀번호</h4>
            <input
              value={values.password}
              type={passwordVisibility ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
            <Image
              width={24}
              height={24}
              src={
                passwordVisibility
                  ? '/images/btn_visibility_on.svg'
                  : '/images/btn_visibility.svg'
              }
              alt="비밀번호 표시 이미지"
              className={styles.btnVisibility}
              onClick={handleVisibilityChange}
            />
          </label>
          <label className={styles.label}>
            <h4>비밀번호 확인</h4>
            <input
              value={values.passwordConfirmation}
              type={passwordConfirmationVisibility ? 'text' : 'password'}
              name="passwordConfirmation"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              onChange={handleChange}
            />
            {errors.passwordConfirmation && (
              <span className={styles.error}>
                {errors.passwordConfirmation}
              </span>
            )}
            <Image
              width={24}
              height={24}
              src={
                passwordConfirmationVisibility
                  ? '/images/btn_visibility_on.svg'
                  : '/images/btn_visibility.svg'
              }
              alt="비밀번호 표시 이미지"
              className={styles.btnVisibility}
              onClick={handleConfirmationVisibilityChange}
            />
          </label>
          <button
            style={{
              backgroundColor: signupFailed
                ? '#9ca3af'
                : values.email && values.password
                ? '#3692ff'
                : '#9ca3af'
            }}
            className={styles.signupBtn}
            type="submit"
            name="login"
            disabled={
              !values.email ||
              !values.password ||
              !values.nickname ||
              !values.passwordConfirmation ||
              signupFailed
            }
          >
            회원가입
          </button>
        </form>
        <section className={styles.socialLogin}>
          <div>
            <h4>간편 로그인하기</h4>
          </div>
          <div className={styles.socialLoginBox}>
            <div>
              <Link href="https://www.google.com/" target="_self">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_google.svg"
                  alt="구글 이미지"
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.kakaocorp.com/page" target="_self">
                <Image
                  width={42}
                  height={42}
                  src="/images/ic_kakao.svg"
                  alt="카카오 이미지"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>이미 회원이신가요?</span>
        <Link href="/login" className={styles.link}>
          로그인
        </Link>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={signupFailed ? handleCloseModal : handleModalConfirm}
        message={modalMessage}
      />
    </div>
  );
}
