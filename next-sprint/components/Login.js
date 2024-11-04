import { useMutation } from '@tanstack/react-query';
import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [loginFailed, setLoginFailed] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));

    if (loginFailed) {
      setLoginFailed(false);
    }
  }

  const loginMutation = useMutation({
    mutationFn: (userValues) => login(userValues),
    onSuccess: () => {
      router.push('/items');
    },
    onError: () => {
      setErrors({
        email: '이메일을 확인해 주세요.',
        password: '비밀번호를 확인해 주세요.'
      });
      setLoginFailed(true);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = values;
    loginMutation.mutate({ email, password });
  };

  return (
    <div className={styles.loginPage}>
      <header className={styles.header}>
        <Image
          width={396}
          height={132}
          src="/images/login_logo.svg"
          alt="로그인 로고 이미지"
        />
      </header>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>
            <h4>이메일</h4>
            <input
              value={values.email}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>
          <label className={styles.label}>
            <h4>비밀번호</h4>
            <input
              value={values.password}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <Image
              width={24}
              height={24}
              src="/images/btn_visibility.svg"
              alt="비밀번호 표시 이미지"
              className={styles.btnVisibility}
            />
          </label>
          <button
            style={{
              backgroundColor: loginFailed
                ? '#9ca3af'
                : values.email && values.password
                ? '#3692ff'
                : '#9ca3af'
            }}
            className={styles.loginBtn}
            type="submit"
            name="login"
            disabled={!values.email || !values.password || loginFailed}
          >
            로그인
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
        <span>판다마켓이 처음이신가요?</span>
        <Link href="/signup" className={styles.link}>
          회원가입
        </Link>
      </footer>
    </div>
  );
}
