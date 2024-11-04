import { useMutation } from '@tanstack/react-query';
import styles from '@/styles/Signup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '@/lib/api/AuthService';
import useSignUpValidate from '@/hooks/useSignUpValidate';
import Modal from '@/components/Common/Modal';

export default function SingUp() {
  const router = useRouter();
  const { values, errors, validate, handleChange } = useSignUpValidate({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && router.pathname === '/signup') {
      router.push('/folder');
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleCheckPasswordVisibility = () => {
    setIsPasswordCheckVisible(!isPasswordCheckVisible);
  };

  const isInputEmpty = () => {
    return (
      values.email.trim() !== '' &&
      values.nickname.trim() !== '' &&
      values.password.trim() !== '' &&
      values.passwordConfirmation.trim() !== ''
    );
  };

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const res = await signUp(userData);
      return res;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        router.push('/items');
      }
    },
    onError: (error) => {
      if (error.response?.data?.message === '이미 사용중인 이메일입니다.') {
        setModalMessage('사용 중인 이메일입니다.');
        setIsModalOpen(true);
      } else {
        console.error('회원가입에 실패하였습니다.', error.response.data);
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputEmpty() || !validate()) {
      return;
    }

    mutation.mutate({
      email: values.email,
      nickname: values.nickname,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation
    });
  };

  const handleButton = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.home} href="/">
        <Image
          className={styles.logo}
          src="/images/Property 1=md@3x.png"
          width={396}
          height={132}
          alt="로그인 로고"
          priority
        />
      </Link>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className={errors.email ? styles[`input-error`] : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.group}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
            className={errors.nickname ? styles[`input-error`] : ''}
          />
          {errors.nickname && (
            <span className={styles.error}>{errors.nickname}</span>
          )}
        </div>

        <div className={styles.group}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.password}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className={errors.password ? styles[`input-error`] : ''}
            />
            <Image
              className={styles.visibility}
              src={
                isPasswordVisible
                  ? '/images/btn_visibility_on_24px.svg'
                  : '/images/btn_visibility_off_24px-1.svg'
              }
              onClick={togglePasswordVisibility}
              width={24}
              height={24}
              alt="눈 아이콘 off"
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.group}>
          <label htmlFor="passwordConfirmation">비밀번호 확인</label>
          <div className={styles.password}>
            <input
              type={isPasswordCheckVisible ? 'text' : 'password'}
              id="passwordConfirmation"
              value={values.passwordConfirmation}
              onChange={handleChange}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={
                errors.passwordConfirmation ? styles[`input-error`] : ''
              }
            />
            <Image
              className={styles.visibility}
              src={
                isPasswordCheckVisible
                  ? '/images/btn_visibility_on_24px.svg'
                  : '/images/btn_visibility_off_24px-1.svg'
              }
              onClick={toggleCheckPasswordVisibility}
              width={24}
              height={24}
              alt="눈 아이콘 off"
            />
          </div>
          {errors.passwordConfirmation && (
            <span className={styles.error}>{errors.passwordConfirmation}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isInputEmpty() || mutation.isLoading}
          onKeyDown={handleButton}
        >
          {mutation.isLoading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <div className={styles.oauth}>
        <span>간편 로그인하기</span>
        <div className={styles[`oauth-logo`]}>
          <Link href="https://www.google.com/">
            <Image
              src="/images/google.png"
              width={42}
              height={42}
              alt="구글 로고"
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image
              src="/images/kakaotalk.png"
              width={42}
              height={42}
              alt="카카오톡 로고"
            />
          </Link>
        </div>
      </div>

      <div className={styles.login}>
        <span>이미 회원이신가요?</span>
        <Link href="/signin">로그인</Link>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </div>
  );
}
