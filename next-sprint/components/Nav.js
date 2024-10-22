import { useEffect, useState } from 'react';
import styles from './Nav.module.css';
import Image from 'next/image';

export default function Nav() {
  const [windowWidth, setWindowWidth] = useState();

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

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navPanda}>
          {windowWidth > 743 ? (
            <Image fill src="/images/nav_panda.svg" alt="navPanda" />
          ) : (
            <Image fill src="/images/nav_panda_mobile.svg" alt="navPanda" />
          )}
        </div>
        <div className={styles.menu}>
          <h3>자유게시판</h3>
          <h3>중고마켓</h3>
        </div>
        <button type="submit" className={styles.login}>
          로그인
        </button>
      </nav>
    </div>
  );
}
