import styles from '@/styles/Signup.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function SingUp() {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image
          src="/images/Property 1=md@3x.png"
          width={396}
          height={132}
          alt="로그인 로고"
        />
      </Link>
      <form className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="useremail">이메일</label>
          <input
            id="useremail"
            name="useremail"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.password}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Image
              className={styles.visibility}
              src="/images/btn_visibility_off_24px-1.svg"
              width={24}
              height={24}
              alt="눈 아이콘 off"
            />
          </div>
        </div>
        <div className={styles.group}>
          <label htmlFor="password-check">비밀번호 확인</label>
          <div className={styles.password}>
            <input
              id="password-check"
              name="password-check"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <Image
              className={styles.visibility}
              src="/images/btn_visibility_off_24px-1.svg"
              width={24}
              height={24}
              alt="눈 아이콘 off"
            />
          </div>
        </div>
        <button type="submit" disabled={true}>
          회원가입
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
        <Link href="/login">로그인</Link>
      </div>
    </div>
  );
}
