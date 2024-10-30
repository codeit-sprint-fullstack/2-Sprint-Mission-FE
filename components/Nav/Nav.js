import styles from './Nav.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

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
            <li className={router.pathname === '/' ? styles.active : ''}>
              <Link href="/">자유게시판</Link>
            </li>
            <li>
              <Link href="/items">중고마켓</Link>
            </li>
          </ul>
        </div>
        <button className={styles.auth}>
          <Link href="/login">로그인</Link>
        </button>
      </div>
    </header>
  );
}
