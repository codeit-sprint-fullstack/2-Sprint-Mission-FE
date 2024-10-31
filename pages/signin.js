import styles from '@/styles/Login.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image
          src="/images/Property 1=md@3x.png"
          width={396}
          height={132}
          alt="사이트 로고"
        />
      </Link>
      <div className={styles[`login-container`]}>
        <form className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="useremail">이메일</label>
            <input
              id="useremail"
              value=""
              type="email"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="password">비밀번호</label>
            <div className={styles.password}>
              <input
                id="password"
                value=""
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
          <button type="submit" disabled={true}>
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
    </div>
  );
}
