import { useAuth } from '@/lib/contexts/useAuth';
import styles from './GNB.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GNB() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/images/Property 1=sm.png"
              width={153}
              height={51}
              alt="기본 사이트 로고"
              priority
            />
            <Image
              className={styles.mobile}
              src="/images/Property 1=Typo.png"
              width={81}
              height={40}
              alt="모바일 사이트 로고"
            />
          </Link>
          <ul className={styles.menu}>
            <li
              className={router.pathname === '/articles' ? styles.active : ''}
            >
              <Link href="/articles">자유게시판</Link>
            </li>
            <li className={router.pathname === '/items' ? styles.active : ''}>
              <Link href="/items">중고마켓</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <div className={styles[`login-success`]}>
            <div className={styles.user}>
              <Image
                src="/images/size=large.png"
                width={40}
                height={40}
                alt="유저 아이콘"
              />
              <span>{user.nickname}님</span>
            </div>
            <button className={styles.auth} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/signin">
            <button className={styles.auth}>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}
