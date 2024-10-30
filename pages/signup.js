import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Signup.module.css';
import createButton from '@/components/Button';

const SignupButton = createButton({
  style: 'btn_large',
});

export default function Signup() {
  const handleClick = () => {
    return;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.pandaLogo}>
          <Link href="/">
            <Image
              fill
              src="/logo.png"
              alt="panda market"
            />
          </Link>
        </div>
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
          </div>
          <div>
            <div className={styles.label} for="nickname">
              닉네임
            </div>
            <input
              id="nickname"
              className={styles.input}
              name="nickname"
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          <div className={styles.label} for="password1">
            비밀번호
          </div>
          <div className={styles.passwordInput}>
            <input
              id="password1"
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
              alt="show password"
            />
          </div>
          <div className={styles.label} for="password2">
            비밀번호 확인
          </div>
          <div className={styles.passwordInputVerification}>
            <input
              id="password2"
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
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
          </div>
        </form>
        <SignupButton onClick={handleClick} disabled>
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
