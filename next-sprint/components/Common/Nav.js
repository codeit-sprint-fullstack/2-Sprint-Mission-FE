import { useEffect, useState } from 'react';
import styles from './Nav.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

export default function Nav() {
  const [windowWidth, setWindowWidth] = useState();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log('User data:', user);

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navPanda}>
          <Link href="/">
            {windowWidth > 743 ? (
              <Image fill src="/images/nav_panda.svg" alt="navPanda" />
            ) : (
              <Image fill src="/images/nav_panda_mobile.svg" alt="navPanda" />
            )}
          </Link>
        </div>
        <div className={styles.menu}>
          <Link href="/articles" className={styles.link}>
            <h3
              className={router.pathname === '/articles' ? styles.active : ''}
            >
              자유게시판
            </h3>
          </Link>
          <Link href="/items" className={styles.link}>
            <h3 className={router.pathname === '/items' ? styles.active : ''}>
              중고마켓
            </h3>
          </Link>
        </div>
        {user ? (
          <div className={styles.user}>
            <Image
              width={40}
              height={40}
              src="/images/default_user.svg"
              alt="유저 이미지"
            />
            <span>{user.nickname}</span>
          </div>
        ) : (
          <Link href="/login">
            <button type="submit" className={styles.login}>
              로그인
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}
