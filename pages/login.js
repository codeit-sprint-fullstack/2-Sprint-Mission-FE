import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Signup.module.css';
import createButton from '@/components/Button';

const LoginButton = createButton({
  style: 'btn_large',
});

export default function Login() {
  const handleClick = () => {
    return;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.pandaLogo}>
            <Image fill src="/logo.png" alt="panda market" />
          </div>
        </Link>
        <form className={styles.form}>
          <div>
            <div className={styles.label} for="username">
              이메일
            </div>
            <input
              id="username"
              className={styles.input}
              name="username"
              placeholder="이메일을 입력해주세요"
            />
            <span id="email-error" className="error-msg"></span>
          </div>
          <div className={styles.label} for="password">
            비밀번호
          </div>
          <div className={styles.passwordInput}>
            <input
              id="password"
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Image
              width={24}
              height={24}
              className={styles.togglePassword}
              src="/visibility_eye.png"
              alt="view password"
            />
            <span id="password-error" className="error-msg"></span>
          </div>
        </form>
        <LoginButton onClick={handleClick} disabled>
          로그인
        </LoginButton>
        <div className={styles.socialLogin}>
          <span>간편 로그인하기</span>
          <div className={styles.icons}>
            <Link href="https://www.google.com/">
              <Image width={42} height={42} src="/ic_google.png" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image width={42} height={42} src="/ic_kakao.png" />
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
    </div>
  );
}
