import Link from 'next/link';
import Image from 'next/image';
import createButton from '@/components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/router';
import styles from '@/styles/Signup.module.css';
import Modal from '@/components/Modal';

const LoginButton = createButton({
  style: 'btn_large',
});

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
	const [loginError, setLoginError] = useState(false);
  const { user, login } = useAuth();
	const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(value)) {
      setEmailError('잘못된 이메일 형식입니다.');
    } else if (!value) {
      setEmailError('이메일을 입력해 주세요.');
    } else {
      setEmailError('');
      setValues((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const isPasswordValidate = e.target.value.length >= 8;
    if (!isPasswordValidate) {
      setPasswordError('비밀번호를 8자 이상 입력해주세요.');
    } else if (!e.target.value) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else {
      setPasswordError('');
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleClick = async (e) => {
		e.preventDefault();
    try {
			await login(values);
			router.push('/items');
		} catch {
			setLoginError(true);
			setEmailError('이메일을 확인해 주세요.');
			setPasswordError('비밀번호를 확인해 주세요.');
		}
  };

	useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.pandaLogo}>
            <Image fill src="/logo.png" alt="panda market" priority />
          </div>
        </Link>
        <form className={styles.form}>
          <div>
            <div className={styles.label}>
              이메일
            </div>
            <input
              id="email"
              className={styles.input}
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
            />
            {emailError && (
              <div className={styles.errorMessage}>{emailError}</div>
            )}
          </div>
          <div className={styles.label}>
            비밀번호
          </div>
          <div className={styles.passwordInput}>
            <input
              id="password"
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
            />
            <Image
              width={24}
              height={24}
              className={styles.togglePassword}
              src="/visibility_eye.png"
              alt="view password"
            />
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>
        </form>
        <LoginButton
          onClick={handleClick}
          disabled={!values || emailError || passwordError}
        >
          로그인
        </LoginButton>
        <div className={styles.socialLogin}>
          <span>간편 로그인하기</span>
          <div className={styles.icons}>
            <Link href="https://www.google.com/">
              <Image width={42} height={42} src="/ic_google.png" alt="google" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image width={42} height={42} src="/ic_kakao.png" alt="kakao" />
            </Link>
          </div>
        </div>
        <div className={styles.ask}>
          판다마켓이 처음이신가요?{' '}
          <Link href="/signup" className={styles.answerLink}>
            회원가입
          </Link>
        </div>
      </div>
			{loginError && <Modal onClose={() => setLoginError(false)}>비밀번호가 일치하지 않습니다.</Modal>}
    </div>
  );
}
