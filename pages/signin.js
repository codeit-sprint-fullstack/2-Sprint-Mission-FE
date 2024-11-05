import { useMutation } from '@tanstack/react-query';
import styles from '@/styles/Login.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useLoginValidate from '@/hooks/useLoginValidate';
import ErrorModal from '@/components/Common/ErrorModal';
import { useAuth } from '@/lib/contexts/useAuth';

export default function Login() {
  const router = useRouter();
  const { values, errors, validate, handleChange } = useLoginValidate({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && router.pathname === '/signin') {
      router.push('/folder');
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isInputEmpty = () => {
    return values.email.trim() !== '' && values.password.trim() !== '';
  };

  const mutation = useMutation({
    mutationFn: () =>
      login({
        email: values.email,
        password: values.password
      }),
    onSuccess: (data) => {
      if (data) {
        router.push('/items');
      }
    },
    onError: (err) => {
      if (err.response.data.message === '비밀번호가 일치하지 않습니다.') {
        setModalMessage('비밀번호가 일치하지 않습니다.');
        setIsModalOpen(true);
      } else if (err.response.data.message === '존재하지 않는 이메일입니다.') {
        setModalMessage('존재하지 않는 이메일입니다.');
        setIsModalOpen(true);
      } else {
        console.error('로그인에 실패하였습니다.', err.response.data.message);
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
      password: values.password
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
          alt="사이트 로고"
          priority
        />
      </Link>
      <div className={styles[`login-container`]}>
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
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
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
          <button
            type="submit"
            disabled={!isInputEmpty()}
            onKeyDown={handleButton}
          >
            로그인
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

        <div className={styles.signup}>
          <span>판다마켓이 처음이신가요?</span>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
      <ErrorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </div>
  );
}
