import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Signup.module.css';
import createButton from '@/components/Button';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/router';

const SignupButton = createButton({
  style: 'btn_large',
});

export default function Signup() {
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordCheckError, setPasswordCheckError] = useState();
  const { user, login } = useAuth();
	const router = useRouter();
	console.log('user :', user);

  const handleEmailChange = (e) => {
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(e.target.value)) {
      setEmailError('잘못된 이메일 형식입니다.');
    } else if (!e.target.value) {
      setEmailError('이메일을 입력해 주세요.');
    } else {
      setEmailError('');
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleNicknameChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handlePasswordConfirmationChange = (e) => {
    if (values.password !== e.target.value) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordCheckError('');
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleClick = async () => {
    try {
      const { email, password } = values;
      const res = await axios.post('/auth/signUp', values);
      login({ email, password });
    } catch (error) {
      console.log(error.message);
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
        <div className={styles.pandaLogo}>
          <Link href="/">
            <Image fill src="/logo.png" alt="panda market" />
          </Link>
        </div>
        <form className={styles.form}>
          <div>
            <div className={styles.label}>이메일</div>
            <input
              id="email"
              className={styles.input}
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
            />
          </div>
          {emailError && (
            <div className={styles.errorMessage}>{emailError}</div>
          )}
          <div>
            <div className={styles.label}>닉네임</div>
            <input
              id="nickname"
              className={styles.input}
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              onChange={handleNicknameChange}
            />
          </div>
          <div className={styles.label}>비밀번호</div>
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
              alt="show password"
            />
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>
          <div className={styles.label}>비밀번호 확인</div>
          <div className={styles.passwordInputVerification}>
            <input
              id="passwordConfirmation"
              className={styles.input}
              name="passwordConfirmation"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              onChange={handlePasswordConfirmationChange}
            />
            <div className={styles.togglePassword}>
              <Image
                width={24}
                height={24}
                className="toggle-show-password"
                src="/visibility_eye.png"
                alt="show password"
              />
            </div>
            {passwordCheckError && (
              <div className={styles.errorMessage}>{passwordCheckError}</div>
            )}
          </div>
        </form>
        <SignupButton
          onClick={handleClick}
          disabled={emailError || passwordError || passwordCheckError}
        >
          회원가입
        </SignupButton>
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
          이미 회원이신가요?
          <Link href="/login" className={styles.answerLink}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
